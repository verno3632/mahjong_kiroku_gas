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

export function getWinner(userResults: UserResult[]) {
  return userResults.reduce((a, b) => {
    return a.score > b.score ? a : b;
  });
}
