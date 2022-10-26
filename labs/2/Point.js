function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.getDistance = function getDistance(point2) {
  return Math.sqrt(
    Math.pow(point2.x - this.x, 2) + Math.pow(point2.y - this.y, 2)
  );
};

Point.prototype.getCoords = function () {
  return {x: this.x, y: this.y}
};

var p1 = new Point(0, 0);
var p2 = new Point(1, 1);

module.exports = Point
