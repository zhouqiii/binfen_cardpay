import axios from "axios";

// 添加CreateDom的方法
import { CreateDom } from "@/utils/commonFn";
export const req = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "https://www.alex188.cn/AppPrj4" : "/AppPrj4",//AppPrj
    timeout: 15000,
    withCredentials: true
})
export const request = ({ url = "", data = {}, params = {}, method = "post" } = {}) => {
    return req({
        url,
        data,
        params,
        method
    })
}
// ld为存放loading组件的变量，下边要用到组件里的方法，以及创建dom时添加到组件上的方法
//let ld;
req.interceptors.request.use(config => {
    return config
}, err => {
    console.log(err)
})
req.interceptors.response.use(res => {
    if (res.status === 200) {
        const ifAccount = true
        if (res.data.code === '-501' || res.data.code === '-505') {
            CreateDom(`<div style="text-align:center">${res.data.message}!请重新登录</div>`,
                {},
                !ifAccount,
                ifAccount
            )
        } else if (res.data.code === '00') {
            const stat = JSON.parse(res.data.data).stat
            if (stat === '01') {
                CreateDom(`<div style="text-align:center">您已经超时，请重新登录</div>`,
                    {},
                    !ifAccount,
                    ifAccount
                )
            } if (stat === '02') {
                CreateDom(`<div style="text-align:center">发现您的账户在其他设备登录，如非本人操作请尽快更改您的登录密码。</div>`,
                    {},
                    !ifAccount,
                    ifAccount
                )
            }
            return res.data
        }
        return res.data
    }
    return res
}, err => {
    console.log(err)
    CreateDom(`<div style="text-align:center">系统异常,请重试！</div>`)
})