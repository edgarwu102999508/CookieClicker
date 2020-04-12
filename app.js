let timer = document.querySelector("#timer");
let cookies = document.querySelector("#count");
let clicked = document.querySelector("#clicked");
let purchased = document.querySelector("#purchasedItem");
const cookieBtn = document.querySelector("#cookie");
const itemA = document.querySelector("#itemA");
const itemB = document.querySelector("#itemB");
const itemC = document.querySelector("#itemC");
let cookiesCounter = 0;
let clickedCounter = 0;
let purchasedCounter = 0;
let timeSet = 3000;

// function convertSeconds(s) {
//   let min = Math.floor(s / 60);
//   let sec = Math.floor(s & 60);
//   return min + " : " + sec;
// }

document.addEventListener("DOMContentLoaded", function () {
  // Disable Items
  itemA.setAttribute("disabled", "");
  itemB.setAttribute("disabled", "");
  itemC.setAttribute("disabled", "");

  // Check cookies amount automatically
  setInterval(function () {
    if (cookiesCounter >= 50) {
      itemB.removeAttribute("disabled");
    } else if (cookiesCounter >= 100) {
      itemC.removeAttribute("disabled");
    }
  }, 1000 / 60);

  // Item functionality
  itemA.addEventListener("click", function () {
    purchased.innerHTML = purchasedCounter = purchasedCounter + 1;
    cookies.innerHTML = cookiesCounter = cookiesCounter - 5;
    setInterval(function () {
      cookies.innerHTML = cookiesCounter++;
    }, 1000);
  });

  itemB.addEventListener("click", function () {
    purchased.innerHTML = purchasedCounter = purchasedCounter + 1;
    cookies.innerHTML = cookiesCounter = cookiesCounter - 25;
    setInterval(function () {
      cookies.innerHTML = cookiesCounter = cookiesCounter + 50;
    }, 1000);
  });

  itemC.addEventListener("click", function () {
    purchased.innerHTML = purchasedCounter = purchasedCounter + 1;
    cookies.innerHTML = cookiesCounter = cookiesCounter - 50;
    setInterval(function () {
      cookies.innerHTML = cookiesCounter = cookiesCounter + 100;
    }, 1000);
  });

  // Cookie button
  cookieBtn.addEventListener("click", function () {
    cookies.innerHTML = cookiesCounter = cookiesCounter + 1;
    clicked.innerHTML = clickedCounter = clickedCounter + 1;
    if (cookiesCounter >= 5) {
      itemA.removeAttribute("disabled");
    } else if (cookiesCounter >= 50) {
      itemB.removeAttribute("disabled");
    } else if (cookiesCounter >= 100) {
      itemC.removeAttribute("disabled");
    }
  });
});
