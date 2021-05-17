import React, { Component } from 'react';
import Service from 'Utils/Service';

import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";

class CustomDropDown extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            dropdownValues : []
        }
    }
    
    componentDidMount() {
        //console.log(this.props);
        let queryId = this.props.query_id;
        let queryData = this.props.query_data;
        let formData  = {};
        formData.query_id = queryId;
        formData.query_data = queryData;
        new Service().apiCall('UtilFunction/getDataByQueryId', formData).then(response => 
            { 
                if (response.status === 200 && response.data !== '') 
                {
                    this.setState({
                        dropdownValues: response.data
                    });
                }
                //).catch(error => {
              //this.raiseLoginSignupErrorAlert('test');
            });
        
    }
    
    render() {
        const { classes } = this.props;
        return (
            <FormControl fullWidth>
                <TextField 
                 style={{textAlign:"left"}}
                    className={classes.CustomSelect}
                    id="outlined-select-currency"
                    select
                    label={this.props.heading}
                    value={this.props.value}
                    onChange={(event, child) => this.props.onSelected(event.target.value,child.props.index,child.props.id)}
                    variant="outlined">
                    {this.state.dropdownValues.map((element,index) => (
                    <MenuItem key={element.LABEL} name={element.VALUE} index={index} id={element.VALUE} value={element.LABEL} >
                        {element.LABEL}
                    </MenuItem>
                    ))}
                </TextField>
            </FormControl>
        );
    } 

}

export default CustomDropDown;
