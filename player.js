///
/// Rubik's Cube Player
///

//
// global variables
//

var TheCube;
var TheCubeSize = 140;
var MoveRE = /([a-z]2?'?)/gi;
var AllFaces = ["F", "B", "L", "R", "U", "D"];
var AllMods = ["", "'", "2"];

//
// clean a string (converting some Unicode characters)
//

function clean_string (string) {
    var a = [], len = string.length, c;
    for (var i = 0; i < len; i++) {
        c = string.charCodeAt(i);
        if (c == 8217) c = 39;
        if (c > 126) {
            console.log("unexpected character: " + c);
        } else {
            a.push(String.fromCharCode(c));
        }
    }
    return(a.join(""));
}

//
// return a random move
//

function random_move () {
    var f = AllFaces[Math.floor(Math.random() * AllFaces.length)];
    var m = AllMods[Math.floor(Math.random() * AllMods.length)];
    return(f + m);
}

//
// parse a string of moves and return an array of moves
//

function parse_moves (string) {
    var a = [], r;
    string = clean_string(string);
    while ((r = MoveRE.exec(string)) != null) {
        a.push(r[1]);
    }
    console.log("parsed: " + a.join(" "));
    return(a);
}

//
// reverse an array of moves
//

function reverse_moves (moves) {
    var a = [];
    $.each(moves, function (_, move) {
        if (move.length == 1) {
            a.splice(0, 0, move + "'");
        } else if (move.slice(-1) == "'") {
            a.splice(0, 0, move.substr(0, 1));
        } else {
            a.splice(0, 0, move);
        }
    });
    console.log("reversed: " + a.join(" "));
    return(a);
}

//
// execute the current list of moves
//

function execute_moves () {
    TheCube.execute($("#moves").val());
}

//
// execute the current list of moves backwards
//

function backward_moves () {
    var m = reverse_moves(parse_moves($("#moves").val()));
    TheCube.execute(m.join(" "));
}

//
// set the list of moves in the text box
//

function set_moves (moves) {
    $("#moves").val(moves.join(" "));
}

//
// handle a click on a face (turn into grey)
//

function click_face () {
    if ($("#grey").is(":checked"))
        $(this).css("background-color", "#aaaaaa");
}

//
// initialize the user interface
//

function init_ui () {
    $("#moves").change(function () {
        var m = parse_moves($("#moves").val());
        set_moves(m);
    });
    $("#execute").click(execute_moves);
    $("#backward").click(backward_moves);
    $("#xturn").click(function () {
        TheCube.execute("x");
    });
    $("#yturn").click(function () {
        TheCube.execute("y");
    });
    $("#zturn").click(function () {
        TheCube.execute("z");
    });
    $("#reload").click(function () {
        location.reload();
    });
    $("#randomize").click(function () {
        var m = [], n = "", p = "";
        while (m.length < 20) {
            n = random_move();
            if (n.charAt(0) != p.charAt(0)) m.push(n);
            p = n;
        }
        TheCube.execute(m.join(" "));
    });
}
