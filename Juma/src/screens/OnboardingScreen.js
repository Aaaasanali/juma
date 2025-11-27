import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const onboardingData = [
    {
      title: 'Добро пожаловать в Juma!',
      description: 'Ваш личный помощник в духовной жизни. Узнавайте время намаза, расписание уроков в мечетях Алматы и читайте Коран в одном месте.',
      image: require('../../assets/onboarding-image1.png'),
      showImageIllustration: true,
    },
    {
      title: 'Точное время намаза и Кибла',
      description: 'Чтобы мы могли показывать актуальное расписание молитв для вашего района и верное направление на Киблу, нам потребуется доступ к вашей геолокации.',
      image: require('../../assets/onboarding-compass.png'),
      showImageIllustration: true,
      buttonText: 'Разрешить доступ',
    },
    {
      title: 'Будьте всегда в курсе',
      description: 'Мы будем присылать напоминания о времени намаза и уведомлять о начале полезных уроков. Вы всегда сможете настроить их в своем профиле.',
      image: require('../../assets/onboarding-bell.png'),
      showImageIllustration: true,
      buttonText: 'Включить уведомления',
    },
  ];

  const handleNext = () => {
    if (currentStep < onboardingData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Main Content */}
      <View style={styles.content}>
        {/* Background Pattern */}
        <View style={styles.backgroundPattern} />
        
        {/* Illustration Container */}
        <View style={styles.illustrationContainer}>
          {onboardingData[currentStep].showImageIllustration && (
            <View style={styles.imageContainer}>
              <Image 
                source={onboardingData[currentStep].image} 
                style={styles.illustrationImage}
                resizeMode="contain"
              />
            </View>
          )}
        </View>

        {/* Information Card */}
        <View style={styles.infoCard}>
          {/* Header - Logo and Juma text */}
          <View style={styles.cardHeader}>
            <Image 
              source={require('../../assets/juma-logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.appName}>Juma</Text>
          </View>

          {/* Title */}
          <Text style={styles.cardTitle}>
            {onboardingData[currentStep].title}
          </Text>

          {/* Description */}
          <Text style={styles.cardDescription}>
            {onboardingData[currentStep].description}
          </Text>

          {/* Pagination Dots */}
          <View style={styles.paginationContainer}>
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentStep && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>

          {/* Action Button */}
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {onboardingData[currentStep].buttonText || 
               (currentStep === onboardingData.length - 1 ? 'Начать' : 'Далее')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f8f9fa',
    opacity: 0.3,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 84,
    paddingBottom: 334, // 296 (card height) + 38 (gap)
  },
  imageContainer: {
    width: width * 0.9,
    height: width * 0.9,
    maxWidth: 360,
    maxHeight: 360,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
  },
  mosqueContainer: {
    width: width * 0.7,
    height: height * 0.4,
    position: 'relative',
  },
  skyGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: '#87CEEB',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  moon: {
    position: 'absolute',
    top: 20,
    right: 30,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  cloud1: {
    position: 'absolute',
    top: 15,
    left: 20,
    width: 25,
    height: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  cloud2: {
    position: 'absolute',
    top: 25,
    left: 50,
    width: 20,
    height: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  mosqueBase: {
    position: 'absolute',
    bottom: 0,
    left: '20%',
    right: '20%',
    height: '40%',
    backgroundColor: '#20B2AA',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  mosqueDome: {
    position: 'absolute',
    bottom: '35%',
    left: '30%',
    right: '30%',
    height: '25%',
    backgroundColor: '#2C3E50',
    borderRadius: 50,
  },
  mosqueLeftDome: {
    position: 'absolute',
    bottom: '40%',
    left: '15%',
    width: '15%',
    height: '15%',
    backgroundColor: '#2C3E50',
    borderRadius: 20,
  },
  mosqueRightDome: {
    position: 'absolute',
    bottom: '40%',
    right: '15%',
    width: '15%',
    height: '15%',
    backgroundColor: '#2C3E50',
    borderRadius: 20,
  },
  leftMinaret: {
    position: 'absolute',
    bottom: 0,
    left: '10%',
    width: '8%',
    height: '50%',
    backgroundColor: '#20B2AA',
    borderRadius: 5,
  },
  rightMinaret: {
    position: 'absolute',
    bottom: 0,
    right: '10%',
    width: '8%',
    height: '50%',
    backgroundColor: '#20B2AA',
    borderRadius: 5,
  },
  leftMinaretTop: {
    position: 'absolute',
    bottom: '45%',
    left: '8%',
    width: '12%',
    height: '8%',
    backgroundColor: '#2C3E50',
    borderRadius: 8,
  },
  rightMinaretTop: {
    position: 'absolute',
    bottom: '45%',
    right: '8%',
    width: '12%',
    height: '8%',
    backgroundColor: '#2C3E50',
    borderRadius: 8,
  },
  leftCrescent: {
    position: 'absolute',
    bottom: '50%',
    left: '12%',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  rightCrescent: {
    position: 'absolute',
    bottom: '50%',
    right: '12%',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  geometricPattern: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: '#D2B48C',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    minHeight: 296,
    maxHeight: height * 0.4,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: Math.max(28, width * 0.08),
    height: Math.max(28, width * 0.08),
    marginRight: Math.max(8, width * 0.025),
  },
  appName: {
    fontSize: Math.max(20, width * 0.06),
    fontWeight: '500',
    color: '#0D0C0C',
    fontFamily: 'SF Pro Text',
    lineHeight: Math.max(20, width * 0.06),
    letterSpacing: 0,
  },
  cardTitle: {
    fontSize: Math.max(20, width * 0.06),
    fontWeight: '700',
    color: '#0D0C0C',
    fontFamily: 'SF Pro',
    lineHeight: Math.max(24, width * 0.07),
    letterSpacing: 0,
    marginBottom: 16,
    textAlign: 'left',
  },
  cardDescription: {
    fontSize: Math.max(12, width * 0.035),
    fontWeight: '400',
    color: 'rgba(13, 12, 12, 0.6)',
    fontFamily: 'SF Pro',
    lineHeight: Math.max(18, width * 0.05),
    letterSpacing: 0,
    marginBottom: 16,
    textAlign: 'left',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#bdc3c7',
  },
  paginationDotActive: {
    backgroundColor: '#3498db',
  },
  nextButton: {
    backgroundColor: '#0086F3',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    minHeight: 40,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'SF Pro',
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'center',
  },
});

export default OnboardingScreen;
