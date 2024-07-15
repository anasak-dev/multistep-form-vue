<script setup>
import img6 from "./assets/img6.avif";
import QuestionSlider from "./components/QuestionSlider.vue";
</script>

<template>
  <div
    class="w-fit my-0 mx-auto py-4 gap-4 flex flex-col items-center justify-center min-h-[100vh] h-full"
  >
    <h2 class="text-white text-4xl text-center">Multi Step Form</h2>

    <!-- <QuestionSlider
      :formTracker="true"
      :integration="{
        api: 'cf7',
        apiId: '81',
        formURL: '',
      }"
      :navigation="{
        next: 'Next Item',
        previous: 'Go back',
        submitCTA: 'Submit data',
      }"
      v-cloak
      class="max-w-[420px] flex flex-col gap-4 items-center px-5"
    >
      <template v-slot:slideItems="{ onClick }">
        <blockquote class="text-sm mb-8 italic bg-gray-100 p-2 rounded-md">
          "Fields marked with <span class="text-red-500">*</span> are required
          to be filled"
        </blockquote>
        <li class="flex gap-4 flex-col">
          <div>
            Enter Email<span class="text-red-500">*</span>
            <span class="text-gray-200 pl-2">e.g. joe@foo.com</span>
            <input
              type="text"
              name="your-email"
              class="border border-black/30 outline-none rounded-md w-full px-4 py-2"
              required="required"
              errorMsg="Please fill the email field"
              @input="(e) => validateInput(e)"
              regex="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
            />
          </div>

          <div>
            <div class="flex">
              Enter Phone number
              <span class="text-gray-200 pl-2">e.g. 1234321234</span>
            </div>
            <input
              type="text"
              name="phone-number"
              class="border outline-none border-black/30 rounded-md w-full px-4 py-2"
              errorMsg="Please fill phone number "
              regex="^\d{10}$"
              @input="(e) => validateInput(e)"
            />
          </div>

          <div>
            Enter Name<span class="text-red-500">*</span>
            <span class="text-gray-200 pl-2">e.g. John Doe</span>

            <input
              type="text"
              name="firstname"
              class="border border-black/30 outline-none rounded-md w-full px-4 py-2"
              required="required"
              errorMsg="Please fill the name field"
              regex="."
              @input="(e) => validateInput(e)"
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
          <div class="font-bold flex">
            Case Reference Number <span class="text-red-500">*</span>
            <span class="text-gray-200 pl-2">i.e AAA1234567</span>
          </div>
          <div>
            <input
              type="text"
              name="referencenumber"
              required
              regex="^[a-zA-Z]{3}\d{7}$"
              class="border border-black/30 outline-none rounded-md w-full px-4 py-2"
              errorMsg="Please fill the reference field"
              @input="(e) => validateInput(e)"
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
            <p class="text-left">
              Please let us know features you would like to see in this form
              component. <span class="text-red-500">*</span>
            </p>
            <input
              type="text"
              name="yourcomments"
              class="border border-black/30 outline-none rounded-md w-full px-4 py-2"
              errorMsg="Please let us know your opinion about this component"
              required
              regex="."
              @input="(e) => validateInput(e)"
            />
          </div>
        </li>
      </template>
    </QuestionSlider> -->
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
