
# Vue MultiStep Form

Multistep form created with Vue 3 and Vite.

The purpose of this form is to use it as a ready made multistep form which
can be included in any website as needed, like using in wordpress or simple html page.




![alt text](https://i.imgur.com/gekQAPW.png)

![alt text](https://i.imgur.com/LQZmFQA.gif)
## Documentation
```bash


To use the form component i.e wordpress,html file 

include div with id of app as below

<div id="app">
</div>

and include the QuestionSlider component inside, 
its the multistep slider, add as below

<QuestionSlider>
      <template #slideItems>
      </template>
      </QuestionSlider>

After that step, now is a time to add slides
and for that I have used li tag  and inside it you can use
form input fields like [input[text],input[radio],input[checkbox],select] as below


<QuestionSlider>
      <template #slideItems>

        <li class="flex gap-4 flex-col">
            <input
              type="text"
              name="email"
              class="border border-black/30 rounded-md w-full px-4 py-2"
              required="required"
              errorMsg="Please fill the email field"
            />
            </li>

                   <li class="flex gap-4 flex-col">
            <input
              type="text"
              name="Firstname"
              class="border border-black/30 rounded-md w-full px-4 py-2"
              required="required"
              errorMsg="Please fill the email field"
            />
            </li>
      </template>
      </QuestionSlider>

You can customize error message via changing errorMsg attribute in 
input field
      

```


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

- Fetching data from api/submitting to

- & more


## 🔗 Personal Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://anasniazi.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/anasniazi/)
[![twitter](https://img.shields.io/badge/Dribbble-EA4C89?style=for-the-badge&logo=dribbble&logoColor=white)](https://dribbble.com/anasakdev)

