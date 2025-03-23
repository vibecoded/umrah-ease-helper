
import { Prayer, PrayerTimesResponse, Location } from '@/types';

export async function fetchPrayerTimes(location: Location): Promise<Prayer[]> {
  try {
    const { latitude, longitude } = location;
    const date = new Date();
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    
    const response = await fetch(
      `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=${latitude}&longitude=${longitude}&method=4`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch prayer times');
    }

    const data: PrayerTimesResponse = await response.json();
    
    // Format prayer times
    const prayers: Prayer[] = [
      {
        name: 'Fajr',
        arabicName: 'الفجر',
        time: formatPrayerTime(data.data.timings.Fajr, date),
      },
      {
        name: 'Sunrise',
        arabicName: 'الشروق',
        time: formatPrayerTime(data.data.timings.Sunrise, date),
      },
      {
        name: 'Dhuhr',
        arabicName: 'الظهر',
        time: formatPrayerTime(data.data.timings.Dhuhr, date),
      },
      {
        name: 'Asr',
        arabicName: 'العصر',
        time: formatPrayerTime(data.data.timings.Asr, date),
      },
      {
        name: 'Maghrib',
        arabicName: 'المغرب',
        time: formatPrayerTime(data.data.timings.Maghrib, date),
      },
      {
        name: 'Isha',
        arabicName: 'العشاء',
        time: formatPrayerTime(data.data.timings.Isha, date),
      },
    ];

    return prayers;
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    throw error;
  }
}

function formatPrayerTime(timeString: string, date: Date): string {
  // Parse the time string (format: HH:MM)
  const [hours, minutes] = timeString.split(':').map(Number);
  
  // Create a new date object with the same date but different time
  const prayerTime = new Date(date);
  prayerTime.setHours(hours, minutes, 0, 0);
  
  return prayerTime.toISOString();
}

export function getNextPrayer(prayers: Prayer[]): Prayer | null {
  const now = new Date();
  const upcoming = prayers
    .filter(prayer => new Date(prayer.time) > now)
    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  
  return upcoming.length > 0 ? upcoming[0] : null;
}

export function getTimeUntilNextPrayer(nextPrayer: Prayer | null): string {
  if (!nextPrayer) return 'No upcoming prayers today';
  
  const now = new Date();
  const prayerTime = new Date(nextPrayer.time);
  const diffMs = prayerTime.getTime() - now.getTime();
  
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}

export function getCurrentPrayer(prayers: Prayer[]): Prayer | null {
  const now = new Date();
  const sortedPrayers = [...prayers].sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
  );
  
  let currentPrayer = null;
  
  for (let i = 0; i < sortedPrayers.length; i++) {
    const prayerTime = new Date(sortedPrayers[i].time);
    
    if (prayerTime <= now) {
      currentPrayer = sortedPrayers[i];
    } else {
      break;
    }
  }
  
  return currentPrayer;
}

export function formatPrayerTimeForDisplay(timeString: string): string {
  const time = new Date(timeString);
  return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
