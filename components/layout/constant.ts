import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import DateRangeIcon from '@mui/icons-material/DateRange';

export const menuList = [
  {
    text: 'Dokter',
    icon: ContactEmergencyIcon,
    path: '/doctor'
  },
  {
    text: 'Obat',
    icon: MedicationLiquidIcon,
    path: '/medicine'
  },
  {
    text: 'Pasien',
    icon: AccessibilityNewIcon,
    path: '/patient'
  },
  {
    text: 'Rekam Medis',
    icon: DateRangeIcon,
    path: '/visit'
  },
];