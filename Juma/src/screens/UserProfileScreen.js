import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Dimensions, ScrollView, Keyboard } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function UserProfileScreen({ onSubmit }) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState(null); // 'female' or 'male'

  const handleContinue = () => {
    if (!name.trim() || !gender) return;
    onSubmit && onSubmit({ name: name.trim(), gender });
  };

  const isFormValid = name.trim() && gender;

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          onScrollBeginDrag={dismissKeyboard}
        >
          <TouchableOpacity 
            style={styles.mainFrame} 
            activeOpacity={1} 
            onPress={dismissKeyboard}
          >
            {/* Header Card */}
            <View style={styles.headerCard}>
              <Text style={styles.headerTitle}>Ваше имя и пол</Text>
              <Text style={styles.headerDescription}>
                Это нужно, чтобы мы могли записать вас на урок.
              </Text>
            </View>

            {/* Name Input Card */}
            <View style={styles.inputCard}>
              <Text style={styles.label}>Имя</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Введите ваше имя"
                style={styles.nameInput}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>

            {/* Gender Selection Card */}
            <View style={styles.inputCard}>
              <Text style={styles.label}>Пол</Text>
              <View style={styles.genderContainer}>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    gender === 'female' && styles.genderButtonSelected,
                    gender === 'female' && styles.genderButtonFemale
                  ]}
                  onPress={() => setGender('female')}
                >
                  <Text style={[
                    styles.genderButtonText,
                    gender === 'female' && styles.genderButtonTextSelected
                  ]}>
                    Жен
                  </Text>
                  <Image 
                    source={require('../../assets/onboarding-girl.png')} 
                    style={styles.genderIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    gender === 'male' && styles.genderButtonSelected,
                    gender === 'male' && styles.genderButtonMale
                  ]}
                  onPress={() => setGender('male')}
                >
                  <Text style={[
                    styles.genderButtonText,
                    gender === 'male' && styles.genderButtonTextSelected
                  ]}>
                    Муж
                  </Text>
                  <Image 
                    source={require('../../assets/onboarding-boy.png')} 
                    style={styles.genderIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Continue Button */}
            <TouchableOpacity
              style={[styles.continueButton, !isFormValid && styles.continueButtonDisabled]}
              onPress={handleContinue}
              disabled={!isFormValid}
            >
              <Text style={styles.continueButtonText}>
                {isFormValid ? 'Продолжить' : 'Продолжить'}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: height,
  },
  mainFrame: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: width * 0.04,
    backgroundColor: 'transparent',
    gap: Math.max(24, height * 0.03),
  },
  headerCard: {
    backgroundColor: '#ffffff',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  headerTitle: {
    fontSize: Math.max(20, width * 0.06),
    fontWeight: '800',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: Math.max(12, width * 0.035),
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: Math.max(18, width * 0.05),
  },
  inputCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  label: {
    fontSize: Math.max(12, width * 0.035),
    color: '#7f8c8d',
    marginBottom: 12,
    fontWeight: '500',
  },
  nameInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingVertical: Math.max(12, height * 0.018),
    paddingHorizontal: 16,
    fontSize: Math.max(14, width * 0.04),
    color: '#2c3e50',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e9ecef',
    backgroundColor: '#ffffff',
    gap: 8,
  },
  genderButtonSelected: {
    borderColor: '#1677ff',
  },
  genderButtonFemale: {
    backgroundColor: '#fff0f6',
    borderColor: '#ff4d6d',
  },
  genderButtonMale: {
    backgroundColor: '#f0f8ff',
    borderColor: '#1677ff',
  },
  genderButtonText: {
    fontSize: Math.max(14, width * 0.04),
    fontWeight: '600',
    color: '#7f8c8d',
  },
  genderButtonTextSelected: {
    color: '#2c3e50',
  },
  genderIcon: {
    width: Math.max(20, width * 0.06),
    height: Math.max(20, width * 0.06),
  },
  continueButton: {
    backgroundColor: '#1677ff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#1677ff',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  continueButtonDisabled: {
    backgroundColor: '#a9c7ff',
  },
  continueButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: Math.max(14, width * 0.04),
  },
});
