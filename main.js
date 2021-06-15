const barraSinistra = document.getElementById("barraSinistra");
const barraDestra = document.getElementById("barraDestra");
const palla = document.getElementById("palla");
const punteggioSinistra = document.getElementById("punteggioSinistra")
const punteggioDestra = document.getElementById("punteggioDestra")
const body = document.getElementById("body");

var VELOCITA = 10

var altezze = [40, 40];
var coordinatePalla = prendiCoordinatePalla();
var punti = [0, 0];

var m = 0.5;
var q = coordinatePalla[1] - m * coordinatePalla[0];

document.addEventListener("keydown", (event) => {

    switch (event.key) {

        case " ":
            palla.style.visibility = "visible";
            requestAnimationFrame(muovi);
            break;

        case "ArrowUp":
            altezze[1] -= 10;
            break;

        case "ArrowDown":
            altezze[1] += 10;
            break;

        case "w":
            altezze[0] -= 10;
            break;

        case "s":
            altezze[0] += 10;
            break;

        default:
            break;
    }

    if (altezze[1] < 0) {
        altezze[1] = 0;
    } else if (altezze[1] > 79) {
        altezze[1] = 79;
    }

    if (altezze[0] < 0) {
        altezze[0] = 0;
    } else if (altezze[0] > 79) {
        altezze[0] = 79;
    }

    disegnaBarre();

});

function muovi() {

    let x = coordinatePalla[0];
    let y = coordinatePalla[1];

    x -= VELOCITA;
    y = m * x + q;

    coordinatePalla[0] = x;
    coordinatePalla[1] = y;

    disegnaPalla();

    // collisione con barre

    let coB = [barraSinistra.getBoundingClientRect(), barraDestra.getBoundingClientRect()];
    if (x <= coB[0].right && x >= coB[0].left && y >= coB[0].top && y <= coB[0].bottom) {
        rimbalzaSuBarra();
    } else if (x <= coB[1].right && x >= coB[1].left - 8 && y >= coB[1].top && y <= coB[1].bottom) {
        rimbalzaSuBarra();
    }

    // rimbalzo sui lati
    else if (x <= 2) {
        punteggioDestra.innerHTML = ++punti[0];
        reset();
        return;
    } else if (x >= body.getBoundingClientRect().right - 2) {
        punteggioSinistra.innerHTML = ++punti[1];
        reset();
        return;
    }

    // rimbalzo sopra e sotto
    else if (y <= 8 || y >= body.getBoundingClientRect().bottom - 20) {
        console.log("rimbalzo");

        m *= -1 // Math.tan(Math.PI - Math.atan(m));
        q = coordinatePalla[1] - m * coordinatePalla[0];
    }

    requestAnimationFrame(muovi);

}

function disegnaBarre() {
    barraDestra.style = "transform: translateY(" + altezze[1] + "vh)";
    barraSinistra.style = "transform: translateY(" + altezze[0] + "vh)";
}

function reset() {

    altezze = [40, 40];
    disegnaBarre();

    palla.style.left = "50%";
    palla.style.top = "50%";
    palla.style.visibility = "hidden";

    coordinatePalla = prendiCoordinatePalla();
    q = coordinatePalla[1] - m * coordinatePalla[0];
}

function disegnaPalla() {
    palla.style.left = coordinatePalla[0] + "px";
    palla.style.top = coordinatePalla[1] + "px";
}

function prendiCoordinatePalla() {
    let coordinate = palla.getBoundingClientRect();
    return [(coordinate.left + coordinate.right) / 2, (coordinate.top + coordinate.bottom) / 2];
}

function rimbalzaSuBarra() {

    console.log("sbarra");
    
    VELOCITA *= -1;
    m *= -1;
    q = coordinatePalla[1] - m * coordinatePalla[0];

}

