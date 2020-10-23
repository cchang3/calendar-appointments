import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { isSameMonth, isSameDay, getDate, isEqual } from 'date-fns';
import { useSelector } from 'react-redux';
import Reminder from '../Reminder/Reminder';
import { ReminderObj } from '../../redux/actions';

const styles = (theme: Theme) => createStyles({
	dayCell: {
		display: 'flex',
		flex: '1 0 13%',
		flexDirection: 'column',
		border: '1px solid lightgray',
		cursor: 'pointer'
	},
	dayCellOutsideMonth: {
		display: 'flex',
		flex: '1 0 13%',
		flexDirection: 'column',
		border: '1px solid lightgray',
		backgroundColor: 'rgba( 211, 211, 211, 0.4 )',
		cursor: 'pointer'
	},
	dateNumber: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#000',
		backgroundColor: 'transparent'
	},
	todayAvatar: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#fff',
		backgroundColor: deepPurple[400],
	},
	focusedAvatar: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#000',
		backgroundColor: '#f1f1f1',
	},
	focusedTodayAvatar: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#fff',
		backgroundColor: deepPurple[800],
	},
	remindersContainer: {
		height: '100%'
	}
});

interface DateObj {
	date: Date
}

interface Props extends WithStyles<typeof styles>{
	calendarDate: Date,
	dateObj: DateObj,
	onDayClick: (dateObj: DateObj) => void,
	remindersReducer?:{
		reminders?: Array<ReminderObj>
	},
}
/** Updated the inface to include the reminders. Received the states of the reminders and filtered to show reminders on the correct day. Then mapped the reminders so they show up properly. Finally added a limit to the max amount of reminders shown per cell. Open cell to see all the reminders */

const CalendarDay = (props: Props) => {
	const { classes, dateObj, calendarDate, onDayClick, } = props;
	const [ focused, setFocused ] = useState(false)

	const isToday = isSameDay( dateObj.date, new Date() );
	const avatarClass = isToday && focused ? classes.focusedTodayAvatar :
		isToday ? classes.todayAvatar :
		focused ? classes.focusedAvatar :
		classes.dateNumber;
	const reminders = useSelector((state: Props) => state.remindersReducer.reminders);
	const reminderList = reminders.filter((day)=> isEqual(day.date.getDate(),  dateObj.date.getDate()) && isSameMonth(day.date, dateObj.date));
	const onMouseOver = () => setFocused(true)
	const onMouseOut = () => setFocused(false)
	

	return (
		<div
			onMouseOver={ onMouseOver }
			onMouseOut={ onMouseOut }
			onClick={ () => onDayClick( dateObj ) }
			className={
				isSameMonth( dateObj.date, calendarDate )
					? classes.dayCell
					: classes.dayCellOutsideMonth
			}
		>
			<Avatar className={ avatarClass }>{ getDate( dateObj.date ) }</Avatar>
			<div className={ classes.remindersContainer }>
				{reminderList.slice(0,4).map((reminder, i) => (					
					<Reminder key={i} date={reminder.date} color={reminder.color} message={reminder.message} />
					 )) 
				}
			</div>
		</div>
	)
}
export default withStyles( styles )( CalendarDay );
