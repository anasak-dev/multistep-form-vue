<template>
  <div id="optionsSlider" ref="sliderRef">
    <div
      class="flex rounded-md shadow-lg bg-white shadow-h p-6 px-0 pt-0 overflow-hidden flex-col"
    >
      <div
        v-if="props.formTracker == true"
        class="h-[6px] bg-green-500 formTracker w-0"
        ref="trackerRef"
      ></div>
      <div class="p-6">
        <slot name="slideItems" :onClick="onClick" class=""> </slot>
      </div>
    </div>
    <div class="flex gap-2 flex-row justify-between">
      <button
        @click="checkFields()"
        v-if="sliderOBJ.currentDataId < sliderOBJ.max"
        class="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 basis-1 rounded-full"
      >
        Next
      </button>
      <button
        v-if="sliderOBJ.currentDataId > sliderOBJ.min"
        @click="prevItem(slider)"
        class="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded-full"
      >
        Back
      </button>
      <button
        v-if="sliderOBJ.currentDataId == sliderOBJ.max"
        @click="fetchFormData()"
        class="bg-blue-600 hover:bg-blue-800 w-full text-white px-6 py-2 rounded-full"
      >
        Get Data
      </button>
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
const props = defineProps({
  formTracker: {
    default: false,
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
  currentDataId: 1,
  errors: [],
  errorExist: 0,
  fieldsData: {},
  formSubmitted: false,
  formTracker: "",
});
onMounted(() => {
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
const onClick = (e) => {
  console.log(e);
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
          console.log(textAttr);
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
            input.hasAttribute("required") &&
            textAttr == "text" &&
            input.value.length == 0
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

            if (input.getAttribute("type") == "radio") {
              console.log(document.querySelector("input[name=dui]:checked"));
              const checkedRadio = document.querySelector(
                "input[name=dui]:checked"
              );
              sliderOBJ.fieldsData[fieldType] = document.querySelector(
                "input[name=dui]:checked"
              ).value;
              console.log(checkedRadio);
              console.log(sliderOBJ);
            }
            if (input.getAttribute("type") == "checkbox") {
              console.log(input);

              sliderOBJ.fieldsData[fieldType] = document.querySelector(
                `input[name=${input["name"]}]`
              ).value;
              console.log(sliderOBJ);
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
  nextItem();
};
const nextItem = () => {
  sliderOBJ.slideList.forEach((element) => {
    if (element.classList.contains("active")) {
      sliderOBJ.activeSlide = element;
    }
  });
  if (props.formTracker) {
    sliderOBJ.formTracker =
      (sliderOBJ.currentDataId / (sliderOBJ.max - 1)) * 100;
    trackerRef.value.style.width = sliderOBJ.formTracker + "%";
  }
  const currentDataId = sliderOBJ.activeSlide.getAttribute("data-id");
  const nextId = parseInt(currentDataId) + 1;
  sliderOBJ.currentDataId = nextId;

  console.log(nextId);
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

  const nextId = parseInt(currentDataId) - 1;
  sliderOBJ.currentDataId = nextId;

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
