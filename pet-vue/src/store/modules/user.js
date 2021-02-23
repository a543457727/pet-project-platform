import API from 'api/Login'
import router from '../../router'
const defaultState = () => {
    return {
        id: '',
        shop: [],
        currentShop: "",
        avatar: ""
    }
}

const state = defaultState()

const mutations = {
    SET_ID: (state, id) => {
        state.id = id
    },
    SET_SHOP: (state, shop) => {
        state.shop = shop
    },
    SET_CURRENTSHOP: (state, shopId) => {
        state.currentShop = shopId
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    }
}

const actions = {
    async getUserInfo({
        commit,
        state
    }) {
        const res = await API.getUserInfo();
        if (!res.code) {
            commit('SET_ID', res.id);
            commit('SET_SHOP', res.shop)
            if (res.shop.length > 0) {
                const shopId = sessionStorage.getItem('shopId')
                if (shopId) {
                    commit('SET_CURRENTSHOP', shopId)
                    const mes = state.shop.find(v => v.shopId == shopId)
                    commit('SET_AVATAR', mes.avatar || "");
                } else {
                    sessionStorage.setItem('shopId', (res.shop[0].shopId))
                    commit('SET_CURRENTSHOP', sessionStorage.getItem('shopId'));
                    commit('SET_AVATAR', res.shop[0].avatar);
                }
            } else {
                this.$message.error('暂无店铺,请先绑定店铺')
                router.push('/shop/index')
            }
        } else {
            router.push('/login')
            this.$message.error(res.msg)
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}