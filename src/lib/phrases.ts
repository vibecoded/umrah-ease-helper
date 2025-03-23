
import { PhrasesCategory, Phrase } from '@/types';

export const ARABIC_PHRASES: PhrasesCategory[] = [
  {
    id: 'greetings',
    name: 'Greetings & Basics',
    phrases: [
      {
        id: 'greeting-1',
        english: 'Peace be upon you',
        arabic: 'السلام عليكم',
        pronunciation: 'Assalamu alaikum',
        context: 'Standard Islamic greeting'
      },
      {
        id: 'greeting-2',
        english: 'And peace be upon you too',
        arabic: 'وعليكم السلام',
        pronunciation: 'Wa alaikum assalam',
        context: 'Response to the Islamic greeting'
      },
      {
        id: 'greeting-3',
        english: 'How are you?',
        arabic: 'كيف حالك؟',
        pronunciation: 'Kayfa haluka?',
        context: 'Asking about someone\'s wellbeing'
      },
      {
        id: 'greeting-4',
        english: 'I am fine, praise be to Allah',
        arabic: 'أنا بخير، الحمد لله',
        pronunciation: 'Ana bekhair, alhamdulillah',
        context: 'Response to how are you'
      },
      {
        id: 'greeting-5',
        english: 'Thank you',
        arabic: 'شكراً',
        pronunciation: 'Shukran',
        context: 'Expressing gratitude'
      },
      {
        id: 'greeting-6',
        english: 'You\'re welcome',
        arabic: 'عفواً',
        pronunciation: 'Afwan',
        context: 'Response to thank you'
      }
    ]
  },
  {
    id: 'directions',
    name: 'Directions & Places',
    phrases: [
      {
        id: 'direction-1',
        english: 'Where is the Kaaba?',
        arabic: 'أين الكعبة؟',
        pronunciation: 'Ayna al-Kaaba?',
        context: 'Asking for directions to the Kaaba'
      },
      {
        id: 'direction-2',
        english: 'Where is the Prophet\'s Mosque?',
        arabic: 'أين المسجد النبوي؟',
        pronunciation: 'Ayna al-Masjid al-Nabawi?',
        context: 'Asking for directions to the Prophet\'s Mosque'
      },
      {
        id: 'direction-3',
        english: 'Where is Safa and Marwa?',
        arabic: 'أين الصفا والمروة؟',
        pronunciation: 'Ayna al-Safa wal-Marwa?',
        context: 'Asking for directions to Safa and Marwa'
      },
      {
        id: 'direction-4',
        english: 'Where is the bathroom?',
        arabic: 'أين الحمام؟',
        pronunciation: 'Ayna al-hammam?',
        context: 'Asking for directions to the bathroom'
      },
      {
        id: 'direction-5',
        english: 'Where is the nearest hotel?',
        arabic: 'أين أقرب فندق؟',
        pronunciation: 'Ayna aqrab funduq?',
        context: 'Asking for directions to a hotel'
      },
      {
        id: 'direction-6',
        english: 'Is it far from here?',
        arabic: 'هل هو بعيد من هنا؟',
        pronunciation: 'Hal huwa ba\'eed min huna?',
        context: 'Asking about distance'
      }
    ]
  },
  {
    id: 'shopping',
    name: 'Shopping & Money',
    phrases: [
      {
        id: 'shopping-1',
        english: 'How much does this cost?',
        arabic: 'كم سعر هذا؟',
        pronunciation: 'Kam se\'er hatha?',
        context: 'Asking about price'
      },
      {
        id: 'shopping-2',
        english: 'That\'s too expensive',
        arabic: 'هذا غالي جداً',
        pronunciation: 'Hatha ghali jiddan',
        context: 'Negotiating price'
      },
      {
        id: 'shopping-3',
        english: 'Can you reduce the price?',
        arabic: 'هل يمكنك تخفيض السعر؟',
        pronunciation: 'Hal yumkinuka takhfeed al-se\'er?',
        context: 'Negotiating price'
      },
      {
        id: 'shopping-4',
        english: 'I will take it',
        arabic: 'سآخذه',
        pronunciation: 'Sa\'akhuthuh',
        context: 'Confirming purchase'
      },
      {
        id: 'shopping-5',
        english: 'Where can I exchange money?',
        arabic: 'أين يمكنني تبديل المال؟',
        pronunciation: 'Ayna yumkinuni tabdeel al-mal?',
        context: 'Looking for currency exchange'
      }
    ]
  },
  {
    id: 'food',
    name: 'Food & Dining',
    phrases: [
      {
        id: 'food-1',
        english: 'I am hungry',
        arabic: 'أنا جائع',
        pronunciation: 'Ana ja\'e\'',
        context: 'Expressing hunger'
      },
      {
        id: 'food-2',
        english: 'I am thirsty',
        arabic: 'أنا عطشان',
        pronunciation: 'Ana atshan',
        context: 'Expressing thirst'
      },
      {
        id: 'food-3',
        english: 'I would like water, please',
        arabic: 'أريد ماء، من فضلك',
        pronunciation: 'Ureedu ma\'an, min fadlika',
        context: 'Ordering water'
      },
      {
        id: 'food-4',
        english: 'Where is a good restaurant?',
        arabic: 'أين مطعم جيد؟',
        pronunciation: 'Ayna mat\'am jayyid?',
        context: 'Looking for a restaurant'
      },
      {
        id: 'food-5',
        english: 'The bill, please',
        arabic: 'الحساب، من فضلك',
        pronunciation: 'Al-hisab, min fadlika',
        context: 'Asking for the bill'
      }
    ]
  },
  {
    id: 'emergencies',
    name: 'Emergencies & Health',
    phrases: [
      {
        id: 'emergency-1',
        english: 'Help!',
        arabic: 'مساعدة!',
        pronunciation: 'Musa\'ada!',
        context: 'Calling for help'
      },
      {
        id: 'emergency-2',
        english: 'I need a doctor',
        arabic: 'أحتاج إلى طبيب',
        pronunciation: 'Ahtaju ila tabeeb',
        context: 'Medical emergency'
      },
      {
        id: 'emergency-3',
        english: 'I am sick',
        arabic: 'أنا مريض',
        pronunciation: 'Ana mareed',
        context: 'Expressing illness'
      },
      {
        id: 'emergency-4',
        english: 'Where is the nearest hospital?',
        arabic: 'أين أقرب مستشفى؟',
        pronunciation: 'Ayna aqrab mustashfa?',
        context: 'Looking for a hospital'
      },
      {
        id: 'emergency-5',
        english: 'I lost my passport',
        arabic: 'فقدت جواز سفري',
        pronunciation: 'Faqadtu jawaz safari',
        context: 'Lost passport situation'
      },
      {
        id: 'emergency-6',
        english: 'I am lost',
        arabic: 'أنا تائه',
        pronunciation: 'Ana ta\'eh',
        context: 'Being lost'
      }
    ]
  },
  {
    id: 'religious',
    name: 'Religious Terms & Prayers',
    phrases: [
      {
        id: 'religious-1',
        english: 'I intend to perform Umrah',
        arabic: 'نويت العمرة',
        pronunciation: 'Nawaytu al-umrah',
        context: 'Intention for Umrah'
      },
      {
        id: 'religious-2',
        english: 'Here I am, O Allah, here I am',
        arabic: 'لبيك اللهم لبيك',
        pronunciation: 'Labbayka Allahumma labbayk',
        context: 'Beginning of Talbiyah'
      },
      {
        id: 'religious-3',
        english: 'Glory be to Allah',
        arabic: 'سبحان الله',
        pronunciation: 'Subhan Allah',
        context: 'Common dhikr'
      },
      {
        id: 'religious-4',
        english: 'Praise be to Allah',
        arabic: 'الحمد لله',
        pronunciation: 'Alhamdulillah',
        context: 'Common dhikr'
      },
      {
        id: 'religious-5',
        english: 'Allah is the Greatest',
        arabic: 'الله أكبر',
        pronunciation: 'Allahu Akbar',
        context: 'Common dhikr'
      },
      {
        id: 'religious-6',
        english: 'There is no god but Allah',
        arabic: 'لا إله إلا الله',
        pronunciation: 'La ilaha illa Allah',
        context: 'First part of Shahada'
      }
    ]
  }
];

export function getPhrasesByCategory(categoryId: string): Phrase[] {
  const category = ARABIC_PHRASES.find(cat => cat.id === categoryId);
  return category ? category.phrases : [];
}

export function getAllCategories(): PhrasesCategory[] {
  return ARABIC_PHRASES;
}

export function searchPhrases(query: string): Phrase[] {
  const results: Phrase[] = [];
  
  ARABIC_PHRASES.forEach(category => {
    const matchingPhrases = category.phrases.filter(
      phrase =>
        phrase.english.toLowerCase().includes(query.toLowerCase()) ||
        phrase.arabic.includes(query) ||
        phrase.pronunciation.toLowerCase().includes(query.toLowerCase())
    );
    
    results.push(...matchingPhrases);
  });
  
  return results;
}
