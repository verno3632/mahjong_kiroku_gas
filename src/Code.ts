// // 型定義
// const isDone: boolean = false;
// const height: number = 6;
// const bob: string = "bob";
// const list1: number[] = [1, 2, 3];
// const list2: number[] = [1, 2, 3];

// enum Color {
//   Red,
//   Green,
//   Blue
// }

// const c: Color = Color.Green;
// let notSure: any = 4;
// notSure = "maybe a string instead";
// notSure = false; // okay, definitely a boolean

// function showMessage(data: string): void {
//   // Void
//   Logger.log(data);
// }
// showMessage("hello");

// // クラス
// class Hamburger {
//   constructor() {
//     // コンストラクタ
//   }
//   public listToppings() {
//     // メソッド
//   }
// }

// // テンプレート文字列
// const name = "Sam";
// const age = 42;
// console.log(`hello my name is ${name}, and I am ${age} years old`);

// // Rest arguments
// const add = (a: number, b: number) => a + b;
// const args = [3, 5];
// add(...args); // same as `add(args[0], args[1])`, or `add.apply(null, args)`

// // スプレッド構文 (array)
// const cde = ["c", "d", "e"];
// const scale = ["a", "b", ...cde, "f", "g"]; // ['a', 'b', 'c', 'd', 'e', 'f', 'g']

// // スプレッド構文 (map)
// const mapABC = { a: 5, b: 6, c: 3 };
// const mapABCD = { ...mapABC, d: 7 }; // { a: 5, b: 6, c: 3, d: 7 }

// // 分割代入
// const jane = { firstName: "Jane", lastName: "Doe" };
// const john = { firstName: "John", lastName: "Doe", middleName: "Smith" };
// function sayName({ firstName, lastName, middleName = "N/A" }) {
//   console.log(`Hello ${firstName} ${middleName} ${lastName}`);
// }
// sayName(jane); // -> Hello Jane N/A Doe
// sayName(john); // -> Helo John Smith Doe

// // Export (The export keyword is ignored)
// export const pi = 3.141592;

// // Google Apps Script の独自サービスの利用
// const doc = DocumentApp.create("Hello, world!");
// doc
//   .getBody()
//   .appendParagraph("This document was created by Google Apps Script.");

// // デコレータ（高階関数）
// function Override(label: string) {
//   return (target: any, key: string) => {
//     Object.defineProperty(target, key, {
//       configurable: false,
//       get: () => label
//     });
//   };
// }
// class Test {
//   @Override("test") // invokes Override, which returns the decorator
//   public name: string = "pat";
// }
// const t = new Test();
// console.log(t.name); // 'test'

function doGet() {
  const members = getMembers().sort();

  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify(members));
  return output;
}

function dateString() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return year + "/" + month + "/" + day + " " + hour + ":" + minute;
}

const dateCellNum = 1;
const winnerCellNum = 2;
const looserCellNum = 3;
const userKey = "user";
const valueKey = "value";

function getUserColumnNumMap(){
  const lastColumn = sheet.getLastColumn();
  const userNumMap = {};
  for(let i = userStartColumnNum; i <= lastColumn; i++) {
    const value = sheet.getRange(userRowNum, i).getValue();
    userNumMap[value] = i;
  }
  return userNumMap;
}

export function doPost(e) {
  const userColumnNumMap = getUserColumnNumMap();

  const data = JSON.parse(e.postData.contents);

  const targetRow = sheet.getLastRow() + 1;

  const date = dateString();
  const dateCell = sheet.getRange(targetRow, dateCellNum);
  dateCell.setValue(date);

  const winnerCell = sheet.getRange(targetRow, winnerCellNum);
  winnerCell.setValue("=INDEX(D$1:$1, MATCH(MAX(D" + targetRow + ":" + targetRow+"), D"+targetRow+":"+targetRow+", 0))");

  const looserCell = sheet.getRange(targetRow, looserCellNum);
  looserCell.setValue("=INDEX(D$1:$1, MATCH(MIN(D"+targetRow+":"+targetRow+"), D"+targetRow+":"+targetRow+", 0))");

  for (const datum of data) {
    const name = datum[userKey];
    const cell = sheet.getRange(targetRow, userColumnNumMap[name]);
    cell.setValue(datum[valueKey]);
  }
}
