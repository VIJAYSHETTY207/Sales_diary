import React from "react";
import 'date-fns';

import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import SweetAlert from "react-bootstrap-sweetalert";
import InputAdornment from '@material-ui/core/InputAdornment';
import MButton from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Remove from "@material-ui/icons/Remove";  
import Add from "@material-ui/icons/Add";  
import Chip from '@material-ui/core/Chip';
import CustomSnackbarContent from "components/Snackbar/CustomSnackbarContent.js";
// @material-ui/icons
import MailOutline from "@material-ui/icons/MailOutline";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import Avatar from '@material-ui/core/Avatar';
// import AvatarGroup from '@material-ui/lab/AvatarGroup';
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// import Table from "components/Table/Table.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";


// @material-ui/core components
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from "@material-ui/core/Checkbox";
import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { withStyles } from '@material-ui/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Service from 'Utils/Service';
import DateFnsUtils from '@date-io/date-fns';
import "assets/External-Css/leads.css";
import MenuItem from '@material-ui/core/MenuItem';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';  
const fileInput = React.createRef();
const panelStyles = { 
  panelClass: {
    zIndex:999
  },
  inputMargin: { 
    marginTop:15
  },
  tabs: {
    borderRight:'1px solid #ddd', 
  },
  imageinput: {
    display: 'none',
  },
  imageButton: {
    padding: '5px 15px !important',
  },
 
};

const pageStyles = {...styles, ...panelStyles }
const useStyles = makeStyles(pageStyles);

class Dashboard extends React.Component 
{
  constructor(props) 
  {
    super(props);
    this.state = {
      activeAccordion:0,
      edit_institute:false,
      activeStep:0,
      task_visibility:'',
      steps:[1,2,3],
      public:'',
      billable:'',
      selectedFile:null, 
      selectedFileName:'',
      imageid:'',  
      task_priority:'',
      priority:'',
      repeat_every:'',
      repeat_to:'',
      insert_template:'',
    }
  }
  
  componentDidMount() {
  }
  handleStep = (index) => {
    this.setState({activeStep:index});
  }
  
  setPostData = (name,value) => {
    this.setState({ [name]: value, formChanged:true });
  }
  
  handleTaskVisibility = (Index,inputName,Value) => {
    let lTaskVisibility = this.state.task_visibility;
    lTaskVisibility[Index][inputName] = Value;
    this.setState({task_visibility:lTaskVisibility});
  }
  handleTaskPriority =(Value)=>{
    let priority = this.state.task_priority;
    priority = Value;
    this.setState({task_priority:priority});
  }

  render(){
  const { classes } = this.props;

  return (
    <div>
        {this.state.alert}
            <GridContainer  justify="center" alignItems="center">              
                <GridItem xs={12} sm={12} md={8} lg={8}>
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose"><span class="material-icons">note_add</span></CardIcon>
                            <h4 className={classes.cardIconTitle}>New Task</h4>
                        </CardHeader>
                        <CardBody>
                            <div>
                                <GridContainer>
                                    <GridItem  xs={6} sm={6} md={2} lg={2} className={classes.inputMargin}>
                                        <FormControlLabel
                                        control={
                                            <Checkbox
                                            value={this.task_visibility}
                                            onChange={(event) => this.handleTaskVisibility("public",'yes')}
                                            color="primary"
                                            />
                                        }
                                        label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Public</span>}
                                        />
                                    </GridItem>
                                    <GridItem  xs={6} sm={6} md={2} lg={2} className={classes.inputMargin}>
                                        <FormControlLabel
                                        control={
                                            <Checkbox
                                            value={this.task_visibility}
                                            onChange={(event) => this.handleTaskVisibility("billable",'yes')}
                                            color="primary"
                                            />
                                        }
                                        label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Billable</span>}
                                        />
                                    </GridItem>
                                    <GridItem  xs={6} sm={6} md={2} lg={8} className={classes.inputMargin}>
                                        <FormControl fullWidth align="right">
                                        <input
                                            className={classes.imageinput}
                                            id="contained-button-file" 
                                            type="file"
                                            onChange={(e) => {this.handleImageChange(e) }} ref={fileInput}
                                        />
                                        <label htmlFor="contained-button-file">
                                            <Button className={classes.imageButton} onClick={()=> this.setState({imageid:''})} size="small" variant="contained"  component="span" startIcon={<CloudUploadIcon />}>
                                            {this.state.selectedFileName !== '' &&<div>Change Attachment</div>}
                                            {this.state.selectedFileName === '' &&<div>Upload Attachment</div>}
                                            </Button>
                                        </label>               
                                        {this.state.selectedFileName}
                                        </FormControl>
                                    </GridItem>
                                </GridContainer>
                                <GridContainer >  
                                    <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                                        <FormControl fullWidth>
                                            <TextField 
                                            inputProps={{
                                                autoComplete: 'off'
                                            }}
                                            id="document-type"   
                                            value={this.state.trust_name}
                                            label="Subject" 
                                            type="search" 
                                            onChange={(event) => this.setPostData("trust_name",event.target.value)}
                                            inputRef={this.textInput} 
                                            variant="outlined" />                   
                                        </FormControl>
                                    </GridItem> 
                                    <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                                        <FormControl fullWidth>
                                            <TextField 
                                            inputProps={{
                                                autoComplete: 'off',maxLength:6
                                            }}
                                            id="document-type"   
                                            value={this.state.pincode}
                                            label="Hourly Rate" 
                                            type="search" 
                                            onChange={(event) => { this.setPostData("pincode",event.target.value); this.getAddressInfo(event.target.value,"pincode"); }}
                                            onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }} 
                                            inputRef={this.textInput} 
                                            variant="outlined" />                   
                                        </FormControl>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6} >
                                        <FormControl fullWidth>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                            InputLabelProps={{ shrink: true }}
                                            margin="normal"
                                            autoOk={true}
                                            value={this.state.meetingDate}
                                            shrink={true}
                                            id="date-picker-dialog"
                                            label="Start Date"
                                            inputVariant="outlined"
                                            format="dd/MM/yyyy"
                                            onChange={this.handleDateChange}   
                                            KeyboardButtonProps={{
                                            'aria-label': 'change date', 
                                            }} 
                                            />
                                            </MuiPickersUtilsProvider>        
                                        </FormControl>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <FormControl fullWidth>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                            margin="normal"
                                            autoOk={true}
                                            value={this.state.meetingDate}
                                            shrink={true}
                                            id="date-picker-dialog"
                                            label="Due Date"
                                            inputVariant="outlined"
                                            format="dd/MM/yyyy"
                                            onChange={this.handleDateChange}   
                                            KeyboardButtonProps={{
                                            'aria-label': 'change date', 
                                            }} 
                                            />
                                            </MuiPickersUtilsProvider>      
                                        </FormControl>
                                    </GridItem>  
                                    <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                                        <FormControl fullWidth>
                                        <TextField
                                            className="m-2"
                                            id="outlined-select-currency"
                                            select
                                            label="Priority" 
                                            options={this.type_expenses}
                                            onChange={(event) => this.setPostData("priority",event.target.value)}
                                            variant="outlined">
                                            <MenuItem value='Low'>Low</MenuItem>
                                            <MenuItem value='Medium'>Medium</MenuItem>
                                            <MenuItem value='High'>High</MenuItem>
                                            <MenuItem value='Urgent'>Urgent</MenuItem>
                                        </TextField>           
                                        </FormControl>
                                    </GridItem>  
                                    <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                                    <FormControl fullWidth>
                                    <TextField
                                            className="m-2"
                                            id="outlined-select-currency"
                                            select
                                            label="Repeat every"  
                                            options={this.type_expenses}
                                            onChange={(event) => this.setPostData("repeat_every",event.target.value)}
                                            variant="outlined">
                                              <MenuItem value='Week'>Week</MenuItem>
                                            <MenuItem value='2Weeks'>2 Weeks</MenuItem>
                                            <MenuItem value='1Month'>1 Month</MenuItem>
                                            <MenuItem value='2Months'>2 Months</MenuItem>
                                            <MenuItem value='3Months'>3 Months</MenuItem>
                                            <MenuItem value='6Months'>6 Months</MenuItem>
                                            <MenuItem value='1Year'>1 Year</MenuItem>
                                            <MenuItem value='Custom'>Custom</MenuItem>
                                        </TextField>    
                                    </FormControl>
                                    </GridItem> 
                                    <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                                        <FormControl fullWidth>
                                        <TextField
                                            className="m-2"
                                            id="outlined-select-currency"
                                            select
                                            label="Repeat To"  
                                            options={this.type_expenses}
                                            onChange={(event) => this.setPostData("repeat_to",event.target.value)}
                                            variant="outlined">
                                            <MenuItem value='Project'>Project</MenuItem>
                                            <MenuItem value='Invoice'>Invoice</MenuItem>
                                            <MenuItem value='Customer'>Customer</MenuItem>
                                            <MenuItem value='Estimate'>Estimate</MenuItem>
                                            <MenuItem value='Contract'>Contract</MenuItem>
                                            <MenuItem value='Ticket'>Ticket</MenuItem>
                                            <MenuItem value='Expenses'>Expenses</MenuItem>
                                            <MenuItem value='Lead'>Lead</MenuItem>
                                            <MenuItem value='Proposal'>Proposal</MenuItem>
                                        </TextField>    
                                        </FormControl>
                                    </GridItem> 
                                    <GridItem xs={12} sm={12} md={12} className={classes.inputMargin}>
                                        <FormControl fullWidth>
                                            <TextField 
                                            select
                                            id="document-type"   
                                            value={this.state.state}
                                            label="Insert Checklist Templates" 
                                            type="search"
                                            multiple 
                                            onChange={(event) => this.setPostData("insert_template",event.target.value)}
                                            inputRef={this.textInput} 
                                            variant="outlined" >  
                                            <MenuItem value='Project'>Project</MenuItem>
                                            <MenuItem value='Invoice'>Invoice</MenuItem>
                                            <MenuItem value='Customer'>Customer</MenuItem>
                                            <MenuItem value='Estimate'>Estimate</MenuItem>
                                            <MenuItem value='Contract'>Contract</MenuItem>
                                            <MenuItem value='Ticket'>Ticket</MenuItem>
                                            <MenuItem value='Expenses'>Expenses</MenuItem>
                                            <MenuItem value='Lead'>Lead</MenuItem>
                                            <MenuItem value='Proposal'>Proposal</MenuItem>
                                            </TextField>                
                                        </FormControl>
                                    </GridItem>
                                    
                                    <GridItem xs={12} sm={12} md={12}  className={classes.inputMargin} >
                                        <FormControl fullWidth>
                                        <TextField 
                                        disabled={false} 
                                        multiline="true"
                                        id="document-type"
                                        type="search"
                                        variant="outlined"
                                        label="Descriptions" />               
                                        </FormControl>
                                    </GridItem>  
                                </GridContainer>  
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12} style={{textAlign:'right',marginTop:'10px'}} >                
                                        <Chip onClick={()=>{this.setState({activeStep:1}); this.scrollToTop()}}
                                            avatar={<Avatar>2</Avatar>}
                                            label="Institute details"
                                            clickable
                                            color="primary"
                                            onDelete={()=>{this.setState({activeStep:2}); this.scrollToTop()}}
                                            deleteIcon={<KeyboardArrowRight />}
                                            variant="outlined"
                                        />
                                    </GridItem>
                                </GridContainer>
                            </div>
                    
                        </CardBody>
                    </Card>
                </GridItem>       
            </GridContainer>
        <SlidingPane 
            closeIcon={<div>   
                <Button
                justIcon
                round
                color="white"
                type="custom"
                style={{color:'black'}}
                ><KeyboardArrowLeft style={{width:36,height:36}} className={classes.sidebarMiniIcon} />
                </Button></div>} 
                className={classes.ModalStyle2} 
                overlayClassName={classes.panelClass}
                isOpen={ this.state.selectPOPanel }
                title='Select Address'
                onRequestClose={ () => {
                    this.setState({ selectPOPanel:false });
                } }>   
        </SlidingPane>                 	
    </div>
    );
  }
}
export default withStyles(pageStyles)(Dashboard)
