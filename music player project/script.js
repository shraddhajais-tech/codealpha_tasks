let progress = document.getElementById("progress");
let song = document.getElementById("song");
let playicon = document.getElementById("playicon");
let volumeControl = document.getElementById("volume");
let volumeLabel = document.getElementById("volumeLabel");
let songTitle = document.getElementById("song-title");
let songArtist = document.getElementById("song-artist");
let playlistItems = document.querySelectorAll("#playlist li");

let updateInterval;
let currentTrack = 0;

// Load and play a track by index
function loadTrack(index) {
    if (index < 0 || index >= playlistItems.length) return;

    // Remove active class from all
    playlistItems.forEach(item => item.classList.remove("active"));

    // Set active class
    let selected = playlistItems[index];
    selected.classList.add("active");

    // Update audio source and metadata
    song.src = selected.getAttribute("data-src");
    songTitle.textContent = selected.getAttribute("data-title");
    songArtist.textContent = selected.getAttribute("data-artist");

    song.load();
    song.play();

    playicon.classList.add("fa-pause");
    playicon.classList.remove("fa-play");

    currentTrack = index;
}

// Play/Pause toggle
function playPause() {
    if (song.paused || song.ended) {
        song.play();
        playicon.classList.add("fa-pause");
        playicon.classList.remove("fa-play");
    } else {
        song.pause();
        playicon.classList.remove("fa-pause");
        playicon.classList.add("fa-play");
    }
}

// Previous track
function prevTrack() {
    currentTrack = (currentTrack - 1 + playlistItems.length) % playlistItems.length;
    loadTrack(currentTrack);
}

// Next track
function nextTrack() {
    currentTrack = (currentTrack + 1) % playlistItems.length;
    loadTrack(currentTrack);
}

// Auto-play next when current ends
song.onended = function () {
    nextTrack();
};

// Update progress bar
song.onloadedmetadata = function () {
    progress.max = song.duration || 0;
    progress.value = song.currentTime || 0;
};

song.onplay = function () {
    clearInterval(updateInterval);
    updateInterval = setInterval(() => {
        progress.value = song.currentTime;
    }, 500);
};

song.onpause = function () {
    clearInterval(updateInterval);
};

// Seek functionality
progress.oninput = function () {
    song.currentTime = progress.value;
};

progress.onchange = function () {
    song.play();
    playicon.classList.add("fa-pause");
    playicon.classList.remove("fa-play");
};

// Volume control
volumeControl.oninput = function () {
    let vol = parseFloat(volumeControl.value);
    song.volume = vol;
    volumeLabel.textContent = Math.round(vol * 100) + "%";
};

// Click on playlist item
playlistItems.forEach((item, index) => {
    item.addEventListener("click", () => loadTrack(index));
});

// Load first track on page load
window.onload = function () {
    loadTrack(currentTrack);
};
let currentTimeDisplay = document.getElementById("current-time");
let totalDurationDisplay = document.getElementById("total-duration");

// Format seconds into mm:ss
function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

// Update duration when metadata is loaded
song.onloadedmetadata = function () {
    progress.max = song.duration || 0;
    progress.value = song.currentTime || 0;
    totalDurationDisplay.textContent = formatTime(song.duration);
};

// Update current time while playing
song.onplay = function () {
    clearInterval(updateInterval);
    updateInterval = setInterval(() => {
        progress.value = song.currentTime;
        currentTimeDisplay.textContent = formatTime(song.currentTime);
    }, 500);
};