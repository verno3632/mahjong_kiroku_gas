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

export function userResultsFromJson(json: string){
  const data = JSON.parse(json);
  return data.map( (d: { user: string; value: string; }) => {
    return new UserResult(d.user, Number.parseInt(d.value, 10));
  });
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
