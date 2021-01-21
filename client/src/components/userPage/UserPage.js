import React from 'react'
import CampCreate from './CampCreate'
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
const styles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(10)
    }
}))
const UserPage = ({match}) => {
    console.log(match.params.id)
    const classes = styles()
    return (
        <div className={classes.root}>
            <Grid container >
                <Grid item xs={12} sm={8}>
                    SPace
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CampCreate/>
                </Grid>
            </Grid>
        </div>
    )
}

export default UserPage
