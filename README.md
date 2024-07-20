# Multi-Step Form Documentation
## Overview
The Multi-Step Form component allows you to create a step-by-step form with various input fields, validations, and custom messages for success and errors. This guide provides step-by-step instructions for integrating the form into your project.


### Multi-Step Form Template

There are three available template blocks in this project
### multistep template

- The `multistep` template is used to define the slides in the multi-step form. Each slide should be wrapped in an `li` element. The template exposes `validateInput`.




```vue
<template v-slot:multistep="{  validateInput }">
  <blockquote class="text-sm mb-8 italic bg-gray-100 p-2 rounded-md">
    "Fields marked with <span class="text-red-500">*</span> are required to be filled"
  </blockquote>
  <li class="flex gap-4 flex-col">
    <!-- Slide Content -->
  </li>
  <!-- Additional Slides -->
</template>
```
### Attributes:

- **regex**: A regular expression to validate the input value.
- **required**: Boolean attribute to mark the input field as required.
- **errorMsg**: A custom error message to be displayed when validation fails.
- **@input**: function to validate user input against the provided regex.
### Example slide

```vue
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
  <!-- Additional Input Fields -->
</li>
```

### Success Message Template
The `success` template is used to display a message when the form is successfully submitted.

```vue
<template v-slot:success>
  <div class="bg-green-100 px-4 py-2 rounded-full mt-2">
    Form is successfully submitted
  </div>
</template>
```

### Error Message Template
The `errors` template is used to display error messages when the form submission fails.

```vue
<template v-slot:errors="{ apiErrors }">
  <div class="bg-red-200 px-4 rounded-sm py-2 mt-2">
    Submission Failed: {{ apiErrors }}
  </div>
</template>
```

## Available Props

| Property Name      | Description                                                                 | Values                                                         |
|--------------------|-----------------------------------------------------------------------------|----------------------------------------------------------------|
| `navigation`       | Object containing text for navigation buttons.                              | { `previous`: "Back", `next`: "Next", `submitCTA`: "Get Data" }|
| `previous`         | Text for the previous button in the navigation.                             | Any string (e.g., `Back`, `Previous Step`)                     |
| `next`             | Text for the next button in the navigation.                                 | Any string (e.g., `Next`, `Next Step`)                         |
| `submitCTA`        | Text for the submit button in the navigation.                               | Any string (e.g., `Submit`, `Get Data`)                        |
| `integration`      | Object containing integration settings for the form.                        | { `api`: "", `apiId`: "", `color`: "", `formTracker`: false, `backgroundColor`: "white", `formURL`: "" } |
| `api`              | Specifies the API to which the form data will be sent.                      | `cf7` (for Contact Form 7), `zapier` (for Zapier catch webhook)|
| `apiId`            | The ID of the Contact Form 7 form or the Zapier catch webhook URL.          | For CF7: Form ID (e.g., `123`), For Zapier: Webhook URL        |
| `color`            | Custom color setting for the form.                                          | Any valid color (e.g., `#FF5733`, `rgb(255, 87, 51)`)          |
| `formTracker`      | Indicates whether to use the form progress tracker.                         | `true`, `false`                                                |
| `backgroundColor`  | Background color of the form tracker.                                       | Any valid color (e.g., `white`, `#FFFFFF`, `rgb(255, 255, 255)`|
| `formURL`          | The URL of the website where the Contact Form 7 is hosted.                  | Any valid URL (e.g., `https://example.com`)                    |
```

### Sample Props in form

```vue
  <question-slider
        :integration="{
        api: 'cf7',
        apiId: '81',
        formURL: 'https://example.com',
        formTracker: true,
        color:'teal'
      }"
        :navigation="{
        next: 'Next slide',
        previous: 'Previous slide',
        submitCTA: 'Submit data',
      }"
```

[**Learn more about connecting to zapier or contact form 7**  ](https://anasakdev.medium.com/using-multi-step-form-f28aab182c8b).

## Run Locally

Clone the project

```bash
  git clone https://github.com/anasak-dev/multistep-form-vue
```

Go to the project directory

```bash
  cd multistep-form-vue
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Tech Stack

**Client:** Vue 3, Vite, TailwindCSS



## Roadmap


- Refactoring code into small components

- Additional skins for forms
- Additional form end points


- & more


## 🔗 Personal Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://anasniazi.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/anasniazi/)
[![twitter](https://img.shields.io/badge/Dribbble-EA4C89?style=for-the-badge&logo=dribbble&logoColor=white)](https://dribbble.com/anasakdev)
