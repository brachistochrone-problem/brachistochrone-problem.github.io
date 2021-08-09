// made by Laurin Seeholzer in august 2021

// module aliases
var Engine = Matter.Engine,
    Bodies = Matter.Bodies,
    World = Matter.World;
Composite = Matter.Composite;

// used variables
var engine;
var world;
var circles = [];
var id = 0;
var mass = 50;
var radius = 20;
var restitution = 0;
var friction = 0;
var canvasElem;

// datapoints for the brachistochrone
var brachisto = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 2],
    [0, 2],
    [0, 2],
    [0, 2],
    [0, 3],
    [0, 3],
    [0, 3],
    [0, 3],
    [0, 4],
    [0, 4],
    [1, 5],
    [1, 5],
    [1, 5],
    [1, 6],
    [1, 6],
    [1, 7],
    [1, 7],
    [1, 7],
    [1, 8],
    [1, 8],
    [2, 9],
    [2, 9],
    [2, 10],
    [2, 11],
    [2, 11],
    [2, 12],
    [3, 12],
    [3, 13],
    [3, 14],
    [3, 14],
    [3, 15],
    [4, 15],
    [4, 16],
    [4, 17],
    [4, 17],
    [5, 18],
    [5, 19],
    [5, 20],
    [6, 20],
    [6, 21],
    [6, 22],
    [7, 23],
    [7, 23],
    [7, 24],
    [8, 25],
    [8, 26],
    [9, 27],
    [9, 27],
    [9, 28],
    [10, 29],
    [10, 30],
    [11, 31],
    [11, 32],
    [12, 32],
    [12, 33],
    [13, 34],
    [13, 35],
    [14, 36],
    [14, 37],
    [15, 38],
    [16, 39],
    [16, 40],
    [17, 41],
    [18, 42],
    [18, 43],
    [19, 44],
    [20, 45],
    [20, 45],
    [21, 46],
    [22, 47],
    [22, 48],
    [23, 49],
    [24, 50],
    [25, 51],
    [26, 52],
    [26, 53],
    [27, 54],
    [28, 55],
    [29, 56],
    [30, 57],
    [31, 58],
    [32, 59],
    [33, 60],
    [34, 61],
    [35, 62],
    [36, 63],
    [37, 64],
    [38, 65],
    [39, 66],
    [40, 68],
    [41, 69],
    [42, 70],
    [43, 71],
    [44, 72],
    [45, 73],
    [46, 74],
    [47, 75],
    [49, 76],
    [50, 77],
    [51, 78],
    [52, 79],
    [53, 80],
    [55, 81],
    [56, 82],
    [57, 83],
    [59, 84],
    [60, 84],
    [61, 85],
    [63, 86],
    [64, 87],
    [65, 88],
    [67, 89],
    [68, 90],
    [69, 91],
    [71, 92],
    [72, 93],
    [74, 94],
    [75, 95],
    [77, 96],
    [78, 97],
    [80, 97],
    [81, 98],
    [83, 99],
    [84, 100],
    [86, 101],
    [88, 102],
    [89, 103],
    [91, 103],
    [92, 104],
    [94, 105],
    [96, 106],
    [97, 107],
    [99, 107],
    [101, 108],
    [102, 109],
    [104, 110],
    [106, 110],
    [108, 111],
    [109, 112],
    [111, 113],
    [113, 113],
    [115, 114],
    [116, 115],
    [118, 115],
    [120, 116],
    [122, 116],
    [124, 117],
    [125, 118],
    [127, 118],
    [129, 119],
    [131, 119],
    [133, 120],
    [135, 121],
    [137, 121],
    [139, 122],
    [140, 122],
    [142, 123],
    [144, 123],
    [146, 123],
    [148, 124],
    [150, 124],
    [152, 125],
    [154, 125],
    [156, 125],
    [158, 126],
    [160, 126],
    [162, 127],
    [164, 127],
    [166, 127],
    [168, 127],
    [170, 128],
    [172, 128],
    [174, 128],
    [176, 128],
    [178, 129],
    [180, 129],
    [182, 129],
    [184, 129],
    [186, 129],
    [188, 130],
    [190, 130],
    [192, 130],
    [194, 130],
    [196, 130],
    [198, 130],
    [200, 130]
];

// init
function setup() {
    // create canvas
    createCanvas(300, 300)
    engine = Engine.create();
    world = engine.world;

    // set variables for settings
    mass = document.getElementById("mass").value
    radius = document.getElementById("radius").value
    friction = document.getElementById("friction").value
    restitution = document.getElementById("restitution").value

    // create the brachistochrone with matter.js
    bulid_brachisto()

    // set eventlistener on canvas for creating a ball
    canvasElem = document.getElementById("defaultCanvas0")
    canvasElem.addEventListener("mousedown", function(e) {
        getMousePosition(canvasElem, e);
    });
}


// function to create the brachistochrone using matter.js
function bulid_brachisto() {

    // options for brachistochrone element
    var options = {
        isStatic: true, // "can't move"
        friction: 0
    }

    // for each coordinate, create a pixel
    brachisto.forEach(coords => {
        x = coords[0] + (document.getElementById("simulationbox").clientWidth / 2) - 110;
        y = coords[1] + 100
        pointp = Bodies.rectangle(x, y, 1, 1, options)
        World.add(world, pointp)
    })
}

// function to draw the brachistochrone with p5.js
function draw_brachisto() {
    // for each coordinate, create a pixel
    brachisto.forEach(coords => {
        x = coords[0] + (document.getElementById("simulationbox").clientWidth / 2) - 110;
        y = coords[1] + 80
        rect(x, y, 1, 1);
    })
}

// function to get the position of mouseclick
// used to create ball
function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    circles.push(new Circle(x, y, radius))
}


// draw loop
function draw() {
    // resize canvas to screensize
    // make it responsive
    resizeCanvas(document.getElementById("simulationbox").clientWidth - 20, document.getElementById("simulationbox").clientWidth - 20)

    // update physics
    Engine.update(engine);

    // set settings variables
    mass = 100 - document.getElementById("mass").value
    radius = document.getElementById("radius").value
    friction = document.getElementById("friction").value
    restitution = document.getElementById("restitution").value

    // set background
    background('#93A8AC')

    // set color
    fill(0)

    // for each ball, check if its out of the box, else just draw it
    for (var i = 0; i < circles.length; i++) {
        circles[i].show();
        if (circles[i].body.position.y > 300) {
            circles.shift(circles[i])
        }
    }

    // set analytics variables
    circles.forEach(circle => {
        document.getElementById("speed").innerHTML = "current speed of ball:  " + Math.round(circle.body.speed)
        document.getElementById("customRange1").value = Math.round(circle.body.speed)
    });

    // draw the brachistochrone using p5.js
    draw_brachisto()
}

// made by Laurin Seeholzer in august 2021