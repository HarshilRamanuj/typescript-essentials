// Basic functions with type

function add(a: number, b: number): number {
  return a + b;
}
const sum = add(10, 8);
console.log(sum);

// Optional parameters

function inputForm(
  firstName: string,
  middleName: string,
  lastName?: string,
): string {
  if (lastName) {
    return `${firstName} ${middleName} ${lastName}`;
  }
  return `${firstName} ${middleName}`;
}

console.log(inputForm("Ramanuj", "Harshilkumar", "Anilbhai"));

// objects
const userData: { name: string; age: number } = {
  name: "harshil",
  age: 26,
};

// interface

interface user {
  name: string;
  age: number;
  phone?: number; //optional
  readonly id: number;
}

const userInfo: user = {
  name: "harshil",
  age: 18,
  id: 18,
};
