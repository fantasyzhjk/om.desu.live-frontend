<script setup lang="ts">
import { ref, onMounted } from "vue";
import { FormInst, darkTheme } from "naive-ui";
import { time, download, cache } from "@/api";
import { AppProvider } from "@/components/Application";
import { SearchOutline } from "@vicons/ionicons5";
import { useLoadingBar } from "naive-ui";

const loadingBar = useLoadingBar();
const urlRegexFull = /^(?:https:\/\/)?osu.ppy.sh\/beatmapsets\/(?<sid>\d*)/;
const urlRegexShort =
  /^(?:https:\/\/)?osu.ppy.sh\/(?:(?:s\/(?<sid>\d*))|(?:b\/(?<bid>\d*)))/;
const searchInput = ref("");
const searchValStatus = ref("");
const searchValFeedback = ref("");
const backendDown = ref(true);

function handleValidateSearch(e: MouseEvent) {
  e.preventDefault();
  loadingBar.start();
  searchValStatus.value = "";
  searchValFeedback.value = "";
  if (backendDown) {
    loadingBar.error();
    return;
  }
  let input = searchInput.value;
  let m;
  if ((m = urlRegexFull.exec(input)) !== null) {
    DownloadBeatmap(m.groups["sid"]);
  } else if ((m = urlRegexShort.exec(input)) !== null) {
    DownloadBeatmap(m.groups["sid"], m.groups["bid"]);
  } else if (/^\d.*$/.test(input)) {
    DownloadBeatmap(input);
  } else {
    searchValStatus.value = "warning";
    searchValFeedback.value = "获取失败，请输入正确的链接或者sid";
    loadingBar.error();
    return;
  }
}

function DownloadBeatmap(sid?: string, bid?: string) {
  const requestJson = {
    verify: new Date().getTime(),
  };
  if (sid) {
    requestJson["beatmapsetid"] = sid;
  } else if (bid) {
    requestJson["beatmapid"] = bid;
  } else {
    return false;
  }
  searchValFeedback.value = "正在获取铺面信息..";
  download(requestJson)
    .then((data) => {
      if (data["code"] === 404) {
        cache(requestJson)
          .then((data) => {
            switch (data["code"]) {
              case 201:
                DownloadBeatmap(sid, bid);
                break;
              case 202:
                searchValStatus.value = "warning";
                searchValFeedback.value = `该铺面已经在缓存了(缓存进度: ${data["message"]})，请稍后再试`;
                loadingBar.finish();
                break;
              case 403:
                searchValStatus.value = "error";
                searchValFeedback.value = "获取铺面失败，请检查输入是否正确";
                loadingBar.error();
                break;
              default:
                searchValStatus.value = "error";
                searchValFeedback.value = "缓存铺面时发生未知错误，请稍后再试";
                loadingBar.error();
                break;
            }
          })
          .catch(() => {
            searchValStatus.value = "error";
            searchValFeedback.value = "缓存铺面超时，请稍后再试";
            loadingBar.error();
          });
      } else if (data["code"] === 200) {
        window.location.href = "http://om1.desu.life" + data["message"];
        searchValFeedback.value = "获取铺面成功..开始下载";
        loadingBar.finish();
        setTimeout(() => {
          searchValFeedback.value = "";
        }, 5000);
      } else {
        searchValStatus.value = "error";
        searchValFeedback.value = "获取铺面失败，请稍后再试";
        loadingBar.error();
      }
    })
    .catch(() => {
      searchValStatus.value = "error";
      searchValFeedback.value = "获取铺面失败，请稍后再试";
      loadingBar.error();
    });
}

function getBackendStatus() {
  time()
    .then((result) => {
      console.log("正在获取API状态..");
      if (result["code"] === 200) {
        console.log("获取成功, API状态正常");
        backendDown.value = false;
      } else {
        console.log("获取成功, API状态异常");
        searchValStatus.value = "error";
        searchValFeedback.value = "后端状态异常, 请稍后再试";
        backendDown.value = true;
      }
    })
    .catch((err) => {
      console.log("获取失败, API状态异常");
      searchValStatus.value = "error";
      searchValFeedback.value = "后端状态异常, 请稍后再试";
      backendDown.value = true;
    });
}

onMounted(() => {
  getBackendStatus();
});
</script>

<template>
  <div class="main">
    <n-form class="searchForm">
      <n-form-item :validation-status="searchValStatus">
        <n-input-group>
          <n-input
            size="large"
            round
            placeholder="在此输入链接或者铺面sid"
            v-model:value="searchInput"
            autofocus
            :readonly="backendDown"
            @keydown.enter.prevent="backendDown"
          >
            <template #prefix>
              <n-icon :component="SearchOutline" />
            </template>
          </n-input>
          <n-button
            size="large"
            round
            type="primary"
            @click="handleValidateSearch"
            :disabled="backendDown"
          >
            下载
          </n-button>
        </n-input-group>
        <template #feedback>
          {{ searchValFeedback }}
        </template>
      </n-form-item>
    </n-form>
  </div>
</template>

<style lang="scss">
.searchForm {
  min-width: 500px;
  text-align: left;
  .n-input {
    background-color: rgba(0, 0, 0, 0.5) !important;
  }
}

.main {
  position: fixed;
  top: 50%;
  left: 50%;
  text-align: center;
  justify-content: center;
  display: flex;
  z-index: 1;
  transform: translate(-50%, -200%);
}
</style>