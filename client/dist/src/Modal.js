import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import ModalContext from './context/ModalContext';
const ModalScreen = () => {
    const { data, closeModal } = useContext(ModalContext);
    return (<View style={styles.modalView}>
      <Modal animationIn="slideInRight" animationOut="slideOutRight" animationInTiming={400} style={{ margin: 0 }} coverScreen={true} isVisible={data} hasBackdrop={false}>
        <View style={styles.backButton}>
          <TouchableOpacity onPress={() => {
        closeModal();
    }}>
            <View style={styles.backButton}>
              <Icon size={50} name="chevron-left" color="#1E90FF"/>

              <Text style={styles.textStyle}>Back</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>);
};
const styles = StyleSheet.create({
    modalView: {
        opacity: 0.2,
        backgroundColor: 'grey',
    },
    backButton: {
        flex: 1,
        flexDirection: 'row',
        top: '10%',
    },
    textStyle: {
        color: '#1E90FF',
        fontSize: 18,
        top: '18%',
        marginLeft: -10,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: 'blue',
        fontSize: 32,
        left: '50%',
        bottom: '50%',
        flex: 10,
    },
    centeredView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default ModalScreen;
