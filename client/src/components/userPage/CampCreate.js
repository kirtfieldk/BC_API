import React, {useState} from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles';
import * as actions from '../../actions'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import green from '@material-ui/core/colors/green'
import grey from '@material-ui/core/colors/grey'
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import Checkbox from '@material-ui/core/Checkbox'
import InputLabel from '@material-ui/core/InputLabel'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
const NAME ='name'
const DESCRIPTION = 'description'
const ADDRESS = 'address'
const careers = [
        'Web Development',
        'Mobile Development',
        'UI/UX',
        'Data Science',
        'Business',
        'Other'
]
const styles = makeStyles(theme => ({
    title: {
        
        padding: theme.spacing(1),
        backgroundColor: green[600],
        textAlign: 'center'
    }, 
    body: {
        backgroundColor: grey[200],
        height: theme.spacing(60)
    },
    inputField: {
        marginLeft: 5,
        // paddingTop: theme.spacing(),
        width: theme.spacing(38)
        
    }
}))
const CampCreate = () => {
    const classes = styles()
    const [campInfo, setCampInfo] = useState({
        name: '', 
        description: '', 
        address: '', 
        careers: [],
        housing: false,
        jobAssistance: false,
        jobGuarantee: false
    });
    const valueState = [NAME, DESCRIPTION, ADDRESS]
    const renderTextFields = () => {
        return valueState.map(e =>{
            return <TextField 
                key={e}
                className={classes.inputField} 
                color='primary'
                variant='outlined' 
                margin='dense' 
                multiline={true}
                onChange={e => updateState(e.target.value, e)}
                required
                label={e} 
            />
        })
    }
    console.log(campInfo)
    const updateState = (value, field) =>{
        switch(field){
            case NAME:
                setCampInfo({...campInfo, name: value})
            case DESCRIPTION:
                setCampInfo({...campInfo, description: value})
            case ADDRESS:
                setCampInfo({...campInfo, address: value})
            default:
                return
        }
    }
    const handleChange = (e) => {
        setCampInfo({...campInfo, careers: e.target.value})
    }
    return (
        <Paper>
            <Typography variant='h5' className={classes.title}>
                Create Camp!
            </Typography>
            <div className={classes.body}> 
                <div className={classes.inputField}>
                    {renderTextFields()}
                </div>
                <InputLabel>Careers</InputLabel>
                <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={campInfo.careers}
                    onChange={handleChange}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                    // MenuProps={MenuProps}
                    >
                    {careers.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={campInfo.careers.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </div>
            <Button color='primary'>Submit</Button>
        </Paper>
    )
}
export default connect(null,actions)(CampCreate)
