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

export function userResultsFromJson(submission: {user1: string, user2: string, user3: string, user4: string, score1: string, score2: string, score3: string, score4: string}){
  return [
    new UserResult(submission.user1, Number.parseInt(submission.score1, 10)),
    new UserResult(submission.user2, Number.parseInt(submission.score2, 10)),
    new UserResult(submission.user3, Number.parseInt(submission.score3, 10)),
    new UserResult(submission.user4, Number.parseInt(submission.score4, 10)),
  ];
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
