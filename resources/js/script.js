var headerElement = null;

const allMessages = [
    "Powered by <a href='https://stoneforged.tech'>Stoneforged Technology</a>",
    "You've Won (nothing)!!!",
    "Shoutout to <a href='https://stoneforged.tech'>Stoneforged Technology</a> for fucking helping me pay my bills!",
    "Copybara.<br><img src='resources/img/popup/copybara.png' width='300px'/>"
]

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

function removePopup() {
    var timeoutTime = Math.round(randint(1,3)*10000);
    setTimeout(createPopup, timeoutTime);
    document.body.style.overflowY = "auto";
    document.body.removeChild(document.getElementById('popup'));
}

function createPopup() { 
    var el = document.createElement('div');
    el.className = "popupParent";
    el.id = "popup";
    let messageid = Math.floor(Math.random() * allMessages.length);
    console.log(`getting message at id ${messageid}`);
    let message = allMessages[messageid]
    el.innerHTML = `
<div class="popupChildContainer">
    <div class="popupBorder popupChild">
        <div class="popupUiContainer">
            <img src="resources/img/ui/min.png" class="noselect uiButton"/>
            <img src="resources/img/ui/resize.png" class="noselect uiButton"/>
            <img src="resources/img/ui/exit.png" class="noselect uiButton" onClick="removePopup()" />
        </div>
        <div class="popupText">
            ${message}
        </div>
    </div>
</div>
    `
    document.body.appendChild(el);
    document.body.style.overflowY = "hidden";
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
        © 1995, 1996, 1997, 1998 <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Geocities</a>, <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">All Rights Reserved</a>
    </div>
`
    document.body.appendChild(el);
}

function createBlog() {
    let items = [
        document.gamesBlog,
        document.artBlog,
        document.musicBlog,
        document.socialMedia
    ]
    let blogDiv = document.getElementById("blogContainer");
    for (let i = 0; i < items.length; i++) {
        var el = document.createElement('div');
        el.className = "blog";
        el.innerHTML = items[i];
        blogDiv.appendChild(el);
    }
}

function runOnLoad() {
    headerElement = document.getElementById("autoHeader");
    textLoop(randint(5, 10));
    createBlog();
    createDonates();
    var el = document.createElement('div');
    el.className = "overflowFixup";
    document.body.appendChild(el);
    createPopup();
}