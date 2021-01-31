import React, {useEffect} from 'react'
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {makeStyles} from '@material-ui/core/styles'; 
import {NavLink} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import gray from '@material-ui/core/colors/grey'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    bgColor: {
        backgroundColor: green[600]
    },
    title: {
        flexGrow: 1,
  },
  btn: {
      textDecoration: 'none',
      color: gray[900],
      fontSize: '12'
  },
  homeLink :{
      textDecoration: 'none',
      color: gray[900],
  }
}))
const Banner = ({currentUser, user, getUser}) => {
    const classes = useStyles();
    useEffect(() => {
        getUser();
    }, [user])
    console.log(currentUser)
    return (
        <div>
            <AppBar className={classes.bgColor}>
                <Toolbar>
                        <Typography variant='h4' className={classes.title}>
                            <NavLink className={classes.homeLink} to ='/'>
                                Camps of True Power
                            </NavLink>
                        </Typography>
                    <Button className = {classes.btn} color="inherit">
                        <NavLink className ={classes.btn}to ='/login'>
                            {currentUser ? currentUser.name : 'Login'}
                        </NavLink>
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

const mapStateToProps = ({currentUser, user}) => {
    return {
        currentUser, user
    }
}


export default connect(mapStateToProps, actions)(Banner);
