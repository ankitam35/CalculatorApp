const tokenize = (expression: string): string[] => {
    const tokens: string[] = [];
    let currentNumber = '';
  
    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
  
      if (!isNaN(Number(char)) || char === '.') {
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

  export const evaluateExpression = (expression: string): number => {
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