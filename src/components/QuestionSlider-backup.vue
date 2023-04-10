<template>
  <div id="optionsSlider" ref="sliderRef">
    <!-- <span class="text-white">{{ slider }}</span> -->
    <span class="text-white">{{ MAXMIN }}</span>
    <div
      class="flex rounded-md shadow-lg bg-white shadow-h p-6 overflow-hidden"
    >
      <slot name="slideItems" :onClick="onClick"> </slot>
    </div>
    <div class="flex gap-2 flex-row justify-between">
      <button
        @click="checkFields()"
        v-if="MAXMIN.currentDataId < MAXMIN.max"
        class="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 basis-1 rounded-full"
      >
        Next
      </button>
      <button
        v-if="MAXMIN.currentDataId > MAXMIN.min"
        @click="prevItem(slider)"
        class="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded-full"
      >
        Back
      </button>
      <button
        v-if="MAXMIN.currentDataId == MAXMIN.max"
        @click="fetchFormData()"
        class="bg-blue-600 hover:bg-blue-800 w-full text-white px-6 py-2 rounded-full"
      >
        Get Data
      </button>
    </div>
    <transition>
      <div
        v-if="MAXMIN.formSubmitted"
        class="bg-green-200 absolute top-0 max-w-[320px] px-4 py-6 rounded-md flex flex-col gap-4"
      >
        <h2 class="text-xl font-bold underline">Form submitted data</h2>
        {{ returnFieldsData }}
      </div>
    </transition>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
const sliderRef = ref();
const slider = { slideList: "", activeSlide: "", requiredFields: "" };
const MAXMIN = reactive({
  max: "",
  min: "",
  currentDataId: 1,
  errorExist: 0,
  fieldsData: {},
  formSubmitted: false,
});
const possibleFields = ["input", "textarea"];
onMounted(() => {
  slider.slideList = sliderRef.value.querySelectorAll("li");
  slider.slideList.forEach((item, i) => {
    item.setAttribute("data-id", i + 1);
  });
  slider.slideList[0].classList.add("active");
  console.log(sliderRef.value);
  MAXMIN.max = slider.slideList.length;
  MAXMIN.min = 1;
});
const returnFieldsData = ref();
const fetchFormData = () => {
  MAXMIN.formSubmitted = true;
  returnFieldsData.value = MAXMIN.fieldsData;
};
const onClick = (e) => {
  console.log(e);
};
const checkFields = () => {
  slider.slideList.forEach((element) => {
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
        element.querySelectorAll("input").forEach((input) => {
          const textAttr = input.getAttribute("type");

          if (
            input.hasAttribute("required") &&
            textAttr == "text" &&
            input.value.length == 0
          ) {
            console.log(input.value.length);
            MAXMIN.errorExist = 1;
            console.log("yo");
            sliderRef.value.classList.add("nudge");
            setTimeout(() => {
              sliderRef.value.classList.remove("nudge");
            }, 500);
            // Error exists
            input.classList.add("border-red-500");
            input.classList.remove("border-green-500");
            input.insertAdjacentHTML(
              "afterend",
              "<span class='bg-red-100 p-2 mt-3 text-sm rounded-md errorMsg block w-fit'>" +
                input.getAttribute("errorMsg") +
                "</span>"
            );
          } else if (
            input.hasAttribute("required") &&
            textAttr == "radio" &&
            input["checked"] == false
          ) {
            MAXMIN.errorExist = 1;
            sliderRef.value.classList.add("nudge");
            setTimeout(() => {
              sliderRef.value.classList.remove("nudge");
            }, 500);
            // Error exists
            input.classList.add("border-red-500");
            input.classList.remove("border-green-500");
            input.insertAdjacentHTML(
              "afterend",
              "<span class='bg-red-100 p-2 mt-3 text-sm rounded-md errorMsg block w-fit'>" +
                input.getAttribute("errorMsg") +
                "</span>"
            );
          }
          // if (
          //   input.hasAttribute("required") &&
          //   textAttr == "text" &&
          //   input.value.length > 0
          // ) {
          //   // input.classList.remove("border-red-500");
          //   // input.classList.add("border-green-500");
          //   // const fieldType = input.getAttribute("name");
          //   // MAXMIN.fieldsData[fieldType] = input.value;
          // }
        });

        /*
        This deals with only single input field
         */
        // if (
        //   element.querySelector("input").getAttribute("required") != undefined
        // ) {
        //   if (element.querySelector("input").value <= 0) {
        //     MAXMIN.errorExist = 1;
        //     element.querySelector("input").classList.add("border-red-500");
        //     element.querySelector("input").classList.remove("border-green-500");
        //   } else {
        //     MAXMIN.errorExist = 0;
        //     element.querySelector("input").classList.remove("border-red-500");
        //     element.querySelector("input").classList.add("border-green-500");
        //   }
        // }
      }
    }
  });
  if (MAXMIN.errorExist == 1) {
    return;
  }
  nextItem();
};
const nextItem = () => {
  slider.slideList.forEach((element) => {
    if (element.classList.contains("active")) {
      slider.activeSlide = element;
    }
  });

  const currentDataId = slider.activeSlide.getAttribute("data-id");
  const nextId = parseInt(currentDataId) + 1;
  MAXMIN.currentDataId = nextId;

  console.log(nextId);
  slider.slideList.forEach((element) => {
    if (element.querySelector("input")) {
      if (
        element.querySelector("input").getAttribute("required") != undefined
      ) {
        if (element.querySelector("input").value <= 0) {
          slider.requiredFields = 1;
        }
      }
    }
    if (nextId <= MAXMIN.max) {
      element.classList.remove("active");
      element.getAttribute("data-id") == nextId
        ? element.classList.add("active")
        : "";
    }
  });
};

const prevItem = () => {
  slider.slideList.forEach((element) => {
    if (element.classList.contains("active")) {
      slider.activeSlide = element;
    }
  });

  const currentDataId = slider.activeSlide.getAttribute("data-id");

  const nextId = parseInt(currentDataId) - 1;
  MAXMIN.currentDataId = nextId;

  slider.slideList.forEach((element) => {
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
