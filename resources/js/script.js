var headerElement = null;
var retryCount = 0; // Soft limit retries for spotify token to 10 for rate limit reasons.

function randint(min, max) {
    return Math.random() * (max - min) + min;
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function autoText() {
    console.log("running autotext...")
    var possibleCharacters = "qwertyuiopasdfghjklzxcvbnm";
    // 7 + " " + 5
    let outText = "";
    for (let i = 0; i < 8; i++) {
        console.log()
        outText += possibleCharacters.charAt(randint(0, possibleCharacters.length))
    }
    outText += " "
    for (let i = 0; i < 8; i++) {
        outText += possibleCharacters.charAt(randint(0, possibleCharacters.length))
    }
    headerElement.innerHTML = outText;
}

async function textLoop(loopCount) {
    autoText();
    for (let i = 0; i < loopCount; i++) {
        autoText();
        await delay(150);
    }
    headerElement.innerHTML = "Wrench's Basement";
}

function createDonates() {
    var el = document.createElement('div');
    el.className = "adContainer";
    el.innerHTML = `
    <div class="noselect donateContainer">
    <a href="https://ko-fi.com/h3llo_wor1d" style="color:inherit; text-decoration:none;" >
        <div class="donateInterior">
            Donate Money To Me!1!!!11!
        </div>  
    </a>
    </div>
    <div class="footer">
        <a href="https://discord.gg/r5mw6zFpt5" target="_blank">Discord</a> 
        <a href="https://twitter.com/h31lo_wor1d" target="_blank">Twitter</a> 
        <a href="https://twitch.tv/h3llo_wor1d" target="_blank">Twitch</a><br>
        Website written from the bottom up painstakingly by myself in HTML, source is available on GitHub <a href="https://github.com/h3llo-wor1d/wrenchWebsite" target="_blank">here</a>
    </div>
`
    document.body.appendChild(el);
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

function runOnLoad() {
    headerElement = document.getElementById("autoHeader");
    textLoop(randint(5, 10));
    createDonates();
    var el = document.createElement('div');
    el.className = "overflowFixup";
    document.body.appendChild(el);
}