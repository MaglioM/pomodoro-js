let running = false;
const _btnComenzar = document.getElementById("btnComenzar");
const _btnDetener = document.getElementById("btnDetener");
const _btnRestart = document.getElementById("btnRestart");
const _tiempoDeTrabajo = document.getElementById("tiempoDeTrabajo");
const _tiempoDeDescanso = document.getElementById("tiempoDeDescanso");
const _rondas = document.getElementById("rondas");

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function getSeconds(element){
    const time = element.innerHTML;
    const minutes = parseInt(time.slice(0,2));
    const seconds = parseInt(time.slice(3,5));
    return minutes * 60 + seconds;
}

function restartTimer(){
    _tiempoDeTrabajo.innerHTML = "20:00"
    _tiempoDeDescanso.innerHTML = "20:00"
}

function controlTime(timeId, isAdding){//if it is not adding, it is subtracting
    timeElement = document.getElementById(timeId);
    timeInSeconds = getSeconds(timeElement);
    newTime = isAdding ? formatTime(timeInSeconds + 60) : formatTime(timeInSeconds - 60);
    timeElement.innerHTML = newTime;
}

function switchButtons() {
    _btnDetener.hidden = !_btnDetener.hidden;
    _btnComenzar.hidden = !_btnComenzar.hidden;
    _btnRestart.hidden = _btnComenzar.hidden;//Restart button appearence will always match start button.
}

async function startTimer(){
    const rondas = _rondas.innerHTML;
    const tiempoDeTrabajo = getSeconds(_tiempoDeTrabajo);
    const tiempoDeDescanso = getSeconds(_tiempoDeDescanso);
    let tiempoRestante;
    switchButtons();
    running = true;
    for (let ronda = 0; ronda < rondas; ronda++){
        tiempoRestante = tiempoDeTrabajo;
        while (tiempoRestante >= 0 && running){//Working time starts
            _tiempoDeTrabajo.innerHTML = formatTime(tiempoRestante);
            await sleep(1000);
            tiempoRestante-= 1;
        }
        tiempoRestante = tiempoDeDescanso;
        while (tiempoRestante >= 0 && running){//Resting time starts
            _tiempoDeDescanso.innerHTML = formatTime(tiempoRestante);
            await sleep(1000);
            tiempoRestante-= 1;
        }
    }
    if (running) {//Enters statement only if the countdown was completed and not if it was stopped. This way it does not run twice.
        stopTimer();
    }
}

function stopTimer(){
    switchButtons();
    running = false;
}
