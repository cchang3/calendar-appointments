import React from 'react';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

/** This is a brand new component made for generating reminders. I needed it to make it show up in both the calendar and calendar day modules. The css is to make sure the overflow is working properly. Decided to use a typography element to display the information since it was more responsive. */

const styles = (theme: Theme) => createStyles({
    root:{
        display: 'relative',
        margin: '0.1em 0.5em',
        borderRadius: '0.5em',
        maxHeight: '1.3em'
    },
    chip:{
        marginLeft: '0.3em',
        fontSize: '14px',
        padding: '0.1em 0em',
        overflow: 'hidden',
        maxHeight: '1.3em'
    }
});

interface Props extends WithStyles<typeof styles>{
	date?: Date,
	color?: string,
	message?: string
}

const Reminder = (props: Props) => {
    const { classes, date, message, color } = props;
    return (
        <div className={classes.root} style={{backgroundColor:color}} >
            <Typography className={classes.chip}>{date+": "+ message}</Typography>
        </div>
    );
};
export default withStyles( styles )( Reminder );
