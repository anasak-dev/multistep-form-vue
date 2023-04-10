<script setup>
import StateInput from "./components/StateInput.vue";
import Questions from "./components/Questions.vue";
import TestingList from "./components/TestingList.vue";
import { clicked } from "./components/clicked";
</script>

<template>
  <!-- <TestingList class="bg-black text-white">
    <!-- <template #default><li>Hello this is a test</li></template> -->
    <template v-slot="{ onClick }">
      <li @click="(e) => onClick(e)">What's up</li>
      <li @click="(e) => onClick(e)">What's up</li>
      <li @click="(e) => onClick(e)">What's up</li>
      <li @click="(e) => onClick(e)">What's up</li>
    </template>
  </TestingList> -->
  <Questions />
  <StateInput name="Anas Ahmed Khan Niazi"></StateInput>
</template>

<style>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
li {
  list-style-type: none;
}
</style>
