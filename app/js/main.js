/** @format */

import $ from "jquery";
// import wow from "wowjs";
import inputmask from "inputmask";
import loadingAttributePolyfill from "loading-attribute-polyfill";
// const WOW = require("wowjs");
// window.wow = new wow.WOW();
// window.wow.init();
window.jQuery = $;
window.$ = $;
require("./vendor/mail.js");

// import module example (npm i -D jquery)

document.addEventListener("DOMContentLoaded", () => {
  const phone = document.querySelector(".telephone");

  const popupForm = document.querySelector("#popup__form");

  const formPopup = document.querySelector(".form__popup");

  const showForm = document.querySelectorAll(".show__form");

  const popupBg = document.querySelectorAll(".popup__overlay");

  const closePopup = document.querySelectorAll(".close");

  const questions = document.querySelectorAll(".question");

  const counterChng = document.querySelectorAll(".question-input-chang");

  const date = document.querySelector("#date");

  const body = document.querySelector("body");

  const lastStep = document.querySelector(".last__step");
  const info = document.querySelector(".info");

  const stepBtns = document.querySelectorAll(".step__btn");

  const quizeAnswers = document.querySelectorAll(".quize__answer");

  const customSelect = document.querySelector(".custom-select-wrapper");

  lastStep.addEventListener("click", function (e) {
    e.preventDefault();
    info.classList.add("__hide");
  });

  let now = new Date(),
    day,
    month;

  if (stepBtns) {
    stepBtns.forEach(function (stepBtn) {
      stepBtn.addEventListener("click", function (e) {
        e.preventDefault();
        let questionIndex = Number(this.dataset.index);
        let answer = this.dataset.answer;
        let nextIndex = questionIndex + 1;
        console.log(nextIndex);
        for (let i = 0; i < questions.length; i++) {
          const question = questions[i];
          questions[questionIndex].classList.add("__hide");
          questions[nextIndex].classList.remove("__hide");
        }
        for (let i = 0; i < quizeAnswers.length; i++) {
          const quizeAnswer = quizeAnswers[i];
          quizeAnswers[questionIndex].value = answer;
        }
      });
    });
  }

  if (counterChng) {
    counterChng.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        let questionInput = this.parentNode.querySelector(".question-input");
        let questionAnswer = this.parentNode.parentNode.querySelector(".btn");

        if (this.classList.contains("chang__dec")) {
          questionInput.value--;
          questionAnswer.dataset.answer--;
        } else {
          questionInput.value++;
          questionAnswer.dataset.answer++;
        }
        e.preventDefault();
      });
    });
  }

  if (now.getDate() < 10) {
    day = "0" + now.getDate();
  } else {
    day = now.getDate();
  }
  if (now.getMonth() < 10) {
    month = "0" + (now.getMonth() + 1);
  } else {
    month = now.getMonth() + 1;
  }
  if (date) {
    date.innerHTML = day + "." + month + "." + now.getFullYear();
  }

  if (phone) {
    let phoneMask = new inputmask({
      mask: "+375-99-999-99-99",
      clearIncomplete: true,
      greedy: false,
    });
    phoneMask.mask(phone);
  }

  function classRemove(element, removeClass) {
    const elementClass = document.querySelector("" + element + "");
    if (elementClass) {
      elementClass.classList.remove(removeClass);
    }
  }

  function popupToggle(
    popUp,
    popUpElement,
    el1ShowClassAdd,
    el2ShowClassAdd,
    el1HideClassRemove,
    el2HideClassRemove,
    state,
    timing
  ) {
    popUp.classList.add(el1ShowClassAdd);
    popUp.classList.remove(el1HideClassRemove);
    popUpElement.classList.remove(el2HideClassRemove);
    popUpElement.classList.add(el2ShowClassAdd);
    body.classList.toggle("__fixed");
    setTimeout(function FormFadeIn() {
      popUp.style.display = state;
    }, timing);
  }

  window.addEventListener("scroll", function () {
    // if (window.innerWidth <= 600) {
    //   let howScroll = window.scrollTop;
    //   if (howScroll >= 10) {
    //     header.classList.add("__hide");
    //   } else {
    //     header.classList.remove("__hide");
    //   }
    // }
    // classRemove(".burger__menu.__clicked", "__clicked");
    // classRemove(".menu.__show", "__show");
  });

  if (showForm) {
    showForm.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        const subject = this.dataset.subject;
        e.preventDefault();
        popupToggle(
          popupForm,
          formPopup,
          "animate__fadeIn",
          "animate__bounceInDown",
          "animate__fadeOut",
          "animate__bounceOutUp",
          "flex",
          100
        );
      });
      return false;
    });
  }

  function popupClose() {
    if (window.getComputedStyle(popupForm).display === "flex") {
      popupToggle(
        popupForm,
        formPopup,
        "animate__fadeOut",
        "animate__bounceOutUp",
        "animate__fadeIn",
        "animate__bounceInDown",
        "none",
        1000
      );
      return false;
    }
  }

  if (popupBg) {
    popupBg.forEach(function (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        popupClose();
      });
    });
  }

  if (closePopup) {
    closePopup.forEach(function (close) {
      close.addEventListener("click", function (e) {
        popupClose();
        e.preventDefault();
      });
    });
  }
  if (customSelect) {
    customSelect.addEventListener("click", function () {
      this.querySelector(".custom-select").classList.toggle("open");
    });
    for (const option of document.querySelectorAll(".custom-option")) {
      option.addEventListener("click", function () {
        if (!this.classList.contains("selected")) {
          this.parentNode
            .querySelector(".custom-option.selected")
            .classList.remove("selected");
          this.classList.add("selected");
          this.closest(".custom-select").querySelector(
            ".custom-select__trigger span"
          ).textContent = this.textContent;
        }
        this.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector(
          ".btn"
        ).dataset.answer = this.textContent;
      });
    }
    window.addEventListener("click", function (e) {
      const select = document.querySelector(".custom-select");
      if (!select.contains(e.target)) {
        select.classList.remove("open");
      }
    });
  }

  function setInputFilter(textbox, inputFilter) {
    [
      "input",
      "keydown",
      "keyup",
      "mousedown",
      "mouseup",
      "select",
      "contextmenu",
      "drop",
    ].forEach(function (event) {
      textbox.addEventListener(event, function () {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      });
    });
  }
  setInputFilter(document.querySelector(".question-input"), function (value) {
    return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
  });
  document.addEventListener("keydown", function (event) {
    if (event.keyCode === 27) {
      popupClose();
    }
  });
});
