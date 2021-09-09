// 组合继承
function Parent() {}
function Son(name) {
  Parent.call(this);
  this.name = name;
}

Son.prototype = new Parent();
Son.prototype.constructor = Son;

// 寄生组合继承
function Son(name) {
  Parent.call(this);
  this.name = name;
}
(function () {
  // 创建一个没有实例方法的类
  var None = function () {};
  None.prototype = Father.prototype;
  // 将实例作为子类的原型
  Son.prototype = new None();
  // 修复构造函数指向
  Son.prototype.constructor = Son;
})();

function Parent() {}
function Son() {
    Parent.call(this);
    this.name = 'son';
}
(function() {
    var None = function () {};
    None.prototype = None.prototype;
    Son.prototype = new None();
    Son.prototype.constructor = Son;
});

function quickSort(arr) {
    if (!Array.isArray(arr) || !arr.length) return [];
    const mid = arr[0];
    const left = arr.slice(1).filter(i <= mid);
    const right = arr.slice(1).filter(i > mid);
    return [...quickSort(left), mid, ...quickSort(right)];
}

function swap(A, i , j) {
    const temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}

function shiftDown(A, i, length) {
    let temp = A[i];
    for (let j = 2 * i + 1; j < length; j = 2 * j + 1) {
        temp = A[i];
        if (A[j + 1] > A[j] && j + 1 < length) {
            j++
        }
        if (temp > A[j]) {
            swap(A, i, j);
            i = j;
        }
    }
}

function heapSort(arr) {
    for (let i = Math.floor((arr.length - 1) / 2); i >=0; i--) {
        shiftDown(A, i, A.length);
    }
    for (let j = Math.floor(arr.length - 1); j > 0; i--) {
        swap(A, 0, j);
        shiftDown(A, 0, j);
    }
}

class Promise {
    value = null;
    state = 'pending';
    callbacks = [];
    constructor(fn) {
        fn(this._resolve.bind(this));
    }
    _resolve(value) {
        this.state = 'fulfilled';
        this.value = value;
        this.callbacks.forEach(callback => this._handle(callback));
    }
    _handle(callback) {
        if (this.state === 'pending') {
            this.callbacks.push(callback);
            return;
        }
        if (!callback.onFulFilled) {
            callback.resolve(this.value);
            return;
        }
        var ret = callback.onFulFilled(this.value);
        callback.resolve(ret);
    }
    then(onFulFilled) {
        return new Promise(resolve => {
            this._handle({
                resolve,
                onFulFilled: onFulFilled || null,
            })
        })
    }
}
