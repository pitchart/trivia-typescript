import { expect } from "chai";
import { describe, it } from "mocha";
import { Player } from "../src/player";

describe("Player", () => {

    it("should be initialized", () => {
        const player = new Player('john');
        expect(player.name).to.be.equal('john');
        expect(player.score).to.be.equal(0);
        expect(player.inPenaltyBox).to.be.false;
        expect(player.place).to.be.equal(0);
    });

    it('should move to a new place', () => {
        const player = new Player('john');
        player.moveTo(3);
        expect(player.place).to.be.equal(3);
    })



});
