import { assert } from "chai";
import { describe, it } from "mocha";
import { dateString, getWinner, UserResult } from "../src/lib";

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

describe("dateString", () => {
    it("値を返す", () => {
        const date = new Date("2019-06-30 09:59");
        assert.equal(dateString(date), "2019/6/30 9:59");
    });
});