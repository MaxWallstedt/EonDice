function numKey(num) {
    var ninp = document.getElementById("input-n");
    var inp;

    if (ninp.checked) {
        inp = document.getElementById("n-input");
    } else {
        inp = document.getElementById("x-input");
    }

    inp.value = inp.value * 10 + num;
}

function numC() {
    var ninp = document.getElementById("input-n");
    var inp;

    if (ninp.checked) {
        inp = document.getElementById("n-input");
    } else {
        inp = document.getElementById("x-input");
    }

    inp.value = 0;
}

function numB() {
    var ninp = document.getElementById("input-n");
    var inp;

    if (ninp.checked) {
        inp = document.getElementById("n-input");
    } else {
        inp = document.getElementById("x-input");
    }

    inp.value = Math.floor(inp.value / 10);
}

function saveRoll() {
    var ul = document.getElementById("saved-rolls");
    var li = document.createElement("li");

    var nameField = document.getElementById("save-name");
    var nField = document.getElementById("save-n");
    var xField = document.getElementById("save-x");

    var name = nameField.value;
    var n = Math.abs(parseInt(nField.value));
    var x = parseInt(xField.value);

    if (name == "") {
        var dbg = document.getElementById("debug");
        dbg.value = "Du måste ge ditt slag ett namn.";
        return;
    }

    var liStr = name + ": " + n + "T6+" + x;
    var rollButton = document.createElement("input");
    var deleteButton = document.createElement("input");

    var rollFunc = "roll3(" + n + ", 6, " + x + ");";
    var deleteFunc = "deleteRoll(\"saved-roll-" + name + "\");";
    rollButton.setAttribute("type", "button");
    deleteButton.setAttribute("type", "button");
    rollButton.setAttribute("value", "Slå");
    deleteButton.setAttribute("value", "Radera");
    rollButton.setAttribute("class", "generated-button");
    deleteButton.setAttribute("class", "generated-button");
    rollButton.setAttribute("onclick", rollFunc);
    deleteButton.setAttribute("onclick", deleteFunc);

    li.setAttribute("id", "saved-roll-" + name);

    li.appendChild(document.createTextNode(liStr));
    li.appendChild(rollButton);
    li.appendChild(deleteButton);

    ul.appendChild(li);

    nameField.value = "";
    nField.value = 0;
    xField.value = 0;
}

function deleteRoll(id) {
    var ul = document.getElementById("saved-rolls");
    var li = document.getElementById(id);
    ul.removeChild(li);
}

function roll1(dx) {
    var n = Math.abs(parseInt(document.getElementById("n-input").value));
    roll2(n, dx);
}

function roll2(n, dx) {
    var x = parseInt(document.getElementById("x-input").value);
    roll3(n, dx, x);
}

function roll3(n, dx, x) {
    var out = document.getElementById("output");
    var name = document.getElementById("display-name").value;
    var sum = 0;

    if (name == "") {
        var dbg = document.getElementById("debug");
        dbg.value = "Du måste ange ett visningsnamn.";
        return;
    }

    if (dx == 6) {
        sum = roll6(n);
    } else {
        sum = roll10();
    }

    sum += x;

    var outputStr = name + " - " + n + "T" + dx + "+" + x + ": " + sum;
    out.value = outputStr + "\n" + out.value;
}

function roll6(n) {
    var dbg = document.getElementById("debug");
    var url = "";
    var sum = 0;

    var tmpDbg = "";
    var rolls = [];
    var sixes = 0;

    if (n == 0) {
        dbg.value = "0";
        return 0;
    }

    dbg.value = "";

    do {
        tmpDbg = dbg.value;

        if (tmpDbg == "") {
            dbg.value = "...";
        } else {
            dbg.value += "\n...";
        }

        url = "https://www.random.org/integers/?num=" + n + "&min=1&max=6&col=" + n + "&base=10&format=plain&rnd=new";
        rolls = httpGet(url).split("\t");

        for (var i = 0; i < n; i++) {
            rolls[i] = parseInt(rolls[i]);

            if (rolls[i] == 6) {
                sixes++;
            } else {
                sum += rolls[i];
            }
        }

        if (tmpDbg == "") {
            dbg.value = rolls;
        } else {
            dbg.value = tmpDbg + "\n" + rolls;
        }

        n = 2 * sixes;
        sixes = 0;
    } while (n > 0);

    return sum;
}

function roll10() {
    var dbg = document.getElementById("debug");
    var url = "https://www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new";
    var roll = 0;

    dbg.value = "...";
    roll = parseInt(httpGet(url));
    dbg.value = roll;

    return roll;
}

function httpGet(theUrl) {
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);

    return xmlHttp.responseText;
}
