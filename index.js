//basic js for scrolling to form section
class PageController {
  constructor(formSection, triggerButtons, currentDate) {
    this.formSection = formSection;
    this.triggerButtons = triggerButtons;
    this.currentDate = currentDate;
  }

  getFormSection() {
    const form = document.querySelector("form");
    return (this.formSection = form);
  }

  getButtons() {
    const buttons = [...document.querySelectorAll(".trigger-button")];
    return (this.triggerButtons = buttons);
  }

  scrollToSection() {
    this.triggerButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        this.formSection.scrollIntoView({ behavior: "smooth" });
      });
    });
  }
  setDate() {
    const date = new Date();
    const year = date.getFullYear();
    return (this.currentDate = year);
  }

  showDate() {
    const display = document.querySelector("#current-year-display");
    display.textContent = this.currentDate;
  }
}

const Page = new PageController();

(function () {
  (() => {
    Page.getFormSection();
    Page.getButtons();
    Page.scrollToSection();
    Page.setDate();
    Page.showDate();
  })();
})();

class FormController {
  constructor(
    stepOneButton,
    submitButton,
    currentStep,
    inputs,
    alert_containers,
    formData,
    form
  ) {
    this._stepOneButton = stepOneButton;
    this._submitButton = submitButton;
    this._currentStep = currentStep;
    this._inputs = inputs;
    this._alert_containers = alert_containers;
    this._formData = formData;
    this._form = form;
  }

  get form() {
    return this._form;
  }

  set form(form) {
    return (this._form = form);
  }

  get currentStep() {
    return this._currentStep;
  }
  set currentStep(index) {
    return (this._currentStep = index);
  }
  get stepOneButton() {
    return this._stepOneButton;
  }
  set stepOneButton(btn) {
    return (this._stepOneButton = btn);
  }
  get submitButton() {
    return this._submitButton;
  }
  set submitButton(btn) {
    return (this._submitButton = btn);
  }
  get inputs() {
    return this._inputs;
  }
  set inputs(inputs) {
    return (this._inputs = inputs);
  }

  get alert_containers() {
    return this._alert_containers;
  }

  set alert_containers(alrtContainers) {
    return (this._alert_containers = alrtContainers);
  }

  get formData() {
    return this._formData;
  }

  set formData(data) {
    return (this._formData = data);
  }

  handleFormVisibility(index) {
    const formStepOne = document.querySelector(".step_one");
    const formStepTwo = document.querySelector(".step_two");
    //hide part 2 on initial load
    if (index === 0) {
      formStepOne.style.display = "flex";
      formStepTwo.style.display = "none";
    } else if (index > 0) {
      formStepTwo.style.display = "flex";
      formStepOne.style.display = "none";
    }
  }

  formValidationCheck() {
    //msg html
    const alertHTML = (msg) =>
      `<div class="alert"><span class="alert-msg">${msg}</span></div>`;

    switch (this.currentStep) {
      case 0:
        //step one just checks for email
        let email = this._inputs.filter((input) => input.name === "email");
        if (email.length > 0) {
          if (email[0] !== "") {
            if (email[0].value === "") {
              let alert = alertHTML("Please provide an email");
              this.alert_containers[0].innerHTML = alert;
              email[0].classList.add("alert-border");
              throw new Error("Please provide an email");
            }
            if (!email[0].value.split("").includes("@")) {
              let alert = alertHTML(
                "Please make sure your email is formatted correctly"
              );
              email[0].classList.add("alert-border");
              this.alert_containers[0].innerHTML = alert;
              throw new Error(
                "Please make sure the email is formatted correctly"
              );
            }
          }
        }
        break;
      case 1:
        this.formData.forEach((input, index) => {
          if (input.required) {
            if (Object.values(input)[0] === "") {
              this.alert_containers[1].innerHTML = alertHTML(
                `Please provide ${Object.keys(input)[0]}`
              );
              this.inputs[index].classList.add("alert-border");
              throw new Error(`Please provide: ${Object.keys(input)[0]}`);
            }
          }
        });
        break;
      default:
        return;
    }

    this.resetAlert();
    return true;
  }

  resetAlert() {
    this.inputs.forEach((input) => input.classList.remove("alert-border"));
    this.alert_containers.forEach((container) => (container.innerHTML = ""));
  }

  buttonHandler() {
    this._stepOneButton.addEventListener("click", (e) => {
      if (this._currentStep === 0) e.preventDefault();
      if (this.formValidationCheck()) {
        this.currentStep = 1;
        this.formData = [...this.retrieveFormData()];
        this.handleFormVisibility(1);
      }
    });
    this._submitButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (this.formValidationCheck()) {
        //resbumit form once validation checks
        this.form.submit();
      }
    });
  }

  inputOnChange() {
    return this.inputs.forEach((input, index) => {
      input.addEventListener("change", (e) => {
        //set the form data value on the change
        this.formData[index] = input.value;
        return this.resetAlert();
      });
    });
  }

  retrieveFormData() {
    const formInputs = this._inputs.map((input) => {
      return { [input.name]: input.value, required: input.required };
    });

    this.formData = formInputs;

    return this.formData;
  }
}

const Form = new FormController();

const btnOne = document.querySelector("#qualify-button");
const btnTwo = document.querySelector("#submit-button");
const inputs = [
  ...document.querySelectorAll("input"),
  ...document.querySelectorAll("select"),
];
const alertContainers = [...document.querySelectorAll(".alert_container")];
const form = document.querySelector("form");

(() => {
  Form.form = form;
  Form.currentStep = 0;
  Form.stepOneButton = btnOne;
  Form.submitButton = btnTwo;
  Form.handleFormVisibility(0);
  Form.buttonHandler();
  Form.inputs = inputs;
  Form.alert_containers = alertContainers;
  Form.inputOnChange();
  Form.retrieveFormData();
})();

class PopupController {
  constructor(closeBtns) {
    this._closeBtns = closeBtns;
  }

  get closeBtns() {
    return this._closeBtns;
  }

  set closeBtns(btns) {
    return (this._closeBtns = btns);
  }

  handlePopupVisibility() {
    this._closeBtns.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const popup = e.target.closest(".popup");
        const containers = [...document.querySelectorAll(".container")];
        if (popup.dataset.title) {
          const container = containers.filter(
            (container) => container.dataset.title === popup.dataset.title
          );
          if (container.length > 0) {
            if (!container[0].classList.contains("hidden")) {
              container[0].classList.add("hidden");
            } else {
              container[0].classList.remove("hidden");
            }
          }
        }
      })
    );
  }
}

const Popup = new PopupController();
const closeBtns = [
  ...document.querySelectorAll(".close-btn"),
  ...document.querySelectorAll(".popup-btn"),
];

(() => {
  Popup.closeBtns = closeBtns;
  //load button controller
  Popup.handlePopupVisibility();
})();
