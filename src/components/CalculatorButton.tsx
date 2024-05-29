import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles';

interface CalculatorButtonProps {
  value: string;
  onPress: (value: string) => void;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ value, onPress, ...rest }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => onPress(value)}
      {...rest}
    >
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );
};

export default CalculatorButton;
