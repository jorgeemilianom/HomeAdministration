import { Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import React, { useState } from 'react'
import { Button } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Css } from '../../shared/styles/generalCss';
import { API } from '../../hooks/Api';
import { config } from '../../config';
import { CModal } from '../../shared/components/CModal';
import { getDataExpenses } from '../../redux/slices/expensesSlice';
import { useDispatch } from 'react-redux';
import { numberFormat } from '../../hooks/Helpers';

export default function Header(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const salary = props?.acount?.salary;
    const status= props?.acount?.status;
    
    return (
        <View style={Styles.Header}>
            <View style={Styles.Header.Top}>
                <Text style={Styles.Header.Top.Text}>${numberFormat(status)}</Text>
                <Text style={{ ...Styles.Header.Top.Text, fontSize: 11 }}>Disponible de ${numberFormat(salary)}</Text>
            </View>
            <View >
                <ModalAddExpense modalVisible={modalVisible} setModalVisible={setModalVisible} />
                <Button
                    title="Agregar gasto fijo mensual"
                    leading={props => <Icon name="plus" {...props} />}
                    color="error"
                    onPress={() => { setModalVisible(!modalVisible) }}
                />
            </View>
        </View >
    )
}

const ModalAddExpense = (props) => {
    const { modalVisible, setModalVisible } = props;
    const [newExpense_name, setNewExpense_name] = useState('');
    const [newExpense_amount, setNewExpense_amount] = useState('');
    const dispatch = useDispatch();

    const addExpense = (name, amount, visibility) => {
        const { setModalVisible, modalVisible } = visibility;
        const user_id = config.user_id;
        API._post(`${config.apiHost}/expenses/newExpense`, { name, amount, type: '', user_id })
            .then(res => {
                if(res?.status){
                    setModalVisible(!modalVisible)
                    dispatch(getDataExpenses());
                    setNewExpense_name('');
                    setNewExpense_amount('');
                    return (<CModal.Success />);
                }
            })
    }

    return (
        <View style={stylesModal.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={stylesModal.centeredView}>
                    <View style={[stylesModal.modalView, Css.p._4]}>
                        <Text style={stylesModal.modalText}>Nuevo gasto</Text>
                        <View style={Css.w._100}>
                            <Text style={{ fontSize: 10 }}>Nombre del gasto</Text>
                            <TextInput
                                onChangeText={text => setNewExpense_name(text)}
                                value={newExpense_name}
                                style={{ padding: 10, backgroundColor: '#f2f2f8', marginBottom: 5 }}
                            />
                        </View>
                        <View style={Css.w._100} >
                            <Text style={{ fontSize: 10 }}>Importe del gasto</Text>
                            <TextInput
                                onChangeText={text => setNewExpense_amount(text)}
                                value={newExpense_amount}
                                style={{ padding: 10, backgroundColor: '#f2f2f8', marginBottom: 5 }}
                            />
                        </View>
                        <View style={[Css.d_flex, Css.d_flex.row, Css.d_flex.gap._1, Css.mt._4]}>
                            <Pressable
                                style={[stylesModal.button, stylesModal.buttonClose, {marginRight: 10}]}
                                onPress={() => addExpense(newExpense_name, newExpense_amount, { setModalVisible, modalVisible })}>
                                <Text style={stylesModal.textStyle}>Cargar!</Text>
                            </Pressable>
                            <Pressable
                                style={[stylesModal.button, stylesModal.buttonClose, { backgroundColor: '#fe6578' }]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={stylesModal.textStyle}>Cancelar</Text>
                            </Pressable>

                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}



// Styles
const stylesModal = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
    },
    modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 5,
        alignItems: 'center',
        shadowColor: '#000',
        width: '80%',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});


const Styles = StyleSheet.create({
    Header: {
        height: 120,
        // marginTop: 10,
        marginBottom: 10,
        padding: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        Top: {
            display: 'flex',
            alignItems: 'center',
            Text: {
                fontSize: 30,
                color: '#fff',
            }
        }
    }
});