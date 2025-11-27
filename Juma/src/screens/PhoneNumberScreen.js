import React, { useMemo, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions, ScrollView, Keyboard } from 'react-native';

const { width, height } = Dimensions.get('window');
import { formatKzPhone, isValidKzPhone } from '../utils/phone';

export default function PhoneNumberScreen({ onSubmit }) {
  const [phone, setPhone] = useState('+7 ');
  const formatted = useMemo(() => formatKzPhone(phone || '+7 '), [phone]);
  const isValid = isValidKzPhone(formatted);

  const handleChange = (text) => {
    // Keep user-friendly typing, but always format view
    setPhone(text);
  };

  const handleContinue = () => {
    if (!isValid) return;
    onSubmit && onSubmit(formatted);
  };

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
            <View style={styles.headerCard}>
              <Text style={styles.headerTitle}>Добро{`\n`}пожаловать</Text>
              <Text style={styles.helperText}>Введите номер телефона для получения SMS{`\n`}с кодом подтверждения</Text>
            </View>

            <View style={styles.formCard}>
              <View style={styles.inputSection}>
                <Text style={styles.label}>Код Страны</Text>
                <View style={styles.countryRow}>
                  <Text style={styles.flag}>🇰🇿</Text>
                  <Text style={styles.countryText}>Казахстан</Text>
                </View>
              </View>

              <View style={styles.inputSection}>
                <Text style={styles.label}>Номер Телефона</Text>
                <TextInput
                  value={formatted}
                  onChangeText={handleChange}
                  keyboardType="phone-pad"
                  placeholder="+7 (775) 358 7433"
                  style={styles.input}
                />
              </View>
            </View>

            <TouchableOpacity disabled={!isValid} style={[styles.primaryBtn, !isValid && styles.primaryBtnDisabled]} onPress={handleContinue}>
              <Text style={styles.primaryBtnText}>Продолжить</Text>
            </TouchableOpacity>

            <Text style={styles.terms}>Продолжая, вы соглашаетесь с <Text style={styles.link}>Политикой конфиденциальности</Text></Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, },
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
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 4,
  },
  headerTitle: { 
    fontSize: Math.max(24, width * 0.07), 
    fontWeight: '800', 
    color: '#2c3e50', 
    textAlign: 'center', 
    lineHeight: Math.max(28, width * 0.08) 
  },
  helperText: { 
    textAlign: 'center', 
    color: '#7f8c8d', 
    marginTop: 8, 
    fontSize: Math.max(10, width * 0.03) 
  },
  formCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 3,
  },
  inputSection: {
    marginBottom: 16,
  },
  label: { 
    color: '#7f8c8d', 
    fontSize: Math.max(10, width * 0.03), 
    marginBottom: 8 
  },
  countryRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8, 
    paddingVertical: 10 
  },
  flag: { 
    fontSize: Math.max(14, width * 0.04) 
  },
  countryText: { 
    fontSize: Math.max(14, width * 0.04), 
    color: '#2c3e50', 
    fontWeight: '600' 
  },
  input: {
    backgroundColor: '#f3f6f9',
    borderRadius: 10,
    paddingVertical: Math.max(10, height * 0.015),
    paddingHorizontal: 12,
    fontSize: Math.max(14, width * 0.04),
    color: '#2c3e50',
    borderWidth: 1,
    borderColor: '#e3e7ed',
  },
  primaryBtn: {
    backgroundColor: '#1677ff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#1677ff', shadowOpacity: 0.25, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 6,
  },
  primaryBtnDisabled: { backgroundColor: '#a9c7ff' },
  primaryBtnText: { 
    color: '#ffffff', 
    fontWeight: '700', 
    fontSize: Math.max(14, width * 0.04) 
  },
  terms: { 
    textAlign: 'center', 
    color: '#7f8c8d', 
    fontSize: Math.max(10, width * 0.03), 
    marginTop: 8 
  },
  link: { color: '#1677ff' },
});
