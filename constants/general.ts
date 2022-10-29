import { LocaleDateOption } from '@/types/general'

export const localeDateOption: LocaleDateOption = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

export const schedulingState = ['schedule'];
export const examiningState = ['schedule', 'examine'];
export const givingRecipeState = ['schedule', 'examine', 'recipe'];
export const paymentState = ['schedule', 'examine', 'recipe', 'payment'];
export const doneState = ['schedule', 'examine', 'recipe', 'payment', 'done'];
