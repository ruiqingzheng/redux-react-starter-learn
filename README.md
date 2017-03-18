`app_before_combine.tsx`  文件是完整redux流程 , 其中AppState加入了一个history属性的, 只有一个针对state的完整的reducer
`app.tsx` 中做的是需要把sum和history 两个属性, 从一个reducer中拆分开来 
 
 sumReducer 对应sum属性的处理
 historyReducer 对应history属性的处理 
 
因为直接处理的是属性, 不再是直接去操作state , 因此操作属性的时候, 只要属性的类型正确, 
传递的值也只是属性的值, 而不是直接传递的state, 所以不需要去关心state是否改变

当分别对两个属性的`reducer` 定义好了后,  还需要一个`map`对象 , 引入`redux`中的`ReducersMapObject` 
指定属性由哪个`reducer`处理

```ts
const reducersMap: ReducersMapObject = {
    sum: sumReducer,
    history: historyReducer
}
```
最后还需要使用combineReducers , 来获取整个的 reducer `combineReducers<AppState>(reducersMap)`

`store`创建的时候需要传入的是最终组合了的`reducer`

`const appStore:Store<AppState> = createStore<AppState>(combineReducers<AppState>(reducersMap));`
