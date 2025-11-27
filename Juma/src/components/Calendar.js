import React, { useState, useMemo, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import ArrowCalendarIcon from '../../assets/placeDetailScreen/iconsax-arrow-circle-left-calendar.svg'

const MONTHS_RU = [
  'Январь','Февраль','Март','Апрель','Май','Июнь',
  'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'
];

// Props: initialDate (Date), onSelectDate(date), startWeekOnMonday (bool)
export default function Calendar({ initialDate, onSelectDate, startWeekOnMonday = true }){
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0,0,0,0);
    return d;
  }, []);

  const init = initialDate ? new Date(initialDate) : new Date();
  init.setHours(0,0,0,0);

  const [displayYear, setDisplayYear] = useState(init.getFullYear());
  const [displayMonth, setDisplayMonth] = useState(init.getMonth()); // 0..11
  const [selectedDate, setSelectedDate] = useState(init);

  const weekdayLabels = startWeekOnMonday ? ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'] : ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'];

  function changeMonth(delta){
    let month = displayMonth + delta;
    let year = displayYear;
    if(month < 0){ month = 11; year -= 1; }
    if(month > 11){ month = 0; year += 1; }
    setDisplayMonth(month);
    setDisplayYear(year);
  }

  // compute prev/next month names
  const prevMonthNum = displayMonth === 0 ? 11 : displayMonth - 1;
  const nextMonthNum = displayMonth === 11 ? 0 : displayMonth + 1;
  const prevMonthName = MONTHS_RU[prevMonthNum];
  const nextMonthName = MONTHS_RU[nextMonthNum];

  // flatten all days (skip empty cells at start/end)
  const allDays = useMemo(() => {
    const firstDay = new Date(displayYear, displayMonth, 1);
    const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
    const days = [];
    for(let d = 1; d <= daysInMonth; d++){
      days.push(new Date(displayYear, displayMonth, d));
    }
    return days;
  }, [displayYear, displayMonth]);

  const screenWidth = Dimensions.get('window').width;
  const dayCellSize = 30; // fixed cell size
  const itemSpacing = 10; // horizontal spacing between day cells
  const contentWidth = allDays.length * (dayCellSize + itemSpacing); // estimated content width

  // find selected date index
  const selectedDateIndex = useMemo(() => {
    return allDays.findIndex(d => d.getTime() === selectedDate.getTime());
  }, [allDays, selectedDate]);

  const scrollRef = useRef(null);
  const didInitialScroll = useRef(false);

  // On first mount, scroll so the selected (today) date is visible
  useEffect(() => {
    if (didInitialScroll.current) return;
    if (!scrollRef.current) return;
    if (selectedDateIndex < 0) return;

    // center the selected day in the viewport if possible
    const approxPos = selectedDateIndex * (dayCellSize + itemSpacing);
    const targetX = Math.max(0, Math.min(
      approxPos - (screenWidth / 2 - dayCellSize / 2),
      Math.max(0, contentWidth - screenWidth)
    ));

    try {
      scrollRef.current.scrollTo({ x: targetX, animated: true });
    } catch (e) {
      // some RN versions require measure/layout; ignore errors silently
    }

    didInitialScroll.current = true;
  }, [selectedDateIndex, scrollRef, contentWidth, screenWidth, dayCellSize]);

  function handleSelect(date){
    if(!date) return;
    setSelectedDate(date);
    if(onSelectDate) onSelectDate(date);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.headerButton}>
          <ArrowCalendarIcon />
          <Text style={styles.headerButtonText}>{prevMonthName}</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter} pointerEvents="none">
          <Text style={styles.headerTitle}>{MONTHS_RU[displayMonth]} {displayYear}</Text>
        </View>
        <TouchableOpacity onPress={() => changeMonth(1)} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>{nextMonthName}</Text>
          <ArrowCalendarIcon style={{transform: [{scaleX: -1}]}}/>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled={false}
        scrollEventThrottle={16}
        bounces={false}
        overScrollMode={'never'}
        showsHorizontalScrollIndicator={false}
        style={{ width: screenWidth }}
        contentContainerStyle={{ paddingBottom: 7, paddingHorizontal: 10 }}
      >
        {allDays.map((date, idx) => {
          const isToday = date.getTime() === today.getTime();
          const isSelected = date.getTime() === selectedDate.getTime();
          
          const raw = date.getDay(); // 0..6, Sun..Sat
          const weekdayLabel = startWeekOnMonday 
            ? (raw === 0 ? 'Вс' : weekdayLabels[raw - 1])
            : weekdayLabels[raw];

          return (
            <TouchableOpacity
              key={idx}
              style={[
                { width: dayCellSize, height: dayCellSize*2, alignItems: 'center', justifyContent: 'center', marginRight: itemSpacing },
                isSelected && styles.dayCellSelectedPill
              ]}
              activeOpacity={0.7}
              onPress={() => handleSelect(date)}
            >
              <Text style={[styles.weekdaySmall]}>{weekdayLabel}</Text>
              <Text style={[styles.dayText, isToday && styles.dayTextToday, isSelected && styles.dayTextSelected]}>
                {date.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    width: '100%', 
    alignItems: 'center', 
},
  header: { 
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 8 
},
  headerTitle: { 
    fontSize: 16, 
    fontWeight: '600',
},
  headerCenter: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  headerButton: { 
    padding: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

},
  headerButtonText: { 
    fontSize: 16,
    opacity: 0.6, 
},
  dayText: { 
    color: '#222', 
    fontWeight: '500', 
    fontSize: 16,
},
  dayTextToday: { 
    color: '#0086F3', 
    fontWeight: '700' ,
    fontSize: 16,
},
  dayCellSelectedPill: { 
    backgroundColor: '#88caff70', 
    borderRadius: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

},
  dayTextSelected: { 
    fontWeight: '700' 
},
  weekdaySmall: { 
    fontSize: 16,   
},
});
