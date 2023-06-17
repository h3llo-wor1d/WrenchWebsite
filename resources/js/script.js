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

const portfolioURLS = [
    "https://drive.google.com/file/d/1dyp3tlgxq9TcAZWsDxTdNU1Lnu9xf_ll/",
    "https://drive.google.com/file/d/1uOGiYC3qxA9ecb61ESXm3GJYSj4_-5O8/",
    "https://drive.google.com/file/d/1ThOEkt4wsLMKSV-O1A1E0s2WiFlAM-Ik/",
    "https://drive.google.com/file/d/1KX2InKOV8wKGjFkStRO7exL5KQkHKxY_/",
    "https://drive.google.com/file/d/1a7ehUylNsAfVHJXAw2ypJsHP5Jlbd3n5/",
    "https://drive.google.com/file/d/1sZerAiUcD2e4YyMClNMM8K-9v93O_80K/",
    "https://drive.google.com/file/d/1kzS4wtmrhmNCd6bSSZVI9mjQPDBhJgKq/",
    "https://drive.google.com/file/d/1dfzfnZAGa0O1OcyxDqhVVr4EC-nIlQVU/",
    "https://drive.google.com/file/d/1zRcG1QjbRCxccWmikJLHk8aD68JmctXB/",
    "https://drive.google.com/file/d/1PDul4TpB-9JpzgMSJguFxh-0O6g5WArg/"
]

const testimonials = [
    {
        social: "CiciPuppo",
        img: "cici.jpg",
        text: "I loved working with Wrench! They made a BGM that fit my spooky vibe and was totally unique"
    },
    {
        social: "IzzleShizzlePng",
        img: "izzle.jpg",
        text: "10/10 would recommend! The commissions I paid for perfectly reflected the inspirations I provided."
    },
    {
        social: "AvolitionBrit",
        img: "avolition.jpg",
        text: "A delight to work with, communicated effectively and nailed the vibe I was going for."
    },
    {
        social: "GamersGoinBlind",
        img: "bravo.jpg",
        text: "I highly recommend Wrench for any music ideas you have!! You won't be disappointed"
    },
    {
        social: "LordValdarox",
        img: "valdarox.jpg",
        text: "I've had the pleasure of working with Wrench on not 1, not 2, but 3 pieces!"
    }
]

function getRandomPortfolio(blacklist) {
    let found = false;
    while (!found) {
        let item = portfolioURLS[Math.floor(Math.random()*portfolioURLS.length)];
        if (blacklist.indexOf(item) === -1) {
            return item
        }
    }
    
}

function getTestimonial(blacklist) {
    let found = false;
    while (!found) {
        let item = testimonials[Math.floor(Math.random()*testimonials.length)];
        if (blacklist.indexOf(item.social) === -1) {
            return item
        }
    }
}

function createTestimonials() {
    let blacklist = []
    let types = 0;
    let tests = document.getElementById("testimonials");
    try {
        for (let i = 0; i < 3; i++) {
            let testimonial = getTestimonial(blacklist);
            blacklist.push(testimonial.social);
            switch(types) {
                case 0:
                    var el = document.createElement('tleft');
                    el.innerHTML = `
    <img src=\"resources/img/clients/${testimonial.img}\" height=\"70px\">
    <div class=\"ttestl\">
        ${testimonial.text}
    </div>
    <div class=\"tclientl\">
        <a href=\"https://twitter.com/${testimonial.social}\" target=\"_blank\">
            @${testimonial.social}
        </a> 
    </div>
    
    `
                    types = 1;
                    tests.appendChild(el);
                    break;
                case 1:
                    var el = document.createElement('tright');
                    el.innerHTML = `
    <div class=\"ttestr\">
        ${testimonial.text}
    </div>
    <a class=\"tclientr\" target=\"_blank\" href=\"https://twitter.com/${testimonial.social}\">@${testimonial.social}</a>
    <img src=\"resources/img/clients/${testimonial.img}\" height=\"70px\">
                    `
                    types = 0;
                    tests.appendChild(el);
                    break;
            }
        }
    } catch (err) {
        console.log('uhhhh')
        console.log(err)
    }
}

let IMAGES = {
    "discord": "https://discord.gg/abQtfTNzA5",
    "nft": null,
    "powered": null,
    "transnow2": null,
    "twitterbutton": "https://twitter.com/h31lo_wor1d",
    "tyg": null,
    "stoneforged": "https://stoneforged.tech"
}

function makeBanners() {
    let parent = document.getElementById("footerContainer");
    let imageKeys = Object.keys(IMAGES) 
    for (var i in imageKeys) {
        let child = document.createElement("a");
        child.classList.add("inactive");
        if (IMAGES[imageKeys[i]] !== null) {
            child.classList.remove("inactive");
            child.classList.add("active");
            child.href = IMAGES[imageKeys[i]];
            child.target = "_blank";
        }
        let t = document.createElement("img");
        t.src = `resources/img/banners/${imageKeys[i]}.gif`
        child.appendChild(t);
        parent.appendChild(child);
    }
}

function postRandomComm() {
    let blacklist = []
    for (let i = 0; i < 2; i++) {
        let r = getRandomPortfolio(blacklist);
        blacklist.push(r);
        r+="preview";
        document.getElementById(`randomCommission${i}`).setAttribute("src",r);
    }
}

function runOnLoad() {
    let doc = document;
    if (doc.readyState && doc.readyState != 'complete') {
        // Opera fires load event multiple times
        // Even when the DOM is not ready yet
        // this fix should not affect other browsers
        return;
    }

    // fixing Opera 9.64
    if (doc.body && doc.body.innerHTML == "false") {
        // In Opera 9.64 event was fired second time
        // when body.innerHTML changed from false
        // to server response approx. after 1 sec
        return;
    }
    headerElement = document.getElementById("autoHeader");
    textLoop(randint(5, 10));
    var el = document.createElement('div');
    el.className = "overflowFixup";
    document.body.appendChild(el);
    //makeBanners();
    createTestimonials();
    postRandomComm();
}