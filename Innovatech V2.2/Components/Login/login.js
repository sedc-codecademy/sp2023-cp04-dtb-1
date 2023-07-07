const errorMsg = document.getElementById("login-failed-alert");
const successMsg = document.getElementById("login-success-alert");
const logoutMsg = document.getElementById("logout-success-alert");

const form = document.getElementById("login-form");

const loginBtn = document.getElementById("btnlogin");
const logoutBtn = document.getElementById("logoutBtn");
const loginSignupBtns = document.getElementById("login-signup-buttons");

let isLoggedIn = false;

loginBtn.addEventListener("click", () => {
    const username = document.getElementById("loginUsername");
    const password = document.getElementById("loginPassword");
    handleLogin(username.value, password.value)
})

function handleLogin(username, password) {
    fetch("../../Data/users.json")
        .then(res => res.json())
        .then(data => {

            let loggedUser = data.users.find(x => x.username == username && x.password == password);

            if (loggedUser == undefined) {
                isLoggedIn = false;
                form.reset();
                errorMsg.style.display = "block";
                setTimeout(() => errorMsg.style.display = "none", 2000);
            } else {
                window.localStorage.setItem("username", username);
                isLoggedIn = true;
                form.reset();
                successMsg.style.display = "block";
                setTimeout(() => successMsg.style.display = "none", 6000);
                window.location.href = '../Posts/posts.html';
            }


            if (isLoggedIn) {
                logoutBtn.hidden = false;
                loginSignupBtns.hidden = true;

            } else {
                logoutBtn.hidden = true;
                loginSignupBtns.hidden = false;
            }

        }).catch(error => {
            console.log(error);
        })
}