import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Backdrop, BackdropSubheader, AppBar, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import ExpensesList from "../components/ExpensesList";
import Header from "../components/Expenses/Header";
import { API } from "../hooks/Api";
import { config } from "../config";
import { store } from "../redux/ReduxHook";
import { useDispatch, useSelector } from "react-redux";
import { getDataExpenses } from "../redux/slices/expensesSlice";
import { numberFormat } from "../hooks/Helpers";

console.clear();

export function ExpensesScreen() {
    const dispatch = useDispatch();
    const dataExpenses = useSelector(state => state.expenses.data);
    const [revealed, setRevealed] = useState(false);
    
    useEffect(() => {
        dispatch(getDataExpenses());
    }, [])


    return (
        <Backdrop
            revealed={revealed}
            style={{ background: '#18022c' }}
            header={
                <AppBar
                    style={{ paddingTop: 25 }}
                    title="Gastos fijos de Casa"
                    transparent
                    leading={props => (
                        <IconButton
                            icon={props => (
                                <Icon name={revealed ? "close" : "menu"} {...props} />
                            )}
                            onPress={() => setRevealed(prevState => !prevState)}
                            {...props}
                        />
                    )}
                />
            }
            backLayer={<Header acount={dataExpenses?.acount} />}
        >
            <BackdropSubheader title={<TitleSubHeader acount={dataExpenses?.acount} />} />
            <ExpensesList list={dataExpenses?.expenses} />
        </Backdrop>
    );
}

const TitleSubHeader = (props) => {
    const pending_to_pay = props?.acount?.pending_to_pay;

    return (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>Lista</Text>
            <View>
                <Text>A pagar: ${numberFormat(pending_to_pay)}</Text>
            </View>
        </View>
    );
}