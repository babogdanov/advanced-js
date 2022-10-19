function curry(func) {
    var expectedParams = func.length
    var args = []
    return function f() {
        expectedParams -= arguments.length
        for (let i = 0; i < arguments.length; i++) {
            args.push(arguments[i])
        }

        if (expectedParams <= 0) {
            var argsCpy = args.slice()
            args = []
            expectedParams = func.length
            return func.apply(this,argsCpy)
        }

        return f
    }
}

function trippleAdd(a, b, c) {
    return a + b + c;
}

var cTrippleAdd = curry(trippleAdd);

console.log(cTrippleAdd(1)(2)(3)); //6
console.log(cTrippleAdd(1, 2)(3)); //6
console.log(cTrippleAdd(1, 2, 3)); //6
console.log(cTrippleAdd(1,2)(3,4))