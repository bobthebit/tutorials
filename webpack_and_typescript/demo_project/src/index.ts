import { MyClass } from './myModule';
import { MyOtherClass } from '_deep/myOtherModule';
const c = new MyClass('Bob');
console.log('Hello from script');
c.great();

const c2 = new MyOtherClass();
c2.great();