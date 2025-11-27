import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MoonIcon from './../../assets/schedule/moon_icon.svg'
import SunIcon from './../../assets/schedule/sun_icon.svg'
import SunriseIcon from './../../assets/schedule/sunrise_icon.svg'
import SunsetIcon from './../../assets/schedule/sunset_icon.svg'
import { BlurView } from 'expo-blur';
// times prop example:
// {
//   fajr: '05:00',
//   sunrise: '06:30',
//   zuhr: '13:15',
//   asr: '17:00',
//   maghrib: '19:45',
//   isha: '21:30'
// }

function parseTimeToDate(date, hhmm){
  if (!hhmm || typeof hhmm !== 'string') return null;
  const [hh, mm] = hhmm.split(':').map(n => parseInt(n, 10));
  if (Number.isNaN(hh) || Number.isNaN(mm)) return null;
  const d = new Date(date);
  d.setHours(hh, mm, 0, 0);
  return d;
}

function getNextPrayer(times, referenceDate = new Date()){
  const order = ['fajr','sunrise','zuhr','asr','maghrib','isha'];

  // Determine whether to compare against the actual current time
  // If referenceDate is today (same Y/M/D), use now = new Date() so "next" is relative to current time.
  // Otherwise use the referenceDate (midnight of that day) so "next" means the first upcoming on that day.
  const today = new Date();
  const ref = new Date(referenceDate);
  ref.setHours(0,0,0,0);
  const isRefToday = ref.getFullYear() === today.getFullYear() && ref.getMonth() === today.getMonth() && ref.getDate() === today.getDate();

  const now = isRefToday ? new Date() : new Date(referenceDate);

  for (let i = 0; i < order.length; i++){
    const name = order[i];
    const t = parseTimeToDate(referenceDate, times && times[name]);
    if (!t) continue;
    if (t.getTime() > now.getTime()) return { name, time: t };
  }
  // if none left today — return first prayer for next day
  const firstName = order[0];
  const nextDay = new Date(referenceDate);
  nextDay.setDate(nextDay.getDate() + 1);
  const t0 = parseTimeToDate(nextDay, times && times[firstName]);
  return { name: firstName, time: t0 };
}

function formatRemaining(ms){
  if (!ms || ms <= 0) return '0:00';
  const totalMin = Math.floor(ms / 60000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return h > 0 ? `${h}:${m.toString().padStart(2,'0')}` : `${m}:00`;
}

export default function Schedule({ times = {}, date = new Date(), style, timesToday = null }){
  const order = [
    { key: 'fajr', label: 'Фаджр', icon: MoonIcon },
    { key: 'sunrise', label: 'Восход', icon: SunriseIcon },
    { key: 'zuhr', label: 'Зухр', icon: SunIcon },
    { key: 'asr', label: 'Аср', icon: SunIcon },
    { key: 'maghrib', label: 'Магриб', icon: SunsetIcon },
    { key: 'isha', label: 'Иша', icon: MoonIcon },
  ];

  // The "next" prayer should be computed relative to today's actual time,
  // not the selected `date`. Use `timesToday` if provided; fallback to `times`.
  const next = useMemo(() => getNextPrayer(timesToday || times, new Date()), [timesToday, times]);
  const now = new Date();
  const remainingMs = next && next.time ? Math.max(0, next.time.getTime() - now.getTime()) : null;

  // Determine whether the selected `date` is today; only then highlight the "next" prayer in the list
  const today = new Date();
  const sel = new Date(date);
  sel.setHours(0,0,0,0);
  const isSelectedDateToday = sel.getFullYear() === today.getFullYear() && sel.getMonth() === today.getMonth() && sel.getDate() === today.getDate();

  return (
    <BlurView intensity={10} tint="light" style={[styles.card, style]}>
      <Text style={styles.cardTitle}>Следующий намаз через:</Text>
      <Text style={styles.countdown}>{remainingMs !== null ? formatRemaining(remainingMs) : '--:--'}</Text>

      <View style={styles.list}>
        {order.map(item => {
          const t = times && times[item.key] ? times[item.key] : '--:--';
          const isNext = next && next.name === item.key;
          const isNextHighlighted = isNext && isSelectedDateToday;
          const IconComp = item.icon;
          return (
            <View key={item.key} style={[styles.row, isNextHighlighted && styles.rowActive]}>
              <View style={styles.iconWrap}>
                <IconComp width={20} height={20} />
              </View>
              <Text style={[styles.label, isNextHighlighted && styles.labelActive]}>{item.label}</Text>
              <Text style={[styles.time, isNextHighlighted && styles.timeActive]}>{t}</Text>
            </View>
          );
        })}
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#49a3ed4b',
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    overflow: 'hidden',
    paddingVertical: 8,
  },
  cardTitle: {
    fontSize: 16,
    color: '#222',
    marginBottom: 15,
  },
  countdown: {
    fontSize: 24,
    fontWeight: '400',
    color: '#111',
    marginBottom: 16,
  },
  list: {
    width: '100%'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  rowActive: {
    backgroundColor: '#0086f3d3',
  },
  icon: {
    fontSize: 20,
    width: 28
  },
  iconWrap: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    flex: 1,
    marginLeft: 8,
    fontSize: 20,
    color: '#111'
  },
  time: {
    fontSize: 20,
    color: '#111'
  },
  timeActive: {
    color: '#fff'
  },
  labelActive: {
    color: '#fff',
  }
});
