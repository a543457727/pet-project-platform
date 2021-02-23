import request from '@/utils/request';
const baseURL = 'http://127.0.0.1:8888'

const https = {
    post: (url, data) => {
        const config = {
            method: 'POST',
            url: baseURL + url
        }
        if (data) {
            config.data = data
        }
        return request(config)
    }
}

export default https