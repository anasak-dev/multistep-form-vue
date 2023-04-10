<template>
  <div
    style="position: relative"
    class="py-4 px-2 relative bg-gray-800 text-white h-[100vh] flex flex-col"
  >
    <input type="hidden" name="dataToSend" v-model="selectedStates" />
    {{ selectedStates }}
    {{ searchState() }}
    <div class="flex flex-col items-center">
      <span v-if="selectedItem" class="text-white"> </span>
      <input
        type="text"
        class="px-4 py-2 text-white rounded-md bg-black border-gray-600 focus:border-green-400 outline-none border w-full"
        v-model="selectedItem"
        @input="searchState()"
        @focus="statesVisible = true"
      />
    </div>
    <div
      name=""
      ref="states"
      class="shadow-xl"
      id="states"
      v-show="statesVisible"
    >
      <div
        v-for="state in searchState()"
        @click="(e) => stateSelected(e, state.id)"
        :data-id="state.id"
        :class="{ active: state.clicked }"
      >
        <li class="py-2">
          {{ state.state }}
        </li>
      </div>
    </div>
    <div class="flex flex-row gap-4" v-if="selectedStates.length > 0">
      <div
        class="chips text-black px-4 py-2 my-4 bg-white rounded-full w-fit"
        v-for="selectStates in selectedStates"
      >
        {{ selectStates }}
      </div>
    </div>
    <button
      class="bg-green-600 px-6 py-2 rounded-full w-fit mx-0 my-auto"
      @click="sendData()"
    >
      Submit
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  name: {
    type: String,
    default: "yo what",
  },
});
const statesVisible = ref(false);
const states = ref();
const selectedItem = ref("");
const selectedStates = ref([]);
const stateSelected = (e, stateID) => {
  selectedItem.value = e.target.innerHTML;
  stateList.value[0].clicked = true;
  stateList.value.filter((item) => {
    if (item.id == stateID) {
      item.clicked = true;
    }
  });
  if (!selectedStates.value.includes(selectedItem.value)) {
    selectedStates.value.push(selectedItem.value);
  }
  const allStates = states.value.querySelectorAll("li");
  // allStates.forEach((state) => {
  //   if (state.classList.contains("active")) {
  //     state.classList.remove("active");
  //   }
  // });
  // e.target.classList.add("active");

  statesVisible.value = false;
};

const stateList = ref([
  { state: "Newyork", id: "1", clicked: false },
  { state: "Alabama", id: "2", clicked: false },
  { state: "Arizona", id: "3", clicked: false },
  { state: "Arkansas", id: "4", clicked: false },
]);
const searchState = () => {
  return stateList.value.filter((state) =>
    state.state.toLowerCase().includes(selectedItem.value.toLowerCase())
  );
};
const sendData = () => {
  const formData = {
    states: selectedStates.value.toLocaleString(),
  };
  console.log(formData);
};
</script>
<style scoped>
.active {
  background-color: #e9e9e9;
}
#states {
  background-color: #fff;
  color: #000;
  padding: 20px 0px;
  position: absolute;
  width: 100%;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
#states li {
  list-style-type: none;
  text-align: left;
  margin: 0px 10px;
  margin-bottom: 5px;

  border-radius: 20px;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 16px;
  cursor: pointer;
}
</style>
