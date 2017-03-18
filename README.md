/****
 * reduce function
 *
 * 根据action的type 和 相关的数据 , 产生新的state
 * reduce第一次运行时创建初始化state
 * reduce function 是纯函数
 *
 *  因为这个测试页面都是在浏览器里面, 所以只能都写在一起 , 写在这个app.tsx里面
 */

// 步骤一:　理解数组的reduce方法

```js
const nums = [1, 2, 3, 4, 5]
const sum = nums.reduce((prev, current) => {
    console.log('prev', prev, 'current', current)
    return prev + current;
})

console.log(sum)
```


//步骤二:  理解action和state , 用action和state来替换reduce方法中的变量

//reduce 除了启动时, 第一个参数是初始化参数外
// 后面的每次循环   prev 参数都是上一次的运算结果

// 每次拿传递过来的参数(上一次的状态) , 用新的参数(action)来运算,  得出一个新的结果(新的状态)
// 于是就理解成了 , action 修改了 state

// 当我饿了, 我就去吃饭 , 吃完饭就饱了  ,   吃饭就是一个action , 饿 和 饱就是不同的state
// 那么改造上面的代码

```js
const actions = [1, 2, 3, 4, 5]
const finalState = actions.reduce((state, action) => {
    console.log('state', state, 'action', action)
    return state + action
})
console.log(finalState)
```



// 步骤三: 改造action
//在步骤二中, actions 只是单纯的数据 , 并不是实际的怎么操作, 那么这里我们把action替换成type 和 value 的对象结构

```js
const actions = [{type: 'add', value: 1}, {type: 'subtract', value: 2}, {type: 'add', value: 3},
    {type: 'subtract', value: 4}, {type: 'add', value: 5}]

const finalState = actions.reduce((state, action) => {
    console.log('state', state, 'action', action)
    switch (action.type) {
        case  'add':
            return state + action.value //因为有return 所以不需要break
        case 'subtract':
            return state - action.value;
        default:
            return state
    }
}, 0)   //0 是reduce 方法的第二个参数 , 表示初始化的state值

console.log(finalState)
```



//步骤四 :  Object.assign() //第一个参数必须是{} , 这样才是创建一个新的对象
// state 是不可变的变量 , 因此每次都需要创建一个新的变量返回
// 而简单类型是不能使用 assign 方法的, 因此初始的state 必须是一个对象
// 所以先要把上面步骤三里面的, reduce 中的第二个参数默认state = 0 , 换成对象,  {}
// 然后比如需要的结果 , 就以对象属性result进行返回 {result:0}

```js
const actions = [{type: 'add', value: 1}, {type: 'subtract', value: 2}, {type: 'add', value: 3},
    {type: 'subtract', value: 4}, {type: 'add', value: 5}]

const finalState = actions.reduce((state, action) => {
    console.log('state', state, 'action', action)
    switch (action.type) {
        case  'add':
            return Object.assign({}, state, {result: state.result + action.value}) //第一个参数必须是{} , 这样才是创建一个新的对象, 第二个参数指定返回的是一个基于state的新的对象
        case 'subtract':
            return Object.assign({}, state, {result: state.result - action.value});
        default:
            return state
    }
}, {result: 0})   //0 是reduce 方法的第二个参数 , 表示初始化的state值

console.log(finalState)
```

 

//步骤五: 
// 结合store , 所有的事件都通过store 来更新state
//当创建了actions  那么需要用store来处理actions

```js


import {Action, Reducer, createStore, Store} from 'redux';
import {newValue} from "./mod";

//action 必须有type属性 , 定义actionTypes
enum actionTypes {
    ADD,
    SUBTRACT
}

//定义接口继承自Action , 这个接口是用来作为 创建action函数 的返回类型
interface CalcAction extends Action {
    //Action 父类自带有type 属性的定义类型
    value: number  //定义value 属性为number
}

// 定义创建action的方法  , 这个方法 返回一个创建action的方法 ,
// createAddAction : (value:number) => CalcAction  后面的这一截表示返回结果类型的是一个方法
// 这两个创建action的方法,   是提供给store使用的 ,  这个reduce 都只是定义各种方法
// reduce 方法定义了 action 怎么处理
// create action 方法定义了   怎么创建 `特定的action方法` ,  最终都是提供给store 调用
const createAddAction: (value: number) => CalcAction = (value) => ({
    type: actionTypes.ADD,
    value: value
})

const createSubtractAction: (value: number) => CalcAction = (value) => ({
    type: actionTypes.SUBTRACT,
    // value:value 简写成value
    value
})

// redux 中的reducer 或者 store 最终都是要处理state , 所以这里定义一个类型 AppState
interface AppState {
    result: number
}


// 以前的这些action定义就可以不需要了,   store 到时候会使用createAddAction , 或createSubtractAction , 这样的action创建方法来创建action
// const actions = [{type: 'add', value: 1}, {type: 'subtract', value: 2}, {type: 'add', value: 3},
//     {type: 'subtract', value: 4}, {type: 'add', value: 5}]

const reducer: Reducer<AppState> = (state: AppState = {result: 0}, action: CalcAction) => {
    switch (action.type) {
        case  actionTypes.ADD:
            return Object.assign({}, state, {result: state.result + action.value}) //第一个参数必须是{} , 这样才是创建一个新的对象, 第二个参数指定返回的是一个基于state的新的对象
        case actionTypes.SUBTRACT:
            return Object.assign({}, state, {result: state.result - action.value});
        default:
            return state
    }
}


// 使用store
// appStore:Store<AppState> 定义变量类型,  理解成返回值是一个store , 是一个AppState 相关的Store
const appStore: Store<AppState> = createStore<AppState>(reducer)

// subscribe 这些方法里面都是去直接访问AppState , 而是通过getState 这样类似的方法
appStore.subscribe(() => {
    console.log("action was dispatched , state was reduced")
    console.log(appStore.getState())
})

appStore.dispatch(createAddAction(1))
appStore.dispatch(createSubtractAction(2))
appStore.dispatch(createAddAction(3))
appStore.dispatch(createSubtractAction(4))
appStore.dispatch(createAddAction(5))

```


