const connection = require('../app/database');

class Db {
    // 调用mysql2查询事件
    async query(statement, params) {
        const [result] = await connection.query(statement, params)
        return result
    }
    // 新增方法
    async add(table, data) {
        let fields = [];
        let values = [];
        for (let x in data) {
            fields.push(x);
            values.push(data[x])
        }
        let statement = this.createSQL('add', table, fields);
        const result = await this.query(statement, values)
        return result
    }
    // 删除方法
    async delete(table, where) {
        where = this.where(where);
        let sql = this.createSQL('delete', table, null, where)
        console.log('delete', sql);
        const result = await this.query(sql, [])
        return result
    }
    // 更新方法
    async update(table, data, where) {
        let fields = [];
        let values = [];
        for (let x in data) {
            fields.push(x);
            values.push(data[x]);
        }
        where = this.where(where);
        let sql = this.createSQL('update', table, fields, where);
        console.log('update', sql);
        let result = await this.query(sql, values);
        return result;
    }
    async find(table, fields, where) {
        where = this.where(where);
        let sql = this.createSQL('find', table, fields, where);
        let result = await this.query(sql, []);
        console.log('find', sql);
        if (result.length) {
            return result[0];
        } else {
            return null
        }
    }
    async select(table, fields, where, order = undefined, limit) {
        where = this.where(where);
        (limit && limit.page) ? limit.page = (limit.page - 1) * limit.size: ''
        let sql = this.createSQL('select', table, fields, where, {
            order: order,
            limit: limit
        });
        console.log('sql', sql);
        let result = await this.query(sql, []);
        if (result.length) {
            return result
        } else {
            return {
                result: null
            }
        }


    }
    createSQL(type, table, fields = undefined, where = undefined, options = {}) {
        let statement = '';
        switch (type) {
            case 'add':
                const values = Array.from({
                    length: fields.length
                }).map(v => '?')
                statement = `INSERT INTO ${table} (${fields.join(',')}) VALUES (${values.join(',')})`
                break;
            case 'delete':
                if (where === undefined) return false;
                statement = `DELETE FROM ${table} WHERE ${where}`;
                break;
            case 'update':
                if (where === undefined) return false;
                let saveFields = '';
                fields.forEach(item => {
                    saveFields += (saveFields === '') ? `${item}=?` : `,${item}=?`;
                });
                statement = `UPDATE ${table} SET ${saveFields} WHERE ${where}`
                break;
            case 'find':
                statement = `SELECT ${fields.join(',')} FROM ${table}`;
                if (where) statement += ` WHERE ${where}`;
                break;
            case 'select':
                statement = `SELECT ${fields.join(',')} FROM ${table}`;
                if (where) statement += ` WHERE ${where} `;
                if (options['order']) statement += ` ORDER BY ${options['order'].orderBy} ${options['order'].sort} `;
                if (options['limit']) statement += ` LIMIT ${options['limit'].page},${options['limit'].size} `;
                break;

        }
        return statement
    }
    where(where) {
        let condition = '';
        // 当传入的where是字符串的时
        if (typeof where === 'string') {
            return where
        }
        // 当传入的where不是（数组、对象）类型的时候
        if (typeof where !== 'object') {
            return false
        }
        // 当传入的where是对象、数组类型的时候，循环遍历其子项
        for (let x in where) {
            // 判断其内部第x项是否为对象
            if (typeof where[x] !== 'object') {
                condition += (condition === '') ? ' ' + x + '="' + where[x] + '"' :
                    ((where['logic']) ? where['logic'] : ' AND ') + ' ' + x + '="' + where[x] + '" ';
            } else {
                let logic = where['logic'] ? where['logic'] : 'AND';

                if (where[x][0] == 'between') {
                    condition += (condition === '') ? ` ${x} BETWEEN '${where[x][1][0]}' AND '${where[x][1][1]}' ` :
                        ` ${logic} ${x} BETWEEN '${where[x][1][0]}' AND '${where[x][1][1]}' `
                } else if (where[x][0] !== 'IS' && where[x][0] !== 'IN') {
                    condition += (condition === '') ? ` ${x} ${where[x][0]} '${where[x][1]}' ` :
                        ` ${logic} ${x} ${where[x][0]} '${where[x][1]}' `
                } else {
                    condition += (condition === '') ? ` ${x} ${where[x][0]} ${where[x][1]} ` :
                        ` ${logic} ${x} ${where[x][0]} ${where[x][1]} `
                }
            }
        }
        return condition;
    }
}

module.exports = new Db()