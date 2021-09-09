var compress = function (chars) {
    // let res = [];
    let curLen = chars.length;
    let realPointer = 0;

    let last;
    let cnt = 0;
    for (let i = 0; i < chars.length; i++) {
        realPointer++;
        if (realPointer >= curLen) return chars.length;
        if (chars[realPointer] !== last) {
            console.log('===1')
            if (realPointer !== 0 && cnt > 1) {
                const insert = cnt.toString().split('');
                console.log('==left', realPointer - cnt - 1);
                console.log('==left', cnt - 1);
                console.log('==insert', insert)
                // 删除之前的，补上数字，并计算偏移
                chars.splice(realPointer - cnt - 1, cnt - 1, ...insert);
                const offset = cnt - 1 + insert;
                realPointer = realPointer - offset;
                curLen = curLen - offset;
            }
            last = chars[realPointer];
            cnt = 1;
        } else {
            console.log('===2')
            cnt++;
            if (realPointer === chars.length - 1) {
                // 删除之前的，补上数字，并计算偏移
                const insert = cnt.toString().split('');
                // 删除之前的，补上数字，并计算偏移
                chars.splice(realPointer - cnt - 1, cnt - 1, ...insert);
                const offset = cnt - 1 + insert;
                realPointer = realPointer - offset;
                curLen = curLen - offset;
            }
        }
    }
    return chars.length;
};

let test = ['a', 'a', 'b'];
compress(test)
console.log('test', test);