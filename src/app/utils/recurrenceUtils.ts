import { addDays, addWeeks, addMonths, addYears, format, isBefore, parseISO } from 'date-fns';
import { Frequency } from '../store/recurrenceStore';

export function generateRecurringDates(
  start: string,
  end: string | undefined,
  frequency: Frequency,
  interval: number,
  daysOfWeek: string[] = []
): string[] {
  const startDate = parseISO(start);
  const endDate = end ? parseISO(end) : addYears(startDate, 1);
  let dates: string[] = [];
  let current = startDate;

  while (isBefore(current, endDate)) {
    if (frequency === 'daily') {
      dates.push(format(current, 'yyyy-MM-dd'));
      current = addDays(current, interval);
    } else if (frequency === 'weekly') {
      const weekday = format(current, 'EEEE');
      if (daysOfWeek.includes(weekday)) {
        dates.push(format(current, 'yyyy-MM-dd'));
      }
      current = addDays(current, 1);
    } else if (frequency === 'monthly') {
      dates.push(format(current, 'yyyy-MM-dd'));
      current = addMonths(current, interval);
    } else if (frequency === 'yearly') {
      dates.push(format(current, 'yyyy-MM-dd'));
      current = addYears(current, interval);
    }
  }

  return dates;
}