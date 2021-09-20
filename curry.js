// function curry(fn) {
//   let args = [].slice.call(this, 1);
//   return function currying() {
//     args = args.concat(Array.from(arguments));
//     const len = args.length;
//     return len >= fn.length ? fn.apply(this, args) : currying;
//   };
// }
// function add(a, b, c) {
//   return a + b + c;
// }
// const add1 = curry(add);
// console.log(add1(1, 2)(3));

var add = function (a, b) {
  return a + b;
};

var currying = function (fn, defineVal = 0) {
  return function (...args) {
    // 第一次调用的是这个函数
    // 每次执行前先进行和的初始化
    var sum = defineVal;

    function func(...argts) {
      // 第二次之后调用的是这个函数
      if (args.length === 0) {
        return func.toString();
      } else {
        argts.unshift(sum);
        sum = argts.reduce(fn);
        return func;
      }
    }
    func.toString = () => sum;
    return func(...args);
  };
};

var add = currying(add);
console.info('' + add(1)); // => 1
console.info('' + add(1)(2)); // => 3
console.info('' + add(1)(2)(3)); // => 6
console.info('' + add(1, 2)(3)); // => 6
console.info('' + add(1)(2, 3)); // => 6
console.info('' + add(1, 2, 3)); // => 6
console.info('' + add(1, 2, 3)(4)); // => 10
