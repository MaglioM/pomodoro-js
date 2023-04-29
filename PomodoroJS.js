let running = false;
const _btnComenzar = document.getElementById("btnComenzar");
const _btnDetener = document.getElementById("btnDetener");
const _tiempoDeTrabajo = document.getElementById("tiempoDeTrabajo");
const _tiempoRestante = document.getElementById("tiempoRestante");

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function switchButtons() {
    _btnDetener.hidden = !_btnDetener.hidden;
    _btnComenzar.hidden = !_btnComenzar.hidden;
}

async function startTimer(){
    let tiempoRestante = 60 * _tiempoDeTrabajo.value;
    switchButtons();
    running = true;
    while (tiempoRestante >= 0 && running){
        _tiempoRestante.innerHTML = formatTime(tiempoRestante);
        await sleep(1000);
        tiempoRestante-= 1;
    }
    if (running) {//Enters statement only if the countdown completed and not if it was stopped. This way it does not run twice.
        stopTimer();
    }
}

function stopTimer(){
    switchButtons();
    running = false;
    _tiempoRestante.innerHTML = null;
}
