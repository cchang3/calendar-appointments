import { isSameDay } from 'date-fns';

export const getRemindersByDay = (reminders, day) => (
	reminders.filter((reminder) => isSameDay(day, reminder.date))
	  .sort((a, b) =>b.date - a.date)
);
