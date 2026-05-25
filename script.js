const audio = document.getElementById("audio");
let playBtn = document.getElementById("playBtn");
let pauseBtn = document.getElementById("pauseBtn");
let progressBar = document.getElementById("progressBar");
let musicTime = document.querySelector(".music-time p");
let currentTime = document.getElementById("currentTime");
let repeatBtn = document.getElementById("repeatBtn");
let rewindBtn = document.getElementById("rewindBtn");
let forwardBtn = document.getElementById("forwardBtn");
let duration = document.getElementById("duration");
// audio pause
pauseBtn.addEventListener("click", () => {
  audio.pause();
  pauseBtn.style.display = "none";
  playBtn.style.display = "block";
});
// audio play
playBtn.addEventListener("click", () => {
  audio.play();
  pauseBtn.style.display = "block";
  playBtn.style.display = "none";
});

// song playing
audio.addEventListener("timeupdate", () => {
  let PercentagePlayed = (audio.currentTime / audio.duration) * 100;
  progressBar.value = PercentagePlayed;
  musicTime.textContent = formatedTime(audio.currentTime);
  currentTime.textContent = formatedTime(audio.currentTime);
});

function formatedTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let second = Math.floor(seconds % 60);
  return `${minutes}:${second < 10 ? "0" : ""}${second}`;
}
// User drag the song
progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});
// repeat Song
repeatBtn.addEventListener("click", () => {
  audio.currentTime = 0;
});

// move song forward
forwardBtn.addEventListener("click", () => {
  audio.currentTime = audio.currentTime + 10;
});

// move song backward
rewindBtn.addEventListener("click", () => {
  audio.currentTime = audio.currentTime - 10;
});

// load song duration
audio.addEventListener("loadedmetadata", () => {
  duration.textContent = formatedTime(audio.duration);
  currentTime.textContent = "0:00";
  musicTime.textContent = "0:00";
});
if (audio.readyState >= 1) {
  duration.textContent = formatedTime(audio.duration);
}
audio.addEventListener("ended", () => {
  audio.currentTime = 0;
  audio.play();
});

// controlling using keyboard input
window.addEventListener("keydown", (e) => {
  if (!isNaN(e.key) && e.key !== " ") {
    const minutes = Number(e.key) * 60;
    if (minutes < audio.duration) {
      audio.currentTime = minutes;
    }
  }

  switch (e.key) {
    case " ":
      if (audio.paused) {
        audio.play();
        pauseBtn.style.display = "block";
        playBtn.style.display = "none";
      } else {
        audio.pause();
        pauseBtn.style.display = "none";
        playBtn.style.display = "block";
      }
      break;
    case "ArrowRight":
      e.preventDefault();
      audio.currentTime = audio.currentTime + 10;
      break;
    case "ArrowLeft":
      e.preventDefault;
      audio.currentTime = audio.currentTime - 10;
      break;
  }
});
