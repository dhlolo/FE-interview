class Observer {
  constructor() {
    this.subscribers = {};
  }

  add(key, obj) {
    // 添加依赖 这里存放的obj应该具有哪些东东？
    if (!this.subscribers[key]) this.subscribers[key] = [];
    this.subscribers[key].push(obj);
  }

  delete() {
    // 删除依赖
    // this.subscribers...
  }

  notify(key, value) {
    // 通知更新
    this.subscribers[key].forEach((item) => {
      if (item.update && typeof item.update === 'function')
        item.update(key, value);
    });
  }
}

Observer.globalDataObserver = new Observer();

const isObject = (val) => val !== null && typeof val === 'object';

function reactive(target) {
  const handler = {
    get: function (target, key) {
      const res = Reflect.get(target, key);
      return isObject(res) ? reactive(res) : res; // 深层遍历
    },
    set: function (target, key, value) {
      if (target[key] === value) return true;
      trigger(key, value);
      return Reflect.set(target, key, value);
    },
  };
  const observed = new Proxy(target, handler);
  return observed;
}

function trigger(key, value) {
  // 有更改记录时触发更新 => 会调用所有Watcher中update方法
  Observer.globalDataObserver.notify(key, value);
}

export { reactive };
