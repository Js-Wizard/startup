function login()
{
    const nameEl = document.getElementById("username");
    localStorage.setItem("user", nameEl.value);
    window.location.href = "home.html";
}

function play1p()
{
    localStorage.setItem("player-count", 1);
    window.location.href = "play.html";
}

function play2p()
{
    const nameEl = document.getElementById("2p-name");
    localStorage.setItem("player-count", 2);
    localStorage.setItem("2p-name", nameEl.value);
    window.location.href = "play.html";
}