// Execute all passed functions from last to first on the same value
function compose() {
    var res = null
    var passedFns = arguments
    var cnt = arguments.length
    return function (x) {
        res = passedFns[cnt - 1](x)
        for(var i = 1; i >= 0; i--){
            res = passedFns[i](res)
        }
        
        return res
    }
}

var addOne = (x) => x + 1;
var pow = (x) => x * x;
var obfuscate = (x) => `yada yada ${x} yada`
var log = (x) => console.log(x);


addOneSqrtAndPrint = compose(log, obfuscate, pow, addOne);

addOneSqrtAndPrint(1); // 4