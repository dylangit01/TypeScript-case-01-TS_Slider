let a: string = 'Dylan'
a = 'Learning Full-stack'

let b: number[] | string | boolean
b = [3,4,34]
b = 'Vehicle'
b = true

let x: any[] = ['sdf', 23, parseInt('2323',10)]
console.log(x)

/*当函数需要返回值的时候，返回值也是有类型的，如下例：输入一个size，就返回这个size，
这个时候函数体期望有个类型为string的返回值，如果不写return语句，那么就会报错
 */
function selectHotel(size: 'small' | 'medium' | 'large'):string {
    console.log(size)
    return size;
}

selectHotel('medium')

//下面函数里的三个number都不能省略，因为传入值类型和返回值类型是相互独立的
function calc(op1: number, op2: number): number {
    return op1 + op2
}
let op1 = 3
let op2 = 4

calc(op1, op2)

let pizza: {
    name: string,
    topping: string[],
    size: string[],
    'dipping sauce': number[],
}

pizza = {
    name: 'PizzaPizza',
    topping: ['pepper','mushroom','onion'],
    size: ['small','medium', 'large'],
    'dipping sauce': [1,2,3]
}

console.log(pizza)

//////////////////////先定义类型！！
let rollUp = (imgs: string[]) => {
    console.log(imgs)
}
setInterval(rollUp,1000)
||
setInterval((imgs: string[]) => {
    console.log()
}, 1000)








