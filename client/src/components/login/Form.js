import React, {useState} from 'react'
import {connect} from 'react-redux';
import {ERROR_LOGIN} from '../../config/variables';
import * as actions from '../../actions'
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles'; 
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 100,
    },
    paper: {
         width: theme.spacing(100),
        height: theme.spacing(50),
        backgroundColor: grey[300]
    },
    leftbar:{
        backgroundColor: grey[50]
    },
    TextField : {
        width: theme.spacing(45),
        marginTop: 20
    },
    error: {
        color: red[400],
        marginTop: 20,
        textAlign: 'Left'
    }
}));
export const Form = ({register, login, user}) => {
    const classes = useStyles();
    const roleValues = ['publisher'];
    const [signup, setSIgnup] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        name: '',
        email: '',
        password: '',
        role: roleValues[0]
    });
    const submitInfo = () => {
        if(signup){
            register(loginInfo);
        }else{
            login(loginInfo);
        }
        setLoginInfo({
            name: '',
            email: '',
            password: '',
            role: roleValues[0]
        })
    }
    const displayHelperText = () => {
        if(user.msg === ERROR_LOGIN){
            return(
                <div className={classes.error}>
                    Invalid Login
                </div>
            )
        }

    }
    return (
        <div className={classes.root}>
            <Grid container item xs justify="center">
                <Paper elevation={3} className={classes.paper} variant="outlined">
                    <Grid container  justify='center'>
                        <Grid  item xs>
                             <img src={require("./image1.jpg")} 
                             alt='Hello' 
                             height='100%' 
                             width='90%' />
                        </Grid>
                        <Grid item xs>
                            <Typography className={classes.TextField}variant='h5'>Signup Form</Typography>
                            {signup ? <TextField 
                                onChange={e => setLoginInfo({...loginInfo, name: e.target.value})} 
                                value={loginInfo.name}
                                required 
                                className={classes.TextField} id='Username' label='Username'/>: ''}
                             <TextField 
                                value={loginInfo.email} 
                                onChange={e => setLoginInfo({...loginInfo, email: e.target.value})} 
                                required className={classes.TextField} id='email' label='email'/> 
                            <TextField 
                                value={loginInfo.password}
                                onChange={e => setLoginInfo({...loginInfo, password: e.target.value})} 
                                required 
                                className={classes.TextField} id='password' label='password'/>
                            <Button 
                            className={classes.TextField}
                            variant="contained" 
                            color={user.msg === ERROR_LOGIN ? 'secondary': 'primary'}
                            onClick = {submitInfo} >
                                {signup ? 'Signup': 'Login'}</Button>
                            {displayHelperText()}
                            <FormControlLabel
                                control={
                                    <Switch checked={signup} 
                                    onChange={() => setSIgnup(!signup)} 
                                    name="checkedA" />}
                                label="Signup"
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    )
}

const mapStateToProps = ({user}) => {
    return { user }
}
export default connect(mapStateToProps, actions)(Form);