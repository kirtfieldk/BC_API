import React from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles';
import {NavLink} from 'react-router-dom'; 
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: 'black',
    },
    title: {
        fontSize: '1.6rem'
    },
    description:{
        marginTop: '5px'
    }, 
    link:{
        textDecoration: 'None',
        color: 'black'
    }
}));
const ListCamps = ({allCamps}) => {
    console.log(allCamps)
    const classes = styles();
    const renderList = () =>{
        return allCamps.map(el => {
            return(
                <div key ={el.name}>
                    <NavLink className={classes.link} to={`/camp/${el._id}`}>
                        <div className={classes.title}>{el.name}</div>
                    </NavLink>    
                    <div className={classes.description}>{el.description}</div>
                    <div>Career Path: {el.careers.map(e => e)}</div>
                </div>
            )
        })
    }
    return (
        <div className = {classes.root}>
            <Grid container alignItems="stretch">
                <Grid item xs={12} sm={8}>
                    <Paper className={classes.paper}>{renderList()}</Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper}>
                        something
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
const mapStateToProps = ({ allCamps }) =>{
    return {allCamps}
}
export default connect(mapStateToProps)(ListCamps);
