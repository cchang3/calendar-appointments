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

/**Empty initial state */
const reminderInitialState ={
	reminders: []
}

/** Added a new reducer to handle reminder state, it will deliver the reminders submitted from the ui **/
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

/** Added reminders to the combine reducers */
const calendarApp = combineReducers( {
	agendaStatus,
	addReminderStatus,
	remindersReducer
} )

export default calendarApp;
