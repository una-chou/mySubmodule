<template>
  <router-view />
</template>
<script lang="ts" setup>
</script>

<style lang="scss">
#app {
  text-align: center;
  color: #2c3e50;
  height: 100%;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
* {
  margin: 0;
}
html,
body {
  font-family: 'PingFang SC', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  input,
  button,
  textarea,
  pre {
    font-family: 'PingFang SC', sans-serif !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
:root {
  --van-overlay-background-color: rgba(0, 0, 0, 0.5);
  --van-toast-max-width: calc(100% - 40px) !important;
}

* {
  &::-webkit-scrollbar {
    width: 6px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-track {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    width: 6px;
    background: rgba(196, 196, 196, 0.4) !important;
    border-radius: 10px;
  }
}

.van-toast {
  z-index: 99999 !important;
}

.gt-button.is-gradient:focus,
.gt-button.is-gradient:hover {
  opacity: 1 !important;
}

.gt-button.is-gradient.is-plain {
  span {
    color: #ff0e6a !important;
  }
}
.gt-button.is-gradient.is-plain.is-disabled {
  span {
    opacity: 0.6;
  }
}
.el-button--primary {
  border: none;
  background-color: #ed2e79;
}
.el-button--primary.is-plain {
  border: 1px solid #ed2e79;
  background-color: #fff;
}
</style>
