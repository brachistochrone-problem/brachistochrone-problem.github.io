// made by Laurin Seeholzer in august 2021

// ball/circle element
function Circle(x, y, d) {

    // options for circle
    var options = {
        friction: friction,
        restitution: restitution,
        frictionAir: 0,
        mass: mass,
    }

    // create body
    this.body = Bodies.circle(x, y, d, options)
    this.d = d

    // add body to the "world"
    World.add(world, this.body);

    // define show funtion
    // used to draw element
    this.show = function() {
        var pos = this.body.position;
        var angle = this.body.angel;
        push();
        translate(pos.x, pos.y);
        circle(0, 0, this.d)
        pop()
    }
}

// made by Laurin Seeholzer in august 2021