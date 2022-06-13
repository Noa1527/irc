import Sound from "../assets/sound/zemmour_le_petit_doigt.mp3";

function displayHelp(mp3) {
    mp3 = new Audio(Sound)
    return mp3.play();
}

export default displayHelp;