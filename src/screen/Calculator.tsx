import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {styles} from '../styles';
import { evaluateExpression } from '../utils';
import CalculatorButton from '../components/CalculatorButton';

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('0');  

  const keyArr:string[] = [
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
          <CalculatorButton key={value} value={value} onPress={handlePress} />
        ))}
      </View>
    </View>
  );
};

export default Calculator;
