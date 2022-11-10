function foo() {
  baz()
}

function baz() {
  bar()
}

function bar() {
  setTimeout(function () {
    console.log(1)
  }, 0)
  setImmediate(function () {
    console.log(3)
  })
}

foo()
console.log(2)
