document.getElementById("button_join").addEventListener("click", join);

function join(){
    
    var hash = document.getElementById("hash").value;
    
    send_join(hash);
    
    window.location.href = "./play.html?player=2&hash="+hash;
    
}