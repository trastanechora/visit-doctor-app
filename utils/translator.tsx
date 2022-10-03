export const translateDay = (day: string) => {
  switch (day) {
    case 'monday':
      return 'Senin';
    case 'tuesday':
      return 'Selasa';
    case 'wednesday':
      return 'Rabu';
    case 'thursday':
      return 'Kamis';
    case 'friday':
      return 'Jumat';
    case 'saturday':
      return 'Sabtu';
    case 'sunday':
      return 'Minggu';
  }
}

export const translateGender = (gender: string) => {
  if (gender === 'male') {
    return 'Laki-laki'
  } else {
    return 'Perempuan'
  }
}
