
import chalk  from "chalk";

// Test if chalk is working
console.log('\n Testing chalk colors:');
console.log(chalk.blue('This should be blue'));
console.log(chalk.red('This should be red'));
console.log(chalk.green('This should be green'));

// Test with different styles
console.log(chalk.yellow.bold('This should be yellow and bold'));
console.log(chalk.cyan.underline('This should be cyan and underlined'));

// Test background colors
console.log(chalk.bgWhite.black('Black text on white background'));
console.log(chalk.bgRed.white('White text on red background \n'));