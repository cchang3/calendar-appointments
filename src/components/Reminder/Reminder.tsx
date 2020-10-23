import React from 'react';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { Typography } from '@material-ui/core';

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
            {/* <Chip className={classes.chip} label={date+": "+ message} style={{backgroundColor:color}}  />  */}
            <Typography className={classes.chip}>{date+": "+ message}</Typography>
        </div>
    );
};
export default withStyles( styles )( Reminder );
