// // 3
// function maxUniq(tar) {
//   if (!tar.length) return '';
//   if (tar.length < 2) return tar;
//   let last = [tar[0]];
//   let res = '';
//   for (let l = 1; l < tar.length; l++) {
//     const curr = tar[l];
//     const findIdx = last.findIndex((i) => i === curr);
//     if (findIdx > -1) {
//       res = last.length > res.length ? last.join('') : res;
//       last = last.slice(findIdx + 1);
//     }
//     last.push(curr);
//   }
//   return res.length > last.join('').length ? res : last.join('');
// }

// const t = maxUniq('abcd')
// console.log('===t', t);

function expandCenterCounter(A, i, j) {
  while (A[i] === A[j] && i >= 0 && j < A.length) {
    i--;
    j++;
  }
  i++;
  j--;
  return A.slice(i, j + 1);
}
// 5
function palindrome(tar) {
  if (!tar.length) return '';
  if (tar.length < 2) return tar;
  let res = '';
  for (let i = 0; i < tar.length; i++) {
    const len1 = expandCenterCounter(tar, i, i);
    const len2 = expandCenterCounter(tar, i, i + 1);
    const len = len1.length > len2.length ? len1 : len2;
    if (len.length > res.length) res = len;
  }
  return res;
}

class Promise {
  state = 'pending';
  value = null;
  callbacks = [];
  constructor(fn) {
    fn(this._resolve.bind(this));
  }
  _resolve(value) {
    this.value = value;
    this.state = 'fulfilled';
    this.callbacks.forEach((callback) => this._handle(callback));
  }
  then(onFulfilled) {
    return new Promise((resolve) => {
      this._handle({
        onFulfilled: onFulfilled || null,
        resolve,
      });
    });
  }
  _handle(callback) {
    if (this.state === 'pending') {
      this.callbacks.push(callback);
      return;
    }
    if (!callback.onFulfilled) {
      callback.resolve(this.value);
      return;
    }
    let ret = callback.onFulfilled(this.value);
    callback.resolve(ret);
  }
}

function swap(A, i, j) {
  const temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}

function shiftDown(A, i, length) {
  let temp = A[i];
  for (let j = 2 * i + 1; j < length; j = 2 * j + 1) {
    temp = A[i];
    if (A[j] < A[j + 1] && j + 1 < length) {
      j++;
    }
    if (A[j] > temp) {
      swap(A, i, j);
      i = j;
    }
  }
}

function heapSort(A) {
  for (let i = Math.floor(A.length / 2 - 1); i >= 0; i--) {
    shiftDown(A, i, A.length);
  }
  for (let j = Math.floor(A.length - 1); j > 0; j--) {
    swap(A, 0, j);
    shiftDown(A, 0, j);
  }
  return A;
}

function curriedAdd(...args) {
  let allArgs = args;
  const adder = function (...moreArgs) {
    allArgs = allArgs.concat(...moreArgs);
    return adder;
  };
  adder.valueOf = function () {
    return allArgs.reduce((res, i) => res + i);
  };
  return adder;
}

function add() {
  // 第一次执行时，定义一个数组专门用来存储所有的参数
  var _args = Array.prototype.slice.call(arguments);

  // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
  var _adder = function () {
    _args.push(...arguments);
    return _adder;
  };

  // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
  _adder.toString = function () {
    return _args.reduce(function (a, b) {
      return a + b;
    });
  };
  _adder.valueOf = function () {
    return _args.reduce(function (a, b) {
      return a + b;
    });
  };
  return _adder;
}

console.log('===t', `${add(2)(3)(4)}`);
console.log('===t', add(2)(3)(4));
