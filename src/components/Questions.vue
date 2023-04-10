<template>
  {{ answers }}
  <li v-for="answer in answers">
    {{ answer.answerNumber }}
  </li>
  <ul ref="slideContainer" class="flex overflow-hidden">
    <li v-for="question in questions">
      <div>{{ question.text }}</div>
      <div class="actions flex gap-5 items-center justify-center">
        <div
          v-for="(action, index) in question.actions"
          @click="(e) => actionClicked(e)"
          :key="action"
        >
          <label :for="question.text"> </label>
          <input
            type="radio"
            :name="question.text"
            :value="action"
            @change="(e) => answered(e)"
          />
          {{ action }}
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { tns } from "tiny-slider";
const slideContainer = ref();
onMounted(() => {
  console.log(slideContainer.value);
  const slider = tns({
    container: slideContainer.value,
    autoHeight: true,

    items: 1,
    loop: false,
    slideBy: 1,
    mouseDrag: true,
    swipeAngle: false,
    speed: 400,
  });
});
const actionClicked = (e) => {
  console.log(e.target.innerHTML);
};
const answers = ref([]);
const questions = ref([
  { text: "Question #1", actions: ["yes", "no"] },
  { text: "Question #2", actions: ["yes", "no"] },
  { text: "Question #3", actions: ["yes", "no"] },
  { text: "Question #4", actions: ["yes", "no"] },
  { text: "Question #5", actions: ["yes", "no"] },
]);
const answered = (e) => {
  const answeredClicked = e.target.value;
  const clickedQuestion = e.target.parentNode
    .querySelector("label")
    .getAttribute("for");
  //   if (answers.value.length <= 0) {
  //     if (
  //       answers.value.filter((answer) => answer.answerNumber == answeredClicked)
  //     ) {
  //       return;
  //     }
  const found = answers.value.some((el) => el.answerNumber === answeredClicked);
  if (found) {
    return;
  }
  answers.value.push({
    answerNumber: clickedQuestion,
    answerAction: answeredClicked,
  });
  //   }
};
</script>
<style>
#tns1-iw {
  overflow: hidden;
}
</style>
