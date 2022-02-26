<script setup lang="ts">
import { FormInst, darkTheme } from "naive-ui";
import { AppProvider } from "./components/Application";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <AppProvider>
      <n-layout>
        <n-layout-header></n-layout-header>
        <n-layout-content>
          <Main />
        </n-layout-content>
        <n-layout-footer>
          <Footer />
        </n-layout-footer>
      </n-layout>
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
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  background-image: url("/images/bg.png");
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  backdrop-filter: brightness(0.8);
  -webkit-backdrop-filter: brightness(0.8);
}
</style>
