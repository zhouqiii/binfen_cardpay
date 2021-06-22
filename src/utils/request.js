import axios from "axios";

// 引入Loading组件和添加dom的方法
// import createDom from "@/utils/createDom"
// import Loading from '@/components/Loading.vue'
// import {
//     getParamsFromUrl,
//     isMobile
// } from "@/utils/commonFn";
export const req = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "https://www.alex188.cn/App" : "/App",//AppPrj
    timeout: 15000,
    // params: {
    //     // txnId: isMobile()+"SIGN00003",
    //     // imei: getParamsFromUrl("imei") || "123",
    //     // dns:process.env.NODE_ENV === "development" ? "206" : "206",//生产环境是206
    // },
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
    // console.log(config);
    // 发送请求之前添加loading效果
    //ld = createDom(Loading)
    return config
}, err => {
    console.log(err)
})
req.interceptors.response.use(res => {
    // console.log(res)
    //ld.hide();
    if (res.status === 200) {
        if (res.data.stat === '01' || res.data.code === '-501') {
            const mymessage = confirm('您已经超时，请重新登录');
            if (mymessage === true) {
                callAppMethod({
                    callName: "clearLoginInfo",
                });
                callAppMethod({
                    callName: "toLogin",
                });
            }
        } else if(res.data.stat === '02') {
            const mymessage = confirm('发现您的账户在其他设备登录，如非本人操作请尽快更改您的登录密码。');
            if (mymessage === true) {
                callAppMethod({
                    callName: "clearLoginInfo",
                });
                callAppMethod({
                    callName: "toLogin",
                });
            }
        } else if (res.data.code === '-505') {
            const mymessage = confirm(`${res.data.result}`);
            if (mymessage === true) {
                callAppMethod({
                    callName: "clearLoginInfo",
                });
                callAppMethod({
                    callName: "toLogin",
                });
            }
        } else {
            return res.data
        }
    }
    return res
}, err => {
    //ld.hide();
    console.log(err)
})