document.addEventListener("DOMContentLoaded", function () {
  let cookies = document.querySelector("#count");
  let clicked = document.querySelector("#clicked");
  let purchased = document.querySelector("#purchasedItem");
  let timer = document.querySelector("#timer");
  const cookieBtn = document.querySelector("#cookieBtn");
  const startBtn = document.querySelector("#start");
  const replayBtn = document.querySelector("#replay");
  const itemA = document.querySelector("#itemA");
  const itemB = document.querySelector("#itemB");
  const itemC = document.querySelector("#itemC");
  const arrowRight = document.querySelector(".fa-chevron-right");
  const arrowLeft = document.querySelector(".fa-chevron-left");
  const modal = document.querySelector("#gameModal");
  let cookiesCounter = 0;
  let clickedCounter = 0;
  let purchasedCounter = 0;
  let interval = null;

  // ============== Game Settings ============== //
  // Set game time limit
  const timeSet = 1;
  // Set item cost here
  const itemACost = 5;
  const itemBCost = 100;
  const itemCCost = 200;
  // ========================================== //

  // Disable Items & Elements at the Start
  itemA.setAttribute("disabled", "");
  itemB.setAttribute("disabled", "");
  itemC.setAttribute("disabled", "");
  cookieBtn.setAttribute("disabled", "");

  // ======= Timer ======= //
  let time = timeSet * 60;
  function stopwatch() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    timer.innerHTML = `${minutes} : ${seconds} `;
    time--;
  }

  // Start Game button
  startBtn.addEventListener("click", startGame);
  function startGame(e) {
    interval = setInterval(stopwatch, 1000);
    cookieBtn.removeAttribute("disabled");
    startBtn.setAttribute("disabled", "");
    arrowRight.style.display = "none";
    arrowLeft.style.display = "none";
    new Audio((src = "/audio/click.mp3")).play();
    e.preventDefault();
  }

  // Replay Game button
  replayBtn.addEventListener("click", replayGame);
  function replayGame(e) {
    location.reload();
    modal.style.display = "none";
    new Audio((src = "/audio/click.mp3")).play();
    e.preventDefault();
  }

  // Check Cookies & Game Time every 0.1 second
  let check = function () {
    if (cookiesCounter >= 50) {
      itemB.removeAttribute("disabled");
    }

    if (cookiesCounter >= 100) {
      itemC.removeAttribute("disabled");
    }

    if (time === 0) {
      clearInterval(interval);
      timer.innerHTML = "Time Out";
      timer.style.color = "rgb(255, 92, 92)";

      // Set delay for buttons
      setTimeout(function () {
        // Disable cookie button
        cookieBtn.setAttribute("disabled", "");
        // Display modal
        modal.style.display = "block";
      }, 500);
    }
  };
  setInterval(check, 1000 / 100);

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
    new Audio((src = "/audio/bite.mp3")).play();
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
    new Audio((src = "/audio/item.mp3")).play();
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
    new Audio((src = "/audio/item.mp3")).play();
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
    new Audio((src = "/audio/item.mp3")).play();
  });
});
