import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
    resultContainer: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
      alignItems: 'flex-end',
    },
    inputText: {
      fontSize: 24,
      color: '#888',
    },
    resultText: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#000',
    },
    buttonsContainer: {
      width: '90%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    button: {
      width: '22%',
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ddd',
      margin: 5,
      borderRadius: 10,
    },
    buttonText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },
  });
  
  