"use strict";
let isSmallDevice = false;

// $(".menu-icon-a").on("click touchstart", event => {
//   event.preventDefault();
//   console.log(mobileMenuVisible);
//   if (!mobileMenuVisible) {
//     $(".home-li").fadeOut(500);
//     $(".in-mobile-menu").show(500);
//     showMenuIconAnimation();
//     mobileMenuVisible = true;
//   } else {
//     $(".home-li").fadeIn(500);
//     $(".in-mobile-menu").hide(500);
//     hideMenuIconAnimation();
//     mobileMenuVisible = false;
//   }
// });

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
    src: "./images/new-soundcloud-thumbnails-img-min.jpg",
    href: "https://soundcloud.com/timothy-freeman-2",
    slideTitle: "iNiNEPT on SoundCloud"
  },
  {
    src: "./images/youtube-thumbnail1.png",
    href: "https://www.youtube.com/watch?v=36-5_4p7j0c",
    slideTitle: "Hand on My Rifle (Music Video)"
  },
  {
    src: "./images/crying-in-the-rain-slide.png",
    href: "https://www.youtube.com/watch?v=xD7qDB-ge-U",
    slideTitle: "Crying in the Rain (Music Video)"
  }
];

const initiateSlideshow = (images, index) => {
  $(".slides").css("backgroundImage", `url(${images[index].src})`);
  $(".slide-link").attr("href", images[index].href);
  $(".slide-title").text(images[index].slideTitle);
  index++;
  slideshow(images, index);
};

const slideshow = (images, index) => {
  const { src, href, slideTitle } = images[index];
  const numberOfBackgrounds = images.length;
  setTimeout(() => {
    $(".slides").css("backgroundImage", `url(${src})`);
    $(".slide-link").attr("href", href);
    $(".slide-title").text(slideTitle);
    index = (index + 1) % numberOfBackgrounds;
    if (
      $(window).width() <= 414 &&
      src === "./images/crying-in-the-rain-slide.png"
    ) {
      $(".slides").css("background-position", "45%");
    } else {
      $(".slides").css("background-position", "left");
    }
    slideshow(images, index);
  }, 10000);
};

$(() => {
  trackResize();
  initiateTypeWriter();
  initiateSlideshow(backgroundImages, 0);
  // slideshowControls();
});

const slideshowControls = () => {
  $("#left-slide-arrow").on("click touchstart", e => {
    index = (index - 1) % numberOfBackgrounds;
    slideshow(images, index);
  });
  $("#right-slide-arrow").on("click touchstart", e => {
    index = (index + 1) % numberOfBackgrounds;
    slideshow(images, index);
  });
};
