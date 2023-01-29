import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { config } from '../config'
import { API } from '../hooks/Api'
import { Box, Divider, Flex, ListItem } from '@react-native-material/core';
import { StyleSheet } from 'react-native-web';
import { CheckBox } from 'react-native-btr';
import { getDataExpenses } from '../redux/slices/expensesSlice';
import { useDispatch } from 'react-redux';
import { numberFormat } from '../hooks/Helpers';

export default function ExpensesList(props) {
    const { list } = props;

    if (list) {
        return (
            <View style={Styles.contentList}>
                {list.map((value, index) => <ExpenseItem key={index} dataExpense={value} />)}
            </View>
        )
    }
}

const ExpenseItem = (props) => {
    const dispatch = useDispatch();
    const { dataExpense } = props;
    const [expenseChecked, setExpenseChecked] = useState(dataExpense?.checked);
    
    const chechedExpense = (id) => {
        API._put(`${config.apiHost}/expenses/checked/${id}`).then( (res) => {
            dispatch(getDataExpenses());
        })
    }

    return (
        <>
            <View style={Styles.list}>
                <View style={Styles.list.LeftView}>
                    <CheckBox color='rgb(98, 0, 238)' checked={expenseChecked} onPress={() => {chechedExpense(dataExpense?.id)}} />
                    <Text style={{ marginLeft: 5 }}>{dataExpense.name}</Text>
                </View>
                <Text>${numberFormat(dataExpense.amount)}</Text>
            </View>
            <Divider />
        </>
    );
}


const Styles = StyleSheet.create({
    contentList: {
        padding: 10,
        backgroundColor: '#ecebfa',
        height: '100%',
        borderRadius: 10,
    },
    list: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        marginBottom: 5,
        LeftView: {
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
        }
    }
});