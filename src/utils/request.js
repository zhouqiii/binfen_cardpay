import axios from "axios";

// 引入Loading组件和添加dom的方法
import createDom from "@/utils/createDom"
import Loading from '@/components/Loading.vue'
import {
    getParamsFromUrl,
    isMobile
} from "@/utils/commonFn";
export const req = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "https://www.alex188.cn/App" : "/App",//AppPrj
    timeout: 15000,
    params: {
        // txnId: isMobile()+"SIGN00003",
        // imei: getParamsFromUrl("imei") || "123",
        // dns:process.env.NODE_ENV === "development" ? "206" : "206",//生产环境是206
    },
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
        if (notNull(res.data)) {

        }
        return res.data
    }
    return res
}, err => {
    //ld.hide();
    console.log(err)
})