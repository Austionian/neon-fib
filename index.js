const Chalk = require("chalk");
const fib = require(".");
const log = console.log;

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("What number of fibonocci would you like? \n", (n) => {
  log("\n");
  log(Chalk.magenta.bgBlack.bold(fib.fib(Number(n))));
  readline.close();
});
