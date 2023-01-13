enum Category {
  Pop = 'Pop',
  Science = 'Science',
  Sports = 'Sports',
  Rock = 'Rock',
}
/**
 * 
 * class Player: move, win, goToJail, leaveJail, hasName
 * class PlayerList: lengthPlayer, currentPlayer, 
 * démarrer un jeu avec une liste de joueurs et des questions
 * 
 */
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
  private readonly questions: Map<string, string[]>;

  private readonly WinningScore = 6;
  private readonly BoardSize = 12;


  constructor() {
    for (let i = 0; i < 50; i++) {
      this.popQuestions.push("Pop Question " + i);
      this.scienceQuestions.push("Science Question " + i);
      this.sportsQuestions.push("Sports Question " + i);
      this.rockQuestions.push(this.createRockQuestion(i));
    }
    this.questions = new Map<string, string[]>();
    this.questions.set(Category.Pop, this.popQuestions);
    this.questions.set(Category.Science, this.scienceQuestions);
    this.questions.set(Category.Sports, this.sportsQuestions);
    this.questions.set(Category.Rock, this.rockQuestions);
  }

  private createRockQuestion(index: number): string {
    return "Rock Question " + index;
  }


  public addPlayer(name: string): boolean {
    this.players.push(name);
    this.places[this.howManyPlayers() - 1] = 0;
    this.purses[this.howManyPlayers() - 1] = 0;
    this.inPenaltyBox[this.howManyPlayers() - 1] = false;

    console.log(name + " was added");
    console.log("They are player number " + this.players.length);

    return true;
  }

  private howManyPlayers(): number {
    return this.players.length;
  }

  public roll(roll: number) {
    console.log(this.players[this.currentPlayer] + " is the current player");
    console.log("They have rolled a " + roll);

    if (this.inPenaltyBox[this.currentPlayer] && !this.rollIsOdd(roll)) {
      console.log(this.players[this.currentPlayer] + " is not getting out of the penalty box");
      this.isGettingOutOfPenaltyBox = false;
      return;
    }

    if (this.inPenaltyBox[this.currentPlayer] && this.rollIsOdd(roll)) {
      this.isGettingOutOfPenaltyBox = true;
      console.log(this.players[this.currentPlayer] + " is getting out of the penalty box");
    }

    this.moveCurrentPlayer(roll);
    console.log("The category is " + this.currentCategory());
    this.askQuestion();
  }


  private moveCurrentPlayer(roll: number) {
    this.places[this.currentPlayer] = (this.places[this.currentPlayer] + roll) % this.BoardSize;
    console.log(this.players[this.currentPlayer] + "'s new location is " + this.places[this.currentPlayer]);
  }

  private rollIsOdd(roll: number) {
    return roll % 2 !== 0;
  }

  private askQuestion(): void {
    console.log(this.questions.get(this.currentCategory()).shift());
  }

  private currentCategory(): string {
    const placeCategory = this.places[this.currentPlayer] % 4;

    switch (placeCategory) {
      case 0: return Category.Pop;
      case 1: return Category.Science;
      case 2: return Category.Sports;
      default: return Category.Rock;
    }
  }

  private didPlayerWin(): boolean {
    return !(this.purses[this.currentPlayer] === this.WinningScore)
  }

  public wrongAnswer(): boolean {
    console.log('Question was incorrectly answered');
    console.log(this.players[this.currentPlayer] + " was sent to the penalty box");
    this.inPenaltyBox[this.currentPlayer] = true;

    this.nextPlayer();
    return true;
  }

  private nextPlayer() {
    this.currentPlayer += 1;
    if (this.currentPlayer === this.players.length)
      this.currentPlayer = 0;
  }

  public wasCorrectlyAnswered(): boolean {
    let winner = true;
    if (!this.inPenaltyBox[this.currentPlayer] || this.isGettingOutOfPenaltyBox) {
      console.log("Answer was correct!!!!");
      this.winCoin();
      winner = this.didPlayerWin();
    }
    this.nextPlayer();
    return winner;
  }

  private winCoin() {
    this.purses[this.currentPlayer] += 1;
    console.log(this.players[this.currentPlayer] + " now has " +
      this.purses[this.currentPlayer] + " Gold Coins.");
  }
}