/**
 * 字符串解析
 * 
 * var a = {
 *  b: '1',
 *  c: '2',
 *  d: '3',
 * }
 */

 const EXP = /\{(\w+(\.\w+)*)\}/g

 // 返回 value 或者a.b
 function getValue(obj, rawKeys) {
     let res = obj;
     const keys = rawKeys.slice(1);
     if (keys.length < 1) return null;
     for (let i = 0; i < keys.length; i++) {
         key = keys[i];
         if (key in res) {
             res = obj[key];
         } else {
             res = rawKeys.join('.');
             return null;
         }
     }
     return res;
 }
 
 function parseStr(obj, str) {
     let bias = 0;
     let res = str;
     console.log('str.matchAll', str.matchAll);
     Array.from(str.matchAll(EXP)).forEach(i => {
         const keys = (i[1] || []).split('.');
         const value = getValue(obj, keys);
         if (!value) {
             // 如果没找到
             return;
         }
         const startIdx = i.index + bias;
         const endIdx = i[0].length;
         bias = value.toString().length - (i[0].length);
         let temp = res.split('');
         temp.splice(startIdx, endIdx, value);
         res = temp.join('');
     });
     return res;
 }
 
 var a = {
     b: 1,
     c: 2,
 }
 
 var tar = 'a{a.b}bb{a.c}cc{a.d}'
 
 console.log(parseStr(a, tar));