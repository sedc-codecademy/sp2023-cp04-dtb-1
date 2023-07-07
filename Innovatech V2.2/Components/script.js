const globalLogoutButton = document.getElementById("logoutBtn");
const globalLogoutMessage = document.getElementById("logout-success-alert");
const globalLoginSignupBtns = document.getElementById("login-signup-buttons");
const activePage = window.location.href.split('/').slice(-1)[0];
let isUserLoggedIn = window.localStorage.getItem("username");

if (activePage == "posts.html") {
    const addPostForm = document.getElementById("add-new-post-form");
    const icons = document.querySelectorAll(".card-icons");
    if (isUserLoggedIn) {
        addPostForm.hidden = false;
        icons.forEach(icon => {
            icon.style.display = "inline";
        });
    } else {
        icons.forEach(icon => {
            icon.style.display = "none";
        });
        console.log(icons);
        addPostForm.hidden = true;
    }
}

if (isUserLoggedIn) {
    globalLogoutButton.hidden = false;
    globalLoginSignupBtns.hidden = true;
} else {
    globalLogoutButton.hidden = true;
    globalLoginSignupBtns.hidden = false;
}

globalLogoutButton.addEventListener("click", () => {
    window.localStorage.clear();
    globalLogoutMessage.style.display = "block";
    setTimeout(() => {
        logoutBtn.hidden = true;
        globalLoginSignupBtns.hidden = false;
        window.location.href = '../Login/login.html';
        globalLogoutMessage.style.display = "none"
    }, 1500);
})

