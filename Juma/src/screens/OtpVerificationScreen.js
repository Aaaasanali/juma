import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions, ScrollView, Keyboard } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function OtpVerificationScreen({ phone, onVerify, onBack }) {
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleChange = (value, idx) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...code];
    next[idx] = digit || '';
    setCode(next);
    if (digit && idx < 3) inputs[idx + 1].current?.focus();
  };

  const filled = code.every(Boolean);

  const handleVerify = () => {
    if (!filled) return;
    onVerify && onVerify(code.join(''));
  };

  useEffect(() => {
    inputs[0].current?.focus();
  }, []);


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
              <Text style={styles.headerTitle}>Подтверждение{`\n`}номера</Text>
              <Text style={styles.helperText}>Мы отправили SMS с кодом подтверждения{`\n`}на номер {phone}</Text>
              
              <View style={styles.otpRow}>
                {code.map((v, i) => (
                  <View key={i} style={styles.otpBox}>
                    <TextInput
                      ref={inputs[i]}
                      value={v}
                      onChangeText={(t) => handleChange(t, i)}
                      keyboardType="number-pad"
                      maxLength={1}
                      style={styles.otpInput}
                      textAlign="center"
                    />
                  </View>
                ))}
              </View>
            </View>

            <TouchableOpacity disabled={!filled} style={[styles.primaryBtn, !filled && styles.primaryBtnDisabled]} onPress={handleVerify}>
              <Text style={styles.primaryBtnText}>Подтвердить</Text>
            </TouchableOpacity>
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
    gap: Math.max(12, height * 0.02),
  },
  headerCard: {
    backgroundColor: '#ffffff',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 4,
    gap: 16,
  },
  headerTitle: { 
    fontSize: Math.max(20, width * 0.06), 
    fontWeight: '800', 
    color: '#2c3e50', 
    textAlign: 'center', 
    lineHeight: Math.max(24, width * 0.07) 
  },
  helperText: { 
    textAlign: 'center', 
    color: '#7f8c8d', 
    fontSize: Math.max(10, width * 0.03) 
  },
  otpRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%',
    paddingHorizontal: 20,
  },
  otpBox: {
    width: Math.max(50, width * 0.15),
    height: Math.max(50, width * 0.15),
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 3,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e3e7ed',
  },
  otpInput: { 
    fontSize: Math.max(20, width * 0.07), 
    fontWeight: '700', 
    color: '#1677ff', 
    width: '100%', 
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  primaryBtn: {
    backgroundColor: '#1677ff',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#1677ff', shadowOpacity: 0.25, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 6,
    alignSelf: 'center',
  },
  primaryBtnDisabled: { backgroundColor: '#a9c7ff' },
  primaryBtnText: { 
    color: '#ffffff', 
    fontWeight: '700', 
    fontSize: Math.max(14, width * 0.04) 
  },
});
