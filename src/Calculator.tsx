import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {styles} from './styles';

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('0');
  const operators = ['+', '-', '*', '/'];

  const tokenize = (expression: string): string[] => {
    const tokens: string[] = [];
    let currentNumber = '';
  
    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
  
      if (!isNaN(Number(char)) || char === '.') {
        // If the character is a number or a decimal point
        currentNumber += char;
      } else {
        if (currentNumber) {
          tokens.push(currentNumber);
          currentNumber = '';
        }
        tokens.push(char);
      }
    }
  
    if (currentNumber) {
      tokens.push(currentNumber);
    }
  
    return tokens;
  };

  const evaluateExpression = (expression: string): number => {
    const tokens = tokenize(expression);
    const numbers: number[] = [];
    const operators: string[] = [];
  
    let i = 0;
    while (i < tokens.length) {
      const token = tokens[i];
  
      if (!isNaN(Number(token))) {
        numbers.push(Number(token));
      } else if (operators.length && (token === '+' || token === '-') && (operators[operators.length - 1] === '+' || operators[operators.length - 1] === '-')) {
        const operator = operators.pop()!;
        const b = numbers.pop()!;
        const a = numbers.pop()!;
        numbers.push(applyOperator(a, b, operator));
        operators.push(token);
      } else {
        operators.push(token);
      }
  
      i++;
    }
  
    while (operators.length) {
      const operator = operators.pop()!;
      const b = numbers.pop()!;
      const a = numbers.pop()!;
      numbers.push(applyOperator(a, b, operator));
    }
  
    return numbers[0];
  };
  

  
  const applyOperator = (a: number, b: number, operator: string): number => {
    switch (operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        if (b === 0) {
          throw new Error("Division by zero");
        }
        return a / b;
      default:
        throw new Error(`Unknown operator ${operator}`);
    }
  };
  

  const keyArr:String[] = [
    'AC',
    '%',
    '^',
    '/',
    '7',
    '8',
    '9',
    '*',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '+',
    '00',
    '0',
    '.',
    '=',
  ];

  const handlePress = (value: string) => {
    if (value === 'AC') {
      setInput('');
      setResult('0');
    } else if (value === '^') {
      setInput(prevInput => prevInput.slice(0, -1));
    } else if (value === '=') {
      try {
        const evalResult = evaluateExpression(input);
        setResult(evalResult.toString());
      } catch (error) {
        setResult('Error');
      }
    } else {
      setInput(prevInput => prevInput + value);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.inputText}>{input}</Text>
        <Text style={styles.resultText}>{result}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        {keyArr.map(value => (
          <TouchableOpacity
            key={value}
            style={styles.button}
            onPress={() => handlePress(value)}>
            <Text style={styles.buttonText}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Calculator;
