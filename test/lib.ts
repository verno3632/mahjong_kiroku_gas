import { assert } from "chai";
import { describe, it } from "mocha";
import { dateString, getLooser, getWinner, UserResult, userResultsFromJson } from "../src/lib";

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
        const json = '[{"user": "user1", "value": "30"}, {"user": "user2", "value": "-30"} ]';
        const userResults = userResultsFromJson(json);
        assert.equal(userResults[0].name, "user1");
        assert.equal(userResults[0].score, 30);
        assert.equal(userResults[1].name, "user2");
        assert.equal(userResults[1].score, -30);
    });
});