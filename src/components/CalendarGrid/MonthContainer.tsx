import React from 'react';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import CalendarDayContainer from '../CalendarDay/CalendarDayContainer';
import { ReminderObj } from '../../redux/actions';

const styles = (theme: Theme) => createStyles({
	monthContainer: {
		display: 'flex',
		width: '100%',
		flexGrow: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		border: '1px solid lightgray'
	}
});

/** Added reminder reducer to this interface */
interface Props extends WithStyles<typeof styles>{
	calendarCells: {
		date: Date
	}[],
	date: Date,
	remindersReducer?: {
		reminders?: Array <ReminderObj>
	}
}

const MonthContainer = ( props: Props ) =>
	{
	return <div className={ props.classes.monthContainer }>
		{ props.calendarCells.map( ( dateObj, i ) =>
			<CalendarDayContainer key={ i } calendarDate={ props.date } dateObj={ dateObj } />
		) }
	</div>
	}

export default withStyles( styles )( MonthContainer );
