// 1. Deposit some money   
// 2. Determine the the numbers of line(rows) to bet
// 3. Collect bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the payouts (winnings)
// 7. Play again or exit



//                                                  GLOBAL PARAMETERS ---- START


const prompt = require("prompt-sync")();


const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8,
};

const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2,
};




//                                                    FUNCTIONS START FROM HERE


// <------------------------------------------------- Deposit some money  ------------------------------------------------------------------------>

const deposit = () => {
    while (true){

    const depositamount = prompt("Enter a deposit amount: ");
    const numberdepositamount = parseFloat(depositamount);

    if (isNaN(numberdepositamount) || numberdepositamount <= 0){
        console.log("Invalid amount , try again.");
    }
    else {return numberdepositamount;
    }
}
      };


//   <-------------------------------------------------Determine the the numbers of line(rows) to bet ------------------------------------------------------------------------>

const getnumberoflines = () => {
    while (true){

        const lines = prompt("Enter the number of rows to bet on(1-3): ");
        const numberoflines = parseFloat(lines);
    
        if (isNaN(numberoflines) || numberoflines <= 0 || numberoflines > 3){
            console.log("Invalid number , try again.");
        }
        else { return numberoflines;
        }
    }
};

//   <-------------------------------------------------Collect bet amount------------------------------------------------------------------------>

const getbet = (balance, lines) => {
    while (true){

        const bet = prompt("Enter the amount of bet per line: ");
        const numberbet = parseFloat(bet);
    
        if (isNaN(numberbet) || numberbet <= 0 || numberbet > (balance/lines))
        {
            console.log("Invalid bet , try again.");
        }
        else {return numberbet;
        }
    }
};

//   <-------------------------------------------------Spin the slot machine ------------------------------------------------------------------------>

// const spin = () => {
//  const symbols = [];
//  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
//     for (let i = 0; i < count; i++){
//         symbols.push(symbol);
//     }
//  }
 
 

//  const reels = [];
//  for (let i = 0; i < COLS; i++){
//     reels.push([]);
//     const reel_symbols = [...symbols];
//     for (let j=0; j< ROWS; j++){
//         const random_index = Math.floor(Math.random() * reel_symbols.length)
//         const selected_symbols = reel_symbols[random_index];
//         reels[i].push(selected_symbols);
//         reel_symbols.splice(random_index, 1);
//     }
//  }
//  return reels;
// };



// ...

let reels = [];

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }
};

// ...


   
   


const transpose = () => {
    const rows = [];

    for ( let i = 0; i < ROWS; i++){
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i])
        }
    }
    return rows;
};

//   <-------------------------------------------------SECTION 4.2 ------------------------------------------------------------------------>

const print_spin_result = (rows) => {
    for (const row of rows) {
        let rowstring = "";
        for(const [i, symbol] of row.entries()) {
            rowstring += symbol
            if (i != rows.length - 1) {
                rowstring += " | "
            }
        }
        console.log(rowstring);
    }
};

//   <-------------------------------------------------Check if the user won------------------------------------------------------------------------>


const get_winnings = (rows, bet, lines) => {
    let winnings = 0;
  
    for (let rowIdx = 0; rowIdx < lines; rowIdx++) {
      const symbols = rows[rowIdx];
      let allSame = true;
  
      for (const symbol of symbols) {
        if (symbol != symbols[0]) {
          allSame = false;
          break;
        }
      }
  
      if (allSame) {
        winnings += bet * SYMBOL_VALUES[symbols[0]];
      }
    }
  
    return winnings;
  };
  
// const get_winnings = (row, bet, lines) => {
//     let winnings = 0;

//     for(let row = 0; row < lines; row++){
//         const symbols = rows[row];
//         let allSame = true;

//         for (const symbol of symbols){
//             if (symbol != symbols[0]){
//                 allSame = false;
//                 break;
//             }
//         }

//         if (allSame) {
//             winnings += bet * SYMBOL_VALUES[symbols[0]]
//         }
//     }

//     return winnings;
// };



const game = () => {


let balance = deposit();



while (true){

    console.log("You have a balance of $" + balance);
    const numberoflines = getnumberoflines();
    const bet = getbet(balance, numberoflines);
    balance -= bet * numberoflines;
    const reels = spin();
    const rows = transpose(reels);
    print_spin_result(rows);
    const winnings = get_winnings(rows, bet, numberoflines)
    balance += winnings;
    console.log("You won, $" + winnings.toString())

    if (balance <= 0) {
        console.log("you ran out of money!");
        break;
    }

    const playAgain = prompt("Do you want to play again? (y/n)?")

    if (playAgain != "y") break;
    }
};

game(); 