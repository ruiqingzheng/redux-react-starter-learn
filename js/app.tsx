


/****
 * 使用模块
 */

// import {newValue, newValue2} from "./mod";
// console.log(newValue , newValue2)
// or like below
import * as mod from "./mod";
console.log(mod.newValue, mod.newValue2)



// import * as React from 'react';    // 使用react 模块



/****
 * 使用fetch
 */

// declare var fetch;
fetch('http://localhost:3010/widgets')
    .then(res => res.json())
    .then(result => {
        console.log(result)
    })
    .catch(error => {
        console.error(error)
    })


/****
 *  rest param   剩余多变量的使用
 */

const doItRestParam = (a, b, ...c) => {
    console.log(c)          // a,b 以后的传参都放在c里面,    数组
}

doItRestParam(1, 2, 2, 3, 4, 5, 6, 7, 8, 9)


const nums = [1, 2, 3, 4, 5, 6]
const doit_sep = (a, b, c, d, e, f) => {
    console.log(a, b, c, d, e, f)
}

//doit_sep (nums);  //这种方式, a = numbs 所有元素,   b,c,d,e,f 都是undefined

// doit_sep(...nums)  // 这样传递的参数 , a =1 , b=2 依次类推


/***
 * 用对象属性来初始化和赋值变量  object destructure
 * var {firstName , lastName} =  student
 */

var student = {
    firstName: 'hendry',
    lastName: 'zheng'
}

var {firstName, lastName} =  student  //注意左边变量名需要用 {} 包裹起来
console.log(firstName, lastName)

//上面的方式, 要求变量名和属性名是一致, 如果需要其他的变量名, 那么格式如下:

var {firstName: fn, lastName:ln} = student
console.log(fn, ln)

//数组也可以用来拆分赋值给多个变量
const clr = ['white', 'yellow', 'blue', 'gray', 'orange']
const [favColor, secondFavColor, ... otherColors] = clr;
console.log(otherColors)    //['blue' ,'gray','orange']


/****
 * arrow function , 箭头函数的使用
 *
 */


const doIt = () => 'this is a test!';
const doIt2 = () => {
    return 'this is a test!'
}

console.log(doIt());

const doIt3 = (a, b, c) => {
    console.log(a, b, c)
}

doIt3(1, 2, 3)

const doIt4 = (a = 1, b = 2, c = 3) => {
    console.log(a, b, c)
}

doIt4();


/***
 * 不改变原数组, 返回新数组 ,
 *  添加:  oldArray.concat("new element")
 *  删除:  oldArray.slice(从头开始删除几个元素)
 */

var colors = ['red', 'yellow', 'blue', 'green'];
// var newArray = colors.concat('black')
var newArray = colors.slice(1) //删除第一个元素, red 被删除
console.dir(colors);
console.dir(newArray);


/***
 * Object.assign 创建新的对象
 * @type {{firstName: string; lastName: string}}
 */
const person = {
    firstName: 'Bob',
    lastName: 'Smith'
};

//Object.assign创建新的对象 , 而且后面还能添加新属性
const newPerson = Object.assign({}, person, {age: 23});
console.dir(person)
console.dir(newPerson)
console.log(person === newPerson)  //比较是否是同一个对象


