const ws = new WebSocket(`ws://${location.host}/endpoint`);
const join = document.forms.join;

function initGamePage(){
    
    document.getElementById("button_ready").addEventListener("click", send_ready);
    document.getElementById("button_fire").addEventListener("click", fire);
    
}