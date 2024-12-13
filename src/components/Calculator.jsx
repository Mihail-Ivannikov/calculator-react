import Button from './Button';
import Display from './Display';

import CalculatorLogic from '../logic/calculatorLogic';

import { useState } from 'react';

function Calculator() {
  const buttons = [
    '1',
    '2',
    '3',
    '+',
    '4',
    '5',
    '6',
    '-',
    '7',
    '8',
    '9',
    '*',
    'C',
    '0',
    '=',
    '/',
  ];
  const [value, setValue] = useState('0');

  function handleClick(buttonName) {
    if (buttonName === '=') {
      const logic = new CalculatorLogic();
      const line = value + ' =';
      setValue(String(logic.calculate(line)));
    } else {
      buttonName === 'C'
        ? setValue('0')
        : setValue((v) => (v === '0' ? buttonName : v + ' ' + buttonName));
    }
  }

  return (
    <div className="calculator">
      <Display value={value} />
      <div className="calculator-keyboard">
        {buttons.map((button, index) => {
          return (
            <Button
              key={index}
              label={button}
              onClick={() => handleClick(button)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Calculator;
