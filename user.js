const userEl = document.getElementById("user");
const uname = localStorage.getItem("user");
if (uname)
{
    userEl.textContent = uname;
}
else
{
    userEl.textContent = "Guest";
}

const winText = document.getElementById("num-wins");
const lossText = document.getElementById("num-losses");

let dbMock;
let wins = 0;
let losses = 0;

async function initializeUser()
{
    if (winText)
    {
        dbMock = JSON.parse(localStorage.getItem("db-mock")) ?? {};

        if (uname)
        {
            try
            {
                const response = await fetch('/api/userData/' + uname);
                const userData = await response.json();
                wins = userData.wins;
                losses = userData.losses;
                dbMock[uname] = userData;
                localStorage.setItem("db-mock", JSON.stringify(dbMock));
            }
            catch
            {
                const userData = dbMock[uname];
                if (userData)
                {
                    wins = userData.wins;
                    losses = userData.losses;
                }
                else
                {
                    dbMock[uname] = { wins: 0, losses: 0 };
                }
            }
        }
        else
        {
            const guestData = JSON.parse(localStorage.getItem("guest-data")) ?? { wins: 0, losses: 0 };
            wins = guestData.wins;
            losses = guestData.losses;
        }

        updateUserText();
    }
}

function updateUserText()
{
    winText.textContent = wins;
    lossText.textContent = losses;
}

async function win()
{
    wins++;
    if (uname)
    {
        await onlineWin();
    }
    updateUserData();
    updateUserText();
}

async function lose()
{
    losses++;
    if (uname)
    {
        await onlineLose();
    }
    updateUserData();
    updateUserText();
}

async function onlineWin()
{
    try
    {
        const response = await fetch('/api/userData/' + uname + '/win', { method: 'PUT' });
        const userData = await response.json();
        wins = userData.wins;
        losses = userData.losses;
    }
    catch
    {
        return;
    }
}

async function onlineLose()
{
    try
    {
        const response = await fetch('/api/userData/' + uname + '/lose', { method: 'PUT' });
        const userData = await response.json();
        wins = userData.wins;
        losses = userData.losses;
    }
    catch
    {
        return;
    }
}

function updateUserData()
{
    if (uname)
    {
        dbMock[uname].wins = wins;
        dbMock[uname].losses = losses;
        localStorage.setItem("db-mock", JSON.stringify(dbMock));
    }
    else
    {
        localStorage.setItem("guest-data", JSON.stringify({ wins: wins, losses: losses }));
    }
}

initializeUser();