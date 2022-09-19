export const PATIENT_LAST_COLUMN = 'K'

export const genderList = [
  {
    text: 'Laki-laki',
    value: 'male',
  },
  {
    text: 'Perempuan',
    value: 'female'
  }
]

export const maritalStatusList = [
  {
    text: 'Lajang',
    value: 'single'
  },
  {
    text: 'Menikah',
    value: 'married'
  }
]

export const initialFilterState = {
  searchString: '',
  searchType: '',
  gender: '',
  genderType: 'D',
  status: '',
  maritalStatusType: 'F'
}
