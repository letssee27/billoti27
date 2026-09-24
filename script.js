const loader=document.getElementById("loader");
window.addEventListener("load",()=>setTimeout(()=>loader.style.opacity="0",500));
setTimeout(()=>loader.remove(),1300);
const intro = document.getElementById("introScreen");
const envelope = document.getElementById("envelope");
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
let started = false;
/* =========================
   MAGICAL ENVELOPE
   ========================= */

envelope.addEventListener("click", () => {

  // Prevent multiple clicks
  if (started) return;

  started = true;

  // Open envelope
  envelope.classList.add("open");

  // Create floating hearts
  createEnvelopeHearts();

  // Create sparkle burst
  createEnvelopeSparkles();

  // Hide the intro after the animation finishes
  setTimeout(() => {

    intro.classList.add("hide");

    document.getElementById("top").scrollIntoView({
      behavior: "smooth"
    });

    tryMusic();

  }, 1500);

});


/* Floating hearts */
function createEnvelopeHearts() {

  const hearts = ["♥", "♡", "❤", "💕"];

  for (let i = 0; i < 14; i++) {

    const heart = document.createElement("span");

    heart.className = "envelope-heart";

    heart.textContent =
      hearts[Math.floor(Math.random() * hearts.length)];

    const rect = envelope.getBoundingClientRect();

    heart.style.left =
      rect.left + rect.width / 2 + (Math.random() - .5) * 220 + "px";

    heart.style.top =
      rect.top + rect.height / 2 + (Math.random() - .5) * 80 + "px";

    heart.style.setProperty(
      "--drift",
      `${(Math.random() - .5) * 180}px`
    );

    heart.style.fontSize =
      `${12 + Math.random() * 18}px`;

    heart.style.animationDelay =
      `${Math.random() * .35}s`;

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 2200);
  }
}


/* Sparkles */
function createEnvelopeSparkles() {

  const sparkles = ["✦", "✧", "⋆", "✦", "♡"];

  for (let i = 0; i < 18; i++) {

    const sparkle = document.createElement("span");

    sparkle.className = "envelope-sparkle";

    sparkle.textContent =
      sparkles[Math.floor(Math.random() * sparkles.length)];

    const rect = envelope.getBoundingClientRect();

    sparkle.style.left =
      rect.left + rect.width / 2 + (Math.random() - .5) * 300 + "px";

    sparkle.style.top =
      rect.top + rect.height / 2 + (Math.random() - .5) * 180 + "px";

    sparkle.style.animationDelay =
      `${Math.random() * .4}s`;

    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 1800);
  }
}





function tryMusic(){
  music.play()
  .catch(()=> {
    musicBtn.querySelector(".music-text").textContent = "Music";
}); 
}
  

musicBtn.addEventListener("click", () => {

  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }

});


/* Stop background music when her song starts */

const herSong = document.querySelector(".song-area audio");

if (herSong) {

  herSong.addEventListener("play", () => {

     // Remember that the background music was playing
    if (!music.paused) {
      music.pause();
      music.dataset.wasPlaying = "true";
    }

  });
  herSong.addEventListener("pause", () => {

    // Resume background music when her song is paused
    if (music.dataset.wasPlaying === "true") {

      music.play().catch(() => {});

      music.dataset.wasPlaying = "false";

    }

  });

}

music.addEventListener("play", () => {

  musicBtn.classList.add("playing");

  musicBtn.querySelector(".music-text").textContent = "Playing";

});


music.addEventListener("pause", () => {

  musicBtn.classList.remove("playing");

  musicBtn.querySelector(".music-text").textContent = "Music";

});

document.getElementById("startBtn").addEventListener("click",()=>document.getElementById("story").scrollIntoView({behavior:"smooth"}));

const msg=`Happy Birthday, Kanupriya! 🎂🥳

Wishing the busiest (and sleepiest 😴) future doctor a birthday as amazing as you are! Here's to another year of acing exams, saving lives one day at a time, and still making time for your two true loves — sleep and cats 🐱💤

May this year bring you less stress, more naps, extra cuddles from cats, and every success you're working so hard for. The world needs more doctors like you — kind, brilliant, and secretly powered by catnaps ✨

Happy Birthday, future Dr. Kanupriya! Can't wait to watch you shine 🩺💫.`;




/* =========================
   STEP 5 - SCROLL ANIMATIONS
   ========================= */

const revealElements = document.querySelectorAll(
  ".post, .mini-post, .traits-grid > div, .song-area, .final-inner"
);

const revealObserver = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if (entry.isIntersecting) {

      entry.target.classList.add("reveal-visible");

      revealObserver.unobserve(entry.target);

    }

  });

}, {
  threshold: 0.15
});


revealElements.forEach((element, index) => {

  element.classList.add("scroll-reveal");

  element.style.setProperty(
    "--delay",
    `${index * 0.08}s`
  );

  revealObserver.observe(element);

});



/* =========================
   STAGGER MEMORY POSTS
   ========================= */

document.querySelectorAll(".post").forEach((post, index) => {

  post.style.setProperty(
    "--delay",
    `${Math.min(index * 0.12, 0.5)}s`
  );

});


/* =========================
   STAGGER TRAITS
   ========================= */

document.querySelectorAll(".traits-grid > div").forEach((card, index) => {

  card.style.setProperty(
    "--delay",
    `${index * 0.12}s`
  );

});


/* =========================
   STAGGER EXTRA MEMORIES
   ========================= */

document.querySelectorAll(".mini-post").forEach((post, index) => {

  post.style.setProperty(
    "--delay",
    `${index * 0.1}s`
  );

});



/* =========================
   INTERACTIVE LETTER
   ========================= */
const openLetter = document.getElementById("openLetter");
const letterPaper = document.getElementById("letterPaper");
const letterContent = document.getElementById("letterContent");
const typed = document.getElementById("typed");

let letterOpened = false;

if (openLetter) {

  openLetter.addEventListener("click", function () {

    if (letterOpened) return;

    letterOpened = true;

    /* Open paper */
    letterPaper.classList.add("opened");

    /* Hide button */
    openLetter.classList.add("hidden");

    /* Wait for opening animation */
    setTimeout(() => {

      letterContent.classList.add("visible");

      typeLetter();

    }, 650);

  });

}


/* Type the letter */
function typeLetter() {

  if (!typed) return;

  let i = 0;

  typed.textContent = "";

  const timer = setInterval(() => {

    typed.textContent += msg.charAt(i);

    i++;

    if (i >= msg.length) {
      clearInterval(timer);
    }

  }, 14);

}

/* Typewriter */
function typeText() {

  const el = document.getElementById("typed");

  let i = 0;

  const timer = setInterval(() => {

    el.textContent += msg[i];

    i++;

    if (i >= msg.length) {
      clearInterval(timer);
    }

  }, 14);

}





/* =========================
   INTERACTIVE MEMORIES
   ========================= */

const allMemoryImages = [
  ...document.querySelectorAll(".post img"),
  ...document.querySelectorAll(".mini-post img")
];

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
let currentMemory = 0;


/* Open a memory */
function openMemory(index) {

  if (!allMemoryImages.length) return;

  currentMemory = index;

  lightboxImg.src = allMemoryImages[currentMemory].src;

  lightbox.classList.add("open");

  document.body.style.overflow = "hidden";

}


/* Close memory */
function closeMemory() {

  lightbox.classList.remove("open");

  document.body.style.overflow = "";

}


/* Click images */
allMemoryImages.forEach((img, index) => {

let clickTimer = null;
let lastTap = 0;

function triggerLike() {


createBigHeart(img);

// Find the memory post containing this image
const post = img.closest(".post");

if (!post) return;

const heart = post.querySelector(".post-actions span");

if (!heart) return;

heart.textContent = "♥";
heart.style.color = "#e84e83";


}

// Desktop single click / double click
img.addEventListener("click", () => {


clearTimeout(clickTimer);

clickTimer = setTimeout(() => {

  openMemory(index);

}, 220);


});

img.addEventListener("dblclick", (e) => {


e.preventDefault();

clearTimeout(clickTimer);

triggerLike();


});

// Mobile double-tap
img.addEventListener("touchend", (e) => {


const now = Date.now();

if (now - lastTap < 350) {

  e.preventDefault();

  clearTimeout(clickTimer);

  triggerLike();

}

lastTap = now;


}, { passive: false });

});



/* Close button */
closeLightbox.addEventListener("click", closeMemory);
lightboxPrev.addEventListener("click", (e) => {

  e.stopPropagation();

  previousMemory();

});


lightboxNext.addEventListener("click", (e) => {

  e.stopPropagation();

  nextMemory();

});

/* Click outside image */
lightbox.addEventListener("click", e => {

  if (e.target === lightbox) {
    closeMemory();
  }

});


/* Escape key */
document.addEventListener("keydown", e => {

  if (!lightbox.classList.contains("open")) return;

  if (e.key === "Escape") {
    closeMemory();
  }

  if (e.key === "ArrowRight") {
    lightboxNext.click();
  }

  if (e.key === "ArrowLeft") {
    previousMemory();
  }

});


/* Next memory */
function nextMemory() {

  currentMemory++;

  if (currentMemory >= allMemoryImages.length) {
    currentMemory = 0;
  }

  changeMemory();

}


/* Previous memory */
function previousMemory() {

  currentMemory--;

  if (currentMemory < 0) {
    currentMemory = allMemoryImages.length - 1;
  }

  changeMemory();

}


/* Change image with animation */
function changeMemory() {

  lightboxImg.animate(
    [
      {
        opacity: 0,
        transform: "scale(.94)"
      },
      {
        opacity: 1,
        transform: "scale(1)"
      }
    ],
    {
      duration: 350,
      easing: "ease-out"
    }
  );

  lightboxImg.src = allMemoryImages[currentMemory].src;

}


/* Big heart animation */
function createBigHeart(img) {

  const heart = document.createElement("div");

  heart.textContent = "♥";

  const rect = img.getBoundingClientRect();

  heart.style.cssText = `
    position: fixed;
    left: ${rect.left + rect.width / 2}px;
    top: ${rect.top + rect.height / 2}px;
    transform: translate(-50%, -50%) scale(.5);
    color: #f66d9b;
    font-size: 80px;
    z-index: 1000;
    pointer-events: none;
    text-shadow: 0 5px 25px #d94f8255;
  `;

  document.body.appendChild(heart);

  heart.animate(
    [
      {
        transform: "translate(-50%, -50%) scale(.4)",
        opacity: 0
      },
      {
        transform: "translate(-50%, -50%) scale(1.2)",
        opacity: 1,
        offset: .35
      },
      {
        transform: "translate(-50%, -50%) scale(1)",
        opacity: 0
      }
    ],
    {
      duration: 800,
      easing: "cubic-bezier(.2,.8,.2,1)"
    }
  ).onfinish = () => heart.remove();

}


/* =========================
   MEMORY LIKE BUTTONS
   ========================= */

document.querySelectorAll(".post").forEach(post => {

  const actionArea = post.querySelector(".post-actions");
  const heart = actionArea?.querySelector("span");

  if (!heart) return;

  let liked = false;

  heart.style.cursor = "pointer";

  heart.addEventListener("click", () => {

    liked = !liked;

    if (liked) {

      heart.textContent = "♥";
      heart.style.color = "#e84e83";

      createBigHeart(post.querySelector("img"));

    } else {

      heart.textContent = "♡";
      heart.style.color = "";

    }

  });

});


/* =========================
   LIGHTBOX SWIPE SUPPORT
   ========================= */

let touchStartX = 0;

lightbox.addEventListener("touchstart", e => {

  touchStartX = e.touches[0].clientX;

});


lightbox.addEventListener("touchend", e => {

  const touchEndX = e.changedTouches[0].clientX;

  const difference = touchStartX - touchEndX;

  if (Math.abs(difference) < 50) return;

  if (difference > 0) {
    nextMemory();
  } else {
    previousMemory();
  }

});






/* =========================
   BIRTHDAY CAKE
   ========================= */

const candles = [
  ...document.querySelectorAll(".candle")
];

const cakeStatus = document.getElementById("cakeStatus");

let candlesBlown = 0;
let wishReleased = false;


/* Candle click */
candles.forEach((candle, index) => {

  candle.addEventListener("click", () => {

    // Don't click the same candle twice
    if (candle.classList.contains("off")) return;

    candle.classList.add("off");

    candlesBlown++;

    // Create smoke
    createSmoke(candle);

    const remaining = candles.length - candlesBlown;

    if (remaining > 0) {

      cakeStatus.textContent =
        `${remaining} little flame${remaining > 1 ? "s" : ""} left... make it a good one ✨`;

    } else {

      releaseWish();

    }

  });

});


/* =========================
   SMOKE
   ========================= */

function createSmoke(candle) {

  const smoke = document.createElement("span");

  smoke.className = "candle-smoke";

  smoke.textContent = "〰";

  const rect = candle.getBoundingClientRect();

  smoke.style.left =
    `${rect.left + rect.width / 2}px`;

  smoke.style.top =
    `${rect.top - 5}px`;

  document.body.appendChild(smoke);

  setTimeout(() => {
    smoke.remove();
  }, 1600);

}


/* =========================
   WISH RELEASE
   ========================= */

function releaseWish() {

  if (wishReleased) return;

  wishReleased = true;

  cakeStatus.textContent =
    "Wish released into the universe. 💗✨";

  document.querySelector(".cake").classList.add("celebrate");

  // Small delay makes the celebration feel intentional
  setTimeout(() => {

    confetti();

    createWishHearts();

  }, 350);

}


/* =========================
   HEART CELEBRATION
   ========================= */

function createWishHearts() {

  for (let i = 0; i < 18; i++) {

    const heart = document.createElement("span");

    heart.textContent =
      Math.random() > .5 ? "♥" : "♡";

    heart.style.cssText = `
      position: fixed;
      left: ${45 + Math.random() * 10}vw;
      top: 55vh;
      z-index: 900;
      color: ${Math.random() > .5 ? "#f66d9b" : "#e84e83"};
      font-size: ${12 + Math.random() * 18}px;
      pointer-events: none;
    `;

    document.body.appendChild(heart);

    heart.animate(
      [
        {
          transform: "translate(0,0) scale(.5)",
          opacity: 0
        },
        {
          transform: "translate(0,-80px) scale(1)",
          opacity: 1,
          offset: .2
        },
        {
          transform:
            `translate(${(Math.random() - .5) * 300}px,-${180 + Math.random() * 250}px) scale(1.2)`,
          opacity: 0
        }
      ],
      {
        duration: 1600 + Math.random() * 800,
        easing: "cubic-bezier(.2,.8,.3,1)"
      }
    ).onfinish = () => heart.remove();

  }

}







function confetti(){for(let i=0;i<65;i++){let x=document.createElement("i");x.textContent=["♥","✦","✧","♡"][Math.floor(Math.random()*4)];x.style.cssText=`position:fixed;left:${45+Math.random()*10}vw;top:45vh;z-index:800;color:${Math.random()>.5?"#f66d9b":"#f4b44f"};font-size:${12+Math.random()*18}px;pointer-events:none`;document.body.appendChild(x);x.animate([{transform:"translate(0,0) scale(1)",opacity:1},{transform:`translate(${(Math.random()-.5)*800}px,${250+Math.random()*600}px) rotate(${Math.random()*720}deg)`,opacity:0}],{duration:1200+Math.random()*1300,easing:"cubic-bezier(.2,.8,.3,1)"}).onfinish=()=>x.remove()}}
function particle(){let p=document.createElement("span");p.textContent=["♡","♥","✦","✧"][Math.floor(Math.random()*4)];p.style.cssText=`position:fixed;left:${Math.random()*100}vw;bottom:-20px;color:#f28caf;opacity:.45;font-size:${10+Math.random()*16}px;z-index:1;pointer-events:none`;document.getElementById("particles").appendChild(p);p.animate([{transform:"translateY(0)",opacity:.5},{transform:`translateY(-110vh) rotate(${Math.random()*180}deg)`,opacity:0}],{duration:7000+Math.random()*5000}).onfinish=()=>p.remove()}
setInterval(particle,650);

window.addEventListener("scroll",()=>{let h=document.documentElement.scrollHeight-innerHeight;document.getElementById("progressBar").style.width=(scrollY/h*100)+"%"});
document.getElementById("againBtn").addEventListener("click",()=>{location.hash="";location.reload()});


/* =========================
   STEP 7 - MOBILE MENU
   ========================= */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileClose = document.getElementById("mobileClose");
const mobileLinks = document.querySelectorAll(".mobile-menu a");


menuBtn.addEventListener("click", () => {

  mobileMenu.classList.add("open");

});


mobileClose.addEventListener("click", () => {

  mobileMenu.classList.remove("open");

});


mobileLinks.forEach(link => {

  link.addEventListener("click", () => {

    mobileMenu.classList.remove("open");

  });

});


/* =========================
VIDEO MEMORY 01
========================= */

const birthdayVideoCard =
document.getElementById("birthdayVideoCard");

const videoLightbox =
document.getElementById("videoLightbox");

const birthdayVideo =
document.getElementById("birthdayVideo");

const closeVideo =
document.getElementById("closeVideo");

/*
Remember whether background music
was playing before the video opened.
*/
let bgMusicWasPlayingBeforeVideo = false;

/* Open video */

if (birthdayVideoCard) {

birthdayVideoCard.addEventListener("click", () => {


/*
  Remember the current music state.
  We only resume it if it was actually
  playing before the video started.
*/
bgMusicWasPlayingBeforeVideo = !music.paused;

/* Pause birthday background music */
if (!music.paused) {
  music.pause();
}

/* Open video lightbox */
videoLightbox.classList.add("open");

document.body.style.overflow = "hidden";

/* Start video from beginning */
birthdayVideo.currentTime = 0;

birthdayVideo.play().catch(() => {});


});

}

/* Close video */

function closeBirthdayVideo() {

/* Stop video */
birthdayVideo.pause();

birthdayVideo.currentTime = 0;

/* Close lightbox */
videoLightbox.classList.remove("open");

document.body.style.overflow = "";

/*
Resume background music only if it was
playing before the video opened.
*/
if (bgMusicWasPlayingBeforeVideo) {


music.play().catch(() => {});


}

bgMusicWasPlayingBeforeVideo = false;

}

/* Close button */

if (closeVideo) {

closeVideo.addEventListener(
"click",
closeBirthdayVideo
);

}

/* Click outside the video */

if (videoLightbox) {

videoLightbox.addEventListener("click", (e) => {


if (e.target === videoLightbox) {
  closeBirthdayVideo();
}


});

}

/*
When the video finishes naturally,
close it and resume background music.
*/

birthdayVideo.addEventListener("ended", () => {

closeBirthdayVideo();

});

/* Escape key */

document.addEventListener("keydown", (e) => {

if (!videoLightbox.classList.contains("open")) {
return;
}

if (e.key === "Escape") {
closeBirthdayVideo();
}

});

/* =========================
   FOUR BIRTHDAY VIDEOS
   ========================= */

(() => {

  const videoButtons =
    document.querySelectorAll(".video-open-btn");

  const videoLightbox =
    document.getElementById("videoLightbox");

  const birthdayVideo =
    document.getElementById("birthdayVideo");

  const videoClose =
    document.getElementById("videoClose");

  /* Safety check */
  if (
    !videoButtons.length ||
    !videoLightbox ||
    !birthdayVideo ||
    !videoClose
  ) {
    return;
  }

  let bgWasPlaying = false;


  /* OPEN VIDEO */

  videoButtons.forEach(button => {

    button.addEventListener("click", () => {

      const file = button.getAttribute("data-video");

      if (!file) return;


      /* Remember background music state */

      bgWasPlaying =
        typeof music !== "undefined" &&
        music &&
        !music.paused;


      /* Pause background music */

      if (bgWasPlaying) {
        music.pause();
      }


      /* Load video */

      birthdayVideo.src = file;

      birthdayVideo.load();

      videoLightbox.classList.add("open");

      document.body.style.overflow = "hidden";


      /* Play video */

      birthdayVideo.play().catch(() => {});

    });

  });


  /* RESUME BACKGROUND MUSIC */

  function resumeBackground() {

    if (
      bgWasPlaying &&
      typeof music !== "undefined" &&
      music
    ) {

      music.play().catch(() => {});

    }

    bgWasPlaying = false;

  }


  /* CLOSE VIDEO */

  function closeVideo() {

    birthdayVideo.pause();

    birthdayVideo.removeAttribute("src");

    birthdayVideo.load();

    videoLightbox.classList.remove("open");

    document.body.style.overflow = "";

    resumeBackground();

  }


  /* VIDEO FINISHED */

  birthdayVideo.addEventListener("ended", () => {

    closeVideo();

  });


  /* CLOSE BUTTON */

  videoClose.addEventListener("click", () => {

    closeVideo();

  });


  /* CLICK OUTSIDE */

  videoLightbox.addEventListener("click", event => {

    if (event.target === videoLightbox) {

      closeVideo();

    }

  });


  /* ESCAPE */

  document.addEventListener("keydown", event => {

    if (
      event.key === "Escape" &&
      videoLightbox.classList.contains("open")
    ) {

      closeVideo();

    }

  });

})();

/* =========================
   SECRET CAT EGG 🐱
   ========================= */

const catEgg = document.getElementById("catEgg");

if (catEgg) {

  function catSurprise() {

    /* Bounce the cat */

    catEgg.classList.remove("cat-bounce");

    // Force animation restart
    void catEgg.offsetWidth;

    catEgg.classList.add("cat-bounce");


    /* Secret message */

    const rect = catEgg.getBoundingClientRect();

    const message = document.createElement("div");

    message.className = "cat-message";

    message.textContent = "Meoww..🐱🎂💕";

    message.style.left =
      `${rect.left + rect.width / 2}px`;

    message.style.top =
      `${rect.top - 10}px`;

    document.body.appendChild(message);

    setTimeout(() => {
      message.remove();
    }, 1000);


    /* Little hearts */

    for (let i = 0; i < 7; i++) {

      const heart = document.createElement("span");

      heart.className = "secret-heart";

      heart.textContent =
        Math.random() > .5 ? "♥" : "♡";

      heart.style.left =
        `${rect.left + rect.width / 2}px`;

      heart.style.top =
        `${rect.top + rect.height / 2}px`;

      document.body.appendChild(heart);


      heart.animate(
        [
          {
            transform: "translate(-50%, -50%) scale(.5)",
            opacity: 0
          },
          {
            transform:
              `translate(${(Math.random() - .5) * 100}px, -${40 + Math.random() * 40}px) scale(1)`,
            opacity: 1,
            offset: .3
          },
          {
            transform:
              `translate(${(Math.random() - .5) * 180}px, -${100 + Math.random() * 100}px) scale(.7)`,
            opacity: 0
          }
        ],
        {
          duration: 1100 + Math.random() * 400,
          easing: "cubic-bezier(.2,.8,.3,1)"
        }
      ).onfinish = () => heart.remove();

    }

  }


  /* Mouse */

  catEgg.addEventListener("click", catSurprise);


  /* Keyboard accessibility */

  catEgg.addEventListener("keydown", (e) => {

    if (e.key === "Enter" || e.key === " ") {

      e.preventDefault();

      catSurprise();

    }

  });

}


/* =========================
   TAP ANYWHERE → FLOATING HEART
   ========================= */

document.addEventListener("click", (e) => {

  /* Don't interfere with existing interactive elements */

  if (
    e.target.closest(
      "button, a, img, video, audio, input, textarea, select, .cat-egg, .lightbox"
    )
  ) {
    return;
  }


  const heart = document.createElement("span");

  heart.className = "secret-heart";

  heart.textContent =
    Math.random() > .5 ? "♡" : "♥";

  heart.style.left = `${e.clientX}px`;
  heart.style.top = `${e.clientY}px`;

  heart.style.fontSize =
    `${12 + Math.random() * 12}px`;

  document.body.appendChild(heart);


  heart.animate(
    [
      {
        transform: "translate(-50%, -50%) scale(.5)",
        opacity: 0
      },
      {
        transform:
          `translate(${(Math.random() - .5) * 50}px, -45px) scale(1)`,
        opacity: .9,
        offset: .25
      },
      {
        transform:
          `translate(${(Math.random() - .5) * 110}px, -130px) scale(.7)`,
        opacity: 0
      }
    ],
    {
      duration: 1100,
      easing: "cubic-bezier(.2,.8,.3,1)"
    }
  ).onfinish = () => heart.remove();

});
