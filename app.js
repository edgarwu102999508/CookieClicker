document.addEventListener("DOMContentLoaded", function () {
  let cookies = document.querySelector("#count");
  let clicked = document.querySelector("#clicked");
  let purchased = document.querySelector("#purchasedItem");
  let timer = document.querySelector("#timer");
  const cookieBtn = document.querySelector("#cookieBtn");
  const restartBtn = document.querySelector("#reset");
  const itemA = document.querySelector("#itemA");
  const itemB = document.querySelector("#itemB");
  const itemC = document.querySelector("#itemC");
  const arrowRight = document.querySelector(".fa-chevron-right");
  const arrowLeft = document.querySelector(".fa-chevron-left");
  let cookiesCounter = 0;
  let clickedCounter = 0;
  let purchasedCounter = 0;

  // ============== Game Settings ============== //
  // Set game time limit
  const timeSet = 1;
  // Set item cost here
  const itemACost = 5;
  const itemBCost = 25;
  const itemCCost = 100;
  // ========================================== //

  // Disable Items & Elements at Start
  itemA.setAttribute("disabled", "");
  itemB.setAttribute("disabled", "");
  itemC.setAttribute("disabled", "");
  restartBtn.setAttribute("disabled", "");
  arrowRight.style.display = "none";
  arrowLeft.style.display = "none";

  // ======= Timer ======= //
  let time = timeSet * 60;
  let countDown = setInterval(updateCountdown, 1000);
  function updateCountdown() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    timer.innerHTML = `${minutes} : ${seconds} `;
    if (time > 0) {
      time--;
    } else {
      clearInterval(countDown);
      timer.innerHTML = "Time Out";
      timer.style.color = "rgb(255, 92, 92)";
      // Set delay for alert popup
      setTimeout(function () {
        alert("Game Over");
      }, 500);
    }
  }

  // Check Cookies & Game Time every 0.1 second
  setInterval(function () {
    if (cookiesCounter >= 50) {
      itemB.removeAttribute("disabled");
    }

    if (cookiesCounter >= 100) {
      itemC.removeAttribute("disabled");
    }

    if (time === 0) {
      // Set delay for button
      setTimeout(function () {
        restartBtn.removeAttribute("disabled");
        arrowRight.style.display = "initial";
        arrowLeft.style.display = "initial";
        // Disable cookie button
        cookieBtn.setAttribute("disabled", "");
      }, 2000);
    }
  }, 1000 / 100);

  // Replay Game button
  restartBtn.addEventListener("click", function () {
    location.reload();
  });

  // Cookie button
  cookieBtn.addEventListener("click", function () {
    cookies.innerHTML = cookiesCounter = cookiesCounter + 1;
    clicked.innerHTML = clickedCounter = clickedCounter + 1;
    if (cookiesCounter >= 5) {
      itemA.removeAttribute("disabled");
    }

    if (cookiesCounter >= 50) {
      itemB.removeAttribute("disabled");
    }

    if (cookiesCounter >= 100) {
      itemC.removeAttribute("disabled");
    }
  });

  // ======= Items ======= //
  itemA.addEventListener("click", function () {
    let cookieMineA = setInterval(cookieIncrementA, 1000);
    function cookieIncrementA() {
      cookies.innerHTML = cookiesCounter++;
      if (time === 0) {
        clearInterval(cookieMineA);
      }
    }

    if (cookiesCounter >= itemACost && time > 0) {
      purchased.innerHTML = purchasedCounter = purchasedCounter + 1;
      cookies.innerHTML = cookiesCounter = cookiesCounter - itemACost;
    } else {
      alert("Not enough Cookies!!!");
    }
  });

  itemB.addEventListener("click", function () {
    let cookieMineB = setInterval(cookieIncrementB, 1000);
    function cookieIncrementB() {
      cookies.innerHTML = cookiesCounter = cookiesCounter + 50;
      if (time === 0) {
        clearInterval(cookieMineB);
      }
    }

    if (cookiesCounter >= itemBCost) {
      purchased.innerHTML = purchasedCounter = purchasedCounter + 1;
      cookies.innerHTML = cookiesCounter = cookiesCounter - itemBCost;
    } else {
      alert("Not enough Cookies!!!");
    }
  });

  itemC.addEventListener("click", function () {
    let cookieMineC = setInterval(cookieIncrementC, 1000);
    function cookieIncrementC() {
      cookies.innerHTML = cookiesCounter = cookiesCounter + 100;
      if (time === 0) {
        clearInterval(cookieMineC);
      }
    }

    if (cookiesCounter >= itemCCost) {
      purchased.innerHTML = purchasedCounter = purchasedCounter + 1;
      cookies.innerHTML = cookiesCounter = cookiesCounter - itemCCost;
    } else {
      alert("Not enough Cookies!!!");
    }
  });
});
