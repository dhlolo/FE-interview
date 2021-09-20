// class promise {
//   callbacks = [];
//   state = 'pending';
//   value = null;

//   constructor(fn) {
//     fn(this._resolve.bind(this));
//   }

//   then(onFulfilled) {
//     // this.callbacks.push(onFullfilled);
//     if (this.state === 'pending') {
//       //在resolve之前，跟之前逻辑一样，添加到callbacks中
//       this.callbacks.push(onFulfilled);
//     } else {
//       //在resolve之后，直接执行回调，返回结果了
//       onFulfilled(this.value);
//     }
//     return this;
//   }

//   _resolve(value) {
//     // setTimeout(() => {
//     //     this.callbacks.forEach(fn => fn(value))
//     // });
//     this.state = 'fulfilled';
//     this.value = value;
//     this.callbacks.forEach((fn) => fn(value));
//   }
// }

// class Promise {
//   callbacks = [];
//   state = 'pending'; //增加状态
//   value = null; //保存结果
//   constructor(fn) {
//     fn(this._resolve.bind(this));
//   }
//   then(onFulfilled) {
//     return new Promise((resolve) => {
//       this._handle({
//         onFulfilled: onFulfilled || null,
//         resolve: resolve,
//       });
//     });
//   }
//   _handle(callback) {
//     if (this.state === 'pending') {
//       this.callbacks.push(callback);
//       return;
//     }
//     //如果then中没有传递任何东西
//     if (!callback.onFulfilled) {
//       callback.resolve(this.value);
//       return;
//     }
//     var ret = callback.onFulfilled(this.value);
//     callback.resolve(ret);
//   }
//   _resolve(value) {
//     this.state = 'fulfilled'; //改变状态
//     this.value = value; //保存结果
//     this.callbacks.forEach((callback) => this._handle(callback));
//   }
// }

// class Promise {
//   callbacks = [];
//   value = null;
//   state = 'pending';

//   constructor(fn) {
//     fn(this._resolve.bind(this));
//   }

//   then(onFulfilled) {
//     return new Promise((resolve) => {
//       this._handle({
//         onFulfilled: onFulfilled || null,
//         resolve: resolve,
//       });
//     });
//   }

//   _resolve(value) {
//     this.state = 'fulfilled';
//     this.value = value;
//     this.callbacks.forEach((fn) => this._handle(fn));
//   }

//   _handle(callback) {
//     if (this.state === 'pending') {
//       this.callbacks.push(callback);
//       return;
//     }
//     if (!callback.onFulfilled) {
//       callback.resolve(this.value);
//       return;
//     }
//     var ret = callback.onFulfilled(this.value);
//     callback.resolve(ret);
//   }
// }

// const mockAjax = (url, s, callback) => {
//   setTimeout(() => {
//     callback(url + '异步请求耗时' + s + '秒');
//   }, 1000 * s);
// };

// new Promise((resolve) => {
//   mockAjax('getUserId', 1, function (result) {
//     resolve(result);
//   });
// }).then((result) => {
//   console.log(result);
// });

// //line=readline()
// //print(line)

// function isType(type) {
//   return Object.prototype.toString.call(target) === `[Object ${type}]`;
// }

// function isSimp(target) {
//   return ['boolean', 'number', 'string', 'null'].findIndex(isType) > -1;
// }

// function cloneDeep(target, path = '') {
//   let res;
//   if (Array.isArray(target)) {
//     return target.map(cloneDeep);
//   }
//   if (isType('object')) {
//     return Object.entries(target).reduce((res, [k, v]) => {
//       return {
//         ...res,
//         [k]: cloneDeep(v),
//       };
//     }, {});
//   }
//   if (target === undefined) return undefined;
//   if (typeof target === 'function') return target;
//   if (isSimp(target)) {
//     res = target;
//     return res;
//   }
// }

// class Promise {
//   value = null;
//   state = 'pending';
//   callbacks = [];
//   constructor(fn) {
//     fn(this._resolve.bind(this));
//   }
//   then(onFulFilled) {
//     return new Promise((resolve) => {
//       this._handle({
//         onFulFilled: onFulFilled | null,
//         resolve,
//       });
//     });
//   }
//   _resolve(value) {
//     this.state = 'fulfilled';
//     this.value = value;
//     this.callbacks.forEach((callback) => this._handle(callback));
//   }
//   _handle(callback) {
//     if (this.state === 'pending') {
//       this.callbacks.push(callback);
//       return;
//     }
//     if (!callback.onFulFilled) {
//       callback.resolve(this.value);
//     }
//     let res = callback.onFulFilled(this.value);
//     callback.resolve(res);
//   }
// }

// function Parent() {}
// function Son() {
//   Parent.call(this);
//   this.name = 'son';
// }
// Son.prototype = new Parent();
// Son.prototype.constructor = Son;

// (function () {
//   var None = function () {};
//   None.prototype = Father.prototype;
//   Son.prototype = new None();
//   // 修复构造函数指向
//   Son.prototype.constructor = Son;
// })();

// class Promise {
//   value = null;
//   state = 'pending';
//   callbacks = []
//   constructor(fn) {
//     fn(this._resolve.bind(this))
//   }

//   then(fn) {
//     return new Promise(resolve => {
//       this._handle({
//         resolve,
//         onFulFiled: fn
//       })
//     })
//   }

//   _resolve(value) {
//     this.value = value;
//     this.state = 'fulfilled';
//     this.callbacks.forEach(callback => this._handle(callback))
//   }

//   _handle(callback) {
//     if (this.state === 'pending') {
//       this.callbacks.push(callback);
//       return;
//     }
//     if (!callback.onFulFilled) {
//       callback.resolve(this.value);
//       return;
//     }
//     var ret = callback.onFulFilled(this.value);
//     callback.resolve(ret);
//   }
// }

// setTimeout(() => {
//   console.log('setTimeout start');
//   new Promise(resolve => {
//     console.log('promise1 start');
//     resolve();
//   }).then(() => {
//     console.log('promise1 end');
//   });
//   console.log('setTimeout end');
// }, 0);
// function promise2() {
//   return new Promise(resolve => {
//     console.log('promise2');
//     resolve();
//   })
// }
// async function async1() {
//   console.log('async1 start');
//   await promise2();
//   console.log('async1 end');
// }
// async1();
// console.log('script end');

/**
 * async1 start
 * promise2
 * script end
 * async1 end
 * setTimeout start
 * promise1 start
 * setTimeout end
 * promise1 end
 */
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}
console.log('script start');
setTimeout(function () {
  console.log('setTimeout');
}, 0);
async1();
new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});
console.log('script end');
/**
 * script start
 * async1 start
 * async2
 * promise1
 * script end
 * promise2
 * setTimeout
 */

Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    (value) => P.resolve(callback()).then(() => value),
    (reason) =>
      P.resolve(callback()).then(() => {
        throw reason;
      })
  );
};

Promise.all = function (promiseArrs) { //在Promise类上添加一个all方法，接受一个传进来的promise数组
  return new Promise((resolve, reject) => { //返回一个新的Promise
      let arr = []; //定义一个空数组存放结果
      let i = 0;
      function handleData(index, data) { //处理数据函数
          arr[index] = data;
          i++;
          if (i === promiseArrs.length) { //当i等于传递的数组的长度时 
              resolve(arr); //执行resolve,并将结果放入
          }
      }
      for (let i = 0; i < promiseArrs.length; i++) { //循环遍历数组
          promiseArrs[i].then((data) => {
              handleData(i, data); //将结果和索引传入handleData函数
          }, reject)
      }
  })
}