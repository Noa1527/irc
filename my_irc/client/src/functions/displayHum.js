import Sound from "../assets/sound/zemmour-tousse.mp3";

function displayHelp(mp3) {
    mp3 = new Audio(Sound)
    return mp3.play();
}

export default displayHelp;