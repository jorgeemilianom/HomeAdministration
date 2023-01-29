import { StyleSheet, Text, View } from 'react-native';
import { Provider, useDispatch } from 'react-redux'
import { store } from './src/redux/ReduxHook';
import { ExpensesScreen } from './src/screens/ExpensesScreen';


export default function App() {
  return (
    <Provider store={store}>
      <ExpensesScreen />
    </Provider>
  );
}
