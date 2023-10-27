function play2p()
{
    const nameEl = document.getElementById("2p-name");
    localStorage.setItem("2p-name", nameEl.value);
    window.location.href = "play.html";
}