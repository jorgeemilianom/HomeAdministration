import { Modal, View, StyleSheet, Text, Pressable } from 'react-native';
import React, { useState } from 'react'
import { Css } from '../styles/generalCss';
import { API } from '../../hooks/Api';
import { config } from '../../config';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";


export const CModal = {
    Custom: CustomModal,
    Success: Success,
}

function Success(props) {
    const [modalVisible, setModalVisible] = useState(true);
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
                        <View >
                            <Icon name="sticker-check-outline" size={62} color="green" />
                            <Pressable style={[Css.mt._4, Css.br._1, Css.bg._2]} onPress={() => {setModalVisible(!modalVisible)}}>
                                <Text style={[{ fontSize: 20, textAlign: 'center', backgroundColor: 'rgb(33, 150, 243)', padding: 5 }, Css.br._1]}>Ok!</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

function CustomModal({ setModalVisible = (x) => { x = !x; return x; }, modalVisible = false, BodyModal = () => '' }) {
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
                        {BodyModal()}
                    </View>
                </View>
            </Modal>
        </View>
    )
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
});