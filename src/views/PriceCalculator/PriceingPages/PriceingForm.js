import React from "react";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { makeStyles } from '@material-ui/styles';
import { withStyles } from "@material-ui/core/styles";
import {Animated} from "react-animated-css";
import 'react-sliding-pane/dist/react-sliding-pane.css';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import MButton from '@material-ui/core/Button';
import CardBody from "components/Card/CardBody.js";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Slide from '@material-ui/core/Slide';
import styles from "assets/jss/material-dashboard-pro-react/layouts/adminStyleNew.js";
import TextField from '@material-ui/core/TextField';
import Moment from 'moment';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import NavigateNext from "@material-ui/icons/NavigateNext";
import Service from 'Utils/Service';
import IconButton from '@material-ui/core/IconButton';
// @material-ui/icons
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from "@material-ui/core/FormControl";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import SweetAlert from "react-bootstrap-sweetalert";
import { ControlPointDuplicateRounded } from "@material-ui/icons";
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToPros } from '../../../Utils/MapStateDispatchProps.js';
import CheckAccess from "components/CheckAccess.js";


const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
  });

class AdminDashboard extends React.Component  { 

  constructor(props) 
  {
    super(props);
    this.state = { 
      expanded:false,
      minmum_student:'',
      maximum_student:'',
      min_signup_value:'',
      alert:null,
      button:'',
      formdate:Moment(new Date()).format("YYYY-MM-DD"),
      usermenudata:[],       
      userchildmenudata:[],
      pricinghistoryid:'',
      submain:[],
      mainuserchildmenudata:[],
      pricingButtonName:"Submit",
      pricingButton:false
    }
  }

  menuvalueappend = (Index,inputName,Value) => {
    let newarray = this.state.userchildmenudata;
    let minmum_student = this.state.minmum_student;
    let maximum_student = this.state.maximum_student;
    let minprice = this.state.userchildmenudata[Index].minamount;
    let maxprice = this.state.userchildmenudata[Index].maxamount;
    let minamount;
    let maxamount;
    let maxallowedvalue;
     
    if(inputName ==='minamount' && newarray[Index]['pricing'] !== "fixed"){
      maxamount = parseFloat(Value)*parseFloat(maximum_student);

      maxallowedvalue = Math.floor((maxamount - 1)/minmum_student);

      if(Value === '')
      {
        newarray[Index].maxamount = '';
        newarray[Index].amount_error = '';
      }
      
      if(Value == 0)
      {
        newarray[Index].maxamount = 0;
        maxallowedvalue = 0;
      }
      else if(maxallowedvalue > 0)
      {
        newarray[Index].maxamount = maxallowedvalue; 
      }
      minamount = parseFloat(maxallowedvalue)*parseFloat(minmum_student);
      
      if((maxamount > minamount && (parseFloat(maxallowedvalue) > parseFloat(Value)) || (parseFloat(Value) === 0))){
        newarray[Index].amount_error = '';
      }else{
        newarray[Index].amount_error = 'error';
      }
    }

    if(maxamount !=='' && inputName ==='maxamount'){
      maxamount = parseFloat(minprice)*parseFloat(maximum_student);
      minamount = parseFloat(Value)*parseFloat(minmum_student);
  
      if(maxamount > minamount && parseFloat(Value) > parseFloat(minprice)){
        newarray[Index].amount_error = '';
      }else{
        newarray[Index].amount_error = 'error';
      }
      
    }

    newarray[Index][inputName] = Value;
    if(newarray[Index]['pricing'] === "fixed"){
      newarray[Index].maxamount = 0; 
    }
    this.setState({userchildmenudata:newarray});

  }

  handleDateChange = (date) => {
    this.setState({formdate:Moment(date).format("YYYY-MM-DD")});
  }; 

  handleChange = (panel) => (event, isExpanded) => {
    this.setState({expanded:(isExpanded ? panel : false)});
  };

  getUserParentMenu() {
    const postData = { };
    new Service().apiCall('UserMenu/GetAllParentData',postData).then(response =>
    {
      if (response.data!='') 
      {      
        this.setState({usermenudata: response.data})
      }
      else{
        this.setState({usermenudata:[]})
      }
    }).catch(error => {
      alert("error.response.data.message");
    });
  }    
  checkAccess = () => {
    return (
    <CheckAccess {...this.props} />
    )
  }
  getUserChildMenu() {
    const postData = { };
    new Service().apiCall('UserMenu/GetAllChildData',postData).then(response =>
    {
      if (response.data!='') 
      {     
        const newArr = response.data;
        const newArradded = newArr.map(v => ({...v, minamount:'', maxamount:'', amount_error:''}));

        this.setState({userchildmenudata: newArradded})
        this.setState({mainuserchildmenudata: newArradded})
      }
      else{
        this.setState({userchildmenudata:[]})
        this.setState({mainuserchildmenudata:[]}) 
      }
    }).catch(error => {
      alert("error.response.data.message");
    });
  }

  GetAllData(type) {  
      this.setState({minmum_student:''});  
      this.setState({maximum_student:''}); 
      this.setState({min_signup_value:''});  
      this.setState({pricinghistoryid:''});  
    const postData = { status:type };
    new Service().apiCall('PricingHistory/GetAllData',postData).then(response =>
    {
      if (response.data!='') 
      {           
        this.setState({minmum_student:response.data[0].minmum_student});  
        this.setState({maximum_student:response.data[0].maximum_student}); 
        this.setState({min_signup_value:response.data[0].min_signup_value});
        this.setState({pricinghistoryid:response.data[0].id});
        this.getUserChildtMenu(response.data[0].id);  
      }
    }).catch(error => {
      this.setState({minmum_student:''});  
      this.setState({maximum_student:''}); 
      this.setState({min_signup_value:''});
      this.setState({pricinghistoryid:''}); 
    });
  }

  getUserChildtMenu(pricing_id) {
    const postData = {pricing_id:pricing_id };
    new Service().apiCall('PricingDetails/GetAllChildData',postData).then(response =>
    {
      if (response.data!='') 
      {      
        let uservalue = this.state.userchildmenudata;
        let newuservalue = response.data;
        for(var i = 0; i < newuservalue.length; i++) {
          if(uservalue[i]['id'] === newuservalue[i]['module_id'])
          {
            uservalue[i]['minamount'] = newuservalue[i]['minamount'];
            uservalue[i]['maxamount'] = newuservalue[i]['maxamount'];
          }
        }
        this.setState({userchildmenudata: uservalue}) 
      }
      else{
        this.setState({userchildmenudata:[]}) 
      }
    }).catch(error => {
      alert("error.response.data.message");
    });
  }

  componentDidMount() {
    this.getUserParentMenu();
    this.getUserChildMenu();
    this.GetAllData();

    if(this.props.token === '' || this.props.token === null)
    {
      this.props.history.push('/auth/login-page');
    }
  }

  chceckFields = (minmum_student,maximum_student,min_signup_value,date)=> {
    if(minmum_student !== '' && minmum_student > 0 && maximum_student !== '' && maximum_student > 0 && min_signup_value !== '' && min_signup_value > 0 && parseInt(minmum_student) < parseInt(maximum_student) && date !== '' && date !== 'Invalid date'){
      this.setState({button:'success'});
    }else{
      this.setState({button:'warning'});
    }
  }
 
  creactpricing()
  {    
    this.setState({pricingButtonName:"Submitting..."});
    this.setState({pricingButton:true});
    let formData = new FormData(); 
    formData.append('formdate',this.state.formdate);
    formData.append('minmum_student',this.state.minmum_student);
    formData.append('maximum_student',this.state.maximum_student);
    formData.append('min_signup_value',this.state.min_signup_value);
    formData.append('userchildmenudata',JSON.stringify(this.state.userchildmenudata));

    let minmum_student = this.state.minmum_student;
    let maximum_student = this.state.maximum_student;
    let enteredData = this.state.userchildmenudata;
    console.log(enteredData);
    for(var a=0;a<enteredData.length;a++)
    {
      let maxamount;
      let minamount;

      let minprice = enteredData[a]['minamount'];
      let maxprice = enteredData[a]['maxamount'];
      maxamount = parseFloat(minprice)*parseFloat(maximum_student);
      minamount = parseFloat(maxprice)*parseFloat(minmum_student);

      if((enteredData[a]['minamount'] === '' || enteredData[a]['maxamount'] === '') && enteredData[a]['module_type'] == "Optional" && enteredData[a]['status'] == "1" && (enteredData[a]['pricing'] === "fixed" && enteredData[a]['minamount'] === ''))
      { 
        let index = this.state.usermenudata.findIndex(x => x.id === enteredData[a]['id_parent_menu']);
        alert('Please Fill all the data!!!');
        this.setState({pricingButtonName:"Submit"});
        this.setState({pricingButton:false, expanded:index}); 
        return false; 
      }
      if(((maxamount <= minamount) || (parseFloat(maxprice) <= parseFloat(minprice))) && ((enteredData[a]['minamount'] != 0 && enteredData[a]['maxamount'] != 0) || (enteredData[a]['minamount'] != 0 && enteredData[a]['maxamount'] == 0) || (enteredData[a]['minamount'] == 0 && enteredData[a]['maxamount'] != 0)) && enteredData[a]['module_type'] == "Optional" && enteredData[a]['status'] == "1")
      {
        if(enteredData[a]['pricing'] !== 'fixed')
        {
          let index = this.state.usermenudata.findIndex(x => x.id === enteredData[a]['id_parent_menu']);
          alert('Please Add Correct Amount!!!');
          this.setState({pricingButtonName:"Submit"});
          this.setState({pricingButton:false, expanded:index}); 
          return false;   
        }
      }
    }
    
    new Service().apiCall('PricingHistory/CreatePricing', formData).then(response => 
    { 
      if (response.status === 200 && response.data !== '') 
      {
        this.setState({ alert: ( <SweetAlert  success  confirmBtnBsStyle="success" title="Pricing Created Successfully!" showConfirm={false} >Now you can access all</SweetAlert> ), });
        setTimeout(() => {
          this.setState({ alert:null});  
          this.props.handlePricingPage('close'); 
          this.setState({pricingButtonName:"Submit"});
          this.setState({pricingButton:false});
        }, 2000)
      } 
    }).catch(error => {
      this.errorAlert('test');
    });
  } 

  errorAlert = (modalType) => {
    this.setState({alert: (<SweetAlert danger confirmBtnBsStyle="danger" title="Something bad happened!!!" onConfirm={() => { this.setState({ alert: null });}}> We are regretting for it</SweetAlert>),    
    });
  };

  render()
  { 
    const { classes } = this.props;
    return (
      <div>
      {this.state.alert}
        <GridContainer  justify="center" alignItems="center">  
          <GridItem lg={8} md={8} sm={12} xs={12}>
            <Card >
              <CardBody>
                <GridContainer>
                  <GridItem lg={12} md={12} sm={12} xs={12}>
                  <p className={classes.heading} style={{paddingTop:"7px"}}>New Updation of Pricing </p> 
                  </GridItem>
                </GridContainer>
                <GridContainer className="outlinedInput"  justify="center" alignItems="center">
                  <GridItem md={4} lg={4} xs={12} sm={12} style={{textAlign:"center"}}>
                    <FormControl fullWidth>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                        autoOk={true}
                        value={this.state.formdate}
                        //shrink={true}
                        id="date-picker-dialog"
                        label="Date of new pricing"
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
                  <GridItem md={2} lg={2} xs={12} sm={12} style={{textAlign:"center"}}> 
                    <FormControl fullWidth className="outlinedInput">
                      <TextField 
                        error={(!this.state.minmum_student && this.state.button == 'warning') || ((this.state.minmum_student > this.state.maximum_student)  && this.state.button == 'warning')}
                        inputProps={{ 
                          autoComplete: 'off'
                        }}
                        id="document-type"   
                        value={this.state.minmum_student}
                        label="Min Student" 
                        type="search" 
                        onChange={(event) => this.setState({minmum_student:event.target.value})}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }} 
                        inputRef={this.textInput} 
                        variant="outlined" />                   
                    </FormControl>
                  </GridItem>
                  <GridItem  md={2} lg={2} xs={12} sm={12} style={{textAlign:"center"}}>
                    <FormControl fullWidth>
                      <TextField 
                        error={(!this.state.maximum_student && this.state.button == 'warning') || ((this.state.minmum_student > this.state.maximum_student)  && this.state.button == 'warning')}
                        inputProps={{
                          autoComplete: 'off'
                        }}
                        id="document-type"   
                        value={this.state.maximum_student}
                        label="Max Student" 
                        type="search" 
                        onChange={(event) => this.setState({maximum_student:event.target.value})}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }} 
                        inputRef={this.textInput} 
                        variant="outlined" />                   
                    </FormControl>
                  </GridItem>   
                  <GridItem  md={3} lg={3} xs={12} sm={12} style={{textAlign:"center"}}>
                    <FormControl fullWidth>
                      <TextField 
                        error={!this.state.min_signup_value && this.state.button == 'warning'}
                        inputProps={{
                          autoComplete: 'off'
                        }}
                        id="document-type"   
                        value={this.state.min_signup_value}
                        label="Min Signup Value" 
                        type="search" 
                        onChange={(event) => this.setState({min_signup_value:event.target.value})}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }} 
                        inputRef={this.textInput} 
                        variant="outlined" />                   
                    </FormControl>
                  </GridItem> 
                  <GridItem  className={classes.ButtonHover}  md={1} lg={1} xs={12} sm={12}  style={{textAlign:'right',margin:'auto'}}> 
                    <IconButton className={classes.IconButton} onClick={()=> this.chceckFields(this.state.minmum_student,this.state.maximum_student,this.state.min_signup_value,this.state.formdate)}>
                      <Avatar style={{float:'right',marginRight:10,backgroundColor:'#39bdd6 !important'}}>
                        <NavigateNext />
                      </Avatar>
                    </IconButton>  
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>

        {this.state.button === 'success' && <div>
        <GridContainer justify="center" alignItems="center" style={{paddingTop:"1%"}} className={classes.SliderBackground}>
          <GridItem lg={8} md={8} sm={12} xs={12}>
            {this.state.usermenudata.map((item, itemindex) => (
            <Accordion expanded={this.state.expanded === itemindex} onChange={this.handleChange(itemindex)} >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="pane21bh-content"
                id="panel2bh-header"
              >
                <GridContainer>
                  <GridItem lg={6} md={6} sm={6} xs={6} style={{textAlign:"left"}}>
                    <Typography style={{textAlign:"left"}}>{item.main_module}</Typography>
                    <label>Module Name</label>
                  </GridItem>
                  <GridItem lg={6} md={6} sm={6} xs={6} style={{textAlign:"center"}}>
                    <Typography style={{marginTop:6}}> 
                      <Chip
                        style={{marginRight:5}}
                        avatar={<Avatar>{item.default_module_count}</Avatar>}
                        label="Default"
                        clickable
                        color="primary"
                        variant="outlined"
                      /> 
                      <Chip 
                        avatar={<Avatar>{item.optional_module_count}</Avatar>}
                        label="Optional"
                        clickable
                        color="primary"
                        variant="outlined"
                      />
                    </Typography>
                  </GridItem>
                </GridContainer>
              </AccordionSummary>
              <AccordionDetails>
              
                <GridContainer>
                  <GridItem lg={12} md={12} sm={12} xs={12}>

                    {this.state.userchildmenudata.map((subitem, subitemindex) => ( subitem.main_module === item.main_module &&
                    <Card className={classes.SubmoduleCustomCard}> 
                      <CardBody className={classes.SubmoduleCustomCardBody}>
                      {subitem.status === '0' &&
                        <GridContainer>
                          <GridItem xs={6} md={6} lg={6} xs={12} sm={12} style={{textAlign:"left"}}>
                            <h4 style={{textAlign:"left"}} className={classes.CardHeading}>{subitem.sub_module}</h4>
                            <label className={classes.labelName}>Sub Module</label>
                          </GridItem>
                          <GridItem xs={6} md={6} lg={6} xs={12} sm={12} style={{textAlign:"center"}}>
                            <Chip 
                              style={{marginTop:6}}
                              label="De Activated"
                              clickable
                              color="secondary"
                              variant="outlined"
                            />
                          </GridItem>
                        </GridContainer>}
                      
                      {subitem.module_type !== 'Default' && subitem.status === '1' &&
                        <GridContainer>
                          <GridItem xs={6} md={6} lg={6} xs={12} sm={12} style={{textAlign:"left"}}>
                            <h4 style={{textAlign:"left"}} className={classes.CardHeading}>{subitem.sub_module}</h4>
                            <label className={classes.labelName}>Sub Module</label>
                          </GridItem>
                          <GridItem xs={6} md={3} lg={3} xs={6} sm={6} style={{textAlign:"center"}}> 
                            <TextField 
                              error={subitem.amount_error === 'error' }
                              inputProps={{
                                autoComplete: 'off'
                              }}
                              id="document-type"   
                              value={subitem.minamount}
                              label="Minmum Rate" 
                              type="search" 
                              onChange={(event)=> this.menuvalueappend(subitemindex,'minamount',event.target.value)} 
                              onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }} 
                              inputRef={this.textInput} 
                              variant="outlined" />  
                          </GridItem>
                          <GridItem xs={6} md={3} lg={3} xs={6} sm={6} style={{textAlign:"center"}}>
                            <TextField 
                              error={subitem.amount_error === 'error' }
                              inputProps={{
                                autoComplete: 'off'
                              }}
                              id="document-type"   
                              value={subitem.maxamount}
                              label="Maximum Rate" 
                              type="search" 
                              disabled={subitem.pricing === "fixed" ? true : false}
                              onChange={(event)=> this.menuvalueappend(subitemindex,'maxamount',event.target.value)} 
                              onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }} 
                              inputRef={this.textInput} 
                              variant="outlined" /> 
                          </GridItem>
                        </GridContainer>}

                        {subitem.module_type === 'Default' && subitem.status === '1' &&
                        <GridContainer>
                          <GridItem xs={6} md={6} lg={6} xs={12} sm={12} style={{textAlign:"left"}}>
                            <h4 style={{textAlign:"left"}} className={classes.CardHeading}>{subitem.sub_module}</h4>
                            <label className={classes.labelName}>Sub Module</label>
                          </GridItem>
                          <GridItem xs={6} md={6} lg={6} xs={12} sm={12} style={{textAlign:"center"}}>
                            <Chip 
                              style={{marginTop:6}}
                              label="Default"
                              clickable
                              color="primary"
                              variant="outlined"
                            />
                          </GridItem>
                        </GridContainer>}

                      </CardBody>
                    </Card>))}

                  </GridItem>
                </GridContainer>

              </AccordionDetails>
            </Accordion> ))}
          </GridItem>
        </GridContainer>

        <GridContainer  style={{paddingTop:"1%",paddingBottom:"2%"}}>
          <GridItem lg={10} md={10} sm={12} xs={12} justify="right" alignItems="right">
            <MButton className={classes.FinalSubmitButton } disabled={this.state.pricingButton}  onClick={this.creactpricing.bind(this)}  variant="outlined" style={{float:"right"}} >
              {this.state.pricingButtonName}
            </MButton>
          </GridItem>
        </GridContainer></div>}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToPros)(withStyles(styles)(AdminDashboard));  