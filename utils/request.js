const request = (url, options) => {
    return new Promise((resolve, reject) => {
        let header = ''
        if (options.data.token!==undefined) {
            header = {
                'Authorization': `Bearer ${options.data.token}`,
                'content-type': options.isObj ? 'application/json' : 'application/x-www-form-urlencoded',
            }
            delete options.data.token
        } else {
            header = {
                'content-rtype': options.isObj ? 'application/json' : 'application/x-www-form-urlencoded',
            }
        }
        wx.request({
            // staging-
            url: `https://ywtg-applet.bjzelr.com${url}`,
            // url: `https://caigou.ezhongbiao.com/v1/api${url}`,
            method: options.method,
            data: options.data,
            header: header,
            success(request) {
                resolve(request)
                // if (request.data.code == 0) {
                //     resolve(request)
                // } else {
                //     reject(request)
                // }
            },
            fail(error) {
                console.log(error);
                reject(error.data)
            },
            complete: () => {
            }
        })
    })
}

const get = (url, options = {}) => {
    return request(url, {
        method: 'GET',
        data: options
    })
}

//post对象
const postObj = (url, options) => {
    return request(url, {
        method: 'POST',
        data: options,
        isObj: true
    })
}
//post参数
const post = (url, options) => {
    return request(url, {
        method: 'POST',
        data: options,
        isObj: false
    })
}

const put = (url, options) => {
    return request(url, {
        method: 'PUT',
        data: options
    })
}

// 不能声明DELETE（关键字）
const remove = (url, options) => {
    return request(url, {
        method: 'DELETE',
        data: options
    })
}

module.exports = {
    get,
    post,
    put,
    remove,
    postObj
}