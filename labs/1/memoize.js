//TODO: memoize same but unordered args 
function memoize(func) {
    var passedParams = []
    return function () {
        var argsAndRes = { args: [], res: null }
        for (let i = 0; i < arguments.length; i++) {
            argsAndRes.args.push(arguments[i])
        }
        var res = passedParams?.find(param => param.args.every((x, i) => x === argsAndRes.args[i]))?.res
        if (res) {
            console.log(`returned memoized value ${res}`)
            return res
        }
       

        res = func(...argsAndRes.args)
        passedParams.push({ args: argsAndRes.args.slice(), res: res })
        console.log(`calculated value ${res}`)
        return res
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

