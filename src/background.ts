
// Background script for the Umrah Assistant extension

// Set up alarms for prayer notifications
const setupPrayerAlarms = async () => {
  try {
    const storedPrayers = await browser.storage.local.get('prayers');
    
    if (storedPrayers.prayers) {
      const prayers = storedPrayers.prayers;
      
      for (const prayer of prayers) {
        const prayerTime = new Date(prayer.time);
        const now = new Date();
        
        if (prayerTime > now) {
          // Calculate minutes difference as a number
          const diffMs = prayerTime.getTime() - now.getTime();
          const minutes = Math.floor(diffMs / (1000 * 60));
          
          if (minutes <= 15) {
            // Only set alarms for prayers within the next 15 minutes
            browser.alarms.create(`prayer-${prayer.name}`, {
              when: prayerTime.getTime(),
            });
          }
        }
      }
    }
  } catch (error) {
    console.error('Error setting up prayer alarms:', error);
  }
};

// Listen for alarm events
browser.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name.startsWith('prayer-')) {
    const prayerName = alarm.name.replace('prayer-', '');
    
    browser.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon-96.png',
      title: 'Prayer Time',
      message: `It's time for ${prayerName} prayer.`
    });
  }
});

// Initialize the extension
const initialize = async () => {
  // Set up initial alarms
  await setupPrayerAlarms();
  
  // Set up periodic alarm checks (every 15 minutes)
  browser.alarms.create('check-prayers', {
    periodInMinutes: 15
  });
};

// Check prayers when the check-prayers alarm fires
browser.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'check-prayers') {
    setupPrayerAlarms();
  }
});

// Initialize when the service worker starts
initialize();

// Listen for messages from the popup
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updatePrayers') {
    setupPrayerAlarms();
    sendResponse({ success: true });
  }
  return true;
});
