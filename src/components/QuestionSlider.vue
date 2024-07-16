<template>
  <div id="optionsSlider" ref="sliderRef">
    <div
      class="flex rounded-md shadow-lg bg-white shadow-h p-6 px-0 pt-0 overflow-hidden flex-col"
    >
      <div
        v-if="props.integration.formTracker == true"
        class="h-[6px] bg-green-500 formTracker w-0"
        ref="trackerRef"
      ></div>
      <div class="p-6">
        <slot
          name="multistep"
          :slider="sliderOBJ"
          :validateInput="validateInput"
          v-if="sliderOBJ.formTracker < 100"
        >
          <div class="formSlides">
            <li v-for="field in formFields" class="flex flex-col py-6">
              <div class="flex items-center w-full justify-center">
                <span class="font-bold text-2xl py-4">{{ field.title }} </span>
              </div>
              <div
                v-if="field.type == 'checkbox'"
                class="flex flex-col gap-2 items-center py-4 w-full justify-start"
              >
                <div
                  v-for="option in field.options"
                  class="flex flex-col gap-2 items-center w-full justify-start"
                  errorMsg="At least one option needs to be selected"
                >
                  <label class="group w-full" :for="option">
                    <input
                      :name="field.name"
                      type="checkbox"
                      :placeholder="field.placeholder"
                      @input="(e) => validateInput(e, sliderOBJ)"
                      :required="field.required"
                      :value="option"
                      :id="option"
                      class="border appearance-none peer hidden checked:border-red-200 checked:before w-[25px] h-[25px] rounded-full border-black/30"
                    />
                    <div
                      class="button-radio peer-checked:shadow-none hover:before:block bg-white flex items-center justify-between button-radio py-6 px-4 w-full rounded-md"
                    >
                      <span>{{ option }} </span>
                    </div>
                  </label>
                </div>
              </div>
              <div
                v-if="field.type == 'range'"
                class="flex flex-col gap-2 items-center justify-start"
              >
                <div
                  :class="{
                    'text-red-500': rangeRef >= 20,
                    'text-green-500': rangeRef < 20,
                    'text-purple-600 text-4xl': rangeRef == field.max,
                  }"
                  class="transition-all duration-300 ease-in-out"
                >
                  <span class="px-6 py-2 rounded-sm shadow-xl bg-white block">
                    <strong class="text-black">Users: </strong
                    >{{ rangeRef ? rangeRef : field.min }}</span
                  >
                </div>
                <div
                  v-if="rangeRef == field.max && field.maxFeedback"
                  class="text-base text-black/70"
                >
                  {{ field.maxFeedback }}
                </div>
                <input
                  :name="field.name"
                  type="range"
                  :min="field.min"
                  :max="field.max"
                  :step="field.step"
                  :value="rangeRef ? rangeRef : field.min"
                  :placeholder="field.placeholder"
                  @input="
                    (e) => {
                      validateInput(e, sliderOBJ);
                      if (e.target) {
                        rangeRef = e.target.value;
                      }
                      if (rangeRef == field.max) {
                        e.target.classList.add('reachedMax');
                      } else {
                        e.target.classList.remove('reachedMax');
                      }
                    }
                  "
                  :required="field.required"
                  :errorMsg="field.errorMsg"
                  :regex="field.regex"
                  class="border outline-none bg-white"
                />
              </div>
              <div
                v-if="field.type == 'text'"
                class="flex flex-col gap-2 items-center justify-start"
              >
                <input
                  :name="field.name"
                  type="text"
                  data-name="Hello world"
                  :placeholder="field.placeholder"
                  @input="(e) => validateInput(e, sliderOBJ)"
                  :required="field.required"
                  :errorMsg="field.errorMsg"
                  :regex="field.regex"
                  class="border outline-none bg-white"
                />
              </div>
              <div
                v-if="field.type == 'radio' && field.imageType == false"
                class="radio-parent grid gap-4 sm:grid-cols-2 grid-cols-1 w-full py-4"
              >
                <div
                  v-for="option in field.options"
                  errorMsg="At least one option needs to be selected"
                >
                  <div class="flex gap-2 w-full">
                    <label class="group w-full" :for="option">
                      <input
                        type="radio"
                        :name="field.name"
                        :id="option"
                        class="border appearance-none peer hidden checked:border-red-200 checked:before w-[25px] h-[25px] rounded-full border-black/30"
                        :value="option"
                        required
                      />
                      <div
                        class="button-radio peer-checked:shadow-none hover:before:block bg-white flex items-center justify-between button-radio py-6 px-4 w-full rounded-md"
                      >
                        <span>{{ option }} </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div
                v-if="field.type == 'radio' && field.imageType"
                class="radio-parent grid gap-4 sm:grid-cols-2 grid-cols-1 self-center py-4"
              >
                <div
                  v-for="option in field.options"
                  errorMsg="At least one option needs to be selected"
                >
                  <div class="flex gap-2 w-full items-center">
                    <label class="group" :for="option">
                      <input
                        type="radio"
                        :name="field.name"
                        :id="option"
                        class="border appearance-none peer hidden checked:border-red-200 checked:before w-[25px] h-[25px] rounded-full border-black/30"
                        :value="option[0]"
                        required
                      />
                      <div
                        class="peer-checked:shadow-none peer-checked:border-2 peer-checked:border-solid peer-checked:border-green-500 bg-white flex items-center transition-all duration-300 ease-in-out cursor-pointer justify-between hover:-translate-y-2 p-4 rounded-md"
                      >
                        <img
                          :src="
                            option[1]
                              ? option[1]
                              : `https://placehold.co/600x400?text=${option}`
                          "
                          class="rounded-md h-[140px] w-[140px] object-cover"
                          alt=""
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </li>
          </div>
        </slot>
        <div class="h-full justify-center flex items-center flex-grow">
          <slot name="success" v-if="sliderOBJ.formSubmitted"> </slot>
        </div>
      </div>
    </div>
    <div class="flex gap-2 flex-row items-center justify-center w-full">
      <button
        @click="checkFields()"
        v-if="sliderOBJ.currentDataId < sliderOBJ.max"
        class="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded-full"
        :class="{ 'my-0 mx-auto': sliderOBJ.currentDataId == 1 }"
      >
        {{ props.navigation.next ? props.navigation.next : "Next" }}
      </button>
      <button
        v-if="sliderOBJ.currentDataId > sliderOBJ.min"
        @click="prevItem(slider)"
        class="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded-full"
        :class="{ 'basis-2/6': sliderOBJ.currentDataId == sliderOBJ.max }"
      >
        {{ props.navigation.previous ? props.navigation.previous : "Back" }}
      </button>
      <button
        v-if="sliderOBJ.currentDataId == sliderOBJ.max"
        @click="checkFields()"
        class="bg-blue-600 hover:bg-blue-800 basis-2/3 text-white px-6 py-2 rounded-full"
      >
        {{
          props.navigation.submitCTA ? props.navigation.submitCTA : "Get data"
        }}
      </button>
    </div>
    <div
      v-if="sliderOBJ.errors"
      class="bg-green-200 max-w-[320px] px-4 py-6 my-4 rounded-md flex flex-col gap-4"
    >
      <h2 class="text-xl font-bold underline">{{ sliderOBJ.errors }}</h2>
    </div>
    <div
      v-if="sliderOBJ.formSubmitted"
      class="bg-green-200 max-w-[320px] px-4 py-6 my-4 rounded-md flex flex-col gap-4"
    >
      <h2 class="text-xl font-bold underline">Form submitted data</h2>
      {{ sliderOBJ.fieldsData }}
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
const props = defineProps({
  navigation: {
    type: Object,
    default: {
      previous: "Back",
      next: "Next",
      submitCTA: "Get Data",
    },
  },
  formTracker: {
    default: false,
  },
  integration: {
    type: Object,
    default: {
      api: "",
      apiId: "",
      formTracker: false,
      backgroundColor: "white",
      formURL: "",
    },
  },
});
const sliderRef = ref();
const trackerRef = ref();
const sliderOBJ = reactive({
  activeSlide: "",
  requiredFields: "",
  slideList: "",
  max: "",
  min: "",
  loadingActive: false,
  currentDataId: 1,
  errors: [],
  errorExist: 0,
  fieldsData: {},
  formSubmitted: false,
  formTracker: "",
});
const validateInput = (e) => {
  console.log(props.tesssst);
  const emailReg = new RegExp(e.target.getAttribute("regex"));
  const valid = emailReg.test(e.target.value);
  console.log(sliderOBJ.fieldsData);

  if (!valid) {
    e.target.classList.remove("border-green-500");
    e.target.classList.add("border-red-500");
    return;
  }
  if (
    e.target.nextElementSibling &&
    e.target.nextElementSibling.classList.contains("errorMsg")
  ) {
    e.target.nextElementSibling.remove();
  }
  e.target.classList.add("border-green-500");
  e.target.classList.remove("border-red-500");
};
onMounted(() => {
  console.log(props);
  sliderOBJ.slideList = sliderRef.value.querySelectorAll("li");
  sliderOBJ.slideList.forEach((item, i) => {
    item.setAttribute("data-id", i + 1);
  });
  sliderOBJ.slideList[0].classList.add("active");
  sliderOBJ.max = sliderOBJ.slideList.length;
  sliderOBJ.min = 1;
});

const fetchFormData = () => {
  sliderOBJ.formSubmitted = true;
};

const checkFields = () => {
  // flush all errors initially
  sliderOBJ.errors = [];
  // flush all errors initially

  sliderOBJ.slideList.forEach((element) => {
    if (element.classList.contains("active")) {
      // remove error messages if already exists
      if (element.querySelectorAll("span.errorMsg")) {
        element.querySelectorAll("span.errorMsg").forEach((item) => {
          item.remove();
        });
      }
      // remove error messages if already exists

      /*
        This deals with multiple input field
         */
      if (element.querySelectorAll("input")) {
        // Condition for form element `input` [radio,checkbox,text]

        element.querySelectorAll("input").forEach((input) => {
          const textAttr = input.getAttribute("type");
          if (
            input.hasAttribute("required") &&
            textAttr == "radio" &&
            element.querySelector(
              `input[name='${input.getAttribute("name")}']:checked`
            ) == null
          ) {
            sliderRef.value.classList.add("nudge");
            setTimeout(() => {
              sliderRef.value.classList.remove("nudge");
            }, 500);
            const err = {};
            err.name = input.getAttribute("name");
            sliderOBJ.errors.push(err);
            input.classList.add("border-red-500");
            input.classList.remove("border-green-500");
            input.insertAdjacentHTML(
              "afterend",
              "<span class='bg-red-100 p-2 mt-3 text-sm rounded-md errorMsg block w-fit'>" +
                input.getAttribute("errorMsg") +
                "</span>"
            );
          }
          if (
            (input.hasAttribute("required") &&
              input.parentElement.parentElement.classList.contains("active") &&
              textAttr == "text" &&
              input.value.length == 0) ||
            (input.classList.contains("border-red-500") &&
              textAttr == "text" &&
              input.value.length == 0 &&
              input.hasAttribute("required") &&
              !input.parentElement.classList.contains("nestedElement")) ||
            (input.classList.contains("border-red-500") && textAttr == "text")
          ) {
            // check for nested fields
            sliderRef.value.classList.add("nudge");
            setTimeout(() => {
              sliderRef.value.classList.remove("nudge");
            }, 500);
            const err = {};
            err.name = input.getAttribute("name");
            sliderOBJ.errors.push(err);
            input.classList.add("border-red-500");
            input.classList.remove("border-green-500");
            input.insertAdjacentHTML(
              "afterend",
              "<span class='bg-red-100 p-2 mt-3 text-sm rounded-md errorMsg block w-fit sdsd'>" +
                input.getAttribute("errorMsg") +
                "</span>"
            );
            return;
          }

          if (
            input.hasAttribute("required") &&
            textAttr == "checkbox" &&
            element.querySelector(`input[name='${input.getAttribute("name")}']`)
              .checked == false
          ) {
            sliderRef.value.classList.add("nudge");
            setTimeout(() => {
              sliderRef.value.classList.remove("nudge");
            }, 500);
            const err = {};
            err.name = input.getAttribute("name");
            sliderOBJ.errors.push(err);
            input.classList.add("border-red-500");
            input.classList.remove("border-green-500");
            input.insertAdjacentHTML(
              "afterend",
              "<span class='bg-red-100 p-2 mt-3 text-sm rounded-md errorMsg block w-fit'>" +
                input.getAttribute("errorMsg") +
                "</span>"
            );
          } else {
            const fieldType = input.getAttribute("name");

            if (
              input.hasAttribute("required") &&
              input.getAttribute("type") == "text" &&
              !input.value <= 0
            ) {
              sliderOBJ.fieldsData[fieldType] = input.value;
              input.classList.add("border-green-500");
              input.classList.remove("border-red-500");
            }

            if (input.getAttribute("type") == "text" && !input.value <= 0) {
              sliderOBJ.fieldsData[fieldType] = input.value;
              input.classList.add("border-green-500");
              input.classList.remove("border-red-500");
            }

            if (input.getAttribute("type") == "radio") {
              const checkedRadio = document.querySelector(
                "input[name=dui]:checked"
              );
              sliderOBJ.fieldsData[fieldType] = document.querySelector(
                "input[name=dui]:checked"
              ).value;
            }
            if (input.getAttribute("type") == "checkbox") {
              sliderOBJ.fieldsData[fieldType] = document.querySelector(
                `input[name=${input["name"]}]`
              ).value;
            }
          }
        });

        // Condition for form element `Select`
        element.querySelectorAll("select").forEach((select) => {
          const fieldType = select.getAttribute("name");
          if (select.value == "Select") {
            sliderRef.value.classList.add("nudge");
            setTimeout(() => {
              sliderRef.value.classList.remove("nudge");
            }, 500);
            const err = {};
            err.name = select.getAttribute("name");
            sliderOBJ.errors.push(err);

            select.classList.add("border-red-500");
            select.classList.remove("border-green-500");

            select.insertAdjacentHTML(
              "afterend",
              "<span class='bg-red-100 p-2 mt-3 text-sm rounded-md errorMsg block w-fit'>" +
                select.getAttribute("errorMsg") +
                "</span>"
            );
          } else {
            select.classList.remove("border-red-500");
            select.classList.add("border-green-500");

            sliderOBJ.fieldsData[fieldType] =
              select.options[select.selectedIndex].text;
          }
        });
      }
    }
  });

  if (sliderOBJ.errors.length > 0) {
    sliderOBJ.errorExist = 1;
    return;
  }
  if (sliderOBJ.errors.length <= 0) {
    sliderOBJ.errorExist = 0;
  }
  //submit form if the active slider item is maximum
  // for example if maximum slides are 3 and active slide is 3 then
  // form will be submitted

  if (sliderOBJ.currentDataId == sliderOBJ.max) {
    if (props.integration.formTracker) {
      sliderOBJ.formTracker = (sliderOBJ.currentDataId / sliderOBJ.max) * 100;
      trackerRef.value.style.width = sliderOBJ.formTracker + "%";
    }

    if (props.integration.api == "cf7" && props.integration.apiId) {
      console.log("is this working");
      const bodyFormData = new FormData();
      Object.keys(sliderOBJ.fieldsData).forEach(function (key) {
        bodyFormData.append(key, sliderOBJ.fieldsData[key]);
        console.log(key, sliderOBJ.fieldsData[key]);
      });
      sliderOBJ.loadingActive = true;
      axios
        .post(
          `${
            props.integration.formURL
              ? props.integration.formURL
              : import.meta.env.VITE_WEB_URL
          }/wp-json/contact-form-7/v1/contact-forms/${
            props.integration.apiId
          }/feedback`,
          // `http://testv1.local/wp-json/contact-form-7/v1/contact-forms/${slider.apiId}/feedback`,
          // `https://airpayusa.com/wp-json/contact-form-7/v1/contact-forms//${slider.apiId}/feedback`,
          bodyFormData
        )
        .then(function (response) {
          if (
            response.data.message ==
            "Thank you for your message. It has been sent."
          ) {
            sliderOBJ.formSubmitted = true;
            sliderOBJ.fieldsData = [];
          } else {
            sliderOBJ.errors.push(response.data.message);
            console.log(response.data.message);
          }
          sliderOBJ.loadingActive = false;
        })
        .catch(function (error) {
          sliderOBJ.errors.push(error.message);
          sliderOBJ.loadingActive = false;
        });
      return;
    } else {
      slider.formSubmitted = true;
    }

    sliderOBJ.formSubmitted = true;
    return;
  }
  nextItem();
};
const nextItem = () => {
  console.log(sliderOBJ.fieldsData);
  sliderOBJ.slideList.forEach((element) => {
    if (element.classList.contains("active")) {
      sliderOBJ.activeSlide = element;
    }
  });
  if (props.integration.formTracker) {
    sliderOBJ.formTracker = (sliderOBJ.currentDataId / sliderOBJ.max) * 100;
    trackerRef.value.style.width = sliderOBJ.formTracker + "%";
  }
  const currentDataId = sliderOBJ.activeSlide.getAttribute("data-id");
  const nextId = parseInt(currentDataId) + 1;
  sliderOBJ.currentDataId = nextId;

  sliderOBJ.slideList.forEach((element) => {
    if (element.querySelector("input")) {
      if (
        element.querySelector("input").getAttribute("required") != undefined
      ) {
        if (element.querySelector("input").value <= 0) {
          sliderOBJ.requiredFields = 1;
        }
      }
    }
    if (nextId <= sliderOBJ.max) {
      element.classList.remove("active");
      element.getAttribute("data-id") == nextId
        ? element.classList.add("active")
        : "";
    }
  });
};

const prevItem = () => {
  sliderOBJ.slideList.forEach((element) => {
    if (element.classList.contains("active")) {
      sliderOBJ.activeSlide = element;
    }
  });

  const currentDataId = sliderOBJ.activeSlide.getAttribute("data-id");
  console.log(currentDataId);

  const nextId = parseInt(currentDataId) - 1;
  sliderOBJ.currentDataId = nextId;

  if (props.integration.formTracker) {
    sliderOBJ.formTracker = (sliderOBJ.currentDataId / sliderOBJ.max) * 100;
    trackerRef.value.style.width = sliderOBJ.formTracker + "%";
  }
  sliderOBJ.slideList.forEach((element) => {
    if (nextId >= 1) {
      element.classList.remove("active");
      element.getAttribute("data-id") == nextId
        ? element.classList.add("active")
        : "";
    }
  });
};
</script>

<style>
#optionsSlider li {
  display: none;
  opacity: 0;
}
#optionsSlider li.active {
  display: flex;
  opacity: 1;
}
.nudge {
  animation: wiggle 0.3s ease-in;
}
.formTracker {
  transition: width 0.8s cubic-bezier(1, 0.05, 0.27, 0.99);
}
@keyframes wiggle {
  0% {
    transform: translateX(10px);
  }
  25% {
    transform: translateX(-10px);
  }
  50% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0px);
  }
}
</style>
