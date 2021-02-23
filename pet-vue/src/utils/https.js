import service from "@/utils/request.js";
const https = {
    get(url, params) {
        const config = {
            method: "get",
            url: url
        };
        if (params) config.params = params;
        return service.network(config);
    },
    post(url, params) {
        const config = {
            method: "post",
            url: url
        };
        if (params) config.data = params;
        return service.network(config);
    },
    put(url, params) {
        const config = {
            method: "put",
            url: url
        };
        if (params) config.data = params;
        return service.network(config);
    },
    patch(url, params) {
        const config = {
            method: "patch",
            url: url
        };
        if (params) config.data = params;
        return service.network(config);
    },
    DELETE(url, params) {
        const config = {
            method: "delete",
            url: url
        };
        if (params) config.data = params;
        return service.network(config);
    },
    delete(url, params) {
        const config = {
            method: "delete",
            url: url
        };
        if (params) config.params = params;
        return service.network(config);
    },
    getFileRaw(url, params) {
        const config = {
            method: "get",
            url: url
        };
        if (params) config.params = params;
        config.responseType = 'blob'
        return service.network(config);
    }
};

export default https