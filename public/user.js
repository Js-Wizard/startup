const userEl = document.getElementById("user");
const uname = localStorage.getItem("user");
if (uname)
    userEl.textContent = uname;
else
    userEl.textContent = "Guest";