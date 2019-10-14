document.getElementById("button_create").addEventListener("click", create);
document.getElementById("button_join").addEventListener("click", join);
var hash;

function create(){
    
    hash = send_create();
    
    document.getElementById("hash").value = hash;
    document.getElementById("button_create").style.display = "none";
    document.getElementById("button_join").style.display = "block";
    
}

function join(){
    
    window.location.href = "./play.html?player=1&hash="+hash;
    
}