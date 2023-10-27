function login()
{
    const nameEl = document.getElementById("username");
    localStorage.setItem("user", nameEl.value);
    window.location.href = "home.html";
}