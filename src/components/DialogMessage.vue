<template>
  <div class="dialog">
    <div class="dialog_box">
      <div class="dialog_content">
        <div class="text_rule padd"><div v-html="content"></div></div>
        <!-- <div class="dialog_btn padd" v-show="ifPhone">
          <div class="applyBtn comfirmbtn" @click="goClient">前往更换手机号</div>
        </div> -->
        <div class="dialog_btn_group" @click="dialogHide">
          <div class="btn cancel_btn">知道了</div>
        </div>
      </div>
    </div>
    <!-- <div class="dialog_icon" @click="dialogHide" v-show="ifPhone">
      <svg-icon iconClass="cancelOl" class="stateIcon"></svg-icon>
    </div> -->
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
      data:{}
    };
  },
  methods: {
    goClient() {
      callAppMethod({
          callName: "intentToOtherCardInfo",
          parameters: this.data,
      });
    },
     dialogHide() {
      this.remove();
    },
  },

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
          padding: 60px 32px;
          height: auto;
          white-space: -moz-pre-wrap; /*Mozilla,since1999*/
          white-space: -pre-wrap; /*Opera4-6*/
          white-space: -o-pre-wrap; /*Opera7*/
          word-wrap: break-word; /*InternetExplorer5.5+*/
          line-height: 42px;
          font-size: 14px;
          color: #333333;
          font-family: inherit;
        }
        .dialog_btn{
          padding: 0 32px 60px 32px;
          height:70px;
          font-size: 14px;
          line-height: 70px;
          .applyBtn{
            width: 80%;
            text-align: center;
            border-radius: .3rem;
            margin: auto;
          }
          .comfirmbtn{
            background: rgba(102, 153, 255, 1);
            color: #ffffff;
            font-size: 14px;
          }
          .active{
            width: 30%;
          }
        }
        .dialog_btn_group {
          height: 90px;
          border-top: 1px solid #F5F5F5;
          .flex_center;
          .cancel_btn{
             font-size: 15px;
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
