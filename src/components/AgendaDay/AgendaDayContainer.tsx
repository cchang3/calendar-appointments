import { connect } from 'react-redux';
import AgendaDay from './AgendaDay';
import { closeAgenda } from '../../redux/actions';

interface Props {}

interface reminderArr {
	date: Date,
	color: string,
	message: string
}

interface State {
	agendaStatus: {
		isOpen: boolean,
		date: Date
	},
	remindersReducer: {
		reminders: Array<reminderArr>
	}
}
/** Added Reminder state */

const mapStateToProps = ( state: State, ownProps: Props ) => {
	const { agendaStatus, remindersReducer } = state;
	return { agendaStatus, remindersReducer };
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		onClose: () => {
			dispatch( closeAgenda() );
		}
	}
}

const AgendaDayContainer = connect( mapStateToProps, mapDispatchToProps )( AgendaDay );

export default AgendaDayContainer;
