import CalculatorState from './calculatorState';

class CalculatorLogic {
  constructor() {
    this.startNewNumber = true;
  }

  parse(line) {
    return line.trim().split(' ');
  }

  handleKeyPress(state, buttonName) {
    if (buttonName >= '0' && buttonName <= '9') {
      if (this.startNewNumber) {
        state.screen = Number(buttonName);
      } else {
        state.screen = this.concatenateNumbers(
          state.screen,
          Number(buttonName)
        );
      }
      this.startNewNumber = false;
    } else if (['+', '-', '*', '/'].includes(buttonName)) {
      state.firstNumber = state.screen;
      state.op = buttonName;
      this.startNewNumber = true;
      state.screen = 0;
    } else if (buttonName === '=') {
      state.screen = this.count(state.firstNumber, state.screen, state.op);
    }
  }

  count(num1, num2, op) {
    const operations = {
      '+': num1 + num2,
      '-': num1 - num2,
      '*': num1 * num2,
      '/': Math.floor(num1 / num2),
    };
    return operations[op];
  }

  concatenateNumbers(num1, num2) {
    if (num2 === 0) {
      return num1 * 10;
    }
    const numDigits = Math.floor(Math.log10(num2)) + 1;
    return num1 * Math.pow(10, numDigits) + num2;
  }

  calculate(lines) {
    const keysPressed = this.parse(lines);
    const state = new CalculatorState();
    keysPressed.map((key) => {
      this.handleKeyPress(state, key);
    });
    return state.screen;
  }
}

export default CalculatorLogic;
