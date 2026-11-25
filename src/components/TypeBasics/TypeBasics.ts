// Primitives
const num: number = 18;
const str: string = "Harshil";
const isAdmin: boolean = false;

console.log(num);
console.log(str);
console.log(isAdmin);

// Array
const arr: number[] = [1, 2, 3];
const arr1: string[] = ["harshil", "ramanuj"];

console.log(arr);
console.log(arr1);

// tuples
const arr3: [string, number, boolean] = ["Harshil", 18, true];
console.log(arr3);

// enum
enum Color {
  red,
  blue,
  orange,
}
const favColor: Color = Color.red;
console.log(favColor);

// any : avoid using it
let randomValue: any = 18;
randomValue = "harshil";
console.log(randomValue);

// unknown : safer option than any
let userInput: unknown = 18;
userInput = "Harshil";
console.log(userInput);

// Functions
// void : when functions don't return anything
function user(userName: string): void {
  console.log(userName);
}

let lastName = "Ramanuj";
