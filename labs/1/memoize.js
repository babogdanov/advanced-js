//TODO: memoize same but unordered args 
function memoize(func) {
    var passedParams = []
    return function () {
        var passedArgsAndRes = { args: [], res: null }
        for (let i = 0; i < arguments.length; i++) {
            passedArgsAndRes.args.push(arguments[i])
        }
        var currArgsAndRes = passedParams?.find(param => param.args.every((x, i) => x === passedArgsAndRes.args[i]))?.res
        if (currArgsAndRes) {
            console.log(`returned memoized value ${currArgsAndRes}`)
            return currArgsAndRes
        }
       

        currArgsAndRes = func(...passedArgsAndRes.args)
        passedParams.push({ args: passedArgsAndRes.args.slice(), res: currArgsAndRes })
        console.log(`calculated value ${currArgsAndRes}`)
        return currArgsAndRes
    }
}


var sum = function (x, y) { return x + y; }
var threeprod = function(x,y,z) {return x * y * z}
var memSum = memoize(sum);
console.log(memSum(2, 3)); // пресмята, връща 5
console.log(memSum(3, 3)); // пресмята, връща 6
console.log(memSum(2, 3)); // директно връща 5 без да смята

var memPow2 = memoize(threeprod)
console.log(memPow2(4,2,3))
console.log(memPow2(5,1,5))
console.log(memPow2(4,2,3))

