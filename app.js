const usernames = [
    "PixelNinja",
    "Gamer123",
    "EpicGamer",
    "GameMaster",
    "NoobSlayer",
    "VRGamer",
    "ProPlayer",
    "LootKing",
    "Quester",
    "JokerGamer",
    "RetroGamer",
    "MagicMage",
    "CyberPunk",
    "EliteGamer",
    "Speedster",
    "ShadowWolf",
    "Skylander",
    "XtremeGamer",
    "NovaGamer",
    "DragonLord",
    "StarGazer",
    "FrostyGamer",
    "AlphaGamer",
    "InfinityGamer",
    "WarriorX",
    "NinjaX",
    "GamingNerd",
    "PixelPirate",
    "GameWizard",
    "GeekGamer",
    "DungeonRaider",
    "SonicSpeed",
    "JinxedGamer",
    "TitanGamer",
    "ApexGamer",
    "BlazeGamer",
    "CyborgGamer",
    "CrimsonGamer",
    "DarkGamer",
    "GalaxyGamer",
    "GlitchGamer",
    "NeonGamer",
    "RageGamer",
    "RapidGamer",
    "SavageGamer",
    "SpaceGamer",
    "TechGamer",
    "UltraGamer",
    "WildGamer",
    "Phantom",
    "Blitzkrieg",
    "Razor",
    "Lunatic",
    "Shadow",
    "Frostbite",
    "Omega",
    "Nova",
    "Zenith",
    "Echo",
    "Pulse",
    "Celestial",
    "Haze",
    "Vortex",
    "Nexus",
    "Grimlock",
    "Chaos",
    "Infinity",
    "Titan",
    "Neon",
    "Vivid",
    "Apex",
    "Radiant",
    "Blaze",
    "Prowler",
    "Reign",
    "Vertex",
    "Spectre",
    "Phoenix",
    "Mirage",
    "Rogue",
    "Nebula",
    "Electra",
    "Hyper",
    "Vanguard",
    "Astral",
    "Sonic",
    "Oracle",
    "Horizon",
    "Cypher",
    "Wraith",
    "Crimson",
    "Darklight",
    "Alpha",
    "Havoc",
    "Warrior",
    "Rapid",
    "Sniper",
    "Venom"
]

$(() => {
    randomizePost()
})

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
}

function generateUsername() {
    const index = Math.floor(Math.random() * usernames.length + 0.0)
    return usernames[index]
}

function getRandomPbPath() {
    var path = "images/pbs/"
    var maxNumber = 11
    var number = Math.floor(Math.random() * maxNumber) + 1;

    var result = path + number + ".png"
    return result
}

$("#controls #owner-post").click(() => {
    ownerPost()
})

function ownerPost() {
    $("#post #header #username").text("@RedditDE")
    $("#post #header #profile-picture").attr("src", "images/pbs/redditde.png")

    var views = Math.floor(Math.random() * 9999999)
    var likes = Math.floor(Math.random() * 999999)
    while (likes > views / 2) {
        likes = Math.floor(Math.random() * 999999)
    }
    var comments = Math.floor(Math.random() * 99999)
    while (comments > likes / 2) {
        comments = Math.floor(Math.random() * 999999)
    }

    $("#post #header #views-counter").text(numberWithCommas(views))
    $("#post #footer #likes-counter").text(numberWithCommas(likes))
    $("#post #footer #comments-counter").text(numberWithCommas(comments))

    $("#post #header .verified-icon").show()
    verify = true
}

$("#controls #user-post").click(() => {
    randomizePost()
    $("#post #header .verified-icon").hide()
    verify = false
})

function randomizePost() {
    var username = generateUsername();
    while (username == $("#post #header #username").text()) {
        username = generateUsername()
    }
    $("#post #header #username").text("@" + username)

    var image = getRandomPbPath()
    while (image == $("#post #header #profile-picture").attr("src")) {
        image = getRandomPbPath()
    }
    $("#post #header #profile-picture").attr("src", image)

    var views = Math.floor(Math.random() * 999999)
    var likes = Math.floor(Math.random() * 99999)
    while (likes > views / 2) {
        likes = Math.floor(Math.random() * 99999)
    }
    var comments = Math.floor(Math.random() * 9999)
    while (comments > likes / 2) {
        comments = Math.floor(Math.random() * 99999)
    }

    $("#post #header #views-counter").text(numberWithCommas(views))
    $("#post #footer #likes-counter").text(numberWithCommas(likes))
    $("#post #footer #comments-counter").text(numberWithCommas(comments))
}

$("#controls #post-post").click(() => {
    postTemplate()
})

function postTemplate() {
    $("#post #header #answer-tag").hide()
    $("#post #header .reply-icon").hide()
    $("#post #header #creator-tag").show()
    $("#post #footer .comments-container").show()
}

$("#controls #answer-post").click(() => {
    answerTemplate()
})

function answerTemplate() {
    $("#post #header #answer-tag").show()
    $("#post #header .reply-icon").show()
    $("#post #header #creator-tag").hide()
    $("#post #footer .comments-container").hide()
}

$("#controls #verify-post").click(() => {
    verifyPost()
})

var verify = false
function verifyPost() {
    if (verify == true) {
        $("#post #header .verified-icon").hide()
        verify = false
    } else {
        $("#post #header .verified-icon").show()
        verify = true
    }
}

$("#controls #download").click(() => {
    download()
})

function download() {
    $("#download-canvas").children().remove()
    const e = $("#post").clone()
    e.appendTo("#download-canvas")
    setTimeout(() => {
        domtoimage.toPng(document.getElementById("download-canvas"), { quality: 0.95 })
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = 'post.png';
                link.href = dataUrl;
                link.click();
            });
    }, 500)
}