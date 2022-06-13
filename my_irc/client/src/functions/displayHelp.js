import Sound from "../assets/sound/jeanne_au_secours.mp3";

function displayHelp(mp3) {
    mp3 = new Audio(Sound)
    return mp3.play();
}

export default displayHelp;