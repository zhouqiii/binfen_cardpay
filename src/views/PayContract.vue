<template>
    <div>
        <common-header :type="type" :title="title"></common-header>
        <div class="content">
            <div class="message_input">
                <van-cell-group>
                    <van-cell :title="cardTitle" :value="cardNum" value-class='phoneNum'/>
                    <van-cell title="手机号" value-class='phoneNum'>
                        <template slot:value>
                            <span>{{phoneNum}}</span>
                            <div class="phone_img" @click="showDialog" v-show="count==='1'"></div>
                        </template>
                    </van-cell>
                </van-cell-group>
                <van-form>
                    <van-field v-model="verCode"
                        label="验证码"
                        class="codeWidth"
                        placeholder="请输入验证码"
                        type="number"
                        onkeyup="this.value=this.value.replace(/[^0-9]/g,'')"
                        maxlength='6'
                    >
                        <template #button>
                            <van-button class="checkNum"
                                @click.prevent="timeStart()"
                                :disabled="btnChangeEnable"
                                plain
                                :class="{active:changeColor}"
                            >
                                {{btnText}}
                            </van-button>
                        </template>
                    </van-field>
                </van-form>
            </div>
            <div class="btn_part padd">
                <van-button
                    :color="submitBgColor"
                    block 
                    class="formssi_btn" 
                    :disabled="btnIfSubmit"
                    @click="signUp"
                >确定</van-button>
            </div>
            <div class="message padd">
                <div>温馨提示：</div>
                <div>1、为保障您的还款权益，请完善签约。</div>
                <div>2、预留手机号为您在他行预留的手机号，如有变更可前往【卡片管理】更新。</div>
            </div>
        </div>
    </div>
</template>
<script>
import '../style/paycontract.less'
import Loading from '@/components/Loading.vue'
import createDomLoading from "@/utils/createDom"
import { getVerCode, sendSign } from '@/utils/commonInterface'
import { callAppMethod, notNull, CreateDom,isMobile, getParamsFromUrl} from "@/utils/commonFn";

const TIME_COUNT = 60;
export default {
    name:'PayContract',
    data(){
        return{
            count:'0',//用来标识，当卡信息获取成功count=1，对验证码输入框的监听和修改手机号的入口才成立，
            //否则不监听因为信息获取失败，确定按钮一定不可以点击，也不可以去修改手机号
            type:'0',//lastGoback
            title:'签约',
            cardNum:'',//卡号
            phoneNum:'',//手机号
            verCode:'',//验证码
            btnChangeEnable: false,//验证码计时内是否可点击
            btnText: '获取验证码',
            timer: null,
            changeColor:false,//计时器文字的颜色更改
            submitBgColor:'#F72539',//确认按钮背景颜色设置，防止修改
            btnIfSubmit:false,//是否可以提交
            info:{},//用来存放获取的卡信息
            cardTitle:'卡\xa0\xa0\xa0号'
        }
    },
    methods:{
        //从客户端拿到卡信息后赋值
        assign(data) {
            if (notNull(data)) {
                if (typeof data === 'string') {
                    data=JSON.parse(data)
                }
                if (!notNull(data.cardAlias) || !notNull(data.phoneNo) || !notNull(data.cardShow)) {
                    CreateDom(`<div style="text-align:center;">卡信息获取失败，请返回重试！</div>`)
                    this.btnChangeEnable = true
                    this.count='0'
                    this.btnIfSubmit=true
                } else {
                    this.count='1'
                    this.info = data
                    this.cardNum = data.cardShow//卡号
                    this.phoneNum = data.phoneNo//手机号
                }
            }
        },
        // 点击按钮触发发送验证码计时器
        timeStart() {
            this.sendVerCode()
            if (!this.timer) {
                this.countdown = TIME_COUNT;
                this.btnChangeEnable = true;
                this.changeColor=true
                this.btnText = `${this.countdown}s后重发`;
                this.timer = setInterval(() => {
                    if (this.countdown > 0 && this.countdown <= TIME_COUNT) {
                        this.btnChangeEnable = true;
                        this.changeColor=true
                        this.countdown -= 1;
                        this.btnText = `${this.countdown}s后重发`;
                    } else {
                        this.btnChangeEnable = false;
                        this.changeColor=false
                        this.btnText = '获取验证码';
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000);
            }
        },
        //发送验证码接口
        sendVerCode() {
            const data =  {
                gtype: '9',
                attest: '-339418059',
                imei: getParamsFromUrl("imei") || "123456",
                txnId: isMobile() + 'SIGN00003',
                cardAlias: this.info.cardAlias,
            }
            getVerCode(data).then((res)=>{
                if (JSON.parse(res.data).stat === '00') {
                    console.log('验证码发送成功')
                }
            })
        },
        //更换手机号弹框
        showDialog() {
            const ifPhone = true
            CreateDom(`
                <div style="text-align:center;font-size:16px;line-height:32px;font-weight:600">温馨提示</div>
                <div>手机号为您在发卡行预留的手机号，如有修改，请前往【卡片管理】更新后再签约。</div>
                    ` ,
                this.info,
                ifPhone
            )

        },
        //签约按钮
        signUp(){
            let ld=createDomLoading(Loading)
            if(!this.verCode || this.verCode.length !== 6) {
                ld.hide()
                CreateDom(`<div style="text-align:center">请输入6位短信验证码</div>`)
            } else {
                const data = {
                    gtype: '9',
                    attest: '-339418059',
                    imei: getParamsFromUrl("imei") || "123456",
                    txnId: isMobile() + 'SIGN00004',
                    smsCode: this.verCode
                }
                sendSign(data).then((res) => {
                    ld.hide()
                    if (res.code === '00') {
                        const stat=JSON.parse(res.data).stat
                        const result=JSON.parse(res.data).result
                        if(stat === '00'){
                            callAppMethod({
                                callName: "lastGoBack",
                            });
                        }else if(stat==='01'){
                            CreateDom(`<div style="text-align:center">您已经超时，请重新登录</div>`,
                                {},
                                !ifAccount,
                                ifAccount
                            )
                        }else if(stat==='02'){
                            CreateDom(`<div style="text-align:center">发现您的账户在其他设备登录，如非本人操作请尽快更改您的登录密码。</div>`,
                                {},
                                !ifAccount,
                                ifAccount
                            )
                        }else{
                            let message = '签约失败，请重试！'
                            if (result) {
                                message = result
                            }
                            CreateDom(`<div style="text-align:center">${message}</div>`)
                        }
                    } else if(res.code !== '-501'  && res.code !== '-505'){
                        let message = '签约失败，请重试！'
                        if (JSON.parse(res.data).result) {
                            message = JSON.parse(res.data).result
                        }
                        CreateDom(`<div style="text-align:center">${message},请重试！</div>`)
                    }
                })
                .catch(() => {
                    ld = null
                    CreateDom(`<div style="text-align:center">请求失败,请重试！</div>`)
                });
            }
        },
    },
    created(){
        this.$nextTick(()=>{
            const that=this
            callAppMethod({
                callName: "sendCardInfo",
                callback: function(data){
                    that.assign(data)
                }
            });
           //that.assign({cardAlias:'ahldsk',cardShow:'6879 **** **** 8969',phoneNo:'136 **** 8899'})
        })
    }
}
</script>
<style scoped>
</style>
