import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import DateRangeIcon from '@mui/icons-material/DateRange';

export const menuList = [
  {
    text: 'Doctor',
    icon: ContactEmergencyIcon,
    path: '/doctor'
  },
  {
    text: 'Medicine',
    icon: MedicationLiquidIcon,
    path: '/medicine'
  },
  {
    text: 'Patient',
    icon: AccessibilityNewIcon,
    path: '/patient'
  },
  {
    text: 'Visit',
    icon: DateRangeIcon,
    path: '/visit'
  },
];