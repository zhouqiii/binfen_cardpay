<template>
  <div class="dialog">
    <div class="dialog_box">
      <div class="dialog_content">
        <div class="text_rule padd"><div v-html="content"></div></div>
        <div class="dialog_btn_group" v-show="!ifPhone" @click="dialogHide">
          <div class="btn cancel_btn">知道了</div>
        </div>
        <div class="dialog_btn_group" v-show="ifPhone">
          <div class="btn cancel_btnphone" @click="dialogHide">取消</div>
          <div class="btn change_btn" @click="goClient">前往更换手机号</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { callAppMethod } from "@/utils/commonFn";

export default {
  name: 'DialogMessage',
  data() {
    return {
      title: '',
      content: '',
      data:{},
      ifPhone:false,//用来标识是更换手机号的弹框，还是其他弹框
      ifAccount:false,//用来标识，当是发送请求出现超时或多账号登录给的弹框提示，因为这一步需要与客户端交互

    };
  },
  methods: {
    goClient() {
      const that=this
      callAppMethod({
          callName: "intentToOtherCardInfo",
          parameters: that.data,
      });
      that.remove();
    },
    dialogHide() {
      if(this.ifAccount){
          callAppMethod({
              callName: "clearLoginInfo",
          });
          callAppMethod({
              callName: "toLogin",
          });
       }
      this.remove();
    },
  },
  created(){
    this.$nextTick(()=>{
      // console.log(this.data,this,this.ifPhone,this.ifAccount)
    })
  }

};
</script>
<style lang="less" scoped>
  .flex_center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dialog {
    width: 100vw;
    height: 100vh;
    position: fixed;
    flex-direction:column;
    top: 0;
    left: 0;
    z-index: 11;
    background: rgba(0, 0, 0, 0.6);
    .flex_center;
    .dialog_box {
      width: 560px;
      background: #ffffff;
      border-radius: 10px;
      overflow-y: hidden;
      .dialog_content {
        min-height: 30px;
        -webkit-overflow-scrolling:touch;  //解决滑动不顺畅
        &::-webkit-scrollbar {   //隐藏滚动条
          display: none;
        }
        word-break: break-all;
        display: inline-block;
        width: 100%;
        .padd{
          height: auto;
          white-space: -moz-pre-wrap; /*Mozilla,since1999*/
          white-space: -pre-wrap; /*Opera4-6*/
          white-space: -o-pre-wrap; /*Opera7*/
          word-wrap: break-word; /*InternetExplorer5.5+*/
          font-size: 14px;
          color: #333333;
          font-family: inherit;
          padding: 60px 32px;
          line-height: 42px;
        }
        .dialog_btn{
          padding: 0 54px 40px 54px;
          height:78px;
          line-height: 78px;
          .applyBtn{
            text-align: center;
            border-radius: 4px;
            margin: auto;
          }
          .comfirmbtn{
            background: rgba(102, 153, 255, 1);
            color: #ffffff;
            font-size: 16px;
          }
          .active{
            width: 30%;
          }
        }
        .dialog_btn_group {
          height: 90px;
          line-height: 90px;
          border-top: 1px solid #F5F5F5;
          text-align: center;
          .flex_center;
          .cancel_btn,.cancel_btnphone,.change_btn{
             font-size: 15px;
             flex: 1 1 50%;
             height: 100%;
          }
          .cancel_btnphone{
            border-right: 1px solid #F5F5F5;
          }
          .change_btn,.cancel_btn{
             color: #F72539;
          }
        }
      }
    }
    .dialog_icon{
      font-size: 19px;
      margin: 32px;
    }
  }
</style>
