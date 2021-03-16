// TODO:
function IsTyping(){
    if (document.getElementById("comment-input").value !== "") {
        document.getElementById("comment-button").style.background = "#065fd4";
     } else {
        document.getElementById("comment-button").style.background = "#cccccc";
     }
}

let c_num = 1 ;
function leaveComment(){
    document.getElementById("comment-input").value = "";
    document.getElementById("comment-button").style.background = "#cccccc";

    var myDiv = document.getElementById("first-comment"); 
    var divClone = myDiv.cloneNode(true);
    divClone.setAttribute("id", "comment" + c_num);
    document.body.appendChild(divClone); 
    
    var ob = document.getElementById("comment" + c_num);
    ob.getElementsByClassName('comment-text').value = 'afaegae' ;
    
    c_num ++ ;
    document.getElementById("comment-num").innerHTML = c_num + "則留言";
    
}

function startTyping(){
    document.getElementById("cancel-button").style.visibility = "visible" ;
    document.getElementById("comment-button").style.visibility = "visible" ;
}

function cancelComment(){
    document.getElementById("comment-input").value = "";
    document.getElementById("cancel-button").style.visibility = "hidden" ;
    document.getElementById("comment-button").style.visibility = "hidden" 
}