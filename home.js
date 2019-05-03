"use strict";
let mobileMenuVisible = false;

$(".menu-icon-a").on("click touchstart", event => {
  event.preventDefault();
  console.log(mobileMenuVisible);
  if (!mobileMenuVisible) {
    $(".home-li").fadeOut(500);
    $(".in-mobile-menu").show(500);
    showMenuIconAnimation();
    mobileMenuVisible = true;
  } else {
    $(".home-li").fadeIn(500);
    $(".in-mobile-menu").hide(500);
    hideMenuIconAnimation();
    mobileMenuVisible = false;
  }
});

const trackResize = () => {
  $(window).resize(() => {
    const width = $(window).width();
    if (width >= 415) {
      $(".in-mobile-menu").show();
      mobileMenuVisible = true;
    } else {
      $(".in-mobile-menu").hide();
      hideMenuIconAnimation();
      mobileMenuVisible = false;
    }
  });
};

const showMenuIconAnimation = () => {
  $(".top").css(
    { transform: "rotate(-40deg)" },
    { transition: "transform 1s" }
  );
  $(".top, .bottom").css({ background: "#333333" });
  $(".middle").css({ background: "#101010" });
  $(".bottom").css(
    { transform: "rotate(40deg)" },
    { transition: "transform 1s" }
  );
};

const hideMenuIconAnimation = () => {
  $(".top").css({ transform: "rotate(0deg)" }, { transition: "transform 1s" });
  $(".top, .middle, .bottom").css({ background: "#ffffff" });
  $(".bottom").css(
    { transform: "rotate(0deg)" },
    { transition: "transform 1s" }
  );
};

//For typewriter effect on home page
class TypeWriter {
  constructor(element, words, wait = 3000) {
    this.element = element;
    this.words = words;
    this.text = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }
  type() {
    const currentIndex = this.wordIndex % this.words.length;
    const fullText = this.words[currentIndex];
    if (this.isDeleting) {
      this.text = fullText.substring(0, this.text.length - 1);
    } else {
      this.text = fullText.substring(0, this.text.length + 1);
    }
    this.element.html(`<span class="js-letter">${this.text}</span>`);
    let typeSpeed = 300;
    if (this.isDeleting) {
      typeSpeed /= 2;
    }
    if (!this.isDeleting && this.text === fullText) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.text === "") {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }
    setTimeout(() => this.type(), typeSpeed);
  }
}

const initiateTypeWriter = () => {
  const element = $(".js-typewriter-words");
  const words = JSON.parse(element.attr("data-words"));
  const wait = element.attr("data-wait");
  new TypeWriter(element, words, wait);
};

//Change background
const dallasSkylineDusk1 = "../images/dallas-skyline-dusk1.png";
const dallasSkylineNight1 = "../images/dallas-skyline-night1.png";
const backgroundImages = [dallasSkylineDusk1, dallasSkylineNight1];

const cycleBackgrounds = (images, index) => {
  const numberOfBackgrounds = images.length;
  setTimeout(() => {
    $(".top-half-wrap").css("backgroundImage", `url(${images[index]})`);
    index = (index + 1) % numberOfBackgrounds;
    cycleBackgrounds(images, index);
  }, 10000);
};

$(() => {
  trackResize();
  initiateTypeWriter();
  //cycleBackgrounds(backgroundImages, 0);
});
