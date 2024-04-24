let timerDisplay = document.querySelector('.timer');
let interval;
let timer = 0;
let ringtone;
let ringtoneAudio = new Audio();

function setRingtone() {
    const ringtoneInput = document.getElementById('ringtoneInput');
    const selectedRingtone = ringtoneInput.files[0];
    if (selectedRingtone) {
        ringtone = URL.createObjectURL(selectedRingtone);
        ringtoneAudio.src = ringtone;
    }
}

function playRingtone() {
    if (ringtoneAudio.src) {
        ringtoneAudio.play();
    }
}

function stopRingtone() {
    if (ringtoneAudio.src) {
        ringtoneAudio.pause();
        ringtoneAudio.currentTime = 0;
    }
}

function startTimer() {
    reset();
    interval = setInterval(() => {
        if (timer > 0) {
            timer--;
            updateTimerDisplay();
        } else {
            clearInterval(interval);
            updateTimerDisplay();
            ringAlarm();
        }
    }, 1000);

    playRingtone();
}

function startStopwatch() {
    reset();
    interval = setInterval(() => {
        timer++;
        updateTimerDisplay();
    }, 1000);

    playRingtone();
}

function pause() {
    clearInterval(interval);
    stopRingtone();
}

function reset() {
    clearInterval(interval);
    timer = 0;
    updateTimerDisplay();
    stopRingtone();
}

function updateTimerDisplay() {
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function ringAlarm() {
    stopRingtone();
    playRingtone();
}

ringtoneAudio.onended = function () {
    stopRingtone();
};
