import { isSameDay } from 'date-fns';

/** this function compares the date of the reminder and the day and returns the relevant reminders */
export const getRemindersByDay = (reminders, day) => (
	reminders.filter((reminder) => isSameDay(day, reminder.date))
	  .sort((a, b) =>b.date - a.date)
);
