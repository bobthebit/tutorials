// 01. console output

//styling
console.log('%c JavaScript ', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');
console.log('You can %c apply %c multiple %c styles!','color: red;','font-weight: 800;','color: orange;');
//tracing
console.trace('something...happened here...and you know where, because we used %cconsole.trace','color: lightblue;');

//table
a = {name: 'Bob', age: 45, luckyNumber:[5, 23, 42] };
b = {name: 'Jon', age: 103, luckyNumber:[7, 3, 2] };
c = {name: 'Anna', age: 20, luckyNumber:[5000, 3] };
console.table([a,b,c]);

//template string
console.log(`Did you know? ${b.name} likes template strings and is ${b.age} years old...`);

//template string function
function f(str, name, age) {
  const s = age > 50 ? 'older' : 'younger';
  return `${str[0]} ${name} ${s} than fifty because she/he is ${age}`
}

console.log(f`The person ${a.name} is ${a.age}`);

// 02. destructuring

//variables
const {name, luckyNumber} = a;
console.log(name, luckyNumber);


//function parameters
function f1({name, age}) {
  console.log(`${name} is ${age} years old...`);
}
f1(a)

//03. spread syntax

//copy objects
const newObj = {...a};
newObj.name = 'Frank';
console.table([a, newObj]);

//extend objects
const newData = {
  city: 'Berlin'
};
const newObj2 = {...a, ...newData};
console.log(newObj2);

//order of spread syntax: from left to right
const newData2 = {
  city: 'Hamburg'
}

let o = {...a, ...newData2, ...newData};
console.log(o);
o = {...a, ...newData, ...newData2};
console.log(o);

//array operations
let ar = []
ar = [...ar, 'B', 'C', 'D'];
console.log(ar);
ar = [...ar, 'E'];
console.log(ar);
ar = ['A', ...ar];
console.log(ar);

