var Point = require("./Point");

function Circle(x, y, r) {
  Point.call(this, x, y);
  this.r = r;
}

Circle.prototype = Object.create(Point.prototype);

Circle.prototype.getCircumference = function () {
  return this.r * 2 * Math.PI;
};

Circle.prototype.getArea = function () {
  return this.r * this.r * Math.PI;
};

Circle.prototype.intersects = function (circle2) {
  console.log(this.getDistance(circle2));
  return this.getDistance(circle2) <= this.r + circle2.r;
};

var c1 = new Circle(0, 0, 2);
var c2 = new Circle(3, 4, 5);
