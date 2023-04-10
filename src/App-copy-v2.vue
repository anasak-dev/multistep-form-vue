<script setup>
import { reactive } from "vue";
import img3 from "./assets/img3.avif";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css"; // optional for styling
import QuestionSlider from "./components/QuestionSlider.vue";
import { onMounted } from "vue";
const outSideVars = reactive({
  tip: "",
});

const triggerTippy = (e) => {
  outSideVars.tip = tippy(e.target, {
    trigger: "manual",
  });

  outSideVars.tip.show();
  console.log(e);
};
</script>

<template>
  <!-- <StateInput name="Anas Ahmed Khan Niazi"></StateInput> -->
  <div
    class="w-fit my-0 mx-auto py-4 gap-4 flex flex-col items-center justify-center h-[100vh]"
  >
    <h2 class="text-white text-4xl text-center">Multi Step Form</h2>

    <QuestionSlider
      v-cloak
      class="max-w-[320px] flex flex-col gap-4 items-center"
    >
      <template v-slot:slideItems="{ onClick }">
        <li class="flex gap-4 flex-col">
          <div>
            Enter Email
            <input
              type="text"
              name="email"
              class="border border-black/30 rounded-md w-full px-4 py-2"
              required="required"
              errorMsg="Please fill the email field"
              data-tippy-content="Enter your email"
              @focus="(e) => triggerTippy(e)"
            />
          </div>

          <div>
            Enter Your Phone number
            <input
              type="text"
              name="phonenumber"
              class="border border-black/30 rounded-md w-full px-4 py-2"
              errorMsg="Please fill phone number "
              data-tippy-content="Enter your phonenumber"
              @focus="(e) => triggerTippy(e)"
            />
          </div>

          <div>
            Enter Name
            <input
              type="text"
              name="firstname"
              class="border border-black/30 rounded-md w-full px-4 py-2"
              required="required"
              errorMsg="Please fill the name field"
            />
          </div>
          Do you have a DUI?

          <div class="flex gap-4">
            <div class="flex gap-2">
              Yes
              <input
                type="radio"
                name="dui"
                class="border border-black/30 rounded-md w-full px-4 py-2"
                errorMsg="Please fill the email field"
                value="yes"
                required
                checked
              />
            </div>
            <div class="flex gap-2">
              No

              <input
                type="radio"
                name="dui"
                required
                class="border border-black/30 rounded-md w-full px-4 py-2"
                errorMsg="Please fill the email field"
                value="no"
              />
            </div>
          </div>
        </li>
        <li class="flex gap-4 flex-col">
          Your Reference
          <div>
            <input
              type="text"
              name="referencenumber"
              required
              data-tippy-content="Please fill the name field"
              class="border border-black/30 rounded-md w-full px-4 py-2"
              errorMsg="Please fill the reference field"
            />
          </div>
          <div class="flex flex-col">
            <div class="flex gap-5">
              <span>I agree</span>
              <input
                type="checkbox"
                name="termsCheckbox"
                required
                class="border border-black/30 rounded-md w-fit"
                errorMsg="Agree with our terms"
              />
            </div>
          </div>
          <div class="flex flex-col">
            <div class="flex gap-5">
              <span>Select Pricing</span>
              <select
                name="state"
                id=""
                required
                errorMsg="Please select state"
              >
                <option>Select</option>
                <option value="1">Sindh</option>
                <option value="2">Punjab</option>
                <option value="3">karachi</option>
                <option value="4">quetta</option>
              </select>
            </div>
          </div>
          <img :src="img3" alt="" />
          <button
            data-tippy-content="This is a button"
            @click="(e) => onClick(e)"
          >
            Testing tooltip
          </button>
        </li>
        <li>
          <img :src="img3" alt="" />
        </li>
      </template>
    </QuestionSlider>
  </div>
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
[v-cloak] {
  display: none;
}
</style>
