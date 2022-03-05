<script setup lang="ts">
import { createTheme, inputDark, buttonDark, loadingBarDark, formDark } from "naive-ui";
import { AppProvider } from "./components/Application";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";

const darkTheme = createTheme([inputDark, buttonDark, loadingBarDark, formDark])

</script>

<template>
  <n-config-provider :theme="darkTheme">
    <AppProvider>
      <Main />
      <Footer />
    </AppProvider>
  </n-config-provider>
</template>

<style lang="scss">
#app,
body,
html {
  height: 100%;
}

body {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
  line-height: 1.5;
  color: #ffffff;
  font-size: 14px;
  background-color: #000;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}
</style>
