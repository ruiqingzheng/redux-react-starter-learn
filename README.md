# `redux` 结合 `react`
1. 状态state 的定义 , AppState  接口类型
首先要确定应用的`state`  , 以访问api接口为例子, 这个`state` 设置为`api`返回结果`widgets`
`state` 对象的属性 `widgets`  

2. (事件类型)actionType的定义, actionType
和state相关的action , 只有一个属性widgets , 那么就是和widgets相关的action有
 `REFRESH_WIDGETS_REQUEST` 发起请求 和 `REFRESH_WIDGETS_DONE` 请求完成获得数据 , 这两个事件, actionType 可以理解为就是事件
 
3. `创建action方法`的定义
  先要定义`action` ,需要继承自`redux.Action`
  `action`中需要包含我们需要的自定义的数据(事件数据) , 提供给`reducer`  (事件数据)
  且结合`actionType` , 前面定义的只是`actionType` , 它也是属于`action`的一部分
  `创建action方法` 就是完成这个结合的功能,
  调用`创建action方法`将返回我们定义的`action` ,  包含了`actionType`和`自定义数据` 提供给store调用的
  `store.dispatch`调用后一旦生成`action` , `store`内部会调用`reducer` 就会处理该`action` 从更新`state` 
  
   
4. 状态更新reducer的定义
只有一个属性, 所以没有用到拆分reducer. 
根据AppState 和actionType , 就可以定义reducer , reducer 只是定义当发生`action`事件时`state`的变化


5. `store`的创建
  根据定义的`AppState` 和 `reducer` 初始化`store`
   
6. 使用`store` 来获取数据
比如这个例子获取数据的事件有两个 , 1. 发送request , 2. 获取到数据
那么store就需要按这个流程来 , 定义方法 `refreshWidgets`
store先`emit request`事件 , 然后store调用fetch方法来取数据, 当数据获取成功 emit DONE 事件
那么这个获取数据的流程, 就是个`flow`  , 通过`store`来操作


上面这6个步骤都基本上是纯`redux` 代码 

其中定义 `创建action方法` , 和 使用`store` 来获取数据 , 
这几个基本上就是`定义事件`,  `事件emit流程(使用store定义)`  , 所以可以把他们放在一个文件中

  