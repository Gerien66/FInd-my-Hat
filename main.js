//import all required modules
const prompt = require("prompt-sync")({ sigint: true });
const clear = require("clear-screen");

//Instantiate variable
const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
const row = 10;
const col = 10;

const getRow2 = Math.floor(Math.random() * row);

const getCol2 = Math.floor(Math.random() * col);
const rand = Math.floor(Math.random() * (row * col * 0.5));
let temporaryX = 0;
let temporaryY = 0;

//We are using class object in this example

//1) Build the whole field out (10 rows x 10 cols), create empty field first
//Create 2D Array
//Construct the layout of the field using empty array

class Field {
  field = [];

  constructor() {
    //The current location of the character *
    this.locationX = 0;
    this.locationY = 0;

    for (let a = 0; a < row; a++) {
      this.field[a] = [];
    }

    this.generateField(); //put in the patches of grass in the plot
  }

  generateField() {
    for (let y = 0; y < row; y++) {
      for (let x = 0; x < col; x++) {
        const prob = Math.random();
        this.field[y][x] = fieldCharacter;
      }
    }

    for (let i = 0; i < rand; i++) {
      const getRow = Math.floor(Math.random() * row);
      const getCol = Math.floor(Math.random() * col);

      this.field[getRow][getCol] = hole;
    }

    this.field[getRow2][getCol2] = hat;
    this.field[0][0] = pathCharacter;
    // console.log(this.field);
  }

  runGame() {
    //Implement your codes
    let isGameOver = false;
    while (!isGameOver) {
      this.print();
      this.askQuestion();

      if (this.field[this.locationX][this.locationY] === hat) {
        console.log("Congrats you found your hat");
        isGameOver = true;
      } else if (this.field[this.locationX][this.locationY] === hole) {
        console.log("Sorry you fell down a hole");
        isGameOver = true;
      } else if (
        this.locationX < 0 ||
        this.locationY < 0 ||
        this.locationX > row - 1 ||
        this.locationY > col - 1
      ) {
        console.log("Sorry you went out of bounds");
        isGameOver = true;
      }

      this.field[this.locationX][this.locationY] = pathCharacter;
      this.field[temporaryX][temporaryY] = fieldCharacter;
    }
  }

  print() {
    clear();
    const displayString = this.field
      .map((row) => {
        return row.join("");
      })
      .join("\n");
    console.log(displayString);
  }

  askQuestion() {
    const answer = prompt("Which way? ").toUpperCase();
    temporaryX = this.locationX;
    temporaryY = this.locationY;
    switch (answer) {
      case "U":
        console.log("Moving up");
        this.locationX -= 1;
        break;

      case "D":
        console.log("Moving down");
        this.locationX += 1;
        break;

      case "L":
        console.log("Moving left");
        this.locationY -= 1;
        break;

      case "R":
        console.log("Moving right");
        this.locationY += 1;
        break;

      default:
        console.log("Enter U, D, L or R.");
        this.askQuestion();
        break;
    }
  }
} //End of field class

//Create an instance object for the Field
const myField = new Field();
myField.runGame();
