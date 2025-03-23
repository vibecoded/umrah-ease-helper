
import { RitualStep } from '@/types';

export const UMRAH_RITUALS: RitualStep[] = [
  {
    id: 1,
    title: 'Entering Ihram',
    description: 'Before reaching the Miqat (boundary), perform ghusl (ritual bath), wear ihram garments (two white unsewn cloths for men; normal clothes for women), and make the intention for Umrah. Then recite the Talbiyah: "Labbayk Allahumma labbayk. Labbayk la shareeka laka labbayk. Innal hamda wan-ni'mata laka wal-mulk. La shareeka lak."',
    prayers: ['Talbiyah', 'Intention for Umrah'],
    important: true,
    location: 'miqat'
  },
  {
    id: 2,
    title: 'Entering Masjid al-Haram',
    description: 'Enter the mosque with your right foot and recite the dua for entering the mosque. Proceed towards the Kaaba with humility and reverence.',
    prayers: ['Dua for entering mosque'],
    location: 'masjid-al-haram'
  },
  {
    id: 3,
    title: 'Performing Tawaf',
    description: 'Circumbulate the Kaaba seven times, starting from the Black Stone. Men should do ramal (brisk walking) in the first three rounds. Make dua as you perform Tawaf.',
    prayers: ['Various duas during Tawaf'],
    important: true,
    location: 'kaaba'
  },
  {
    id: 4,
    title: 'Praying at Maqam Ibrahim',
    description: 'After completing Tawaf, pray two rakats behind Maqam Ibrahim (or anywhere in the mosque if not possible).',
    prayers: ['Two rakats of prayer'],
    location: 'maqam-ibrahim'
  },
  {
    id: 5,
    title: 'Drinking Zamzam Water',
    description: 'Drink Zamzam water and make dua.',
    location: 'zamzam'
  },
  {
    id: 6,
    title: 'Performing Sa\'i',
    description: 'Walk between the hills of Safa and Marwa seven times, starting from Safa. Recite appropriate duas at each hill and during the walk.',
    prayers: ['Duas at Safa and Marwa'],
    important: true,
    location: 'safa-marwa'
  },
  {
    id: 7,
    title: 'Shaving or Trimming Hair',
    description: 'Men should shave their heads or trim their hair. Women should trim a fingertip\'s length of hair. This marks the end of Umrah and exit from the state of Ihram.',
    important: true
  }
];

export function getRitualById(id: number): RitualStep | undefined {
  return UMRAH_RITUALS.find(ritual => ritual.id === id);
}

export function getImportantRituals(): RitualStep[] {
  return UMRAH_RITUALS.filter(ritual => ritual.important);
}
