import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
  Animated,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const LoadingScreen = ({ onComplete }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const textFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Анимация появления
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(textFadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Автоматический переход через 3 секунды
    const timer = setTimeout(() => {
      // Анимация исчезновения перед переходом
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onComplete && onComplete();
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete, fadeAnim, scaleAnim, textFadeAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Central Icon */}
        <Animated.View style={styles.iconContainer}>
          <Image 
            source={require('../../assets/juma-logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        {/* App Name */}
        <Animated.Text 
          style={[
            styles.appName,
            { opacity: textFadeAnim }
          ]}
        >
          Juma
        </Animated.Text>

        {/* Designer Credit */}
        <Animated.Text 
          style={[
            styles.designerCredit,
            { opacity: textFadeAnim }
          ]}
        >
          Design by <Text style={styles.designerName}>Karibay Zhantore</Text>
        </Animated.Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: Math.max(120, width * 0.4),
    height: Math.max(120, width * 0.4),
    maxWidth: 160,
    maxHeight: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  appName: {
    fontSize: Math.max(20, width * 0.06),
    fontWeight: '500',
    color: '#0D0C0C',
    fontFamily: 'SF Pro Text',
    lineHeight: Math.max(24, width * 0.07),
    letterSpacing: 0,
    textAlign: 'center',
    marginBottom: 40,
  },
  designerCredit: {
    fontSize: Math.max(10, width * 0.03),
    fontWeight: '400',
    color: '#7f8c8d',
    fontFamily: 'SF Pro',
    lineHeight: Math.max(14, width * 0.04),
    letterSpacing: 0,
    textAlign: 'center',
    position: 'absolute',
    bottom: 60,
  },
  designerName: {
    color: '#0086F3',
    fontWeight: '500',
  },
});

export default LoadingScreen;
