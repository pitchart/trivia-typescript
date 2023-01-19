import { categoryArray, numberOfCategories } from './category';

export class Game {
  private players: string[] = [];

  private places: number[] = [];

  private purses: number[] = [];

  private inPenaltyBox: boolean[] = [];

  private currentPlayer = 0;

  private isGettingOutOfPenaltyBox = false;

  private questions = new Map<string, string[]>();

  constructor() {
    categoryArray.forEach((category) => {
      this.questions.set(category, []);
      for (let i = 0; i < 50; i++) {
        this.questions.get(category).push(`${category} Question ${i}`);
      }
    });
  }

  public addPlayer(name: string): boolean {
    this.players.push(name);
    this.places[this.howManyPlayers() - 1] = 0;
    this.purses[this.howManyPlayers() - 1] = 0;
    this.inPenaltyBox[this.howManyPlayers() - 1] = false;

    console.log(`${name} was added`);
    console.log(`They are player number ${this.players.length}`);

    return true;
  }

  public roll(roll: number) {
    console.log(`${this.players[this.currentPlayer]} is the current player`);
    console.log(`They have rolled a ${roll}`);

    if (this.inPenaltyBox[this.currentPlayer]) {
      if (this.rollIsOdd(roll)) {
        this.isGettingOutOfPenaltyBox = true;

        console.log(`${this.players[this.currentPlayer]} is getting out of the penalty box`);
        this.movePlayer(roll);

        console.log(`${this.players[this.currentPlayer]}'s new location is ${this.places[this.currentPlayer]}`);
        console.log(`The category is ${this.currentCategory()}`);
        this.askQuestion();
      } else {
        console.log(`${this.players[this.currentPlayer]} is not getting out of the penalty box`);
        this.isGettingOutOfPenaltyBox = false;
      }
    } else {
      this.movePlayer(roll);

      console.log(`${this.players[this.currentPlayer]}'s new location is ${this.places[this.currentPlayer]}`);
      console.log(`The category is ${this.currentCategory()}`);
      this.askQuestion();
    }
  }

  private rollIsOdd(roll: number) {
    return roll % 2 !== 0;
  }

  private readonly boardSize = 12;

  private movePlayer(roll: number) {
    this.places[this.currentPlayer] += roll;
    if (this.places[this.currentPlayer] >= this.boardSize) {
      this.places[this.currentPlayer] -= this.boardSize;
    }
  }

  public wrongAnswer(): boolean {
    console.log('Question was incorrectly answered');
    console.log(`${this.players[this.currentPlayer]} was sent to the penalty box`);
    this.inPenaltyBox[this.currentPlayer] = true;

    this.nextPlayer();
    return true;
  }

  public wasCorrectlyAnswered(): boolean {
    if (this.inPenaltyBox[this.currentPlayer]) {
      if (this.isGettingOutOfPenaltyBox) {
        console.log('Answer was correct!!!!');
        this.purses[this.currentPlayer] += 1;
        console.log(`${this.players[this.currentPlayer]} now has ${
            this.purses[this.currentPlayer]} Gold Coins.`);

        const winner = this.didPlayerWin();
        this.nextPlayer();

        return winner;
      }
      this.nextPlayer();
      return true;
    }

    console.log('Answer was correct!!!!');

    this.purses[this.currentPlayer] += 1;
    console.log(`${this.players[this.currentPlayer]} now has ${
        this.purses[this.currentPlayer]} Gold Coins.`);

    const winner = this.didPlayerWin();

    this.nextPlayer();

    return winner;
  }

  private nextPlayer() {
    this.currentPlayer += 1;
    if (this.currentPlayer === this.players.length) {
      this.currentPlayer = 0;
    }
  }

  private howManyPlayers(): number {
    return this.players.length;
  }

  private askQuestion(): void {
    console.log(this.questions.get(this.currentCategory()).shift());
  }

  private currentCategory(): string {
    const placeCategory = this.places[this.currentPlayer] % numberOfCategories;
    return categoryArray[placeCategory];
  }

  private didPlayerWin(): boolean {
    return !(this.purses[this.currentPlayer] === 6);
  }
}
