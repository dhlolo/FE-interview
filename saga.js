const noop = () => null
const is = {
  func: v => typeof v === 'function', /* 判断参数是否函数 */
  string: v => typeof v === 'string' /* 判断参数是否字符串 */
  /* ...... */
}

function digestEffect(rawEffect, cb) {
  let effectSettled = false

  function currCb(res, isErr) {
    if (effectSettled) {
      return
    }
    effectSettled = true
    cb.cancel = noop
    cb(res, isErr)
  }
  currCb.cancel = noop

  cb.cancel = () => {
    if (effectSettled) {
      return
    }
    effectSettled = true
    try {
      currCb.cancel()
    } catch (err) {
      console.error(err)
    }
    currCb.cancel = noop
  }

  runEffect(normalizeEffect(rawEffect, currCb))
}

// normalizeEffect 定义在其他文件
function normalizeEffect(effect, currCb) {
  if (is.string(effect)) {
    return [effect]
  } else if (is.promise(effect)) {
    return ['promise', effect]
  } else if (is.iterator(effect)) {
    return ['iterator', effect]
  } else if (is.array(effect)) {
    return effect
  } else {
    const error = new Error('Unable to normalize effect')
    error.effect = effect
    currCb(error, true)
  }
}


