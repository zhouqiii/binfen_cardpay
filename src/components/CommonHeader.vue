<template>
  <div class="commonHeader">
    <div class="main">
      <div class="left">
        <slot name="back">
          <div class="back_img" @click="back"></div>
        </slot>
      </div>
      <div class="center">
        <div>{{title}}</div>
      </div>
      <div class="right">
        <slot name="icon1"></slot>
        <slot name="icon2"></slot>
        <!-- 用户自定义 -->
        <slot name="custom"></slot>
      </div>
    </div>
    <div class="blank"></div>
  </div>
</template>

<script>
import { callAppMethod } from "@/utils/commonFn";
export default {
  name: "commonHeader",
  data() {
    return {
    };
  },
  props: {
    // type的值：
    // "0":调用客户端的lastGoBack方法，关闭加载H5的webview
    // "1":返回当前项目的上级页面
    // "3":跳转到当前项目的指定页面
    type: {
      type: String,
      default: "0",
    },
    title:{
      type: String,
      default: '签约'
    }
  },
  methods: {
    back() {
        callAppMethod({
            callName: "lastGoBack",
        });
    },
  },
};
</script>

<style lang="less" scoped>
@import '../style/mixin.less';
.commonHeader {
  .main,
  .blank {
    height: 88px;
    padding-top: env(safe-area-inset-top) !important;
    padding-top: constant(safe-area-inset-top) !important;
  }
  .main {
    width: 686px;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;
    border-bottom: 1px solid #f5f5f5;
    box-sizing: content-box;
    background: #fff;
    .left,
    .right{
      flex: 0 0 180px;
      height: 100%;
    }
    .left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .back_btn {
        width: 20px;
        height: 32px;
      }
      .back_img{
        width: 44px;
        height: 44px;
        .bg-image('back');
        display: inline-block;
        background-size: 44px 44px;
        background-repeat: no-repeat;
        vertical-align: top;
      }
    }
    .center {
      font-size: 18px;
      font-weight: 600;
    }
    .right {
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
  .blank {
  }
}
</style>