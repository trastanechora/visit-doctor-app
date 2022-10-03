import Chip from '@mui/material/Chip';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CancelIcon from '@mui/icons-material/Cancel';
import { localeDateOption } from '@/constants/general';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

export const formatGender = (gender: string) => {
  if (gender === 'male') {
    return <Chip variant="outlined" size="small" color="info" label="Laki-laki" icon={< MaleIcon />} />
  } else {
    return <Chip variant="outlined" size="small" color="warning" label="Perempuan" icon={< FemaleIcon />} />
  }
}

export const formatMaritalStatus = (maritalStatus: string) => {
  if (maritalStatus === 'married') {
    return <Chip variant="outlined" size="small" color="default" label="Menikah" icon={< FavoriteIcon />} />
  } else if (maritalStatus === 'single') {
    return <Chip variant="outlined" size="small" color="default" label="Lajang" icon={< CircleOutlinedIcon />} />
  } else {
    return <Chip variant="outlined" size="small" color="default" label="Cerai" icon={< HeartBrokenIcon />} />
  }
}

export const formatAge = (stringBirthDate: string) => {
  const birthDate = new Date(stringBirthDate);
  const difference = Date.now() - birthDate.getTime();

  const ageDate = new Date(difference);
  const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
  return `${calculatedAge} Tahun`;
}

export const formatExperience = (stringServiceStartDate: string) => {
  const startDate = new Date(stringServiceStartDate);
  const difference = Date.now() - startDate.getTime();

  const experience = new Date(difference);
  const calculatedExperience = Math.abs(experience.getUTCFullYear() - 1970);
  return `${calculatedExperience} Tahun`;
}

export const formatDate = (stringDate: string) => {
  const date = new Date(stringDate)
  if (isNaN(Date.parse(stringDate))) {
    return '-'
  } else {
    return date.toLocaleDateString('id-ID', localeDateOption)
  }
}

export const formatStatus = (status: string) => {
  if (status === 'active') {
    return <Chip variant="outlined" size="small" color="success" label="Aktif" icon={< RadioButtonCheckedIcon />} />
  } else {
    return <Chip variant="outlined" size="small" color="error" label="Tidak Aktif" icon={< CancelIcon />} />
  }
}
