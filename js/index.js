let UserField=document.getElementById("userName");
let email=document.getElementById("email");
let Password=document.getElementById("password");
let confirmPassword=document.getElementById("confirmPassword");
let Form=document.getElementById("form");
let UserParent=document.querySelector(".UserParent");
let PasswordParent=document.querySelector(".PasswordParent");
let ConfirmParent=document.querySelector(".ConfirmParent");

let usererrorIcon=document.querySelector(".usererrorIcon");
let passworderrorIcon=document.querySelector(".passworderrorIcon");
let confirmerrorIcon=document.querySelector(".confirmerrorIcon");

let usererror=document.querySelector(".usererror");
let passworderror=document.querySelector(".passworderror");
let confirmerror=document.querySelector(".confirmerror");
Form.addEventListener("submit", (event)=>{
      //An Array To push errors Inside , If this array empty the form can be submited
  let message=[]

      //Validation For UserName Input Field "Length" (Required or Not Using HTML).
    if(UserField.value.length<5 || UserField.value.length>15 ){ 
      usererror.innerHTML="Name Length Between 5 and 15"; 
      message.push("Error1"); //Return Error to prevent submit
    }
    else{
      usererror.innerHTML=""; 
    }

    //Validation For UserName Input Field"using regex"to Prevent 1-Special Characters,2-Numbers at beginning or the end,3-White Space Before Name
    let Userregex=/^[a-z][a-z0-9]*[a-z]$/i;
    if(UserField.value.match(Userregex)){
      usererrorIcon.style.visibility='hidden';
      UserParent.style.display="hidden";
    }
    else{
      UserParent.style.display="flex";
      usererrorIcon.style.visibility='visible';
      usererror.innerHTML="The username should only contain numbers and letters, and it should begin and end with letters";
      message.push("Error2"); //Return Error to prevent submit
    }

    //Validation For Password Length
    if(Password.value.length<7){
      PasswordParent.style.display="flex";
      passworderrorIcon.style.visibility='visible';
      passworderror.innerHTML="Password Must Be atleast 8 Characters";
      message.push("Error3"); //Return Error to prevent submit
    }
    else{
      PasswordParent.style.display="none";
      passworderrorIcon.style.visibility='hidden';
      passworderror.innerHTML=""; 
    }

    //Validation For confirmPassword
    if(confirmPassword.value!=Password.value){
      ConfirmParent.style.display="flex";
      confirmerror.style.visibility='visible';
      confirmerrorIcon.style.visibility='visible';
      confirmerror.innerHTML="Password mismatch Confirm password"
      message.push("Error4"); //Return Error to prevent submit
    }
    else{
      ConfirmParent.style.display="none";
      confirmerrorIcon.style.visibility='hidden';
      confirmerror.innerHTML="";
    }
    //Check The Message Array
    if(message.length>0){
      event.preventDefault();
    //Sending Data to the API
  fetch('https://goldblv.com/api/hiring/tasks/register,', {
	method: 'POST',
	body: JSON.stringify({
    username: `${UserField.value}`,
		email:`${email.value}` ,
    password:`${Password.value}` ,
    password_confirmation:`${confirmPassword.value}` ,
	}),
	headers: {
		'Content-type': 'application/json'
	}
}).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(response);
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	console.warn('Something went wrong.', error);
});
    }
    localStorage.setItem("email", `${email.value}`); //Saving The Email In Local Storage
  });
