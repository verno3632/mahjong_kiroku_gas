import { assert } from "chai";
import { describe, it } from "mocha";
import { getWinner, UserResult } from "../src/lib";

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
