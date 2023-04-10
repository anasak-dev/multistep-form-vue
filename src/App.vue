<script setup>
import img3 from "./assets/img3.avif";
import img6 from "./assets/img6.avif";
import QuestionSlider from "./components/QuestionSlider.vue";
</script>

<template>
  <div
    class="w-fit my-0 mx-auto py-4 gap-4 flex flex-col items-center justify-center h-[100vh]"
  >
    <h2 class="text-white text-4xl text-center">Multi Step Form</h2>

    <QuestionSlider
      v-cloak
      class="max-w-[320px] flex flex-col gap-4 items-center"
    >
      <template v-slot:slideItems="{ onClick }">
        <blockquote class="text-sm mb-8 italic bg-gray-100 p-2 rounded-md">
          "Fields marked with <span class="text-red-500">*</span> are required
          to be filled"
        </blockquote>
        <li class="flex gap-4 flex-col">
          <div>
            Enter Email<span class="text-red-500">*</span>
            <input
              type="text"
              name="email"
              class="border border-black/30 rounded-md w-full px-4 py-2"
              required="required"
              errorMsg="Please fill the email field"
            />
          </div>

          <div>
            Enter Your Phone number
            <input
              type="text"
              name="phonenumber"
              class="border border-black/30 rounded-md w-full px-4 py-2"
              errorMsg="Please fill phone number "
            />
          </div>

          <div>
            Enter Name<span class="text-red-500">*</span>
            <input
              type="text"
              name="firstname"
              class="border border-black/30 rounded-md w-full px-4 py-2"
              required="required"
              errorMsg="Please fill the name field"
            />
          </div>
          <div class="flex">
            <span class="font-bold">Do you have a DUI?</span
            ><span class="text-red-500">*</span>
          </div>
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
          <div class="font-bold">
            Case Reference Number <span class="text-red-500">*</span>
          </div>
          <div>
            <input
              type="text"
              name="referencenumber"
              required
              class="border border-black/30 rounded-md w-full px-4 py-2"
              errorMsg="Please fill the reference field"
            />
          </div>

          <div class="flex flex-col">
            <div class="flex flex-col gap-5">
              <span class="font-bold">Select Your State</span>
              <select
                name="state"
                class="border border-black/30 py-4 px-2 rounded-md"
                id=""
                required
                errorMsg="Please select state"
              >
                <option>Select</option>
                <option value="1">Sindh</option>
                <option value="2">Punjab</option>
                <option value="3">Balochistan</option>
                <option value="4">KPK</option>
              </select>
            </div>
          </div>

          <div class="flex flex-col">
            <div class="flex gap-5">
              <input
                type="checkbox"
                name="termsCheckbox"
                required
                class="border border-black/30 rounded-md w-fit"
                errorMsg="Agree with our terms"
              />
              <div>
                <span>I agree with website terms</span>
                <span class="text-red-500">*</span>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="flex flex-col items-center text-center gap-4">
            <img :src="img6" alt="" class="rounded-md" />

            <h2 class="text-2xl font-medium">All data has been entered</h2>
            <p>Please click Get data to <br />render the fields value</p>
          </div>
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
