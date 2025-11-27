import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import CheckboxIcon from '../../assets/checkbox_icon.svg';
import CheckboxCheckedIcon from '../../assets/checkbox_checked_icon.svg';


export default function MorePanelModal({visible, onClose}){


  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Text>HELLO</Text>
    </Modal>
  );
}

const styles = StyleSheet.create({
  
});
