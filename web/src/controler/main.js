const ws = new WebSocket(`ws://${location.host}/endpoint`);
const join = document.forms.join;

function initHomePage(){
    
    document.getElementById("button_create").addEventListener("click", send_create);
    document.getElementById("button_join").addEventListener("click", send_create);
    
}

function initGamePage(){
    
    document.getElementById("button_ready").addEventListener("click", send_ready);
    document.getElementById("button_fire").addEventListener("click", fire);
    
}