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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import DateFnsUtils from '@date-io/date-fns';
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from '@material-ui/core/RadioGroup';
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

class DiscountSetting extends React.Component  { 

  constructor(props) 
  {
    super(props);
    this.state = { 
      expanded:false,
      alert:null,
      button:'success',
      roles:[],
      buttonDisabled:false,
      buttonName: "Submit"
    }
  }

  settingvalueappend = (Index,inputName,Value,Roll) => {
    let newarray = this.state.roles;
    
    if(inputName === "max_discount_allowed" && Value > 100)
    {
      Value = 100;
    }

    if(inputName === "price_hike_type")
    {
      newarray[Index]['total_price_hike'] = '0';
    }

    newarray[Index][inputName] = Value;
    newarray[Index]['role_id'] = Roll;
    
    this.setState({roles:newarray});  
  }

  handleChange = (panel) => (event, isExpanded) => {
    this.setState({expanded:(isExpanded ? panel : false)});
  };
 
  checkAccess = () => {
    return (
    <CheckAccess {...this.props} />
    )
  }
  getRolesList = () => {
    const postData = { };
    new Service().apiCall('Roles/getData',postData).then(response => {
      if (response.status==200 && response.data!='') {
        const newArr = response.data;
        const newArradded = newArr.map(v => ({...v, max_discount_allowed:'0', total_price_hike:'0', unlimited:'',discount_id:'0', price_hike_type:'', role_id:v.id})); 
       
      this.setState({ roles: newArradded }); 
      this.getRolesDiscount();
      }
    }).catch(error => {
      console.log(error);
    });
  }

  AddDiscountSetting()
  {    
    this.setState({DiscountSettingPage:false}); 
    this.setState({buttonDisabled:true});
    this.setState({buttonName:"Submitting"});

    let formData = new FormData();
    formData.append('roles',JSON.stringify(this.state.roles));

    new Service().apiCall('DiscountSetting/AddDiscountSetting', formData).then(response => 
    { 
      if (response.status === 200 && response.data !== '') 
      { 
        this.setState({ alert: ( <SweetAlert  success  confirmBtnBsStyle="success" title="Updated Successfully!" showConfirm={false} >Now you can access all</SweetAlert> ), });
        setTimeout(() => {
          this.getRolesList(); 
          this.setState({ alert:null}); 
          this.setState({buttonDisabled:false});
          this.setState({buttonName:"Submit"});
        }, 2000)
      } 
    }).catch(error => {
      this.errorAlert('test');
      this.setState({buttonDisabled:false});
      this.setState({buttonName:"Submit"});
    });
  } 

  getRolesDiscount = () => {
    const postData = { };
    new Service().apiCall('DiscountSetting/GetAllData',postData).then(response => {
      if (response.status==200 && response.data!='') {
        let newArr = response.data;
        let newRoleArr = this.state.roles; 

        for(var i=0;i<newRoleArr.length;i++)
        {
            if(newRoleArr[i]['id'] === newArr[i]['role_id'])
            {
              newRoleArr[i]['discount_id'] = newArr[i]['id'];
              newRoleArr[i]['role_id'] = newArr[i]['role_id'];
              newRoleArr[i]['max_discount_allowed'] = newArr[i]['max_discount_allowed'];
              newRoleArr[i]['total_price_hike'] = newArr[i]['total_price_hike'];
              newRoleArr[i]['price_hike_type'] = newArr[i]['price_hike_type'];
              newRoleArr[i]['unlimited'] = newArr[i]['unlimited'];
            }
        }
      this.setState({ roles: newRoleArr }); 
      }
    }).catch(error => {
      console.log(error);
    });
  }

  componentDidMount() {
    this.getRolesList();

    if(this.props.token === '' || this.props.token === null)
    {
      this.props.history.push('/auth/login-page');
    }
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

        {this.state.button === 'success' && <div>
        <GridContainer justify="center" alignItems="center" style={{paddingTop:"1%"}} className={classes.SliderBackground}>
          <GridItem lg={6} md={6} sm={12} xs={12}>
            {this.state.roles.map((item, itemindex) => (
            <Accordion expanded={this.state.expanded === itemindex} onChange={this.handleChange(itemindex)} >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="pane21bh-content"
                id="panel2bh-header"
              >
                <GridContainer>
                  <GridItem lg={6} md={6} sm={6} xs={6} style={{textAlign:"left"}}>
                    <Typography style={{textAlign:"left"}}>{item.name}</Typography>
                    <label>Role Name</label>
                  </GridItem>
                </GridContainer>
              </AccordionSummary>
              <AccordionDetails>
              
                <GridContainer justify="center">
                  <GridItem lg={12} md={12} sm={12} xs={12}>

                    <Card className={classes.SubmoduleCustomCard}> 
                      <CardBody >

                        <GridContainer className={classes.DependentOnInput}>
                          <GridItem xs={6} md={6} lg={6} xs={6} sm={6} style={{textAlign:"center"}}> 
                            <TextField 
                              error={ item.max_discount_allowed > 100 }
                              inputProps={{
                                autoComplete: 'off',
                                maxLength: '3'
                              }}
                              id="document-type"   
                              value={item.max_discount_allowed}
                              label="Max Discount Allowed" 
                              type="search" 
                              onChange={(event)=> this.settingvalueappend(itemindex,'max_discount_allowed',event.target.value,item.role_id)} 
                              onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }} 
                              inputRef={this.textInput} 
                              variant="outlined" />  
                          </GridItem>
                          <GridItem xs={6} md={6} lg={6} xs={6} sm={6} style={{textAlign:"center"}}>
                            <TextField 
                              inputProps={{
                                autoComplete: 'off',
                                maxLength: item.price_hike_type === 'Percentage' ? '3':''
                              }}
                              id="document-type"   
                              value={item.total_price_hike}
                              label="Total Price Hike" 
                              type="search" 
                              onChange={(event)=> this.settingvalueappend(itemindex,'total_price_hike',event.target.value,item.role_id)} 
                              onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }} 
                              inputRef={this.textInput} 
                              disabled={item.price_hike_type === '' ? true:false }
                              variant="outlined" /> 
                          </GridItem>
                          {/*<GridItem xs={6} md={6} lg={6} xs={12} sm={12} style={{textAlign:"left"}}>
                            <FormControlLabel control={<Radio color="primary" checked={item.unlimited === "Yes" ? true : false}  />} onClick={(event)=> this.settingvalueappend(itemindex,'unlimited',event.target.value,item.role_id),this.settingvalueappend1(itemindex,'unlimited',event.target.value,item.role_id)} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Unlimited</span>} /> 
                          </GridItem>*/}
                           <GridItem lg={12} md={12} sm={12} xs={12} align="center" style={{marginTop:"10px"}}>
                            <RadioGroup row aria-label="" name="" style={{display:"block",textAlign:"center"}}>
                            <FormControlLabel value="Percentage" control={<Radio color="primary" />} label="Percentage" onChange={(event)=> this.settingvalueappend(itemindex,'price_hike_type',event.target.value,item.role_id)} style={{color:"black"}} checked={item.price_hike_type === 'Percentage' ? true:false } />
                            <FormControlLabel value="Per Student" control={<Radio color="primary" />} label="Per Student" onChange={(event)=> this.settingvalueappend(itemindex,'price_hike_type',event.target.value,item.role_id)}  style={{color:"black"}} checked={item.price_hike_type === 'Per Student' ? true:false } />
                            <FormControlLabel value="Per Deal" control={<Radio color="primary" />} label="Per Deal" onChange={(event)=> this.settingvalueappend(itemindex,'price_hike_type',event.target.value,item.role_id)}  style={{color:"black"}} checked={item.price_hike_type === 'Per Deal' ? true:false } />
                            </RadioGroup>
                        </GridItem>
                        </GridContainer>
                      
                      </CardBody>
                    </Card>

                  </GridItem>
                </GridContainer>

              </AccordionDetails>
            </Accordion> ))}
          </GridItem>
        </GridContainer>

        <GridContainer  style={{paddingTop:"1%",paddingBottom:"2%"}} justify="center">
          <GridItem lg={6} md={6} sm={12} xs={12} justify="right" alignItems="right">
            <MButton className={classes.FinalSubmitButton } disabled={this.state.buttonDisabled} onClick={this.AddDiscountSetting.bind(this)}  variant="outlined" style={{float:"right"}} >
              {this.state.buttonName}
            </MButton>
          </GridItem>
        </GridContainer></div>}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToPros)(withStyles(styles)(DiscountSetting));  