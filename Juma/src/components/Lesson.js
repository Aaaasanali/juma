import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RegisterIcon from '../../assets/schedule/register_icon.svg';

// lesson: { start: '15:00', durationMin: 40, title, description, teacher }
export default function Lesson({ lesson, onRegister }){
  return (
    <View style={styles.container}>
      <View style={styles.left}> 
        <Text style={styles.time}>{lesson.start}</Text>
        <Text style={styles.duration}>{lesson.durationMin} минут</Text>
      </View>

      <View style={styles.center}>
        <Text style={styles.title}>{lesson.title}</Text>
        {lesson.description ? <Text style={styles.desc}>{lesson.description}</Text> : null}
        {lesson.teacher ? <Text style={styles.teacher}>• {lesson.teacher} •</Text> : null}
      </View>

      <View style={styles.right}>
        <TouchableOpacity onPress={() => onRegister && onRegister(lesson)} style={styles.registerButton} activeOpacity={0.7}>
          <RegisterIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    width: '100%',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  left: {
    width: 72,
    alignItems: 'center',
    gap: 10,
  },
  time: {
    fontSize: 20,
    fontWeight: '500'
  },
  duration: {
    fontSize: 12,

  },
  center: {
    flex: 1,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600'
  },
  desc: {
    color: '#444',
    marginTop: 4,
    fontSize: 12,
  },
  teacher: {
    marginTop: 6,
    color: '#444',
    fontSize: 14,
  },
  right: {
    width: 46,
    alignItems: 'center'
  },
  registerButton: {
    padding: 8,
    borderRadius: 8,
  }
});
