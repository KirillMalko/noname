const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');
const btnNotes = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');

// Play Audio Function

const playAudio = (src) => {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
};

// Mouse events and Keyboard events

const startSound = (event) => {
    event.target.classList.add('piano-key-active');
    const note = event.target.dataset.note;
    const src = `./assets/audio/${note}.mp3`;
    playAudio(src);
};

const stopSound = (event) => {
    event.target.classList.remove('piano-key-active');
};

const startCorrespondOver = (event) => {
    if (event.target.classList.contains('piano-key')) {
        event.target.classList.add('piano-key-active');
        const note = event.target.dataset.note;
        const src = `./assets/audio/${note}.mp3`;
        playAudio(src);
        pianoKeys.forEach((elem) => {
            elem.addEventListener('mouseover', startSound);
            elem.addEventListener('mouseout', stopSound);
        });
    }
};

const stopCorrespondOver = () => {
    pianoKeys.forEach((elem) => {
        elem.classList.remove('piano-key-active');
        elem.removeEventListener('mouseover', startSound);
        elem.removeEventListener('mouseout', stopSound);
    });
};

const startCorrespondOverLetter = (event) => {
    const key = document.querySelector(`div[data-letter-code="${event.code}"]`);
    if (key && !event.repeat) {
        key.classList.add('piano-key-active');
        const note = key.dataset.note;
        const src = `./assets/audio/${note}.mp3`;
        playAudio(src);
    }
};

const stopCorrespondOverLetter = (event) => {
    const key = document.querySelector(`div[data-letter-code="${event.code}"]`);
    if (key) {
        key.classList.remove('piano-key-active');
    }
};

piano.addEventListener('mousedown',startCorrespondOver);
document.addEventListener('mouseup', stopCorrespondOver);

window.addEventListener('keydown', startCorrespondOverLetter);
window.addEventListener('keyup', stopCorrespondOverLetter);


// Notes/Letters toggle

btnNotes.addEventListener('click', () => {
    if (btnNotes.classList.contains('btn-active')) {

    } else {
        btnNotes.classList.add('btn-active');
        btnLetters.classList.remove('btn-active');
        pianoKeys.forEach((elem) => {
            elem.classList.remove('piano-key-letter');
        });
    }
});

btnLetters.addEventListener('click', () => {
    if (btnLetters.classList.contains('btn-active')) {

    } else {
        btnLetters.classList.add('btn-active');
        btnNotes.classList.remove('btn-active');
        pianoKeys.forEach((elem) => {
            elem.classList.add('piano-key-letter');
        });
    }
});

// Full Screen functions

function isFullScreen() {
    return (document.fullScreenElement && true) || (document.msFullscreenElement && true) ||
        (document.mozFullScreen || document.webkitIsFullScreen);
}

function enterFS() {
    let page = document.documentElement
    if (page.requestFullscreen) page.requestFullscreen();
    else if (page.mozRequestFullScreen) page.mozRequestFullScreen();
    else if (page.msRequestFullscreen) page.msRequestFullscreen();
    else if (page.webkitRequestFullScreen) page.webkitRequestFullScreen();
}

function exitFS() {
    if (document.exitFullScreen) return document.exitFullScreen();
    else if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
    else if (document.msExitFullscreen) return document.msExitFullscreen();
    else if (document.mozCancelFullScreen) return document.mozCancelFullScreen();
}

function toggleFS() {
    if (!isFullScreen()) {
        enterFS();
        document.getElementsByClassName("fullscreen openfullscreen").innerHTML = '<button class="fullscreen openfullscreen"></button>>';
    } else {
        exitFS();
        document.getElementsByClassName("fullscreen openfullscreen").innerHTML = '<button class="fullscreen openfullscreen"></button>>';
    }
}