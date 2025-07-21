'use client';

import { useRecurrenceStore } from '../store/recurrenceStore';
import { generateRecurringDates } from '../utils/recurrenceUtils';
import { useState } from 'react';

export default function RecurringDatePickerPage() {
  const recurrence = useRecurrenceStore();
  const [dates, setDates] = useState<string[]>([]);

  const handleGenerate = () => {
    const generated = generateRecurringDates(
      recurrence.startDate,
      recurrence.endDate,
      recurrence.frequency,
      recurrence.interval,
      recurrence.daysOfWeek
    );
    setDates(generated);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Recurring Date Picker</h1>

      <label className="block mb-2">Frequency</label>
      <select
        className="border p-2 mb-4 w-full"
        value={recurrence.frequency}
        onChange={(e) => recurrence.setField('frequency', e.target.value)}
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      <label className="block mb-2">Interval</label>
      <input
        type="number"
        className="border p-2 mb-4 w-full"
        value={recurrence.interval}
        onChange={(e) => recurrence.setField('interval', parseInt(e.target.value))}
      />

      {recurrence.frequency === 'weekly' && (
        <div className="mb-4">
          <label className="block mb-2">Select Days</label>
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
            <label key={day} className="mr-2">
              <input
                type="checkbox"
                checked={recurrence.daysOfWeek.includes(day)}
                onChange={(e) => {
                  const newDays = e.target.checked
                    ? [...recurrence.daysOfWeek, day]
                    : recurrence.daysOfWeek.filter(d => d !== day);
                  recurrence.setField('daysOfWeek', newDays);
                }}
              /> {day}
            </label>
          ))}
        </div>
      )}

      <label className="block mb-2">Start Date</label>
      <input
        type="date"
        className="border p-2 mb-4 w-full"
        value={recurrence.startDate}
        onChange={(e) => recurrence.setField('startDate', e.target.value)}
      />

      <label className="block mb-2">End Date (optional)</label>
      <input
        type="date"
        className="border p-2 mb-4 w-full"
        value={recurrence.endDate || ''}
        onChange={(e) => recurrence.setField('endDate', e.target.value)}
      />

      <button
        onClick={handleGenerate}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Generate Recurring Dates
      </button>

      {dates.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Preview Dates:</h2>
          <ul className="list-disc pl-6">
            {dates.map((date, idx) => (
              <li key={idx}>{date}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
