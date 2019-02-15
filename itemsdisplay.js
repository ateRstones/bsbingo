window.onload = function() {
    load();
}

function load() {
    let main = document.getElementById("main");

    let itemSorted = items.sort(function(e1, e2) {
        let el1 = e1.toLowerCase();
        let el2 = e2.toLowerCase();

        if(el1 > el2) {
            return 1;
        } else if(el1 < el2) {
            return -1;
        } else {
            return 0;
        }
    });

    for(it of itemSorted) {
        main.innerHTML += "<div>" + it + "</div>";
    }
}