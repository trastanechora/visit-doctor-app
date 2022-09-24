export const formatGender = (gender: string) => {
  if (gender === 'male') {
    return 'Laki-laki'
  } else {
    return 'Perempuan'
  }
}

export const formatAge = (stringBirthDate: string) => {
  const birthDate = new Date(stringBirthDate);
  const difference = Date.now() - birthDate.getTime();

  const ageDate = new Date(difference);
  const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
  return calculatedAge;
}