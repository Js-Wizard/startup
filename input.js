async function loginUser() {
    loginOrCreate(`/api/auth/login`);
}

async function createUser() {
    loginOrCreate(`/api/auth/create`);
}

async function loginOrCreate(endpoint) {
    const nameEl = document.getElementById("username");
    const pwEl = document.getElementById("password");

    const name = nameEl.value;
    const password = pwEl.value;

    if (name === "")
    {
        localStorage.setItem("user", name);
        window.location.href = "home.html";
        return;
    }

    const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify({ name: name, password: password }),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
    });

    if (response.ok) {
        localStorage.setItem("user", name);
        localStorage.removeItem("guest-data");
        window.location.href = "home.html";
    } else {
        const body = await response.json();
        const modalEl = document.querySelector('#msgModal');
        modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
        const msgModal = new bootstrap.Modal(modalEl, {});
        msgModal.show();
    }
}

function logout()
{
    localStorage.removeItem('user');
    fetch(`/api/auth/logout`, {
        method: 'delete',
    }).then(() => (window.location.href = '/'));
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