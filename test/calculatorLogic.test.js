/* globals describe, expect, jest, test, beforeEach */
import CalculatorLogic from '../src/logic/calculatorLogic.js';
import CalculatorState from '../src/logic/calculatorState.js';

describe('Parse function tests', () => {
  const logic = new CalculatorLogic();

  test('parse 1 + 1 =', () => {
    const line = '1 + 1 = ';
    expect(logic.parse(line)).toEqual(['1', '+', '1', '=']);
  });

  const randomTestCases = Array.from({ length: 10 }, () => {
    const num1 = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * 100) + 1;
    const operations = ['/', '*', '-', '+'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    const num1String = [...String(num1)].join(' ');
    const num2String = [...String(num2)].join(' ');

    const input = `${num1String} ${operation} ${num2String} =`;
    const expected = [...String(num1), operation, ...String(num2), '='];

    return { input, expected };
  });

  randomTestCases.forEach(({ input, expected }, index) => {
    test(`randomized test case ${index}: parse(${input}) = [${expected}]`, () => {
      const result = logic.parse(input);
      expect(result).toEqual(expected);
    });
  });
});

describe('CalculatorLogic', () => {
  let logic;
  let state;

  beforeEach(() => {
    logic = new CalculatorLogic();
    state = {
      screen: 0,
      firstNumber: null,
      op: null,
    };
  });

  test('pressing a digit sets the screen if startNewNumber is true', () => {
    logic.startNewNumber = true;
    logic.handleKeyPress(state, '5');
    expect(state.screen).toBe(5);
    expect(logic.startNewNumber).toBe(false);
  });

  test('pressing a digit appends to screen if startNewNumber is false', () => {
    logic.startNewNumber = false;
    state.screen = 4;
    logic.handleKeyPress(state, '5');
    expect(state.screen).toBe(45); // Assuming concatenateNumbers is implemented correctly
  });

  test('pressing an operator sets firstNumber, op, and resets screen', () => {
    state.screen = 10;
    logic.handleKeyPress(state, '+');
    expect(state.firstNumber).toBe(10);
    expect(state.op).toBe('+');
    expect(logic.startNewNumber).toBe(true);
    expect(state.screen).toBe(0);
  });

  test('pressing "=" computes the result', () => {
    state.firstNumber = 10;
    state.screen = 5;
    state.op = '+';
    logic.handleKeyPress(state, '=');
    expect(state.screen).toBe(15); // 10 + 5
  });

  test('handles invalid input gracefully', () => {
    state.screen = 5;
    logic.handleKeyPress(state, 'a'); // An invalid key
    expect(state.screen).toBe(5); // No change
  });
});

describe('calculate function tests', () => {
  const logic = new CalculatorLogic();
  test('1 + 1 = test', () => {
    const line = '1 + 1 =';
    const result = logic.calculate(line);
    expect(result).toEqual(2);
  });
});

describe('concatenateNumbers', () => {
  let logic;

  beforeEach(() => {
    logic = new CalculatorLogic();
  });

  test('concatenates single-digit numbers', () => {
    expect(logic.concatenateNumbers(1, 2)).toBe(12);
    expect(logic.concatenateNumbers(4, 5)).toBe(45);
  });

  test('concatenates multi-digit numbers', () => {
    expect(logic.concatenateNumbers(12, 34)).toBe(1234);
    expect(logic.concatenateNumbers(56, 78)).toBe(5678);
  });

  test('handles num2 as 0', () => {
    expect(logic.concatenateNumbers(123, 0)).toBe(1230);
  });

  test('handles num1 as 0', () => {
    expect(logic.concatenateNumbers(0, 456)).toBe(456);
  });

  test('handles both numbers as 0', () => {
    expect(logic.concatenateNumbers(0, 0)).toBe(0);
  });

  test('handles very large numbers', () => {
    expect(logic.concatenateNumbers(12345, 67890)).toBe(1234567890);
  });

  test('handles edge cases like single and multi-digit combinations', () => {
    expect(logic.concatenateNumbers(9, 123)).toBe(9123);
    expect(logic.concatenateNumbers(123, 9)).toBe(1239);
  });

  const randomTestCases = Array.from({ length: 10 }, () => {
    const num1 = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * 100) + 1;
    const expected = Number(String(num1) + String(num2));
    return { input: { num1, num2 }, expected };
  });

  randomTestCases.forEach(({ input, expected }, index) => {
    test(`randomized test case ${index}: concatenate(${input.num1} and ${input.num2}) = ${expected}`, () => {
      const result = logic.concatenateNumbers(input.num1, input.num2);
      expect(result).toEqual(expected);
    });
  });
});

describe('handleKeyPress', () => {
  let logic;
  let state;

  beforeEach(() => {
    logic = new CalculatorLogic();
    state = new CalculatorState();
  });

  test('handles number input when starting a new number', () => {
    logic.startNewNumber = true;
    logic.handleKeyPress(state, '5');
    expect(state.screen).toBe(5);
    expect(logic.startNewNumber).toBe(false);
  });

  test('handles number input when concatenating digits', () => {
    logic.startNewNumber = false;
    state.screen = 12;
    logic.handleKeyPress(state, '3');
    expect(state.screen).toBe(123);
    expect(logic.startNewNumber).toBe(false);
  });

  test('handles operator input', () => {
    state.screen = 10;
    logic.handleKeyPress(state, '+');
    expect(state.firstNumber).toBe(10);
    expect(state.op).toBe('+');
    expect(logic.startNewNumber).toBe(true);
    expect(state.screen).toBe(0);
  });

  test('handles "=" input to perform operation', () => {
    state.firstNumber = 20;
    state.screen = 10;
    state.op = '+';
    jest.spyOn(logic, 'count');
    logic.handleKeyPress(state, '=');
    expect(logic.count).toHaveBeenCalledWith(20, 10, '+');
  });

  test('handles invalid button input (no state change)', () => {
    state.screen = 42;
    logic.handleKeyPress(state, 'invalid');
    expect(state.screen).toBe(42);
  });
});

describe('calculate function', () => {
  const logic = new CalculatorLogic();

  const operations = ['+', '-', '*', '/'];
  const operationMap = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => Math.floor(a / b),
  };

  const randomTestCases = Array.from({ length: 10 }, () => {
    const num1 = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * 100) + 1;
    const op = operations[Math.floor(Math.random() * operations.length)];
    const expected = operationMap[op](num1, num2);

    function formatNumber(num) {
      return num.toString().split('').join(' ');
    }

    const formattedNum1 = formatNumber(num1);
    const formattedNum2 = formatNumber(num2);

    return { input: `${formattedNum1} ${op} ${formattedNum2} =`, expected };
  });

  randomTestCases.forEach(({ input, expected }, index) => {
    test(`randomized test case ${index + 1}: "${input}"`, () => {
      const result = logic.calculate(input);
      expect(result).toEqual(expected);
    });
  });
});
