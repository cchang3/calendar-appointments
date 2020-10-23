import { combineReducers } from 'redux';
import { 
	OPEN_AGENDA,
	CLOSE_AGENDA,
	OPEN_ADD_REMINDER,
	CLOSE_ADD_REMINDER,
	SAVE_REMINDER
} from './actions';

const initialAgendaState = {
	isOpen: false,
	date: null
}

const initialAddReminderState = {
	isOpen: false
}

const reminderInitialState ={
	reminders: []
}

const remindersReducer = (state = reminderInitialState, action: any) => {
	switch (action.type) {
		case SAVE_REMINDER:
			return {
				...state,
				reminders:[
					...state.reminders, action.payload] 
			}
		default: return state;
			
	}
};

function agendaStatus( state = initialAgendaState , action: any ) {
	switch( action.type ) {
		case OPEN_AGENDA:
			return {
				isOpen: true,
				date: action.dateObj.date,
			}
		case CLOSE_AGENDA:
			return {
				isOpen: false,
				date: null,
			}
		default: return state;
	}
}

function addReminderStatus( state = initialAddReminderState, action: any ) {
	switch( action.type ) {
		case OPEN_ADD_REMINDER:
			return {
				isOpen: true,
			}
		case CLOSE_ADD_REMINDER:
			return {
				isOpen: false,
			}
		default: return state;
	}
}

const calendarApp = combineReducers( {
	agendaStatus,
	addReminderStatus,
	remindersReducer
} )

export type RootState = ReturnType<typeof calendarApp>;

export default calendarApp;
