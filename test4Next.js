function taskRunner(tasks, onDone, onError) {
  const promise = tasks.reduce((res, item) => {
    // const newPromise = new Promise((resolve, reject) => {
    //   try {
    //     resolve(item() || true);
    //   } catch (err) {
    //     reject(err);
    //   }
    // });
    // console.log('===res', res);
    return res.then(() => new Promise((resolve, reject) => {
        try {
          resolve(item() || true);
        } catch (err) {
          reject(err);
        }
      }));
  }, new Promise((resolve) => resolve()));
  return promise.then(onDone).catch(onError);
}

const validateA = () => {
  console.log('a');
};
const validateB = () => {
  console.log('b');
};

const validateC = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('c');
            resolve('c');
        }, 1000);
    });
  };

const validateD = () => {
    console.log('d');
}

const validateE = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('e');
            resolve('e');
        }, 1000);
    });
}

taskRunner(
  [validateA, validateB, validateC, validateD],
  () => {
    console.log('done');
  },
  (err) => {
    console.log('error', err);
  }
);

class Promise2 {
    status = 'pending' // 'fulfilled' | 'rejected'
    callbacks = []

    constructor(callback) {
        
        return this;
    }



}


const promise = new Promise((resolve, reject) => {

})