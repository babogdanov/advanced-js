var Point = require("./Point");

function Rectangle(x,y,a,b) {
    Point.call(this,x,y)
    this.a = a
    this.b = b
}

Rectangle.prototype = Object.create(Point.prototype)

Rectangle.prototype.getPerimeter = function() {
    return (this.a + this.b) * 2
}

Rectangle.prototype.getArea = function() {
    return this.a * this.b
}

Rectangle.prototype.getLengthOfDiagonals = function() {
    var diag = Math.sqrt(this.a * this.a + this.b + this.b)
    return [diag,diag]
}

Rectangle.prototype.getBiggestCircle = function() {
    return 'napishi me bre!'
}

var rect = new Rectangle(0,0,2,10)

module.exports = Rectangle