import { call, prototype } from "./Rectangle"

function RectanglePrism(x,y,a,b,c){
    call(this,x,y,a,b)
    this.c = c
}

RectanglePrism.prototype = Object.create(prototype)

RectanglePrism.prototype.getVolume = function getVolume() {
    return this.a * this.b * this.c
}

var p = new RectanglePrism(0,0,2,5,3)

console.log(p.getVolume(), p.getCoords())