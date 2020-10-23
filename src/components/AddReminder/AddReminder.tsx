import React from 'react';
import {useDispatch } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { WithStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
  } from '@material-ui/pickers';
  import {saveReminder} from '../../redux/actions';

const styles = (theme: Theme) => createStyles({
	addReminderFormContainer: {
		minHeight: '250px',
		marginTop: '10px',
		display: 'flex',
		flexDirection: 'column'
	},
	closeButton: {
		position: 'absolute',
		right: '10px',
		top: '10px'
	},
	reminderForm:{
		display: 'flex',
		flexDirection: 'column',
		'& > div':{
			paddingTop: '1em',
		}
	},
	row:{
		display: 'inline-flex',
		paddingBottom: '1em',
		alignItems:'center'
	},
	second:{
		paddingLeft: '1em'
	},
	select:{
		minWidth:120,
	},
	textField: {
		width: '100%'
	  },
	textArea: {
		width: '100%',

	},
	submit:{
		alignSelf: 'flex-end'
	}
});

interface Props extends WithStyles<typeof styles>{
	isOpen: boolean,
	onClose: () => void
}


const AddReminder = (props: Props) => {
		const { classes, isOpen, onClose } = props; //handleSubmit,
		const [color, setColor] = React.useState('');
		const [selectedDate, setSelectedDate] = React.useState<Date | null>(
			new Date(),
		  );
		const dispatch = useDispatch();
		const [message, setMessage] = React.useState('');

		const handleSelectChange = (event) => {
			setColor(event.target.value);
		};
		const handleDateChange = (date: Date | null) => {
			setSelectedDate(date);
		};
		
		const handleMessageChange = (event) =>{
			setMessage(event.target.value);
		}

		const handleSubmit = (event)=>{
			event.preventDefault();
			dispatch(saveReminder({date: selectedDate, color:color, message: message}))
			
			onClose();
			
		};

		// const handleSubmit = useCallback(() => {
		// 	preventDefault();
		// 	alert('Reminder saved ' + color + selectedDate + message);
		// 	saveReminder({color: color, date: selectedDate, message: message});
		// 	closeAddReminder();
		// }, [ color, selectedDate, message ]);

		return (
			<Dialog
				open={ isOpen }
				onClose={onClose}
				aria-labelledby='form-dialog-title'
				fullWidth={ true }
				maxWidth='md'
			>
				<DialogTitle id='form-dialog-title'>
					Add Reminder
					<IconButton aria-label='Close' className={ classes.closeButton } onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<Divider light />
				<DialogContent className={ classes.addReminderFormContainer }>
					<form onSubmit={handleSubmit}>
						<Grid container className={classes.reminderForm}>
							<Grid container className={classes.row}>
								<Grid item>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardDatePicker
										margin="normal"
										id="date-picker-dialog"
										label="Date picker dialog"
										format="MM/dd/yyyy"
										value={selectedDate}
										onChange={handleDateChange}
										KeyboardButtonProps={{
											'aria-label': 'change date',
										}}
										/>
										<KeyboardTimePicker
										margin="normal"
										id="time-picker"
										label="Time picker"
										className={classes.second}
										value={selectedDate}
										onChange={handleDateChange}
										KeyboardButtonProps={{
											'aria-label': 'change time',
										}}
										/>
									</MuiPickersUtilsProvider>
								</Grid>
								<Grid item className={classes.second}>
									<FormControl variant="filled" className={classes.select} >
										<InputLabel id="demo-simple-select-filled-label">Color</InputLabel>
										<Select
										id="demo-simple-select-filled"
										value={color}
										onChange={handleSelectChange}
										>
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										<MenuItem value={'#E99188'}>Salmon</MenuItem>
										<MenuItem value={'#AACDEB'}>Periwinkle</MenuItem>
										<MenuItem value={'#88E9C3'}>Mint</MenuItem>
										</Select>
									</FormControl>
							 	</Grid>
							 </Grid>
							<Grid item>
								<TextField
								id="outlined-multiline-static"
								label="Text (max: 30 characters)"
								multiline
								rows={2}
								variant="outlined"
								className={classes.textArea}
								inputProps={{ maxLength:30}}
								value={message}
								onChange={handleMessageChange}
								/>
							</Grid>
							<Grid item className={classes.submit}>
								<Button variant='contained' color='primary' type='submit'>Add</Button>
							</Grid>
						</Grid>
					</form>
				</DialogContent>
			</Dialog>
		);
}

export default withStyles(styles)( AddReminder );
