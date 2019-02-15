window.onload = function() {
    load();
    resize();
}

window.onresize = function() {
    resize();
}

let bingoDiv;
let clickMap = [];
let data = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

function load() {
    bingoDiv = document.getElementById("bingo");
    
    shuffle(items);

    for(let y = 0; y < 4; y++) {
        for(let x = 0; x < 4; x++) {
            let item = items[x + y * 4];
            let s = new State(x, y, false);
            clickMap[item] = s;
            data[x][y] = s;

            appendBingo(genEntry(item));
        }
    }

    for(e of document.getElementsByClassName("text-holder")) {
        e.onclick = onClick;
    }
}

function genEntry(content) {
    return "<div class='field border'>" + 
                "<div class='text-wrapper'>" +
                    "<div class='text-holder text-form noselect'>" + 
                    content +
            "</div></div></div>";
}

function appendBingo(str) {
    bingoDiv.innerHTML += str;
}

function updateColors() {

    let bingo = findBingo();

    for(e of document.getElementsByClassName("text-holder")) {
        let elem = clickMap[e.innerHTML];
        if(elem.clicked) {
            if(bingo.includes(elem)) {
                e.style.backgroundColor = "#008376";
            } else {
                e.style.backgroundColor = "#094771";
            }
        } else {
            e.style.backgroundColor = "transparent";
        }
    }
}

function resize() {
    let sizeRef = Math.min(bingoDiv.parentElement.clientHeight, bingoDiv.parentElement.clientWidth);

    let sizeItem = ((sizeRef - 3) / 4) - 3 - 1.5;
    let fontSize = sizeItem * 0.15;

    for(e of document.getElementsByClassName("field")) {
        e.style.width = sizeItem + "px";
        e.style.height = sizeItem + "px";
        e.style.fontSize = fontSize + "px";
    }

    bingoDiv.style.width = sizeRef + "px";
    bingoDiv.style.height = sizeRef + "px";
    
}

function onClick(e) {
    let s = clickMap[e.currentTarget.innerHTML];
    s.clicked = !s.clicked;
    data[s.x][s.y] = s;
    updateColors();
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function State(x, y, clicked) {
    this.x = x;
    this.y = y;
    this.clicked = clicked;
}

function findBingo() {
    let bingo = [];

    for(let x = 0; x < 4; x++) {
        let found = true;
        for(let y = 0; y < 4 && found; y++) {
            if(!data[x][y].clicked) {
                found = false;
            }
        }

        if(found) {
            for(let y = 0; y < 4; y++) {
                bingo.push(data[x][y]);
            }
        }
    }

    for(let y = 0; y < 4; y++) {
        let found = true;
        for(let x = 0; x < 4 && found; x++) {
            if(!data[x][y].clicked) {
                found = false;
            }
        }

        if(found) {
            for(let x = 0; x < 4; x++) {
                bingo.push(data[x][y]);
            }
        }
    }

    let found = true;
    for(let x = 0; x < 4 && found; x++) {
        if(!data[x][x].clicked) {
            found = false;
        }
    }

    if(found) {
        for(let x = 0; x < 4; x++) {
            bingo.push(data[x][x]);
        }
    }

    found = true;
    for(let x = 0; x < 4 && found; x++) {
        if(!data[3 - x][x].clicked) {
            found = false;
        }
    }

    if(found) {
        for(let x = 0; x < 4; x++) {
            bingo.push(data[3 - x][x]);
        }
    }

    return bingo;
}