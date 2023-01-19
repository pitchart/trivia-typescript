enum Category {
  Pop = 'Pop',
  Science = 'Science',
  Sports = 'Sports',
  Rock = 'Rock',
}

export class Game {
  private players: string[] = [];

  private places: number[] = [];

  private purses: number[] = [];

  private inPenaltyBox: boolean[] = [];

  private currentPlayer = 0;

  private isGettingOutOfPenaltyBox = false;

  private popQuestions: string[] = [];

  private scienceQuestions: string[] = [];

  private sportsQuestions: string[] = [];

  private rockQuestions: string[] = [];

  constructor() {
    for (let i = 0; i < 50; i++) {
      this.popQuestions.push(`Pop Question ${i}`);
      this.scienceQuestions.push(`Science Question ${i}`);
      this.sportsQuestions.push(`Sports Question ${i}`);
      this.rockQuestions.push(this.createRockQuestion(i));
    }
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

  private createRockQuestion(index: number): string {
    return `Rock Question ${index}`;
  }

  private howManyPlayers(): number {
    return this.players.length;
  }

  private askQuestion(): void {
    if (this.currentCategory() === Category.Pop) {
      console.log(this.popQuestions.shift());
    }
    if (this.currentCategory() === Category.Science) {
      console.log(this.scienceQuestions.shift());
    }
    if (this.currentCategory() === Category.Sports) {
      console.log(this.sportsQuestions.shift());
    }
    if (this.currentCategory() === Category.Rock) {
      console.log(this.rockQuestions.shift());
    }
  }

  private currentCategory(): string {
    if (this.places[this.currentPlayer] === 0) {
      return Category.Pop;
    }
    if (this.places[this.currentPlayer] === 4) {
      return Category.Pop;
    }
    if (this.places[this.currentPlayer] === 8) {
      return Category.Pop;
    }
    if (this.places[this.currentPlayer] === 1) {
      return Category.Science;
    }
    if (this.places[this.currentPlayer] === 5) {
      return Category.Science;
    }
    if (this.places[this.currentPlayer] === 9) {
      return Category.Science;
    }
    if (this.places[this.currentPlayer] === 2) {
      return Category.Sports;
    }
    if (this.places[this.currentPlayer] === 6) {
      return Category.Sports;
    }
    if (this.places[this.currentPlayer] === 10) {
      return Category.Sports;
    }
    return Category.Rock;
  }

  private didPlayerWin(): boolean {
    return !(this.purses[this.currentPlayer] === 6);
  }
}
