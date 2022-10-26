var Rectangle = require("./Rectangle")

function RectanglePrism(x,y,a,b,c){
    Rectangle.call(this,x,y,a,b)
    this.c = c
}

RectanglePrism.prototype = Object.create(Rectangle.prototype)

RectanglePrism.prototype.getVolume = function getVolume() {
    return this.a * this.b * this.c
}

var p = new RectanglePrism(0,0,2,5,3)

console.log(p.getVolume(), p.getCoords())