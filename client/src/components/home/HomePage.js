import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import ListCamps from './ListCamps'
import {makeStyles} from '@material-ui/core/styles'; 
import * as actions from '../../actions';
/*
    Homepage Component
*/
const style = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(10)
    }
}))
const HomePage = ({fetchBootcamps}) => {
    useEffect(() => {
        fetchBootcamps()
    }, [])
    const classes = style();
    return (
        <div className = {classes.root}>
            <ListCamps/>
        </div>
    )
}

export default connect(null, actions)(HomePage);