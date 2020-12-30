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

  const burgerMenu = document.querySelector(".burger__menu");
  const menu = document.querySelector(".menu");

  const body = document.querySelector("body");

  const customSelect = document.querySelector(".custom-select-wrapper");

  let phoneMask = new inputmask({
    mask: "+375-99-999-99-99",
    clearIncomplete: true,
    greedy: false,
  });
  phoneMask.mask(phone);

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
    classRemove(".burger__menu.__clicked", "__clicked");
    classRemove(".menu.__show", "__show");
  });

  if (showForm) {
    showForm.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        const subject = this.dataset.subject;
        console.log(subject);
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
      });
    }
    window.addEventListener("click", function (e) {
      const select = document.querySelector(".custom-select");
      if (!select.contains(e.target)) {
        select.classList.remove("open");
      }
    });
  }
  document.addEventListener("keydown", function (event) {
    if (event.keyCode === 27) {
      popupClose();
    }
  });
});
