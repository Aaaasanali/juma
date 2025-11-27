import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import Location from '../../assets/location-icon.svg'
import MosqueCard from '../../assets/mosque-card.svg'
import MosqueElement from '../../assets/mosque-img.svg'
import FunctionsCard from '../../assets/functions-story-card.svg'
import HelpCard from '../../assets/help-story-card.svg'
import NotificationIcon from '../../assets/iconsax-notification-bing.svg'
import { TextInput } from 'react-native';
import { Switch } from 'react-native';
import { BlurView } from 'expo-blur';
import Search from '../../assets/iconsax-search'
import DropDownPicker from 'react-native-dropdown-picker';
import BackgroundHeader from '../../assets/home-background.svg'
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import ScreenWrapper from '../components/ScreenWrapper';
import LessonFilterModal from '../components/LessonFilterModal';
import ExpandArrowIcon from './../../assets/iconsax-arrow-square-down.svg'

const HomeScreen = ({ navigation, userProfile }) => {
  const [mosque, setMosque] = useState('');
  const [near, setNear] = useState(false);
  const [showLessonFilter, setShowLessonFilter] = useState(false);
  const [selectedLessons, setSelectedLessons] = useState([]);

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <MaskedView style={styles.backgroundHeaderContainer}
          maskElement={
            <LinearGradient
              colors={["transparent", "black"]}
              style={{ flex: 1 }}
              start={{ x: 0.5, y: 1 }}          // верх
              end={{ x: 0.5, y: 0.9 }} 
            />
          }
        >
          <Image style={styles.backgroundHeader} source={require('./../../assets/home-background-head.png')}/>
        </MaskedView>

        <View style={styles.content}>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>Алматы</Text>
            <Location style={styles.locationIcon} />
          </View>
          
          <ScrollView 
          style={styles.storiesContainer}
          horizontal 
          showsHorizontalScrollIndicator={false}>
            <View style={styles.storyCard}>
              <MosqueCard />
            </View>
            <View style={styles.storyCard}>
              <FunctionsCard />
            </View>
            <View style={styles.storyCard}>
              <HelpCard />
            </View>
          </ScrollView>
          <View style={styles.listControlsContainer}>
            <Text style={styles.listName}>Мечети</Text>
            
            <View style={styles.listSearchContainer}>
              <Search />
              <TextInput
              style={styles.listSearchInput}
              placeholder="Найти"
              value={mosque}
              onChangeText={setMosque}
              placeholderTextColor={'black'}
              />
            </View> 

            <View style={styles.searchControls}>

              <View style={styles.nearBySwitchContainer}>
                <Text style={{fontSize: 16}}>Рядом</Text>
                <Switch
                  style={styles.nearBySwitch}
                  value={near}
                  onValueChange={setNear}
                  trackColor={{ false: "#ccc", true: "#4ade80" }}
                  thumbColor="#fff"
                />
              </View>

              <TouchableOpacity 
                style={styles.lessonsListAppendButton}
                activeOpacity={0.7}
                onPress={() => setShowLessonFilter(true)}
              >
                <Text style={styles.lessonsButtonText}>Уроки</Text>
                <ExpandArrowIcon style={{width: 20, height: 20,}}/>
                
              </TouchableOpacity>

             
            </View>
          </View>

          <View style={styles.placesList}>

              <TouchableOpacity
                style={styles.listElement}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('PlaceDetailScreen', { name: 'Центральная мечеть Алматы' })}
              >
                <MosqueElement />
                <View style={styles.listElementText}>
                  <Text style={styles.listElementName}>Центральная мечеть Алматы</Text>

                  <View style={styles.listElementDiscription}>
                    <Text>ул. Пушкина, 16</Text>
                    <Text style={{fontWeight: 600, fontSize: 15}}>·</Text>
                    <Text>2.2 км</Text>
                  </View>
                </View>
              </TouchableOpacity>
              
          </View>    
    </View>

    </ScrollView>

    <View style={styles.notificationButton}>
      <NotificationIcon />
    </View>

    <LessonFilterModal
      visible={showLessonFilter}
      onClose={() => setShowLessonFilter(false)}
      onApply={(selected) => setSelectedLessons(selected)}
      initialSelected={selectedLessons}
      style = {{marginRight: 20,}}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    zIndex: 1,
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    paddingTop: 55,
    position: 'relative',
  },
  root: {
    position: 'relative',
    flex: 1,
  },
  backgroundHeaderContainer: {
    position: 'absolute',
    top: -110,
    left: 0,
    right: 0,
    height: 374,
    zIndex: 0,
    pointerEvents: 'none',
  },
  backgroundHeader: {
    width: '100%',
    height: '100%',
  },
  locationContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 20,
    fontWeight: '600',
  },
  locationIcon: {
    marginLeft: 8,
  },
  storiesContainer: {    
    marginTop: 20,
  },
  storyCard:{
    border: 'solid',
    borderWidth: 2,
    borderRadius: 16,
    padding: 2,
    borderColor: '#0086F3',

    marginRight: 10,
  },
  listControlsContainer: {
    width: '100%',
  },
  listName: {
    fontSize: 24,
    marginTop: 13,
    fontWeight: 500,
  },
  listSearchContainer:{
    marginTop: 6, 
    height: 46,

    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',

  },
  listSearchInput: {
    fontSize: 16,
    marginLeft: 10,
    width: '100%',
    height: '100%'
  },

  searchControls: {
    display: 'flex',
    flexDirection: 'row',

    marginTop: 15,
  },
  nearBySwitchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#ffff',
    width: 130,
    height: 40,
    borderRadius: 18,

    paddingVertical: 4,
    paddingHorizontal: 7,
  },
  lessonsListAppendButton: {
    backgroundColor: '#ffff',
    width: 120,
    height: 40,
    borderRadius: 18,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    flexDirection: 'row',
    gap: 10,
  },
  lessonsButtonText: {
    fontSize: 16,

  },
  lessonsDropDownList: {
    width: 92,
    minHeight: 40,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 16,

    borderRadius: 16,
    borderWidth: 0,
    
    marginLeft: 10,
  },
    placesList: {
    width: '100%',
    marginTop: 20,
    
  },
  listElement: {
    width: '100%',
    backgroundColor: '#ffff',
    height: 68,
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'row',

    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  listElementText: {
    marginLeft: 32,
    gap: 15,
  },
  listElementName: {
    fontSize: 16,
    fontWeight: 500,

  },
  listElementDiscription: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  notificationButton: {
    position: 'absolute',
    zIndex: 100,
    top: 50,
    right: 20,
  }
});

export default HomeScreen;
