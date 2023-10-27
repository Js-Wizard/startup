function login()
{
    nameEl = document.querySelectorAll("#username");
    localStorage.setItem("user", nameEl.value);
    window.location.href = "home.html";
}