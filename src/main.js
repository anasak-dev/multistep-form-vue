import { createApp } from "vue/dist/vue.esm-bundler";
import "./index.css";
import QuestionSlider from "./components/QuestionSlider.vue";
createApp({
  components: {
    QuestionSlider,
  },
}).mount("#app");
