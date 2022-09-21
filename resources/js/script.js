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

function getNewMusic() {
    var spotToken = "Bearer BQD8c7V05JeDKB9lKFlIRqifIWaKqYylHoK1jZ5ip6wftPhVt8d0mD5GZ7SJQLpz4VJrrO5vISC_zUvFnPVBoVL40VyXORAIM48TtGGvS8ZWTugYMPrjmZu97_pw2WJSve5MggyhwgpWnp7o7Jz2n5_xg4jvKaUHQbHGaHDjsseyQmo3JrxIrSbQqORyk-IdcEk"; 
    // Feel free to abuse this token, it literally only gets access to public playlists lmfao
    // I'm too lazy to make a proper app for this, sorry lmao
    
    // Get first 10 unicode singles and/or albums that exist

    fetch("https://api.spotify.com/v1/artists/5U3cvKez2zinfFgRlfuG0l/albums?include_groups=single%2Cappears_on&limit=10", {
        headers: {
            "Authorization": spotToken,
            "Content-Type": "application/json"
        }
    })
    .then(resp => resp.json())
    .then(data => {
        let outDOM = "";
        data.items.forEach(item => {
            let artists = []
            item.artists.forEach(artist => {
                artists.push(`<a href="${artist.external_urls.spotify}">${artist.name}</a>`);
            })
            outDOM += `
\n<div class="blogSocial">
    <a href="${item.external_urls.spotify}" class="blogA">
        <div class="blogSocialInterior_music">
            <img src="${item.images[0].url}" width="90px" height="90px" style="display: inline-block;" />
            <div style="position:relative;top:0;left:0;font-size: 20px;">
                ${item.name}<br>
                by ${artists.join(', ')}
            </div>
        </div>
    </a>
</div>  `
        document.getElementById("blogMusicContainer").innerHTML = outDOM;
        })
    })
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
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
        // Ad addition logic
        if (i !== 0 && i-1 % 2 === 0) {
            var el = document.createElement('div');
            el.className = "blogAd noselect";
            el.innerHTML = `<a href="https://stoneforged.tech/?ref=272" class="blogA"><img src="resources/img/ads/stoneforged_ad.png" /></a>`;
            blogDiv.appendChild(el);
        }
    }
    getNewMusic();
}

function runOnLoad() {
    headerElement = document.getElementById("autoHeader");
    textLoop(randint(5, 10));
    createBlog();
    createDonates();
    var el = document.createElement('div');
    el.className = "overflowFixup";
    document.body.appendChild(el);
    //createPopup();
}