import { createApp } from "vue";
import App from "./App.vue";
import {
  create,
  NButton,
  NDialogProvider,
  NNotificationProvider,
  NMessageProvider,
  NLoadingBarProvider,
  NConfigProvider,
  NForm,
  NFormItem,
  NInput,
  NInputGroup,
  NIcon,
  NA,
} from "naive-ui";

// import "vfonts/Lato.css";
// 等宽字体
// import "vfonts/FiraCode.css";

const naive = create({
  components: [
    NButton,
    NDialogProvider,
    NNotificationProvider,
    NMessageProvider,
    NLoadingBarProvider,
    NConfigProvider,
    NForm,
    NFormItem,
    NInput,
    NInputGroup,
    NIcon,
    NA,
  ],
});

createApp(App).use(naive).mount("#app");
