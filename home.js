"use strict";
let isSmallDevice = false;

const trackResize = () => {
  $(window).resize(() => {
    const width = $(window).width();
    if (width <= 650) {
      isSmallDevice = true;
    } else {
      isSmallDevice = false;
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
const backgroundImages = [
  {
    src: "./images/youtube-thumbnail1.png",
    href: "https://www.youtube.com/watch?v=36-5_4p7j0c",
    slideTitle: "Hand on My Rifle (Music Video)"
  },
  {
    src: "./images/crying-in-the-rain-slide.png",
    href: "https://www.youtube.com/watch?v=xD7qDB-ge-U",
    slideTitle: "Crying in the Rain (Music Video)"
  },
  {
    src: "./images/new-soundcloud-thumbnails-img-min.jpg",
    href: "https://soundcloud.com/timothy-freeman-2",
    slideTitle: "iNiNEPT on SoundCloud"
  }
];

class Slideshow {
  constructor(images, index) {
    this.images = images;
    this.index = index;
  }
  runSlideshow() {
    const timeoutInt = setTimeout(() => {
      this.runSlideshow();
    }, 8000);
    $("#left-slide-arrow").on("click touchstart", () => {
      console.log(timeoutInt);
      clearTimeout(timeoutInt);
      this.priorSlide();
      this.runSlideshow();
      console.log(this.index);
    });
    $("#right-slide-arrow").on("click touchstart", () => {
      this.nextSlide();
    });
    const { src, href, slideTitle } = this.images[this.index];
    const numberOfBackgrounds = this.images.length;
    if (
      $(window).width() <= 414 &&
      src === "./images/crying-in-the-rain-slide.png"
    ) {
      $(".slides").css("background-position", "45%");
    } else {
      $(".slides").css("background-position", "left");
    }
    $(".slides").css("backgroundImage", `url(${src})`);
    $(".slide-link").attr("href", href);
    $(".slide-title").text(slideTitle);
    this.index = (this.index + 1) % numberOfBackgrounds;
  }
  priorSlide() {
    if (this.index === 0) {
      this.index = 2;
    } else {
      this.index--;
    }
  }
  nextSlide() {}
}

//Naming slideshow
const slideshow = new Slideshow(backgroundImages, 0);

$(() => {
  trackResize();
  initiateTypeWriter();
  // slideshow.initiateSlideshow();
  slideshow.runSlideshow();
  //initiateSlideshow(backgroundImages, 0);
  //slideshowControls();
});

const slideshowControls = () => {
  $("#left-slide-arrow").on("click touchstart", e => {
    console.log("left");
    slideshow.priorSlide();
    //index = (index - 1) % numberOfBackgrounds;
    //slideshow(images, index);
  });
  $("#right-slide-arrow").on("click touchstart", e => {
    console.log("right");
    //index = (index + 1) % numberOfBackgrounds;
    //slideshow(images, index);
  });
};
