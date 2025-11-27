import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { View } from 'react-native';

const ScreenWrapper = ({ children }) => {
  return (
    <View style={styles.container}>
      
      {/* Фон */}
      <ImageBackground
        source={require("./../../assets/background.png")}
        style={styles.background}
        blurRadius={20} // можно blur
      />

      {/* Контент приложения поверх */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
  },
});

export default ScreenWrapper;
