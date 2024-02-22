var progressBar = document.querySelector("#myProgressBar");
var backward = document.querySelector("#backward");
var forward = document.querySelector("#forward");
var masterPlay = document.querySelector("#play");
var gif = document.querySelector("#gif");
var masterSongName = document.querySelector("#masterSongName");
var songContainer = document.querySelector("#song-container");
var leftSongImg = document.querySelector("#left #song-image");
var totalDuration = document.querySelector("#totalDuration");
var currentTime = document.querySelector("#currentTime");
// Initialize songIndex to null
let songIndex = null;

// Track if masterPlay button has been clicked
let masterPlayClicked = false;
var audio = new Audio("");

var songs = [
  {
    songName: "Uska hi bana",
    songSrc: "./songs/1.mp3",
    songImgSrc:
      "https://i.pinimg.com/736x/63/a0/08/63a008f631ae7492a75a001bd0791e8f.jpg",
  },
  {
    songName: "Bol do na zara",
    songSrc: "./songs/2.mp3",
    songImgSrc:
      "https://media.istockphoto.com/id/1131352330/photo/dynamic-microphone-on-music-sheet.jpg?s=2048x2048&w=is&k=20&c=GBXo7OsLBarvtzBzz6m678kPcrmg17n7RKgyyfy-NwQ=",
  },
  {
    songName: "Hua hai aj pehli bar",
    songSrc: "./songs/7.mp3",
    songImgSrc:
      "https://images.ctfassets.net/3s5io6mnxfqz/1r8adrJFIeFyVoQrHaeQJ4/be339d76b8c1695cd17371c0a574606f/AdobeStock_310671740.jpeg",
  },

  {
    songName: "Dilbar",
    songSrc: "./songs/4.mp3",
    songImgSrc:
      "https://media.istockphoto.com/id/1429385194/photo/relaxed-young-man-resting-at-home-listening-to-music.jpg?s=2048x2048&w=is&k=20&c=m4Snla48JqbCQ7A0kp4zdOFbhfs-TJISfkAnxCgAZGc=",
  },
  {
    songName: "Mei ne tujh ko deakha",
    songSrc: "./songs/5.mp3",
    songImgSrc:
      "https://media.istockphoto.com/id/1688936025/photo/nashvilles-lower-broadway.jpg?s=2048x2048&w=is&k=20&c=r0fFWlFtTLRjJko2LR3tlj6u6-Ry5SxkULgFXqBHe0Y=",
  },
  {
    songName: "Shanivar rati",
    songSrc: "./songs/6.mp3",
    songImgSrc:
      "https://media.istockphoto.com/id/1471448614/photo/crowd-of-people-dancing-at-a-music-show-in-barcelona-during-the-summer-of-2022.jpg?s=2048x2048&w=is&k=20&c=0MgdwkZ6e5WqJCMFziTnA4Cxb2OPbLrJlk8CmHZ0a6M=",
  },
];
// Clear any existing HTML content inside songContainer
songContainer.innerHTML = "";

// Loop through the songs array and dynamically create HTML for each song item
songs.forEach(function (e, index) {
  // Create a div element for each song item
  var songItem = document.createElement("div");
  songItem.classList.add("song-items");
  songItem.setAttribute("id", index); // Set the ID attribute to the index of the song

  // Create an image element for the song image
  var songImage = document.createElement("img");
  songImage.setAttribute("src", e.songImgSrc);
  songImage.setAttribute("alt", "songImage");

  // Create an h3 element for the song name
  var songName = document.createElement("h3");
  songName.setAttribute("id", "song-name");
  songName.textContent = e.songName;

  // Create an h3 element for the pause icon
  var pauseIcon = document.createElement("h3");
  pauseIcon.setAttribute("id", "pause-icon");
  var icon = document.createElement("i");
  icon.classList.add("ri-play-circle-line");
  pauseIcon.appendChild(icon);

  // Append the image, song name, and pause icon to the songItem div
  songItem.appendChild(songImage);
  songItem.appendChild(songName);
  songItem.appendChild(pauseIcon);

  // Append the songItem div to the songContainer
  songContainer.appendChild(songItem);
});

// Update song image when a song is played or stopped
function updateSongImage(songId) {
  if (songId !== null) {
    leftSongImg.src = songs[songId].songImgSrc;
    leftSongImg.style.display = "block"; // Show the image element
    songContainer.style.backgroundImage = "none"; // Remove background image when song is selected
  } else {
    leftSongImg.style.display = "none"; // Hide the image element
    leftSongImg.style.backgroundImage =
      "url(https://media.istockphoto.com/id/1433737803/photo/listening-to-music-on-a-mobile-phone-music-player-with-headphones-3d-rendering-music.jpg?s=2048x2048&w=is&k=20&c=OiUVGWcOOgbwT5dzVJjmh6i8zdFOXrymsV9mvLEV8s8=)"; // Set background image when no song is selected
  }
}

// Update song image when a song is clicked
songContainer.addEventListener("click", function (event) {
  var songItem = event.target.closest(".song-items");
  if (songItem) {
    var songId = songItem.id;
    // Set the audio source to the clicked song and play it
    audio.src = songs[songId].songSrc;
    audio.play();
    // Update the songIndex to the index of the clicked song
    songIndex = parseInt(songId);

    // Update play/pause icons for all songs
    updatePlayPauseIcons();

    // Update masterPlay button icon based on audio play state
    updateMasterPlayIcon();

    // Update masterSongName
    masterSongName.innerHTML = songs[songId].songName;

    // Update song image
    updateSongImage(songId);
  }
});

// Set initial state of song image when page loads
updateSongImage(null); // Call the function with null to show the default background image

function updatePlayPauseIcons() {
  var songItems = document.querySelectorAll(".song-items");
  songItems.forEach(function (songItem, index) {
    var icon = songItem.querySelector("#pause-icon i");
    if (index === songIndex) {
      if (audio.paused) {
        icon.classList.remove("ri-pause-circle-line");
        icon.classList.add("ri-play-circle-line");
      } else {
        icon.classList.remove("ri-play-circle-line");
        icon.classList.add("ri-pause-circle-line");
      }
    } else {
      icon.classList.remove("ri-pause-circle-line");
      icon.classList.add("ri-play-circle-line");
    }
  });
}

function updateMasterPlayIcon() {
  var masterPlayIcon = masterPlay.querySelector("i");
  if (audio.paused) {
    masterPlayIcon.classList.remove("ri-pause-circle-line");
    masterPlayIcon.classList.add("ri-play-circle-line");
    gif.style.opacity = 0;
  } else {
    masterPlayIcon.classList.remove("ri-play-circle-line");
    masterPlayIcon.classList.add("ri-pause-circle-line");
    gif.style.opacity = 1;
  }
}

// Add event listener to masterPlay button
masterPlay.addEventListener("click", () => {
  if (!masterPlayClicked) {
    // If masterPlay button is clicked for the first time
    if (songIndex === null) {
      // If no song is selected, show an alert message
      alert("Please select a song from the list above.");
      return; // Exit the function early to prevent further execution
    }
    masterPlayClicked = true; // Set masterPlayClicked to true after the first click
  }

  // Toggle play/pause state and update icons accordingly
  if (audio.paused || audio.currentTime <= 0) {
    audio.play();
    masterPlay.querySelector("i").classList.remove("ri-play-circle-line");
    masterPlay.querySelector("i").classList.add("ri-pause-circle-line");
    gif.style.opacity = 1;
  } else {
    audio.pause();
    masterPlay.querySelector("i").classList.remove("ri-pause-circle-line");
    masterPlay.querySelector("i").classList.add("ri-play-circle-line");
    gif.style.opacity = 0;
  }
});

// Listen to Events
audio.addEventListener("timeupdate", () => {
  // Update Seekbar
  progress = parseInt((audio.currentTime / audio.duration) * 100);
  myProgressBar.value = progress;

  // Update current time display
  currentTime.textContent = formatTime(audio.currentTime);

  // Update total duration display (if audio duration is known)
  if (!isNaN(audio.duration)) {
    totalDuration.textContent = formatTime(audio.duration);
  }
});

myProgressBar.addEventListener("change", () => {
  audio.currentTime = (myProgressBar.value * audio.duration) / 100;
});

// Function to format time in MM:SS format
function formatTime(timeInSeconds) {
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = Math.floor(timeInSeconds % 60);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

forward.addEventListener("click", () => {
  if (songIndex >= 5) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audio.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audio.currentTime = 0;
  audio.play();
  masterPlay.querySelector("i").classList.remove("ri-play-circle-line");
  masterPlay.querySelector("i").classList.add("ri-pause-circle-line");
  updateSongImage(songIndex);
  updatePlayPauseIcons();
});

backward.addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audio.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audio.currentTime = 0;
  audio.play();
  masterPlay.querySelector("i").classList.remove("ri-play-circle-line");
  masterPlay.querySelector("i").classList.add("ri-pause-circle-line");
  updateSongImage(songIndex);
  updatePlayPauseIcons();
});
