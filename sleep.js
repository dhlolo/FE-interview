async function sleep(delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

async function test() {
  await sleep();
  console.log('here');
}

test();