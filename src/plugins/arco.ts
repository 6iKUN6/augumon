import { defineNuxtPlugin } from "#app";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import {
  IconExperiment,
  IconApps,
  IconRobot,
  IconShareAlt,
  IconHeart,
  IconStar,
  IconCopy,
  IconEye,
  IconHome,
  IconUser,
  IconSetting,
  IconFile,
  IconCloud,
  IconImage,
  IconCalendar,
  IconMessage,
  IconNotification,
  IconSearch,
  IconPlus,
  IconDelete,
  IconDownload,
  IconSend,
  IconAttachment,
  IconVoice,
} from "@arco-design/web-vue/es/icon";

//arco 组件库
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ArcoVue);

  // 注册组件
  nuxtApp.vueApp.component("AIconExperiment", IconExperiment);
  nuxtApp.vueApp.component("AIconApps", IconApps);
  nuxtApp.vueApp.component("AIconRobot", IconRobot);
  nuxtApp.vueApp.component("AIconShareAlt", IconShareAlt);
  nuxtApp.vueApp.component("AIconHeart", IconHeart);
  nuxtApp.vueApp.component("AIconStar", IconStar);
  nuxtApp.vueApp.component("AIconCopy", IconCopy);
  nuxtApp.vueApp.component("AIconEye", IconEye);
  nuxtApp.vueApp.component("AIconHome", IconHome);
  nuxtApp.vueApp.component("AIconUser", IconUser);
  nuxtApp.vueApp.component("AIconSetting", IconSetting);
  nuxtApp.vueApp.component("AIconFile", IconFile);
  nuxtApp.vueApp.component("AIconCloud", IconCloud);
  nuxtApp.vueApp.component("AIconImage", IconImage);
  nuxtApp.vueApp.component("AIconCalendar", IconCalendar);
  nuxtApp.vueApp.component("AIconMessage", IconMessage);
  nuxtApp.vueApp.component("AIconNotification", IconNotification);
  nuxtApp.vueApp.component("AIconSearch", IconSearch);
  nuxtApp.vueApp.component("AIconPlus", IconPlus);
  nuxtApp.vueApp.component("AIconDelete", IconDelete);
  nuxtApp.vueApp.component("AIconDownload", IconDownload);
  nuxtApp.vueApp.component("AIconSend", IconSend);
  nuxtApp.vueApp.component("AIconAttachment", IconAttachment);
  nuxtApp.vueApp.component("AIconVoice", IconVoice);
});
