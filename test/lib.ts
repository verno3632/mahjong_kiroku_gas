import { assert } from "chai";
import { describe, it } from "mocha";
import { dateString, getLooser, getWinner, Input, UserResult, userResults, validateUsers, validateScores, validateScoreString, validateTotalScore } from "../src/lib";

describe("getWinner", () => {
    it("1位を出す", () => {
        const winner = new UserResult("winner", 30);
        const userResults = [
            new UserResult("looser1", -20),
            new UserResult("looser2", -10),
            winner,
            new UserResult("looser3", 0),
        ];
        assert.equal(getWinner(userResults), winner);
    });
});

describe("getLooser", () => {
    it("4位を出す", () => {
        const looser = new UserResult("looser", -30);
        const userResults = [
            new UserResult("winner1", 30),
            looser,
            new UserResult("winner2", 10),
            new UserResult("winner3", -10),
        ];
        assert.equal(getLooser(userResults), looser);
    });
});

describe("dateString", () => {
    it("値を返す", () => {
        const date = new Date("2019-06-30 09:59");
        assert.equal(dateString(date), "2019/6/30 9:59");
    });
});

describe("UserResult", () => {
    it("Jsonから生成する", () => {
        const submission = {
            user1: "user1",
            user2: "user2",
            user3: "user3",
            user4: "user4",
            score1: "30",
            score2: "-30",
            score3: "-30",
            score4: "30",
        }
        const results: UserResult[] = userResults(submission) as UserResult[];
        assert.equal(results[0].name, "user1");
        assert.equal(results[0].score, 30);
        assert.equal(results[1].name, "user2");
        assert.equal(results[1].score, -30);
    });
});

describe("validateUsers", () => {
    it("ユーザーが重複している", () => {
        const input: Input = {
            user1: "user1",
            user2: "user1",
            user3: "user2",
            user4: "user2",
            score1: "0",
            score2: "0",
            score3: "0",
            score4: "0",
        };
        const errors = validateUsers(input);
        assert.equal(errors[0].name, "user2");
        assert.equal(errors[0].error, "重複しています");
        assert.equal(errors[1].name, "user4");
        assert.equal(errors[1].error, "重複しています");
    });

    it("ユーザーが重複しない", () => {
        const input: Input = {
            user1: "user1",
            user2: "user2",
            user3: "user3",
            user4: "user4",
            score1: "0",
            score2: "0",
            score3: "0",
            score4: "0",
        };
        const errors = validateUsers(input);
        assert.equal(errors.length, 0);
    });
});
describe("validateScoreString", () => {
    it("10が入力される時", () => {
        assert.equal(validateScoreString("10"), null);
    });

    it("20 -10が入力される時", () => {
        assert.equal(validateScoreString("20 -10"), null);
    });

    it("20 -10 30が入力される時", () => {
        assert.equal(validateScoreString("20 -10 30"), "入力形式が間違っています");
    });

    it("20 5が入力される時", () => {
        assert.equal(validateScoreString("20 5"), "飛び賞は30/20/10/-10です");
    });
});
describe("validateTotalScore", () => {
    it("合計が0になる", () => {
        const userResults = [
            new UserResult("user1", 30, 10),
            new UserResult("user2", 20),
            new UserResult("user3", -10),
            new UserResult("user4", -40, -10),
        ];
        const errors = validateTotalScore(userResults);
        assert.equal(errors, null);
    });

    it("合計が0にならない", () => {
        const userResults = [
            new UserResult("user1", 30),
            new UserResult("user2", 20),
            new UserResult("user3", -10),
            new UserResult("user4", -30),
        ];
        const errors = validateTotalScore(userResults);
        assert.equal(errors.name, "score4");
        assert.equal(errors.error, "得点の合計を0にして下さい(10)");
    });

    it("tobi含め合計が0にならない", () => {
        const userResults = [
            new UserResult("user1", 30),
            new UserResult("user2", 20),
            new UserResult("user3", -20, -10),
            new UserResult("user4", -30),
        ];
        const errors = validateTotalScore(userResults);
        assert.equal(errors.name, "score4");
        assert.equal(errors.error, "得点の合計を0にして下さい(-10)");
    });
});