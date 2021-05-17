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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';  
 //redux functions
 import CheckAccess from "components/CheckAccess.js";
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToPros } from '../../../Utils/MapStateDispatchProps.js'
const fileInput = React.createRef();

const panelStyles = {
  panelClass: {
    zIndex:999
  },
  notificationModalStyle: {
    width:'40% !important',
    backgroundColor:'#ddd'
  },
  ModalStyle: {
    width:'100% !important',
    backgroundColor:'#ddd'
  },
  ModalStyle2: {
    width:'40% !important',
    backgroundColor:'#ddd'
  },
  ModalStyle3: {
    width:'60% !important',
    backgroundColor:'#ddd'
  },
  inputMargin: {
    marginTop:15
  },
  inputText: {
    color: 'rgba(0,0,0,0.87)',
    fontSize: '16px',
    letterSpacing: '0.5px',
    lineHeight: '28px',
    textAlign: 'center',
  },
  imageinput: {
    display: 'none',
  },
  imageButton: {
    padding: '5px 15px !important',
  },
  imageButton:{
    
  }
};

const pageStyles = {...styles, ...panelStyles }
const useStyles = makeStyles(pageStyles);

class Dashboard extends React.Component 
{
  constructor(props) {
    super(props);
    this.state = {
        type_expenses:'',
        location_from:'',
        location_to:'',
        kms:'',
        amount_rs:'',
        selectedFile:null, 
        selectedFileName:'',
        imageid:'',     
        institute_taluk:'', 
        institute_district:'', 
        institute_state:'', 
        institute_contact_number_one:'', 
        institute_contact_number_two:'', 
        institute_mail_id:'', 
        tranport_expenses:[{ type_expenses:'',types_transportation:'',vehicle_type:'', person_name:'', location_from:'', location_to:'', kms:'', amount_rs:''}],
        other_expenses:[{note:'',person_name:'',amount_rs:''}],
        Institute_contact_person:[{ person_name:'', designation:'', approver:'', decision_maker:'', influencer:'', evaluator_recommender:'', gatekeeper_blocker:'', users:'', champion:'', mentor:'', contact_number_one:'', contact_number_two:'', mail_id:''}],    
        activeStep:0,
        steps:[1,2,3,4],
        parameterarray:[],
        pincodesArr:[],
        dateOfBirth: new Date(),
        institute_same_trust: 'no',
        addressType: '',
        client_id: '',
        created_by_id: '1',
        created_by: 'Karthick',
        alert: null,
    }
  }
 
  handleexpensesvalue =(Index,Name,Value)=>{
    let newarray = this.state.tranport_expenses;
    newarray[Index][Name] = Value;
    this.setState({tranport_expenses:newarray});
  }

  handleEYear = (date) => {
    this.setState({ month_closure: date, formChanged:true })
  };

  scrollToTop() {
    const container = document.querySelector('.slide-pane__content');  
    container.scrollTo({top: 0, left: 0, behavior: 'smooth' });
  }
  
  handleStep = (index) => {
    this.setState({activeStep:index});
  }

  //start of error display function
  raiseLoginSignupErrorAlert = (modalType) => {
    this.setState({
      alert: (
        <SweetAlert
          danger
          confirmBtnBsStyle="danger"
          title="Something bad happened!!!"
          onConfirm={() => {
            this.setState({ alert: null });
          }}
        > We are regretting for it
        </SweetAlert>
      ),
    });
  };
// end of error display function
 
  getAddressInfo = (pincode, type) => {
    if(pincode && pincode.length == 6){
      const postData = {
        pincode:pincode
      };
      new Service().apiCall('Pincode/GetPincode',postData).then(response =>
      {
        if (response.data!='') 
        {      
          let newArr = response.data.filter(v=>v.delivery == "Delivery");
          console.log(newArr);
          this.setState({pincodesArr:newArr, selectPOPanel:true, addressType:type})
        }
        else{
          this.setState({pincodesArr:[]})
        }
      }).catch(error => {
        alert("error.response.data.message");
      });
    }
  }

  fillAddress = (po,taluk,district,state) => {
    if(this.state.addressType == "pincode"){
      this.setState({post_office:po,taluk:taluk,district:district,state:state, selectPOPanel:false});
    }
    else{
      this.setState({institute_post_office:po,institute_taluk:taluk,institute_district:district,institute_state:state, selectPOPanel:false});
    }
  }
  checkAccess = () => {
    return (
    <CheckAccess {...this.props} />
    )
  }

  componentDidMount() {
    this.getAddressInfo();
  }

  verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  }; 
 
  setPostData = (name,value) => {
    this.setState({ [name]: value, formChanged:true });
  }
  gridsize(idx){
    let length = this.state.tranport_expenses.length;
    if(idx == length-1){
      return 4;
    } else if(length > 1){
      return 5;
    }else{ 
      return 4;
    }    
  }
  gridsize(idx){
    let length = this.state.other_expenses.length;
    if(idx == length-1){
      return 4;
    } else if(length > 1){
      return 5;
    }else{ 
      return 4;
    }    
  }

  removeTransportExpenses(i) {
    const { tranport_expenses } = this.state;
    this.setState({
        tranport_expenses: tranport_expenses.filter((author, index) => index !== i),
    });
  }
  removeOtherExpenses(i) {
    const { other_expenses } = this.state;
    this.setState({
        other_expenses: other_expenses.filter((author, index) => index !== i),
    });
  }
  handleImageChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
    });
    this.setState({
      selectedFileName: event.target.files[0].name
    });
    let reader = new FileReader();
     
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(event.target.files[0])
  }

  handleAddExpenses = () => {
    let lauthorHolders = this.state.tranport_expenses;
    let NewTransportExpenses = {};
    NewTransportExpenses.types_transportation='';
    NewTransportExpenses.vehicle_type='';
    NewTransportExpenses.type_expenses='';
    NewTransportExpenses.person_name='';
    NewTransportExpenses.location_from='';
    NewTransportExpenses.location_to='';
    NewTransportExpenses.kms='';
    NewTransportExpenses.amount_rs='';
    lauthorHolders.push(NewTransportExpenses);
    this.setState({tranport_expenses:lauthorHolders});
  }
  handleAddExpensesOther = () => {
    let OtherExpenses = this.state.other_expenses;
    let NewOtherExpenses = {};
    NewOtherExpenses.note='';
    NewOtherExpenses.person_name='';
    NewOtherExpenses.amount_rs='';
    OtherExpenses.push(NewOtherExpenses);
    this.setState({tranport_expenses:OtherExpenses});
  }

  render(){
  const { classes } = this.props;

  return (
      <div>
        {this.state.alert}
        <GridContainer  justify="center" alignItems="center">              
          <GridItem xs={12} sm={12} md={9}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose"><span class="material-icons">note_add</span></CardIcon>
                <h4 className={classes.cardIconTitle}>Expenses Creation</h4>
              </CardHeader>
              <CardBody>
              {this.state.activeStep == 0 && 
              <div>
                 {this.state.tranport_expenses.map((author, idx) => (
              <Card className="outlinedInput">
                <CardBody>
                  <GridContainer> 
                  <GridItem xs={3} sm={3} md={1} style={{textAlign:'center'}} className={classes.inputMargin}>
                    <FormControl fullWidth>
                      <TextField 
                      inputProps={{
                        autoComplete: 'off'
                      }}
                      inputProps={{min: 0, style: { textAlign: 'center' }}} // the change is here
                      InputProps={classes.inputText} 
                      readOnly={true}   
                      value={idx+1}
                      labelPlacement="start"
                      label="S No." 
                      inputRef={this.textInput} 
                      variant="outlined" />                   
                    </FormControl>
                  </GridItem>     
                  <GridItem xs={4} sm={4} md={3} className={classes.inputMargin}>
                    <FormControl fullWidth>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker  
                          id="date-picker-dialog"
                          inputVariant="outlined"
                          label="Date"
                          format="dd-MM-yyyy"
                          value={this.state.institute_month_closure}
                          onChange={this.handleEYear}   
                          KeyboardButtonProps={{
                          'aria-label': 'change date', 
                          }} 
                        />
                      </MuiPickersUtilsProvider>                   
                    </FormControl>
                    </GridItem>      
                    <GridItem xs={8} sm={8} md={3} className={classes.inputMargin}>
                    <FormControl className={classes.margin} fullWidth>
                        <TextField
                        className="m-2"
                        id="outlined-select-currency"
                        select
                        label="Type of Expenses"
                        options={author.type_expenses}
                        onChange={(event) => this.handleexpensesvalue(idx,'type_expenses',event.target.value)}
                        variant="outlined">
                        <MenuItem value='Transpotation'>Transpotation</MenuItem>
                        <MenuItem value='Other1'>Other1</MenuItem>
                        <MenuItem value='Other2'>Other2</MenuItem>
                      
                    </TextField>
                    </FormControl>
                    </GridItem> 
                    {author.type_expenses === 'Transpotation' && <> 
                      <GridItem xs={12} sm={12} md={5} className={classes.inputMargin}>
                        <FormControl fullWidth>
                          <TextField 
                            inputProps={{
                            autoComplete: 'off'
                            }}
                          id="document-type"   
                          value={this.state.person_name}
                          label="Client Name" 
                          type="search" 
                          onChange={(event) => this.setPostData("person_name",event.target.value)}
                          inputRef={this.textInput} 
                          variant="outlined" />                   
                        </FormControl>
                      </GridItem>
                      <GridItem xs={6} sm={6} md={4} className={classes.inputMargin} >                       
                        <FormControl component="fieldset">
                          <RadioGroup row aria-label="position" name="position">
                            <FormControlLabel value="active" control={<Radio color="primary" checked={author.types_transportation === "Own Vehicle"} onChange={()=> this.handleexpensesvalue(idx,'types_transportation','Own Vehicle')} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Own Vehicle</span>} />
                            <FormControlLabel value="inactive" control={<Radio color="primary" checked={author.types_transportation === "Public Vehicle"} onChange={()=> this.handleexpensesvalue(idx,'types_transportation','Public Vehicle')} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Public Vehicle</span>} />
                          </RadioGroup>
                        </FormControl>  
                      </GridItem>
                      {author.types_transportation === 'Own Vehicle' &&
                      <GridItem xs={6} sm={6} md={3} className={classes.inputMargin} >                       
                        <FormControl component="fieldset">
                          <RadioGroup row aria-label="position" name="position">
                            <FormControlLabel value="active" control={<Radio color="primary" checked={author.vehicle_type === "Car"} onChange={()=> this.handleexpensesvalue(idx,'vehicle_type','Car')} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Car</span>} />
                            <FormControlLabel value="inactive" control={<Radio color="primary" checked={author.vehicle_type === "Bike"} onChange={()=> this.handleexpensesvalue(idx,'vehicle_type','Bike')} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Bike</span>} />
                          </RadioGroup>
                        </FormControl>  
                      </GridItem>} 
                      {author.types_transportation !== 'Own Vehicle' &&
                      <GridItem xs={6} sm={6} md={3} className={classes.inputMargin} >  
                      </GridItem>} 
                    <GridItem xs={6} sm={6} md={5} className={classes.inputMargin}>
                    <FormControl fullWidth>
                      <TextField 
                        inputProps={{
                          autoComplete: 'off'
                        }}
                        id="document-type"   
                        value={this.state.location_from}
                        label="Location From" 
                        type="search" 
                        onChange={(event) => this.setPostData("location_from",event.target.value)}
                        inputRef={this.textInput} 
                        variant="outlined" />                   
                    </FormControl>
                  </GridItem>
                  <GridItem xs={6} sm={6} md={5} className={classes.inputMargin}>
                    <FormControl fullWidth>
                      <TextField 
                        inputProps={{
                          autoComplete: 'off'
                        }}
                        id="document-type"   
                        value={this.state.location_to}
                        label="Location To" 
                        type="search" 
                        onChange={(event) => this.setPostData("location_to",event.target.value)}
                        inputRef={this.textInput} 
                        variant="outlined" />                   
                    </FormControl>
                  </GridItem>
                  <GridItem xs={6} sm={6} md={2} className={classes.inputMargin}>
                    <FormControl fullWidth>
                      <TextField 
                        inputProps={{
                          autoComplete: 'off'
                        }}
                        id="document-type"   
                        value={this.state.kms}
                        label="Kms" 
                        type="search" 
                        onChange={(event) => this.setPostData("kms",event.target.value)}
                        inputRef={this.textInput} 
                        variant="outlined" />                   
                    </FormControl>
                  </GridItem> 
                  <GridItem xs={6} sm={6} md={3} className={classes.inputMargin}>
                    <FormControl fullWidth>
                      <TextField 
                        inputProps={{
                          autoComplete: 'off'
                        }}
                        id="document-type"   
                        value={this.state.amount_rs}
                        label="Amount Rs" 
                        type="search" 
                        onChange={(event) => this.setPostData("amount_rs",event.target.value)}
                        inputRef={this.textInput} 
                        variant="outlined" />                   
                    </FormControl>
                  </GridItem> </>}

                  {author.type_expenses !== 'Transpotation' && author.type_expenses !== '' && <> 
                  <GridItem xs={12} sm={12} md={5} className={classes.inputMargin} >
                    <FormControl fullWidth>
                    <TextField 
                        inputProps={{
                        autoComplete: 'off'
                        }}
                        id="document-type"   
                        value={this.state.person_name}
                        label="Client Name" 
                        type="search" 
                        onChange={(event) => this.setPostData("person_name",event.target.value)}
                        inputRef={this.textInput} 
                        variant="outlined" />                   
                    </FormControl>
                  </GridItem>
                  <GridItem xs={9} sm={9} md={5} className={classes.inputMargin}>
                    <FormControl fullWidth>
                    <TextareaAutosize aria-label="minimum height" rowsMin={2} placeholder="Descriptions" />                
                    </FormControl>
                  </GridItem>
                  <GridItem xs={6} sm={6} md={2} className={classes.inputMargin}>
                    <FormControl fullWidth>
                    <TextField 
                        inputProps={{
                          autoComplete: 'off'
                        }}
                        id="document-type"   
                        value={this.state.amount_rs}
                        label="Amount Rs." 
                        type="search" 
                        onChange={(event) => this.setPostData("amount_rs",event.target.value)}
                        inputRef={this.textInput} 
                        variant="outlined" />                   
                    </FormControl>
                  </GridItem> 
                  <GridItem xs={6} sm={6} md={3} className={classes.inputMargin}>
                    <FormControl fullWidth>
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
                  </>}
                  
                  <GridItem xs={3} sm={3} md={1} className={classes.inputMargin} style={{textAlign:'center'}}>                    
                    {(this.state.tranport_expenses.length - 1) == idx ?   <div  className="addHolderStyle inputMargin">
                      <FormControl fullWidth>
                        <TextField 
                          id="document-type"   
                          InputProps={{
                            autoComplete: 'off',
                            readOnly: true,
                            startAdornment: (
                            <InputAdornment position="start">
                            <Remove style={{color:'rgb(220, 53, 69)', cursor:'pointer'}} className={classes.icon} />
                            </InputAdornment>
                            ),
                          }}
                          label="Del" 
                          onClick={()=>{this.removeTransportExpenses(idx);}}
                          variant="outlined" />
                      </FormControl>
                     </div>:<div className="removeHolderStyle inputMargin"> 
                      <FormControl fullWidth>
                        <TextField 
                          id="document-type"   
                          InputProps={{
                            autoComplete: 'off',
                            readOnly: true,
                            startAdornment: (
                            <InputAdornment position="start">
                            <Remove style={{color:'rgb(220, 53, 69)', cursor:'pointer'}} className={classes.icon} />
                            </InputAdornment>
                            ),
                          }}
                          label="Del" 
                          onClick={()=>{this.removeTransportExpenses(idx);}}
                          variant="outlined" />
                      </FormControl></div>}
                  </GridItem>

                  <GridItem xs={3} sm={3} md={1} className={classes.inputMargin} style={{textAlign:'center'}}>
                    
                    {(this.state.tranport_expenses.length + 1) == idx && <div className="removeHolderStyle inputMargin"> <FormControl fullWidth>
                      <TextField 
                      id="document-type"   
                      InputProps={{
                      autoComplete: 'off',
                      readOnly: true,
                      startAdornment: (
                      <InputAdornment position="start">
                      <Remove style={{color:'rgb(220, 53, 69)', cursor:'pointer'}} className={classes.icon} />
                      </InputAdornment>
                      ),
                      }}
                      label="Del" 
                      onClick={()=>{this.removeTransportExpenses(idx);}}
                      variant="outlined" />
                      </FormControl></div>}

                      {(this.state.tranport_expenses.length - 1) == idx && <div className="removeHolderStyle inputMargin"> <FormControl fullWidth >
                        <TextField 
                        id="document-type"   
                        InputProps={{
                        autoComplete: 'off', 
                        readOnly: true,
                        startAdornment: (
                        <InputAdornment position="start">
                        <Add style={{color:'rgb(76, 175, 80)', cursor:'pointer'}} className={classes.icon} />
                        </InputAdornment>
                        ),
                        }}
                        label="Add" 
                        onClick={()=>{this.handleAddExpenses()}}
                        variant="outlined" />
                        </FormControl></div>}
                  </GridItem>
                  </GridContainer>  
                </CardBody>
              </Card>           
              ))}
            <div>
                <GridContainer> 
                  <GridItem xs={12} sm={12} md={6}>
                
                  <Chip
                    style={{fontWeight:"800"}} 
                    label="Total Rs. 30/-" 
                    color="primary"
                    variant="outlined"
                  />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6} style={{textAlign:'right'}} >
                    <MButton  type="submit" color="rose" variant="outlined" color="primary">Submit</MButton>
                </GridItem>
              </GridContainer> 
            </div>              
          </div>
          }    
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
          <div> 
            {this.state.pincodesArr.length > 0 && this.state.pincodesArr.map((element, index) => (
                <CustomSnackbarContent style={{padding:5}}
                message={
                  <div><h5 style={{marginTop:0, fontWeight:700, fontSize:'1.2em'}} className="headingStyle">{this.replaceText(element.office)}</h5><span>{"Taluk: "+element.taluk+"    District: "+element.district+"    State: "+element.circle}</span></div>
                }
                type="custom"
                close
                closeNotification={() => this.fillAddress(this.replaceText(element.office),element.taluk,element.district,element.circle)}
                color="white"  
              />
            ))}
          </div>
      </SlidingPane>                 	
    </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToPros)(withStyles(pageStyles)(Dashboard));
