// 引入redux
import {Action , Reducer , createStore, Store, ReducersMapObject,combineReducers } from 'redux'

// 定义actionType类型 , 因为TS 强类型 , 在定义crateAction 等时候需要用到 , 相当于全局静态变量一样
enum actionType{
    ADD,
    SUBTRACT
}

// 定义state类型 , 整个关注的核心就是state ,  这里要预先定义好state的结构
// 注意 AppState 要定义成接口类型, 而不是对象类型
interface AppState {
    sum: number,
    history: string[]    // 加入history 属性string
}

// 定义createAction
// 要定义createAction , 首先要定义Action类型, 它继承自redux.Action类型, 默认有type属性, 而且是接口
// 这里我们自定义一个value 属性
interface CalcAction extends Action {
    value:number
}
// 首先 它返回的是一个action , 所以 CalcAction
// 更具体的说它是 (value) => CalcAction 类型
const createAddAction: (value) => CalcAction = (value) => ({
    type: actionType.ADD,
    value
})

const createSubtractAction: (value) => CalcAction =  (value) => ({
    type:actionType.SUBTRACT,
    value
})



// 定义reducer , 定义的时候 , 箭头函数中的参数 如果只是写成state = {sum:0} 这样是错误的
// 一定要指定类型state: AppState = { sum : 0 }, action:CalcAction
// const reducer:Reducer<AppState> = (state: AppState = { sum : 0 , history: [] }, action:CalcAction) => {

// 拆分reducer , 这时reducer 的操作不是针对整个state , 而是针对state 里面的属性
// 所以也就不存在改变state ,   这里都是直接去操作 state 里面的属性, 所以不需要用 object.assign
const sumReducer:Reducer<number> = (sum: number = 0 , action:CalcAction ) => {
    switch(action.type) {
        case actionType.ADD:
            // return Object.assign({},state,state.sum + action.value) //这里的返回值的更新格式一定要记住 , 传递的是对象, 这样写就是错误的, 返回值错误, state没有更新
            // history = state.history.concat(`add action value ${action.value}`)
            return sum + action.value
        case actionType.SUBTRACT:
            // history = state.history.concat(`subtract action value ${action.value}`)
            return sum - action.value
        default:
            return sum;
    }
}

//同样的拆分的reducer 是去操作属性
const historyReducer:Reducer<string[]> = (history:string[] = [] , action: CalcAction) => {
    switch (action.type) {
        case actionType.ADD :
            return history.concat(`add action value ${action.value}`)
        case actionType.SUBTRACT:
            return history.concat(`subtract action value ${action.value}`)
        default:
            return history
    }
}

// 组合拆分 , 就需要用到  ReducersMapObject
// 定义一个ReducersMapObject 对象, 指定每个属性所对应的reducer
const reducersMap: ReducersMapObject = {
    sum: sumReducer,
    history: historyReducer
}


//初始化store
//const appStore:Store<AppState> = createStore<AppState>(reducer);
// 使用了拆分的 reducersMap 后, 就必须要用combine 把他们组合起来
const appStore:Store<AppState> = createStore<AppState>(combineReducers<AppState>(reducersMap));

// 使用subscribe 来获取state , subscribe 要定义在dispatch的前面 否则监控不到state变化
appStore.subscribe( () => {
    console.log("action dispatched and state reduced")
    console.log(appStore.getState())
})

// store dispatcher调用 , 参数为创建action, 调用createAction创建action , 从而改变state

appStore.dispatch(createAddAction(1))
appStore.dispatch(createSubtractAction(2))
appStore.dispatch(createAddAction(3))
appStore.dispatch(createSubtractAction(4))
appStore.dispatch(createAddAction(5))


