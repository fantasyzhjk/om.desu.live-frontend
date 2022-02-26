

<template>
  <div class="footer">
    <n-a href="https://info.desu.life/">desu.life资讯站</n-a> |
    <n-a href="https://mail.desu.life/">邮箱</n-a> |
    <n-a href="http://beian.miit.gov.cn/">陕ICP备2021013528号-2</n-a>
    <br />
    Copyright 2020-现在 <n-a href="https://desu.life/">desu.life</n-a>
  </div>
</template>

<style lang="scss">
.footer {
  position: fixed;
  top: 100vh;
  left: 50%;
  text-align: center;
  justify-content: center;
  transform: translate(-50%, -150%);

  .n-a {
    --n-text-color: #ffffffD1 !important;
    text-decoration: none;
    
  }
}
</style>