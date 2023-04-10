import { createApp } from "vue/dist/vue.esm-bundler";
import "./style.css";
import "./index.css";
import App from "./App.vue";
import StateInput from "./components/StateInput.vue";
createApp(App).mount("#app");

// createApp({
//   components: {
//     TestingList,
//   },
// }).mount("#app");
