// union type | OR
type status = "approved" | "rejected" | "onHold";

function exam(result: status): void {
  console.log(`Result is ${result}`);
}

exam("onHold");

// intersection type  & AND

interface colorName {
  color: string;
}

interface colorCode {
  code: string;
}

type colorFul = colorName & colorCode;

const color: colorFul = {
  code: "#000000",
  color: "black",
};

// String litrels
let direction = "north" | "south" | "east" | "west";

// number litrels

let dice = 1 | 2 | 3 | 4 | 5 | 6 | 7;

// combining with other types
type successMsg = {
  status: "success";
  code: any;
};
type errorMsg = {
  status: "error";
  code: any;
};

type apiresponse = successMsg | errorMsg;
