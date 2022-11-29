import Chip from '@mui/material/Chip';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CancelIcon from '@mui/icons-material/Cancel';
import { localeDateOption } from '@/constants/general';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaidIcon from '@mui/icons-material/Paid';
import VerifiedIcon from '@mui/icons-material/Verified';
import { icdtenList } from '@/datasets/icd10';
import Typography from '@mui/material/Typography';

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
  const now = new Date();
  var seconds = Math.floor((Number(now) - Number(birthDate)) / 1000);
  var interval = seconds / 31536000;
  if (interval > 1) {
    const year = Math.floor(interval);
    const remain = interval % 31536000;
    const month = Math.floor((remain - year) * 12);
    if (month) {
      return year + " Tahun " + month + " Bulan";
    }
    return year + " Tahun"
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    const month = Math.floor(interval);
    const remain = interval % 2592000;
    const day = Math.floor((remain - month) * 30);
    if (day) {
      return month + " Bulan " + day + " Hari";
    }
    return month + " Bulan"
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " Hari";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " Jam";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " Menit";
  }
  return Math.floor(seconds) + " Detik";
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

export const formatVisitStatus = (status: string) => {
  switch (status) {
    case 'schedule':
      return <Chip variant="outlined" size="small" color="primary" label="Menunggu Jadwal Periksa" icon={< AccessTimeIcon />} />;
    case 'examine':
      return <Chip variant="outlined" size="small" color="warning" label="Menunggu Resep Obat" icon={< MonitorHeartIcon />} />;
    case 'recipe':
      return <Chip variant="outlined" size="small" color="secondary" label="Menunggu Pembayaran" icon={< ReceiptIcon />} />
    case 'payment':
      return <Chip variant="outlined" size="small" color="success" label="Menunggu Penyerahan Obat" icon={< PaidIcon />} />;
    case 'done':
      return <Chip variant="outlined" size="small" color="default" label="Selesai" icon={< VerifiedIcon />} />
  }
}

export const formatTextVisitStatus = (status: string) => {
  switch (status) {
    case 'schedule':
      return '(1/5) Terdaftar / Terjadwal';
    case 'examine':
      return '(2/5) Sudah Diperiksa';
    case 'recipe':
      return '(3/5) Sudah Diberi Resep Obat';
    case 'payment':
      return '(4/5) Sudah Dibayar';
    case 'done':
      return '(5/5) Selesai'
  }
}

export const formatDiagnosis = (code: string) => {
  const diagnosis = icdtenList.find((icdten) => icdten.code === code)
  if (!diagnosis) return 'Diagnosa tidak ada';

  return `${diagnosis.code} - ${diagnosis.idn}`;
}

export const formatUnorderedListItem = (jsonString: string) => {
  if (!jsonString) return '-'
  const parsedArray = JSON.parse(jsonString);
  return (<ul>
    {parsedArray.map((item: string, index: number) => {
      return (<li key={`${index}-${item}`}><Typography>{item}</Typography></li>)
    })}
  </ul>)
}