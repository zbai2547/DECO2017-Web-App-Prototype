(function login() {
  const isLogin = window.localStorage.getItem("isLogin");
  if (!isLogin) {
    window.location = "/login.html";
  }
})();
window.onload = function () {
  document.querySelector(".avatar").addEventListener("click", function () {
    location.href = "./login.html";
  });
  let times = document.querySelectorAll(".timeline .time");
  let timeDet = document.querySelector(".timeline .time-det");
  times[0].addEventListener("click", function () {
    times[0].className = "time time1 s";
    times[1].className = "time time2";
    times[2].className = "time time3";
    timeDet.className = "time-det show s1";
    document.querySelector(".det-t1").innerText = "Quiz 1";
    document.querySelector(".det-t2").innerText = "April 10，2021";
  });
  times[1].addEventListener("click", function () {
    times[0].className = "time time1";
    times[1].className = "time time2 s";
    times[2].className = "time time3";
    timeDet.className = "time-det show s2";
    document.querySelector(".det-t1").innerText = "Quiz 2";
    document.querySelector(".det-t2").innerText = "May 15，2021";
  });
  times[2].addEventListener("click", function () {
    times[0].className = "time time1";
    times[1].className = "time time2";
    times[2].className = "time time3 s";
    timeDet.className = "time-det show s3";
    document.querySelector(".det-t1").innerText = "Final Exam";
    document.querySelector(".det-t2").innerText = "June 05，2021";
  });
  document
    .querySelector(".timeline .time-det .up")
    .addEventListener("click", function () {
      timeDet.className = "time-det";
      times[0].className = "time time1";
      times[1].className = "time time2";
      times[2].className = "time time3";
    });
  document
    .querySelector(".task-right .add")
    .addEventListener("click", function () {
      document.querySelector(".task-modal").style.display = "flex";
      setTimeout(() => {
        document.querySelector(".task-modal-inner").className =
          "task-modal-inner show";
      });
    });
  function close() {
    document.querySelector(".task-modal").style.display = "none";
    document.querySelector(".task-modal-inner").className = "task-modal-inner";
  }
  document
    .querySelector(".task-modal-btn .cancel")
    .addEventListener("click", close);
  document
    .querySelector(".task-modal-btn .ok")
    .addEventListener("click", close);

  document
    .querySelector(".tool-search input")
    .addEventListener("input", function () {
      if (this.value) {
        document.querySelector(".tool-search-res").className =
          "tool-search-res show";
      } else {
        document.querySelector(".tool-search-res").className =
          "tool-search-res";
      }
    });
  document
    .querySelector(".tool-search input")
    .addEventListener("blur", function () {
      document.querySelector(".tool-search-res").className = "tool-search-res";
    });

  document
    .querySelector(".nav-search input")
    .addEventListener("input", function () {
      if (this.value) {
        document.querySelector(".nav-search-res").className =
          "nav-search-res show";
      } else {
        document.querySelector(".nav-search-res").className = "nav-search-res";
      }
    });
  document
    .querySelector(".nav-search input")
    .addEventListener("blur", function () {
      document.querySelector(".nav-search-res").className = "nav-search-res";
    });
  document.querySelector(".nav .search").addEventListener("click", function () {
    document.querySelector(".nav-search").className = "nav-search show";
  });
  document
    .querySelector(".nav-search .r")
    .addEventListener("click", function () {
      document.querySelector(".nav-search").className = "nav-search";
    });

  let timer;
  let timeS = 0;
  let domH = document.querySelector(".tool-timer-H span");
  let domM = document.querySelector(".tool-timer-M span");
  let domS = document.querySelector(".tool-timer-S span");
  function exec() {
    timeS++;
    domH.innerText = String(Math.floor(timeS / 3600)).padStart(2, "0");
    domM.innerText = String(Math.floor((timeS % 3600) / 60)).padStart(2, "0");
    domS.innerText = String(Math.floor(timeS % 60)).padStart(2, "0");
  }
  document
    .querySelector(".tool-timer-btn-1")
    .addEventListener("click", function () {
      if (this.innerText === "START") {
        this.innerText = "STOP";
        clearInterval(timer);
        timer = setInterval(exec, 1000);
      } else {
        this.innerText = "START";
        clearInterval(timer);
      }
    });
  document
    .querySelector(".tool-timer-btn-2")
    .addEventListener("click", function () {
      clearInterval(timer);
      timeS = 0;
      domH.innerText = "00";
      domM.innerText = "00";
      domS.innerText = "00";
      document.querySelector(".tool-timer-btn-1").innerText = "START";
    });

  let musics = [];
  let musicIndex = 0;
  let isPlay = false;
  let audio = document.querySelector("#tool-music");
  (async function fetchMusicList() {
    const data = await (await fetch("/api/listMusic")).json();
    musics = data.musicList;
    musicIndex = 0;
    document.querySelector(".tool-music-name").innerText =
      musics[musicIndex].name;
  })();

  document
    .querySelector(".tool-music-play")
    .addEventListener("click", function () {
      this.style.display = "none";
      document.querySelector(".tool-music-pause").style.display =
        "inline-block";
      isPlay = true;
      audio.play();
    });
  document
    .querySelector(".tool-music-pause")
    .addEventListener("click", function () {
      this.style.display = "none";
      document.querySelector(".tool-music-play").style.display = "inline-block";
      isPlay = false;
      audio.pause();
    });
  document
    .querySelector(".tool-music-before")
    .addEventListener("click", function () {
      if (musicIndex == 0) {
        musicIndex = 2;
      } else if (musicIndex == 1) {
        musicIndex = 0;
      } else if (musicIndex == 2) {
        musicIndex = 1;
      }
      audio.src = musics[musicIndex].url;
      document.querySelector(".tool-music-name").innerText =
        musics[musicIndex].name;
      if (isPlay) {
        audio.play();
      }
    });
  document
    .querySelector(".tool-music-after")
    .addEventListener("click", function () {
      if (musicIndex == 0) {
        musicIndex = 1;
      } else if (musicIndex == 1) {
        musicIndex = 2;
      } else if (musicIndex == 2) {
        musicIndex = 0;
      }
      audio.src = musics[musicIndex].url;
      document.querySelector(".tool-music-name").innerText =
        musics[musicIndex].name;
      if (isPlay) {
        audio.play();
      }
    });
  let timer2;
  let timeRes = 25 * 60;
  document
    .querySelector(".tool-clock-btn-1")
    .addEventListener("click", function () {
      document.querySelector(".tool-clock-btn-1").className =
        "tool-clock-btn-1 s";
      document.querySelector(".tool-clock-btn-2").className =
        "tool-clock-btn-2";
      document.querySelector(".tool-clock-btn-3").className =
        "tool-clock-btn-3";
      document.querySelector(".tool-clock-start").innerText = "START";
      document.querySelector(".tool-clock-start").style.color = "#4caf50";
      clearInterval(timer2);
      timeRes = 25 * 60;
      document.querySelector(".tool-clock-show").innerText = "25 : 00";
    });

  document
    .querySelector(".tool-clock-btn-2")
    .addEventListener("click", function () {
      document.querySelector(".tool-clock-btn-1").className =
        "tool-clock-btn-1";
      document.querySelector(".tool-clock-btn-2").className =
        "tool-clock-btn-2 s";
      document.querySelector(".tool-clock-btn-3").className =
        "tool-clock-btn-3";
      document.querySelector(".tool-clock-start").innerText = "START";
      document.querySelector(".tool-clock-start").style.color = "#4caf50";
      clearInterval(timer2);
      timeRes = 5 * 60;
      document.querySelector(".tool-clock-show").innerText = "05 : 00";
    });

  document
    .querySelector(".tool-clock-btn-3")
    .addEventListener("click", function () {
      document.querySelector(".tool-clock-btn-1").className =
        "tool-clock-btn-1";
      document.querySelector(".tool-clock-btn-2").className =
        "tool-clock-btn-2";
      document.querySelector(".tool-clock-btn-3").className =
        "tool-clock-btn-3 s";
      document.querySelector(".tool-clock-start").innerText = "START";
      document.querySelector(".tool-clock-start").style.color = "#4caf50";
      clearInterval(timer2);
      timeRes = 15 * 60;
      document.querySelector(".tool-clock-show").innerText = "15 : 00";
    });
  document
    .querySelector(".tool-clock-start")
    .addEventListener("click", function () {
      if (this.innerText === "START") {
        this.innerText = "STOP";
        this.style.color = "red";
        clearInterval(timer2);
        timer2 = setInterval(exec2, 1000);
      } else {
        this.innerText = "START";
        this.style.color = "#4caf50";
        clearInterval(timer2);
      }
    });
  function exec2() {
    timeRes--;
    document.querySelector(".tool-clock-show").innerText =
      String(Math.floor((timeRes % 3600) / 60)).padStart(2, "0") +
      " : " +
      String(Math.floor(timeRes % 60)).padStart(2, "0");
    if (timeRes <= 0) {
      clearInterval(timer2);
    }
  }
  document
    .querySelector(".fixed-tool-m .t")
    .addEventListener("click", function () {
      if (document.querySelector(".tool-timer").className === "tool-timer") {
        document.querySelector(".tool-timer").className = "tool-timer show";
        document.querySelector(".tool-music").className = "tool-music";
        document.querySelector(".tool-clock").className = "tool-clock";
      } else {
        document.querySelector(".tool-timer").className = "tool-timer";
        document.querySelector(".tool-music").className = "tool-music";
        document.querySelector(".tool-clock").className = "tool-clock";
      }
    });
  document
    .querySelector(".fixed-tool-m .m")
    .addEventListener("click", function () {
      if (document.querySelector(".tool-music").className === "tool-music") {
        document.querySelector(".tool-timer").className = "tool-timer";
        document.querySelector(".tool-music").className = "tool-music show";
        document.querySelector(".tool-clock").className = "tool-clock";
      } else {
        document.querySelector(".tool-timer").className = "tool-timer";
        document.querySelector(".tool-music").className = "tool-music";
        document.querySelector(".tool-clock").className = "tool-clock";
      }
    });
  document
    .querySelector(".fixed-tool-m .p")
    .addEventListener("click", function () {
      if (document.querySelector(".tool-clock").className === "tool-clock") {
        document.querySelector(".tool-timer").className = "tool-timer";
        document.querySelector(".tool-music").className = "tool-music";
        document.querySelector(".tool-clock").className = "tool-clock show";
      } else {
        document.querySelector(".tool-timer").className = "tool-timer";
        document.querySelector(".tool-music").className = "tool-music";
        document.querySelector(".tool-clock").className = "tool-clock";
      }
    });
};
