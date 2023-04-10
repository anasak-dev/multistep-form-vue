<template>
  <div class="px-4 py-5">
    {{ count }}
    <slot :onClick="onClick" />
  </div>
</template>
<script setup>
import { ref } from "vue";

const count = ref(0);
const onClick = (e) => {
  count.value++;
};
const slotClicked = (e) => {
  console.log(e);
};
</script>
