import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import CheckboxIcon from '../../assets/checkbox_icon.svg';
import CheckboxCheckedIcon from '../../assets/checkbox_checked_icon.svg';

const LESSONS_CATEGORIES = [
  { id: 'arabic', label: 'Арабский язык' },
  { id: 'quran', label: 'Коран и его науки' },
  { id: 'aqida', label: 'Основы веры (Акыда)' },
  { id: 'fiqh', label: 'Исламское право (Фикх)' },
  { id: 'history', label: 'История и Жизнеописания' },
  { id: 'akhlaq', label: 'Духовность и Нравственность (Ахляк)' },
];

export default function LessonFilterModal({ visible, onClose, onApply, initialSelected = [] }){
  const [selected, setSelected] = useState(new Set(initialSelected));

  function toggleCategory(id){
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
  }

  function handleDone(){
    onApply && onApply(Array.from(selected));
    onClose && onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Выберите урок</Text>
          </View>

          {/* Checkbox list */}
          <View style={styles.checkboxList}>
            {LESSONS_CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.categoryRow, selected.has(cat.id) && styles.categoryRowChecked]}
                  activeOpacity={0.7}
                  onPress={() => toggleCategory(cat.id)}
                >
                    <View style={styles.checkboxContainer}>
                    {selected.has(cat.id) ? (
                      <CheckboxCheckedIcon width={24} height={24} />
                    ) : (
                      <CheckboxIcon width={24} height={24} />
                    )}
                  </View>
                    <Text key={cat.id} style={styles.category}>
                    {cat.label}
                    </Text>
                </TouchableOpacity>
            ))}
            </View>

          {/* Done button */}
          <TouchableOpacity style={styles.doneButton} activeOpacity={0.8} onPress={handleDone}>
            <Text style={styles.doneButtonText}>Готово</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
    maxHeight: '85%',
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  checkboxList: {
    padding: 20,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginVertical: 6,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },
  categoryRowChecked: {
    backgroundColor: '#e3f2fd',
  },
  checkboxContainer: {
    width: 28,
    height: 28,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryLabel: {
    fontSize: 16,
    color: '#111',
    flex: 1,
    fontWeight: 500,
  },
  categoryLabelChecked: {
    fontWeight: '600',
    color: '#0086f3',
  },
  doneButton: {
    backgroundColor: '#0086f3',
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
});
