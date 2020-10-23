
// action types
export const OPEN_AGENDA = 'OPEN_AGENDA';
export const CLOSE_AGENDA = 'CLOSE_AGENDA';
export const OPEN_ADD_REMINDER = 'OPEN_ADD_REMINDER';
export const CLOSE_ADD_REMINDER = 'CLOSE_ADD_REMINDER';
export const SAVE_REMINDER = 'SAVE_REMINDER';

/**added save reminder type and interface for reminderObj containing information received from ui */

interface DateObj {
	date: Date
}

export interface ReminderObj {
	date: Date,
	color?: string,
	message: string
}

// action creators
export function openAgenda( dateObj: DateObj ) {
	return { type: OPEN_AGENDA, dateObj };
}

export function closeAgenda() {
	return { type: CLOSE_AGENDA };
}

export function openAddReminder( reminder?: any ) {
	return { type: OPEN_ADD_REMINDER, reminder };
}

export function closeAddReminder() {
	return { type: CLOSE_ADD_REMINDER };
}

/** Added new action to save data into store */
export function saveReminder(reminderObj: ReminderObj) {
	return { type: SAVE_REMINDER, payload: reminderObj};
}

