import { getMembers, writeLog, writeResult } from "./core";

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
function responseToChallengeRequest(challenge: string) {
  const json = JSON.stringify({challenge: challenge});
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

function createDialog(trigger_id: string, token: string){
  const options = getMembers().map(m => {
    return {
      label: m,
      value: m,
    };
  });
  return {
    token,
    trigger_id,
    dialog: JSON.stringify({
      callback_id: "dialog_send",
      title: "麻雀記録",
      submit_label: "記録する",
      notify_on_cancel: false,
      state: "Limo",
      elements: [
        {
          type: "select",
          label: "雀士1",
          name: "user1",
          options
        },
        {
          type: "text",
          label: "スコア1",
          name: "score1",
          placeholder: "40 +10"
        },
        {
          type: "select",
          label: "雀士2",
          name: "user2",
          options
        },
        {
          type: "text",
          label: "スコア2",
          name: "score2",
          placeholder: "10 -10"
        },
        {
          type: "select",
          label: "雀士3",
          name: "user3",
          options
        },
        {
          type: "text",
          label: "スコア3",
          name: "score3",
          placeholder: "-20"
        },
        {
          type: "select",
          label: "雀士4",
          name: "user4",
          options
        },
        {
          type: "text",
          label: "スコア4",
          name: "score4",
          placeholder: "-30"
        },
      ],
    }),
  };
}

function openDialog(trigger_id: string, token: string){
  const slackUrl = "https://slack.com/api/dialog.open";
  const response = UrlFetchApp.fetch(slackUrl, {
    contentType: "application/x-www-form-urlencoded",
    method: "post",
    payload: createDialog(trigger_id, token),
  });
  writeLog(trigger_id);
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
}

export function doPost(e) {
  const data = e.parameters;
  writeLog(data);
  if (data.challenge && data.challenge.length > 0) {
    responseToChallengeRequest(data.challenge);
  } else if (data.trigger_id && data.trigger_id.length > 0) {
    openDialog(data.trigger_id[0], "xoxb-6646773781-668656856550-ewV47doH9lNdjYuVkpoboTRz");
  } else {
    const jsonStr = e.postData.getDataAsString();
    writeResult(jsonStr);
  }
}
