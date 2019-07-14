export class UserResult {
  public name: string;
  public score: number;
  public tobi: number;
  constructor(name: string, score: number, tobi: number = 0) {
    this.name = name;
    this.score = score;
    this.tobi = tobi;
  }
}

export type Input = {user1: string, user2: string, user3: string, user4: string, score1: string, score2: string, score3: string, score4: string}

// tslint:disable-next-line: max-classes-per-file
export class InputValidationError {
  public name: string;
  public error: string;
  constructor(name: string, error: string){
    this.name = name;
    this.error = error;
  }
}

export function userResults(input: Input): UserResult[] {
  return [
    new UserResult(input.user1, parseInt(input.score1.trim().split("¥s")[0], 10),parseInt(input.score1.trim().split("¥s")[1], 10)),
    new UserResult(input.user2, parseInt(input.score2.trim().split("¥s")[0], 10),parseInt(input.score2.trim().split("¥s")[1], 10)),
    new UserResult(input.user3, parseInt(input.score3.trim().split("¥s")[0], 10),parseInt(input.score3.trim().split("¥s")[1], 10)),
    new UserResult(input.user4, parseInt(input.score4.trim().split("¥s")[0], 10),parseInt(input.score4.trim().split("¥s")[1], 10)),
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

export function validateUsers(input: Input): InputValidationError[] {
  const users = [input.user1, input.user2, input.user3, input.user4];
  const errors = [];
  for (let i = 1; i < 4; i++) {
    for (let j = 0; j < i; j++) {
      if (users[j] === users[i]) {
        errors.push(
          new InputValidationError("user"+(i+1), "重複しています")
        );
      }
    }
  }
  return errors;
}

type ErrorString = string;
export function validateScoreString(score: string): ErrorString {
  const tr = score.trim().split(/\s/);
  if (tr.length > 2) {
    return "入力形式が間違っています";
  }

  if (tr.length === 2 && ![30, 20, 10, -10].includes(parseInt(tr[1], 10))) {
    return "飛び賞は30/20/10/-10です";
  }

  return;
}

export function validateScores(input: Input): InputValidationError[]{
  const errors = [];
  const scores = [input.score1, input.score2, input.score3, input.score4];
  for(let i = 0; i < 0; i++){
    const error = validateScoreString(scores[i]);
    if(error !== null){
      errors.push(new InputValidationError("score" + (i + 1), error));
    }
  }
  if(errors.length > 0){
    return errors;
  }else{
    return;
  }
}

export function validateTotalScore(results: UserResult[]): InputValidationError {
  const sum = results.map((r) => r.score + r.tobi).reduce((a,b) => a + b);
  if(sum !== 0){
    return new InputValidationError("score4", "得点の合計を0にして下さい("+ sum +")");
  }else{
    return;
  }
}