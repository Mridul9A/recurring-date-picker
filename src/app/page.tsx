'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRecurrenceStore } from './store/recurrenceStore';
import { generateRecurringDates } from './utils/recurrenceUtils';

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Recurring Date Picker
        </h1>

        {/* Frequency */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Frequency
          </label>
          <select
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
            value={recurrence.frequency}
            onChange={(e) => recurrence.setField('frequency', e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {/* Interval */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Interval
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
            value={recurrence.interval}
            onChange={(e) => recurrence.setField('interval', parseInt(e.target.value))}
            min={1}
          />
        </div>

        {/* Days of Week (for weekly) */}
        {recurrence.frequency === 'weekly' && (
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Days
            </label>
            <div className="flex flex-wrap gap-2">
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(
                (day) => (
                  <label
                    key={day}
                    className="flex items-center gap-1 text-sm text-gray-800 dark:text-gray-200"
                  >
                    <input
                      type="checkbox"
                      checked={recurrence.daysOfWeek.includes(day)}
                      onChange={(e) => {
                        const updatedDays = e.target.checked
                          ? [...recurrence.daysOfWeek, day]
                          : recurrence.daysOfWeek.filter((d) => d !== day);
                        recurrence.setField('daysOfWeek', updatedDays);
                      }}
                    />
                    {day}
                  </label>
                )
              )}
            </div>
          </div>
        )}

        {/* Start Date */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Start Date
          </label>
          <DatePicker
            selected={recurrence.startDate ? new Date(recurrence.startDate) : null}
            onChange={(date: Date | null) => {
              if (date)
                recurrence.setField('startDate', date.toISOString().split('T')[0]);
            }}
            dateFormat="yyyy-MM-dd"
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
            placeholderText="Select start date"
          />
        </div>

        {/* End Date */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            End Date (optional)
          </label>
          <DatePicker
            selected={recurrence.endDate ? new Date(recurrence.endDate) : null}
            onChange={(date: Date | null) => {
              recurrence.setField('endDate', date ? date.toISOString().split('T')[0] : '');
            }}
            dateFormat="yyyy-MM-dd"
            isClearable
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
            placeholderText="Select end date (optional)"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
        >
          Generate Recurring Dates
        </button>

        {/* Preview Dates */}
        {dates.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
              Preview Dates:
            </h2>
            <ul className="list-disc pl-6 text-sm text-gray-700 dark:text-gray-300">
              {dates.map((date, idx) => (
                <li key={idx}>{date}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
