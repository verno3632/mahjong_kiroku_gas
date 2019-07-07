//
// SpreadSheetを使っていてテストできない
//
export class UserResult {
  public name: string;
  public score: number;
  constructor(name: string, score: number) {
    this.name = name;
    this.score = score;
  }
}

export function userResultFromJson(json: string){
  const data = JSON.parse(json);
  return new UserResult(data.user, Number.parseInt(data.value, 10));
}

export function getWinner(userResults: UserResult[]) {
  return userResults.reduce((a, b) => {
    return a.score > b.score ? a : b;
  });
}

export function getLooser(userResults: UserResult[]) {
  return userResults.reduce((a, b) => {
    return a.score < b.score ? a : b;
  });
}

export function dateString(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return year + "/" + month + "/" + day + " " + hour + ":" + minute;
}
