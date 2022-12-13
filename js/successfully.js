let getEmail=document.getElementById("getEmail");    
let techStack = localStorage.getItem("email");   //return the email from the localStorage
getEmail.innerHTML=techStack;