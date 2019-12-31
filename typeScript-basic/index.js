var a = 'Dylan';
a = 'Learning Full-stack';
var b;
b = [3, 4, 34];
b = 'Vehicle';
b = true;
var x = ['sdf', 23, parseInt('2323', 10)];
console.log(x);
/*当函数需要返回值的时候，返回值也是有类型的，如下例：输入一个size，就返回这个size，
这个时候函数体期望有个类型为string的返回值，如果不写return语句，那么就会报错
 */
function selectHotel(size) {
    console.log(size);
    return size;
}
selectHotel('medium');
//下面函数里的三个number都不能省略，因为传入值类型和返回值类型是相互独立的
function calc(op1, op2) {
    return op1 + op2;
}
var op1 = 3;
var op2 = 4;
calc(op1, op2);
var pizza;
pizza = {
    name: 'PizzaPizza',
    topping: ['pepper', 'mushroom', 'onion'],
    size: ['small', 'medium', 'large'],
    'dipping sauce': [1, 2, 3]
};
console.log(pizza);
