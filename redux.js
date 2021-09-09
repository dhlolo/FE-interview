function createStore(reducer, preloadedState, enhancer) {
    if (typeof enhancer !== 'undefined') {
        if (typeof enhancer !== 'function') {
            throw new Error('Expected the enhancer to be a function.')
        }
        return enhancer(createStore)(reducer, preloadedState)
    }

    let currState = preloadedState;
    let listeners = [];
    let isDispatching = false;
    const getState = () => currState;
    const subscribe = (listener) => {
        const idx = listeners.length;
        listeners.push(listener);
        return () => {
            listeners.splice(idx, 1)
        };
    }
    const dispatch = (action) => {
        if (isDispatching) {
            return;
        }
        try {
            isDispatching = true;
            currState = reducer(currState, action);
        } catch {
            isDispatching = false;
        }
        currentListeners.forEach(listener => listener())
        return action;
    };
    return {
        getState,
        subscribe,
        dispatch
    }
}


const defaultState = {
    value: 10
}
// reducer处理函数
function reducer (state = defaultState, action) {
    console.log(state, action)
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                value: state.value + 1
            }
        case 'DECREMENT':
            return {
                ...state,
                value: state.value - 1
            }
        default:
            return state
    }
}
const store = createStore(reducer)

const init = store.getState()
console.log(`一开始数字为：${init.value}`)

function listener () {
    const current = store.getState()
    console.log(`当前数字为：${current.value}`)
}
store.subscribe(listener) // 监听state的改变

store.dispatch({ type: 'INCREMENT' })
// 当前数字为：11
store.dispatch({ type: 'INCREMENT' })
// 当前数字为：12
store.dispatch({ type: 'DECREMENT' })
// 当前数字为：11

export default store