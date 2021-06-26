const { request } = require("./request");

function post(url, params) {
    return request({
        url,
        data: {},
        params,
        method: 'post'
    })
}
export const getVerCode = (data) => {
    return post('/cgi.do', data)
}

export const sendSign = (data) => {
    return post('/cgi.do', data)
}