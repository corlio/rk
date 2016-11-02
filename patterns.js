///
/// Interesting Rubik's Cube Patterns
///

//
// variables
//

var KnownPatterns = [
    { "title": "Anaconda", "algo": "L U B' U' R L' B R' F B' D R D' F'", "order": 3 },
    { "title": "Cross", "algo": "R2 L' D F2 R' D' R' L U' D R D B2 R' U D2", "order": 3 },
    { "title": "Cube in Cube in Cube", "algo": "U' L' U' F' R2 B' R F U B2 U B' L U' F U R F'", "order": 3 },
    { "title": "Cube in Cube", "algo": "F L F U' R U F2 L2 U' L' B D' B' L2 U", "order": 3 },
    { "title": "Exchanged Peaks", "algo": "F U2 L F L' B L U B' R' L' U R' D' F' B R2", "order": 2 },
    { "title": "Perfect Checkerboard", "algo": "R' D' F' D L F U2 B' L U D' R' D' L F L2 U F'", "order": 6 },
    { "title": "Simple Checkerboard", "algo": "F2 B2 L2 R2 U2 D2", "order": 2 },
    { "title": "Six Spots", "algo": "U D' R L' F B' U D'", "order": 3 },
    { "title": "Six T's", "algo": "F2 R2 U2 F' B D2 L2 F B", "order": 6 },
    { "title": "Superflip", "algo": "U R2 F B R B2 R U2 L B2 R U' D' R2 F R' L B2 U2 F2", "order": 2 },
    { "title": "Twisted Checkerboard", "algo": "F B2 R' D2 B R U D' R L' D' F' R2 D F2 B'", "order": 3 },
    { "title": "Twisted Peaks", "algo": "F B' U F U F U L B L2 B' U F' L U L' B", "order": 3 },
    { "title": "Vertical Stripes", "algo": "F U F R L2 B D' R D2 L D' B R2 L F U F", "order": 2 },
    { "title": "Zigzag", "algo": "R L B F R L B F R L B F", "order": 2 },
    //{ "title": "", "algo": "", "order": 0 },
];
var RoofpigConfig = [ "flags=canvas startsolved", "hover=none" ];
var PatternsTable = [];

//
// functions
//

function patterns_setup () {
    $.each(KnownPatterns, function (_, entry) {
        var id = entry.title.toLowerCase().replace(/ /g, "");
        var div = $("<div>");
        div.attr("id", id);
        div.addClass("roofpig");
        div.attr("data-config", RoofpigConfig.concat(["alg=" + entry.algo]).join("|"));
        entry.html = div.prop("outerHTML");
        entry.length = entry.algo.split(/\s+/).length;
        PatternsTable.push([ entry.title, entry.algo, entry.length, entry.order, entry.html ]);
    });
}

function patterns_play () {
    $(".roofpig-button-enabled").filter("[id ^=play-]").trigger("click");
}
