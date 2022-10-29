export const statusMapper = (status: string) => {
  switch (status) {
    case 'schedule':
      return ['schedule'];
    case 'examine':
      return ['schedule', 'examine'];
    case 'recipe':
      return ['schedule', 'examine', 'recipe'];
    case 'payment':
      return ['schedule', 'examine', 'recipe', 'payment'];
    case 'done':
      return ['schedule', 'examine', 'recipe', 'payment', 'done'];
    default:
      return ['']
  }
}