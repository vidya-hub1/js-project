const signUp=document.getElementById("sign-up")
const logIn=document.getElementById("login")
const goToLogin=document.getElementById("goToLogin")
const goToSign=document.getElementById("goToSignUp")

goToLogin.addEventListener("click",()=>{
    signUp.classList.add("hidden")
    logIn.classList.remove("hidden")
});

goToSign.addEventListener("click",()=>{
    logIn.classList.add("hidden")
    signUp.classList.remove("hidden")
});


const signUpForm=document.getElementById("signUp")
signUpForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const username=document.getElementById("username").value;
    const pswd=document.getElementById("pswd").value;


 
const users=JSON.parse(localStorage.getItem("users"))||[];
if(users.find((users)=>users.username===username)){
    alert("Username already exists!")
    return;
}


users.push({username,pswd});
localStorage.setItem(users,JSON.stringify(users));
alert("SignUp successful!")
signUpForm.reset();
goToLogin.click();

})

const loginForm=document.getElementById("loginForm")
loginForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const username=document.getElementById("login-username").value;
    const pswd=document.getElementById("login-password").value;

    const users=JSON.parse(localStorage.getItem("users"))||[];
    const user=users.find((user)=>user.username===username&&user.password===password);

    if(user){
        alert("Welcome,${username}!");
        
        loginForm.reset()
        }else{
            alert("Invalid username or password")
        }
});
