import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import ArrowLeft from './../../assets/placeDetailScreen/iconsax-arrow-circle-left.svg'

import LocationWhite from '../../assets/placeDetailScreen/location-icon-white.svg'
import HeartIcon from '../../assets/placeDetailScreen/iconsax-heart-circle.svg'
import ExportIcon from '../../assets/placeDetailScreen/iconsax-export-arrow-01.svg'
import NotificationIcon from '../../assets/placeDetailScreen/iconsax-notification-bing.svg'
import MoreIcon from '../../assets/placeDetailScreen/tabler_dots.svg'

import { BlurView } from 'expo-blur';
import Calendar from '../components/Calendar';
import Schedule from '../components/Schedule';
import Lesson from '../components/Lesson';
import MorePanelModal from '../components/MorePanelModal';

const PlaceDetailScreen = ({ route, navigation}) => {
    const { name } = route.params || {};
    const [showMore, setShowMore] = useState(false);

    const images = [
    require('./../../assets/mosque-detail-picture.png'),
    require('./../../assets/mosque-detail-picture.png'),
    require('./../../assets/mosque-detail-picture.png'),
    ];

    const screenWidth = Dimensions.get('window').width;
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Basic example times provider — replace with API or data lookup
    function getTimesForDate(date){
      // For demo: return static times; in real app compute by coordinates+date
      return {
        fajr: '05:00',
        sunrise: '06:30',
        zuhr: '13:15',
        asr: '17:00',
        maghrib: '19:45',
        isha: '21:30',
      };
    }

    // --- Lessons sample data and helpers
    function formatDateKey(d){
      const y = d.getFullYear();
      const m = String(d.getMonth()+1).padStart(2,'0');
      const day = String(d.getDate()).padStart(2,'0');
      return `${y}-${m}-${day}`;
    }

    const todayKey = formatDateKey(new Date());
    const tomorrowKey = formatDateKey(new Date(Date.now() + 24*60*60*1000));

    const lessonsByDate = {
      [todayKey]: [
        { start: '15:00', durationMin: 40, title: 'Основы таджвида', description: 'Определение и важность таджвида', teacher: 'Имам Абубакр' },
        { start: '17:30', durationMin: 50, title: 'История пророков', description: 'Биография Пророка Мухаммада ﷺ', teacher: 'Имам Абубакр' }
      ],
      [tomorrowKey]: [
        { start: '11:00', durationMin: 60, title: 'Чтение Корана', description: 'Практика чтения', teacher: 'Имам Ахмад' }
      ]
    };

    function getLessonsForDate(date){
      return lessonsByDate[formatDateKey(date)] || [];
    }

    function parseLessonStart(date, hhmm){
      const [hh, mm] = hhmm.split(':').map(n => parseInt(n,10));
      const d = new Date(date);
      d.setHours(hh, mm, 0, 0);
      return d;
    }

    function formatRemainingHMS(ms){
      if (ms == null) return '--:--:--';
      const totalSec = Math.floor(ms / 1000);
      const h = Math.floor(totalSec / 3600);
      const m = Math.floor((totalSec % 3600) / 60);
      const s = totalSec % 60;
      return `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    }

    // compute next lesson for the selected date (if date is in future, choose first lesson of that day)
    const [nextLesson, setNextLesson] = useState(null);
    const [lessonRemainingMs, setLessonRemainingMs] = useState(null);

    useEffect(() => {
      const lessons = getLessonsForDate(selectedDate);
      if (!lessons || lessons.length === 0) {
        setNextLesson(null);
        setLessonRemainingMs(null);
        return;
      }

      const now = new Date();
      const selKey = formatDateKey(selectedDate);
      const isToday = selKey === formatDateKey(new Date());

      let candidate = null;
      if (isToday) {
        // find first lesson whose start > now
        for (const l of lessons) {
          const t = parseLessonStart(selectedDate, l.start);
          if (t.getTime() > now.getTime()) { candidate = { ...l, date: t }; break; }
        }
      } else {
        // pick first lesson of that date
        const l = lessons[0];
        candidate = { ...l, date: parseLessonStart(selectedDate, l.start) };
      }

      if (!candidate) {
        setNextLesson(null);
        setLessonRemainingMs(null);
        return;
      }

      setNextLesson(candidate);

      function updateRemaining(){
        const rem = Math.max(0, candidate.date.getTime() - Date.now());
        setLessonRemainingMs(rem);
      }

      updateRemaining();
      const id = setInterval(updateRemaining, 1000);
      return () => clearInterval(id);
    }, [selectedDate]);

    return (
        <View style={styles.root}>
          {/* Фиксированная шапка */}
            <View style={styles.header}>
                <TouchableOpacity
                style={styles.returnButton} 
                activeOpacity={0.8}
                onPress={() => navigation.goBack()}>
                    <ArrowLeft />
                </TouchableOpacity>
                <Text style={styles.placeName}>{name}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContentMain}>

              {/* Листающаяся галерея */}
              
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={styles.placeGallery}
              >
                {images.map((img, index) => (
                  <View style={[styles.imageContainer, {  width: screenWidth}]} key={index}>
                    <Image source={img} style={[styles.galleryItem, { width: screenWidth, height: screenWidth }]} />
                  </View>
                ))}
              </ScrollView>

              <View style={styles.contentContainer}>
              {/* Панель с кнопками */}
              <BlurView intensity={15} tint="light" style={styles.controlPanel}>
                
                  <TouchableOpacity
                  style={styles.routeButton}
                  activeOpacity={0.8}
                  >
                    <LocationWhite />
                    <Text style={styles.routeButtonText}>Построить маршрут</Text>
                  </TouchableOpacity>

                  {/* Второй уровень панели */}
                  <View style={styles.littleControlContainer}>

                    <TouchableOpacity style={styles.littleControlButtons} activeOpacity={0.8}>
                      <HeartIcon/>
                      <Text style={styles.littleControlButtonsText}>Избранное</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.littleControlButtons} activeOpacity={0.8}>
                      <ExportIcon/>
                      <Text style={styles.littleControlButtonsText}>Поделиться</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.littleControlButtons} activeOpacity={0.8}>
                      <NotificationIcon/>
                      <Text style={[styles.littleControlButtonsText, {fontSize: 10}]}>Уведомления</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.littleControlButtons} activeOpacity={0.8} >
                      <MoreIcon/>
                      <Text style={styles.littleControlButtonsText}>Еще</Text>
                    </TouchableOpacity>

                  </View>

              </BlurView>

              {/* Календарь */}
              <View style={styles.calendarWrapper}>
                <Calendar
                  initialDate={selectedDate}
                  onSelectDate={(date) => {
                    setSelectedDate(date);
                  }}
                />
              </View>
              
              <View style={styles.scheduleWrapper}>
                <Text style={{fontSize: 24, fontWeight: 500,marginTop: 6, paddingHorizontal: 20 }}>Расписание</Text>
                <View style={{ marginTop: 12 }}>
                  <Schedule
                    times={getTimesForDate(selectedDate)} 
                    timesToday={getTimesForDate(new Date())}
                    date={selectedDate}
                  />
                </View>
              </View>

              {/* Уроки */}
              <View style={styles.lessonsWrapper}>
                <Text style={{fontSize: 24, fontWeight: 500, marginTop: 18, paddingHorizontal: 20}}>Уроки</Text>

                  <BlurView intensity={10} tint="light" style={styles.nextLessonCard}>
                    <Text style={{ textAlign: 'center', color: '#222' }}>Следующий урок</Text>
                    <Text style={styles.nextLessonCountdown}>{nextLesson && lessonRemainingMs !== null ? formatRemainingHMS(lessonRemainingMs) : '--:--:--'}</Text>
                    {nextLesson ? (
                      <Text style={{ textAlign: 'center', color: '#222' }}>{nextLesson.title} — {nextLesson.start}</Text>
                    ) : (
                      <Text style={{ textAlign: 'center', color: '#666' }}>Уроков нет</Text>
                    )}  

                    <View style={{ marginTop: 12 }}>
                      {getLessonsForDate(selectedDate).map((l, idx) => (
                        <Lesson key={idx} lesson={l} onRegister={(ls) => console.log('register', ls)} />
                      ))}
                    </View>
                  </BlurView>
              </View>
              

              {/* Мечети рядом */}
              <View>
                <Text style={{fontSize: 24, fontWeight: 500, marginTop: 18, paddingHorizontal: 20}} >Мечети рядом</Text>

                <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{paddingBottom: 7, marginTop: 10}}
                >
                  <View style={styles.moreMosquesCard}>
                      <Image style={styles.moreMosquesImage} source={require('./../../assets/mosque-detail-picture.png')}/>
                      <View style={styles.moreMosquesText}>
                        <Text style={styles.moreMosquesName}>Центральная мечеть Алматы</Text>
                        <Text style={styles.moreMosquesDesc}>ул. Пушкина • 2.2 км</Text>
                      </View>
                  </View>

                  <View style={styles.moreMosquesCard}>
                      <Image style={styles.moreMosquesImage} source={require('./../../assets/mosque-detail-picture.png')}/>
                      <View style={styles.moreMosquesText}>
                        <Text style={styles.moreMosquesName}>Центральная мечеть Алматы</Text>
                        <Text style={styles.moreMosquesDesc}>ул. Пушкина • 2.2 км</Text>
                      </View>
                  </View>

                  <View style={styles.moreMosquesCard}>
                      <Image style={styles.moreMosquesImage} source={require('./../../assets/mosque-detail-picture.png')}/>
                      <View style={styles.moreMosquesText}>
                        <Text style={styles.moreMosquesName}>Центральная мечеть Алматы</Text>
                        <Text style={styles.moreMosquesDesc}>ул. Пушкина • 2.2 км</Text>
                      </View>
                  </View>


                </ScrollView>
              </View>
              </View>
            </ScrollView>
            
            <MorePanelModal 
            visible={showMore}
            onClose={() => setShowMore(false)}
            style = {{marginRight: 20,}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  scrollContentMain: {
    alignItems: 'center',
  },
  root: {
    position: 'relative',
    flex: 1,
  },
  header: {
    zIndex: 100,
    top: 50,
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  returnButton: {
    position: 'absolute',
    left: 20,
  },
  placeName: {
    alignSelf: 'center',
    fontSize: 16,
  },
  placeGallery: {
    width: '100%',
  },
  contentContainer: {
    top: -105,
    width: '100%  '
  },
  controlPanel: {
    backgroundColor: '#49a3ed4b',
    
    width: '100%',
    
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
    overflow: 'hidden',
  },
  routeButton: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 40,
    backgroundColor: '#0086f3d3',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 8,

  },
  routeButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  littleControlContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  littleControlButtons: {
    backgroundColor: '#0086f3d3',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 10,
    gap: 4,
    borderRadius: 8,
    width: 82
  },
  littleControlButtonsText: {
    color: '#fff',
    fontSize: 12,
  },
  calendarControlsContainer: {
    flexDirection: 'row',
  },
  calendarMonthButton: {
    flexDirection: 'row',

  },
  scheduleWrapper: {
    width: '100%'
  },
  lessonsWrapper: {
    width: '100%',
  },
  nextLessonCard: {
    backgroundColor: '#49a3ed4b',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 10,
  },
  nextLessonCountdown: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    marginVertical: 8
  },
  calendarWrapper: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  moreMosquesCard:{
    backgroundColor: '#fff',
    width: 138,
    height: 212,
    borderRadius: 16,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginLeft: 20,
  },
  moreMosquesImage: {
    width: 138,
    height: 138,
    borderTopLeftRadius: 16,
    borderTopEndRadius: 16,
    borderWidth: 2,
    borderColor: '#fff'
  },
  moreMosquesName: {
    fontSize: 16,
  },
  moreMosquesDesc: {
    fontSize: 10,
  },
  moreMosquesText: {
    padding: 8,
  }
});

export default PlaceDetailScreen;
