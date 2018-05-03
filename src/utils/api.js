import axios from 'axios'
import qs from 'qs'

const http = axios.create({
    // baseURL: 'http://api-test.matixiang.com',
    timeout: 1000,
    headers: {  
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
        return qs.stringify(data)
    }
    ],
    paramsSerializer: function (data) {
        return qs.stringify(data)
    }
})
export default http
