import React from 'react';
import { CalendarIcon, Clock3Icon } from 'lucide-react';
import { format } from 'date-fns';

interface DateTimePickerProps {
  date: Date | undefined;
  time: string;
  onDateChange: (date: Date) => void;
  onTimeChange: (time: string) => void;
}

export function DateTimePicker({
  date,
  time,
  onDateChange,
  onTimeChange
}: DateTimePickerProps) {
  const [showCalendar, setShowCalendar] = React.useState(false);

  // Get the current date in the format required for the min attribute
  const today = format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <button
          type="button"
          onClick={() => setShowCalendar(!showCalendar)}
          className="mt-1 w-full flex items-center justify-start px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
          {date ? format(date, 'PPP') : 'Pick a date'}
        </button>
        {showCalendar && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
            <div className="p-2">
              <input
                type="date"
                className="w-full p-2 border rounded"
                min={today} // Set the minimum date to today
                onChange={(e) => {
                  onDateChange(new Date(e.target.value));
                  setShowCalendar(false);
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Time</label>
        <div className="relative mt-1">
          <Clock3Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="time"
            value={time}
            onChange={(e) => onTimeChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
