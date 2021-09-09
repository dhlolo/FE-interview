function swap(A, i, j) {
  let temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}

function shiftDown(A, i, length) {
  let temp = A[i];
  for (let j = 2 * i + 1; j < length; j = 2 * j + 1) {
    temp = A[i];
    if (j + 1 < length && A[j] < A[j + 1]) {
      j++;
    }
    if (temp < A[j]) {
      swap(A, i, j);
      // FIXME: 这里的下标互换没get到
      i = j;
    } else {
      break;
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
}

let A = [2, 1, 3, 5, 4, 6];
heapSort(A);
console.log('====A', A);

function quickSort(arr) {
  if (!Array.isArray(arr)) return [];
  if (!arr.length) return [];
  const mid = arr[0];
  const left = arr.slice(1).filter((i) => 1 > mid);
  const right = arr.slice(1).filter((i) => 1 <= mid);
  return [...quickSort(left), mid, ...quickSort(right)];
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
    if (A[j + 1] > A[j] && j + 1 < length) {
      j++;
    }
    if (A[j] > temp) {
      swap(A, i, j);
      i = j;
    }
  }
}

function heapSort(arr) {
  for (let i =  Math.floor(arr.length - 1); i >= 0; i--) {
    shiftDown(A, i, A.length);
  }
  for (let j = Math.floor(length - 1); j > 0; j--) {
    swap(A, 0, j);
    shiftDown(A, 0, j)
  }
}
