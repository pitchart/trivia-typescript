export class Player {
    get place(): number {
        return this._place;
    }
    private _place = 0;
    get inPenaltyBox(): boolean {
        return this._inPenaltyBox;
    }
    private _inPenaltyBox: boolean = false;
    get score(): number {
        return this._score;
    }
    readonly name: string;
    private _score = 0;

    constructor(name: string) {
        this.name = name;
    }

    moveTo(place: number) {
        
    }
}
