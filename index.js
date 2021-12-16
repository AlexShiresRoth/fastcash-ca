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
  constructor(stepOneButton, submitButton, currentStep) {
    this._stepOneButton = stepOneButton;
    this._submitButton = submitButton;
    this._currentStep = currentStep;
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

  buttonHandler() {
    return this._stepOneButton.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("click");
      this.handleFormVisibility(1);
    });
  }
}

const Form = new FormController();

const btnOne = document.querySelector("#qualify-button");
const btnTwo = document.querySelector("#submit-button");

(() => {
  Form.currentStep = 0;
  Form.stepOneButton = btnOne;
  Form.submitButton = btnTwo;
  Form.handleFormVisibility(0);
  Form.buttonHandler();
})();
