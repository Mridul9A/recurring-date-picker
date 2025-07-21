
import { create } from 'zustand';

export type Frequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface RecurrenceState {
  frequency: Frequency;
  interval: number;
  daysOfWeek: string[];
  startDate: string;
  endDate?: string;
  setField: (field: keyof RecurrenceState, value: any) => void;
}


export const useRecurrenceStore = create<RecurrenceState>((set) => ({
  frequency: 'daily',
  interval: 1,
  daysOfWeek: [],
  startDate: '',
  endDate: undefined,
  setField: (field, value) => set({ [field]: value }),
}));
