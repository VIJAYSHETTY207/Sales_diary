import React from "react";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { makeStyles } from '@material-ui/styles';
import { withStyles } from "@material-ui/core/styles";
import {Animated} from "react-animated-css";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Drawer from '@material-ui/core/Drawer';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import LeftAorrow from '@material-ui/icons/KeyboardArrowLeft';
import CardBody from "components/Card/CardBody.js";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Slide from '@material-ui/core/Slide';
import styles from "assets/jss/material-dashboard-pro-react/layouts/userStyle.js";
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SlidingPane from 'react-sliding-pane';
import { green } from '@material-ui/core/colors';
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import Button from "components/CustomButtons/Button.js";
// @material-ui/icons
import NavigateNext from "@material-ui/icons/NavigateNext";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import MButton from '@material-ui/core/Button';
import Service from 'Utils/Service';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SweetAlert from "react-bootstrap-sweetalert";
import {
  atan2, chain, derivative, e, evaluate, log, pi, pow, round, sqrt
} from 'mathjs'
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from '@material-ui/core/RadioGroup';
import NumberFormat from 'react-number-format';
import 'date-fns';
import Moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToPros } from '../../../Utils/MapStateDispatchProps.js';
import CheckAccess from "components/CheckAccess.js";
import { el } from "date-fns/locale";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';

import Divider from '@material-ui/core/Divider';
const panelStyles = {
  dialog: {
    position: 'absolute',
    right: 0,
  }
};

const pageStyles = {...styles, ...panelStyles }
const useStyles = makeStyles(pageStyles);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
  });
  
  const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);
  
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#fff",
      color: "#000",
      fontSize:"16px",
      fontWeight:"500",
      paddingTop:"10px",
      paddingBottom:"10px",
      paddingLeft:"3px",
      paddingRight:"3px"
    },
    body: {
      fontSize: 15,
      paddingTop:"0px",
      paddingBottom:"0px",
      paddingLeft:"3px",
      paddingRight:"3px",
      fontWeight:"500",
    },
    DiscountInput:{

    }
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
export class AdminDashboard extends React.Component  { 
  state = {  
    expanded:false,
    formdate:Moment(new Date()).format("YYYY-MM-DD"), 
    opentill:Moment(new Date()).format("YYYY-MM-DD"), 
    OptionalMenu:'required',
    newpricing_id:'',
    pricing_date:'',
    institute_id:'',
    institute_name:'',
    discount:'',
    discounttype:'',
    newpayablevalue:0,
    MinSignupValue:0,
    MinSignupfixed:0,
    egenius_minmum_student:0,
    egenius_maximum_student:0,
    client_no_student:'',
    defaultdata:[],
    optionaldata:[],
    usermenudata:[],
    InstitutePricingHistoryData:[],
    InstituteDetails:[],
    DefaultModule:false,
    OptedModule:false,
    alert:null,
    payablevalueinthispage :'',
    userchildmenudata:[],
    dispaycalculator:false,
    defaultpayablevalue:'',
    buttondisabled:false,
    dependentModule:false,
    buttonname:'Submit',
    roles:[],
    selectedDependent:[],
    alloweddiscount:'',
    alloweddiscounttext:'Discount'
  }

  handleChange = (panel) => (event, isExpanded) => {
    this.setState({expanded:(isExpanded ? panel : false)});
  };

  handleDateChange = (date) => {
    this.setState({formdate:Moment(date).format("YYYY-MM-DD")});
    var result = new Date(date);
    result.setDate(result. getDate() + 15);
    let proposed_date = Moment(result).format("YYYY-MM-DD");
    this.setState({opentill:proposed_date});  
  };

  handleopentillChange = (date) => {
    this.setState({opentill:Moment(date).format("YYYY-MM-DD")});
  }; 

  handlerequired = (Index,FieldName,Value,pricing_id) => {
    
    let newvalue = this.state.optionaldata; 
    let uservalue = this.state.userchildmenudata;
    
    let newuservalue = uservalue.filter(o1 => newvalue.some(o2 => o1.id === o2.module_id)); 
    let dependent_on = newuservalue[Index]['dependent_on'].split(",");
    
    //let dep = [];
    let dep = this.state.selectedDependent;

      for(var i = 0; i < newvalue.length; i++) 
      {
        if(Index !== i && newvalue[i][FieldName] !== Value)
        { 
          for(var j = 0; j < dependent_on.length; j++)
          { 
            if(dependent_on[j] === newuservalue[i]['id'] && newuservalue[i]['id_parent_menu'] !== '' && newuservalue[i]['module_type'] !== 'Default'){
              if(FieldName === "OptionalMenu")
              {
                if(Value === "required")
                {
                  newvalue[i]['OptionalMenu'] = Value;
                  this.handlecalculation(i,newvalue[i]['minamount'],newvalue[i]['maxamount'],Value);
                }
                else if(Value === "notrequired")
                {
                  dep.push({name:newuservalue[i]['sub_module'],id:newuservalue[i]['id'],OptionalMenu:Value});
                } 
                
                if((Value === "required") || (Value !== "required" && (dep.includes(dependent_on[j]) !== false)))
                {
                  if(newuservalue[i]['has_dependent'] === "Yes")
                  {
                    this.handlerequired(i,FieldName,Value); 
                  }
                }
              }
            }
          }
        }
      }

    if(Value === "notrequired")
    {
      for(var i = 0; i < newvalue.length; i++) 
      {
        //for getting required field
        if(Index === i && newvalue[i]["OptionalMenu"] === "required")
        { 
          if(newuservalue[i]['has_dependent'] === "Yes")
          {
            //for getting dependency module list
            let dependent_ons = newuservalue[i]['dependent_on'].split(",");
            // looping again to compare each element with dependency id
            for(var k = 0; k < newvalue.length; k++) 
            {
              for(var j = 0; j < dependent_ons.length; j++)
              { 
                if(dependent_ons[j] === newuservalue[k]['id'] && newuservalue[k]['id_parent_menu'] !== '' && newuservalue[k]['module_type'] !== 'Default')
                {
                  if(Index !== i)
                  {
                    newvalue[k]['OptionalMenu'] = "required";  
                    this.handlecalculation(k,newvalue[k]['minamount'],newvalue[k]['maxamount'],"required");
                  }

                  dep = dep.filter(e=>e.id != newuservalue[k]['id']);
                }
              }
            }
          }
        } 
      }

      dep.push({name:newuservalue[Index]['sub_module'],id:newuservalue[Index]['id'],OptionalMenu:Value});

      for(var i = 0; i < newvalue.length; i++) 
      {
        //for getting required field
        if(newvalue[i]["OptionalMenu"] === "required" && newuservalue[i]['has_dependent'] === "Yes")
        { 
            //for getting dependency module list
            let dependent_ons = newuservalue[i]['dependent_on'].split(",");
            
            for(var j = 0; j < dependent_ons.length; j++)
            { 
              if(dependent_ons[j] === newuservalue[Index]['id'] && newuservalue[i]['id_parent_menu'] !== '' && newuservalue[i]['module_type'] !== 'Default')
              {
                dep.push({name:newuservalue[i]['sub_module'],id:newuservalue[i]['id'],OptionalMenu:Value});
              }
            }
        } 
      }
      
      const result = [];
      const map = new Map();
      for (const item of dep) {
          if(!map.has(item.id)){
              map.set(item.id, true);    // set any value to Map
              result.push({
                  id: item.id,
                  name: item.name,
                  OptionalMenu:item.OptionalMenu
              });
          }
      }
     
      this.setState({dependentModule:true,selectedDependent:result});
    } 
    
    if(Value !== "notrequired")
    {
      newvalue[Index][FieldName] = Value; 
      this.setState({optionaldata:newvalue});
    }
    this.defaultcount();
    this.optionalcount();
  } 

  handleConfirm = () => {
    //console.log(123)
    let newvalue = this.state.optionaldata;
    let depenedentvalue = this.state.selectedDependent;

    newvalue.map((element,index)=>{

      depenedentvalue.map((el)=> {
        if(element.module_id == el.id){
         newvalue[index]['OptionalMenu'] = el.OptionalMenu;  
          this.handlecalculation(index,newvalue[index]['minamount'],newvalue[index]['maxamount'],el.OptionalMenu);
        }
        
      });
      
    });
    this.setState({optionaldata:newvalue,dependentModule:false,selectedDependent:[]});
    this.defaultcount();
    this.optionalcount();
  }

  handlestudentcount=(value)=>{
    const newArr = this.state.optionaldata;
    const newArradded = newArr.map(v => ({...v,studentcount:value}));
    
    for(var i = 0; i < newArradded.length; i++) {
      newArr[i]['studentcount']=value;
      this.handlecalculation(i,newArradded[i]['minamount'],newArradded[i]['maxamount'],newArradded[i]['OptionalMenu']);
    } 
    this.setState({optionaldata:newArradded});

    if(this.state.institute_name !== '' && value !== '' && value > 0)
    {
      this.setState({dispaycalculator:true});
    }
    else
    {
      this.setState({dispaycalculator:false}); 
    }
  }
   
  defaultcount() { 
    const arraylength = this.state.optionaldata.filter(module => module.module_type === 'Default' && module.status === '1' &&  module.DefaultMenu === 'required' );
    this.props.handleValueButton('default',arraylength.length);
  }  
  
  optionalcount() { 
    const arraylength = this.state.optionaldata.filter(module => module.module_type === 'Optional' && module.status === '1' &&  module.OptionalMenu === 'required' );
    this.props.handleValueButton('optional',arraylength.length);
  }   

  GetAllDataByID(type) {    
    this.setState({optionaldata:[]});
    const postData = { pricing_id:type};

    new Service().apiCall('PricingDetails/GetAllDataByID',postData).then(response =>
    {
      if (response.data!='') 
      {                
        const newArr = response.data;
        const newArradded = newArr.map(v => ({...v, OptionalMenu:'notrequired', DefaultMenu:'required', slno:0, studentcount:0, moduleprice:0}));
        const optionalData = newArradded.filter(v=>v.status !== "0");
        this.setState({optionaldata:optionalData}); 
        this.defaultcount();    
      }
    }).catch(error => {
      this.setState({optionaldata:[]});
    });
  }  

  getUserParentMenu(type) {
    const postData = { pricing_id:type };
    new Service().apiCall('PricingDetails/GetAllParentData',postData).then(response =>
    {
      if (response.data!='') 
      {      
        const parentArr = response.data;
        const childArr = this.state.userchildmenudata;
        const newArradded = parentArr.map(v => ({...v, main_module_status:"1"}));

        for(var p=0;p<newArradded.length;p++)
        {
          let opt_module_count = 0;
          let count = 0;

          for(var c=0;c<childArr.length;c++)
          {
            if(newArradded[p]['main_module'] === childArr[c]['main_module'] && childArr[c]['module_type'] === "Optional")
            {
              opt_module_count++;
              if(childArr[c]['status'] === "0")
              {
                count++;
              }
            }
          }
          if(parseInt(opt_module_count) === parseInt(count))
          {
            newArradded[p]['main_module_status'] = "0";
          }
        }
        
        this.setState({usermenudata: newArradded}) 
      }
    }).catch(error => {
      alert("error.response.data.message");
    });
  }   
  
  getPriceHistoryID() {
    const postData = { };
    new Service().apiCall('PricingHistory/getPriceHistoryID',postData).then(response =>
    {
      if (response.data!='') 
      {      
        this.setState({newpricing_id: response.data[0].id});        
        this.setState({pricing_date: response.data[0].pricing_date});        
        this.setState({MinSignupValue: response.data[0].min_signup_value});        
        this.setState({MinSignupfixed: response.data[0].min_signup_value});        
        this.setState({egenius_minmum_student: response.data[0].minmum_student});        
        this.setState({egenius_maximum_student: response.data[0].maximum_student});
        this.props.handleValueButton('payablevalue',response.data[0].min_signup_value); 
        this.setState({defaultpayablevalue: response.data[0].min_signup_value});     
        this.GetAllDataByID(response.data[0].id);  
        this.getUserParentMenu(response.data[0].id); 
      }
    }).catch(error => {
      if(error.response.data === "Data Not Found")
      {
        this.setState({alert: (<SweetAlert style={{fontSize:"10px"}} warning title="Please Add Pricing For Each Module" showConfirm={false} ></SweetAlert>),    
        });
        setTimeout(() => {
          this.setState({ alert:null}); 
          this.props.history.push('/UserPriceCalculator') 
        }, 3000)
      }
      else
      {
        alert(error.response.data);
      }
    });
  }  

  handlecalculation = (index,min,max,type) => {    
    let newvalue = this.state.optionaldata;
    let outputa;
    let minprice = min;
    let maxprice = max;
    let egenius_minmum_student = this.state.egenius_minmum_student; 
    let egenius_maximum_student = this.state.egenius_maximum_student;
    let client_no_student = this.state.optionaldata[index].studentcount;
    let uservalue = this.state.userchildmenudata;

    if(client_no_student === '')
    {
      client_no_student = 0;
    }
    
    let newuservalue = uservalue.filter(o1 => newvalue.some(o2 => o1.id === o2.module_id));

    if(type === 'required' && newvalue[index]['module_type'] !== "Default"){
      if(parseInt(client_no_student) !== '' && parseInt(client_no_student) !== 0 && client_no_student !==''){
        if(newuservalue[index]['pricing'] === "fixed")
        {
          outputa = client_no_student*minprice;
        }
        else if(parseInt(client_no_student) < parseInt(egenius_minmum_student)){ 
          outputa = (egenius_minmum_student-1)*max;
        }else if(parseInt(client_no_student) > parseInt(egenius_maximum_student)){
          outputa = client_no_student*min;
        }else{
          outputa = (((egenius_maximum_student*minprice)-(egenius_minmum_student*maxprice))/(egenius_maximum_student-egenius_minmum_student)*(client_no_student-egenius_minmum_student)) + (egenius_minmum_student*maxprice);    
        }
      }else{
        outputa = 0; 
      }
    }else{
      outputa = 0;
    }
    
    newvalue[index].moduleprice = round(outputa);
    this.setState({optionaldata:newvalue});
    let newprice =  this.state.optionaldata.reduce((element, index) => element + index.moduleprice, 0); 
    let newpricewithdis; 
    let newoptionalmodulevalue;
    let persent; 
    let dis;
    let discount;

    if(this.state.discount != ''){
      discount = this.state.discount;
    }
    else
    {
      discount = 0;
    }
    newpricewithdis = parseInt(newprice);

    let rolediscount = this.state.roles;

    for(var i=0;i<rolediscount.length;i++)
    {
      if(this.props.data.role_id === rolediscount[i]['role_id'])
      {  
        if(rolediscount[i]['price_hike_type'] !== "" && rolediscount[i]['price_hike_type'] === "Percentage")
        {
          newpricewithdis = round(newpricewithdis + (newpricewithdis * (rolediscount[i]['total_price_hike']/100)));
        }
        else if(rolediscount[i]['price_hike_type'] !== "" && rolediscount[i]['price_hike_type'] === "Per Student")
        {
          newpricewithdis = round(newpricewithdis + (parseInt(client_no_student) * parseInt(rolediscount[i]['total_price_hike'])));
        }
        else if(rolediscount[i]['price_hike_type'] !== "" && rolediscount[i]['price_hike_type'] === "Per Deal")
        {
          newpricewithdis = round(newpricewithdis + (parseInt(rolediscount[i]['total_price_hike'])));
        }
      }
    }

    newpricewithdis = round(newpricewithdis*1.18);       // 18% GST

    if(newpricewithdis > this.state.MinSignupfixed){
      if(this.state.discounttype !=='' && this.state.discounttype === 'rupees'){
        dis = discount;
      }else if(this.state.discounttype !=='' && this.state.discounttype !== 'rupees'){
        persent = (parseInt(newpricewithdis)/100)*parseInt(discount);
        dis = persent;
      }else{
        dis = 0;
      } 
    }else{
      if(this.state.discounttype !=='' && this.state.discounttype === 'rupees'){
        dis = discount;
      }else if(this.state.discounttype !=='' && this.state.discounttype !== 'rupees'){
        persent = (parseInt(this.state.MinSignupfixed)/100)*parseInt(discount);
        dis = persent;
      }else{
        dis = 0;
      }
    }
    
    this.setState({newpayablevalue:newpricewithdis});
    if(newpricewithdis > this.state.MinSignupfixed){
      this.props.handleValueButton('payablevalue',parseInt(newpricewithdis) - parseInt(dis));
      this.setState({MinSignupValue:newpricewithdis});
      this.setState({payablevalueinthispage:newpricewithdis});
    }else{
      this.props.handleValueButton('payablevalue',parseInt(this.state.MinSignupfixed) - parseInt(dis));
      this.setState({MinSignupValue:this.state.MinSignupfixed});
      this.setState({payablevalueinthispage:this.state.MinSignupfixed});
    }
  }  

  getInstituteData(){
    const postData = {
      id:this.props.data.id,
      user_id:this.props.data.user_id,
      role_id:this.props.data.role_id
     };
    new Service().apiCall('InstituteDetails/GetAllData',postData).then(response =>
    {
      if (response.data!='') 
      {           
        this.setState({InstituteDetails:response.data,});
      }
    }).catch(error => {
      alert(error.response.data);
    });
  }  
  
  GetDataByInstitutePricingID(id){
    const postData = {institute_pricing_id:id };
    new Service().apiCall('InstitutePricingDetails/GetDataByInstitutePricingID',postData).then(response =>
    {
      if (response.data!='') 
      {           
        const nerarray1 = response.data;
        const nerarray = this.state.optionaldata;       
        const newArradded = nerarray1.map((v,index) => { 
            if(nerarray.includes(nerarray[index]) && nerarray[index].module_type === 'Default' ){
              if(v.default_menu === 'required' ){
                nerarray[index].DefaultMenu='required';
                nerarray[index].OptionalMenu='notrequired'; 
                nerarray[index].moduleprice=parseInt(v.moduleprice); 
              }
            }else if(nerarray.includes(nerarray[index]) && nerarray[index].module_type !== 'Default' ){
              if(v.optional_menu === 'required' ){
                nerarray[index].DefaultMenu='notrequired';
                nerarray[index].OptionalMenu='required'; 
                nerarray[index].moduleprice=parseInt(v.moduleprice); 
              }
            }
          }); 
          
          this.setState({optionaldata:nerarray});
      }
    }).catch(error => {
      alert("error.response.data.message");
    });
  }

  getInstitutePricingHistoryByID(id){
    const postData = {institute_id:id };
    new Service().apiCall('InstitutePricingHistory/GetDataByInstituteIDLatest',postData).then(response =>
    {
      if (response.data!='') 
      {             
        let payable_amount = response.data[0].institute_pricing;  
        this.setState({InstitutePricingHistoryData:response.data});
        this.setState({opentill:response.data[0].open_till});
        this.setState({formdate:response.data[0].date});
        this.setState({formdate:response.data[0].date});
        this.setState({discounttype:response.data[0].discount_type});
        this.setState({discount:response.data[0].discount});
        
        this.props.handleValueButton('payablevalue',response.data[0].payable_amount);
        this.props.handleValueButton('default',response.data[0].default_module_count);
        this.props.handleValueButton('optional',response.data[0].optional_module_count);

        if(parseInt(payable_amount) > parseInt(this.state.MinSignupfixed)){
          this.setState({MinSignupValue:response.data[0].payable_amount});
          //this.setState({payablevalueinthispage:response.data[0].institute_pricing});
        }
        this.setState({payablevalueinthispage:response.data[0].institute_pricing});
        this.setState({newpayablevalue:response.data[0].optional_module_value}); 
        this.GetDataByInstitutePricingID(response.data[0].id);

        this.setState({client_no_student:response.data[0].student_count});
        const newArr = this.state.optionaldata;
        const newArradded = newArr.map(v => ({...v,studentcount:response.data[0].student_count}));
        this.setState({optionaldata:newArradded});
    
      }
    }).catch(error => {
        this.props.handleValueButton('payablevalue',this.state.MinSignupfixed);
        this.defaultcount();
        this.optionalcount();
        this.setState({MinSignupValue:this.state.MinSignupfixed});
        this.setState({payablevalueinthispage:this.state.MinSignupfixed});
        this.setState({newpayablevalue:0});
    });
  }
  
  handleInstituteDetails(id,count,institute_name){
    this.getInstitutePricingHistoryByID(id);
    this.setState({institute_id:id});
    this.setState({institute_name:institute_name});
    this.setState({client_no_student:count});
    
    let rolediscount = this.state.roles;

    for(var i=0;i<rolediscount.length;i++)
    {
      if(this.props.data.role_id === rolediscount[i]['role_id'])
      {  
        if(rolediscount[i]['price_hike_type'] !== "" && rolediscount[i]['price_hike_type'] === "Percentage")
        {
          let MinimumSignupfixed = round(parseInt(this.state.MinSignupfixed) + (parseInt(this.state.MinSignupfixed) * parseInt(rolediscount[i]['total_price_hike']/100)));
          this.setState({MinSignupfixed:MinimumSignupfixed});
        }
        else if(rolediscount[i]['price_hike_type'] !== "" && rolediscount[i]['price_hike_type'] === "Per Student")
        {
         let MinimumSignupfixed = round(parseInt(this.state.MinSignupfixed) + (parseInt(count) * parseInt(rolediscount[i]['total_price_hike'])));
          this.setState({MinSignupfixed:MinimumSignupfixed});
        }
        else if(rolediscount[i]['price_hike_type'] !== "" && rolediscount[i]['price_hike_type'] === "Per Deal")
        {
          let MinimumSignupfixed = round(parseInt(this.state.MinSignupfixed) + parseInt(rolediscount[i]['total_price_hike']));
          this.setState({MinSignupfixed:MinimumSignupfixed});
        }
        
      }
    }

    const newArr = this.state.optionaldata;
    const newArradded = newArr.map(v => ({...v,studentcount:count}));
    this.setState({optionaldata:newArradded});
    
    if(institute_name !== '' && count !== '' && count > 0)
    {
      this.setState({dispaycalculator:true});
    }
    else
    {
      this.setState({dispaycalculator:false}); 
    }
  }

  handleClientPricing()
  {
    this.setState({buttondisabled:true});
    this.setState({buttonname:'Submitting...'});
    let formData = new FormData();
    formData.append('pricing_id',this.state.newpricing_id);
    formData.append('pricing_date',this.state.pricing_date);
    formData.append('institute_id',this.state.institute_id);
    formData.append('institute_name',this.state.institute_name);
    formData.append('discount',this.state.discount);
    formData.append('discount_type',this.state.discounttype);
    formData.append('date',this.state.formdate);
    formData.append('open_till',this.state.opentill);
    formData.append('client_no_student',this.state.client_no_student);
    formData.append('payable_amount',this.props.payablevalue);
    formData.append('discount_amount',this.state.payablevalueinthispage - this.props.payablevalue);
    formData.append('institute_pricing',this.state.payablevalueinthispage);
    formData.append('optional_module_count',this.props.optionaldatacount);
    formData.append('default_module_count',this.props.defaultdatacount);
    formData.append('moduledata',JSON.stringify(this.state.optionaldata));
    formData.append('optional_module_value',this.state.newpayablevalue); 
    formData.append('created_by',this.props.data.user_id);    
   
    new Service().apiCall('InstitutePricingHistory/CreatePricing', formData).then(response => 
    { 
      this.setState({buttondisabled:false});
      this.setState({buttonname:'Submit'});
      if (response.status === 200 && response.data !== '') 
      {
        this.setState({
          alert: (
            <SweetAlert
              success
              confirmBtnBsStyle="success"
              title="Client Pricing Updated Successfully!"
              showConfirm={false}
            >Now you can access all support of this leads
            </SweetAlert>    
          ),
        });
        setTimeout(() => {
          this.setState({ alert:null});
          this.props.handleSelectedButton('close');
        }, 2000)
        this.props.handleValueButton('optional',0);
      } 
    }).catch(error => {
      this.errorAlert('error');
    });
  } 

  errorAlert = (modalType) => {
    this.setState({alert: (<SweetAlert danger confirmBtnBsStyle="danger" title="Something bad happened!!!" onConfirm={() => { this.setState({ alert: null });}}> We are regretting for it</SweetAlert>),    
    });
  };

  handleDiscountType(discountType){
    let newpayablevalue = this.state.payablevalueinthispage;
    let maxdiscountamount;
    let maxper;
    this.props.handleValueButton('payablevalue',newpayablevalue);

    let rolediscount = this.state.roles;
    
    for(var i=0;i<rolediscount.length;i++)
    {
      if(this.props.data.role_id === rolediscount[i]['role_id'])
      {  
        maxdiscountamount = (newpayablevalue)*(rolediscount[i]['max_discount_allowed']/100);
        maxper = rolediscount[i]['max_discount_allowed'];
      }
    }

    if(discountType === "rupees")
    {
      this.setState({discounttype:'rupees'})
      this.setState({discount:''})
      this.setState({alloweddiscounttext:"Max Allowed: "+maxdiscountamount+"/-"});
    }
    else
    {
      this.setState({discounttype:'percentage'})
      this.setState({discount:''})
      this.setState({alloweddiscounttext:"Max Allowed: "+maxper+"%"});
    }
  }

  handlediscount(value){
    let discounttype = this.state.discounttype;
    let newpayablevalue = this.state.payablevalueinthispage;
    let newvalue = parseInt(value);
    let payablevaluenew = this.props.payablevalue;
    let persent;
    let output;
    let maxdiscountamount;
    let maxdiscountpercentage;
    let maxper;

    let rolediscount = this.state.roles;
    
    for(var i=0;i<rolediscount.length;i++)
    {
      if(this.props.data.role_id === rolediscount[i]['role_id'])
      {  
        maxdiscountamount = (newpayablevalue)*(rolediscount[i]['max_discount_allowed']/100);
        maxdiscountpercentage = rolediscount[i]['max_discount_allowed']/100;
        maxper = rolediscount[i]['max_discount_allowed'];
      }
    }

    
    if(value == 0)
    {
      this.setState({discount:0});
      output = newpayablevalue;
    }
    else if(value !== '' ){
      if(discounttype !=='' && discounttype === 'rupees'){
        this.setState({alloweddiscount:maxdiscountamount});
        this.setState({alloweddiscounttext:"Max Allowed: "+maxdiscountamount+"/-"});
        if(value <= parseInt(maxdiscountamount))
        {
          output = parseInt(newpayablevalue)-parseInt(newvalue);
          this.setState({buttondisabled:false});
        }
        else
        {
          output = parseInt(newpayablevalue)-parseInt(maxdiscountamount);
          this.setState({discount:maxdiscountamount});
          //this.setState({buttondisabled:true});
        }
      }else if(discounttype !=='' && discounttype !== 'rupees'){
        this.setState({alloweddiscount:maxper});
        this.setState({alloweddiscounttext:"Max Allowed: "+maxper+"%"});
        if(value <= parseInt(maxper))
        {
          persent = (parseInt(newpayablevalue)/100)*parseInt(newvalue);
          output = parseInt(newpayablevalue)-persent;
          this.setState({buttondisabled:false});
        }
        else
        {
          persent = (parseInt(newpayablevalue)/100)*parseInt(maxper);
          output = parseInt(newpayablevalue)-persent;
          this.setState({discount:maxper});
          //this.setState({buttondisabled:true});
        }
      }else{
        output = newpayablevalue;
      }
    }else{
      output = newpayablevalue;
    }
    
    this.props.handleValueButton('payablevalue',output);
  }

  toggleOpen(idx){
    //console.log(idx); 
  }

  getRolesDiscount = () => {
    const postData = { };
    new Service().apiCall('DiscountSetting/GetAllData',postData).then(response => {
      if (response.status==200 && response.data!='') {
       
      this.setState({ roles: response.data }); 
      }
    }).catch(error => {
      console.log(error);
    });
  }

  getUserChildMenu() {
    const postData = { };
    new Service().apiCall('UserMenu/GetAllChildData',postData).then(response =>
    {
      if (response.data!='') 
      {      
        const newArr = response.data;
        const newArradded = newArr.map(v => ({...v, minamount:'', maxamount:'', amount_error:'', student_disabled:true}));
        this.setState({userchildmenudata: newArradded}) 
      }
      else{
        this.setState({userchildmenudata:[]})
      }
    }).catch(error => {
      alert("error.response.data.message");
    });
  }

  componentDidMount() { 
    var result = new Date(this.state.formdate);
    result.setDate(result. getDate() + 15);
    let proposed_date = Moment(result).format("YYYY-MM-DD");
    this.setState({opentill:proposed_date}); 

    this.props.handleValueButton('optional',0);

    this.getRolesDiscount();
    this.getPriceHistoryID();  
    this.getInstituteData();  
    this.getUserChildMenu();

      // Take the Reference of Close Button 
      const close = document.getElementsByClassName( 
        "MuiAutocomplete-clearIndicator"
      )[0]; 
        
      // Add a Click Event Listener to the button 
      close.addEventListener("click", () => { 
        this.setState({dispaycalculator:false}); 
        this.setState({client_no_student:''});
        this.setState({institute_id:''});
        this.setState({institute_name:''}); 
 
        this.getPriceHistoryID();
        this.setState({newpayablevalue:0}); 
        this.props.handleValueButton('optional',0); 
      }); 

      if(this.props.token === '' || this.props.token === null)
      {
        this.props.history.push('/auth/login-page');
      }
  }
  checkAccess = () => {
    return (
    <CheckAccess {...this.props} />
    )
  }
  renderDefaultModules = () =>{
    const classes = this.props.classes;
    return(      
      <Dialog  fullScreen  open={this.state.DefaultModule} onClose={()=> this.setState({DefaultModule:false})} TransitionComponent={Transition} className={classes.Overlay}>
        <AppBar className={classes.CustomappBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={()=> this.setState({DefaultModule:false})} aria-label="close" className={classes.CloseButton}>
            <LeftAorrow />
            </IconButton>
            <h4 className={classes.SliderTitle}>Default Modules</h4>  
          </Toolbar>
        </AppBar>
        <GridContainer justify="center" alignItems="center" style={{paddingTop:"3%",paddingBottom:"3%"}} className={classes.SliderBackground}>
          <GridItem lg={8} md={8} sm={12} xs={12}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Sl.No</StyledTableCell>
                    <StyledTableCell align="left">Modules</StyledTableCell>
                    <StyledTableCell align="left">Sub Modules</StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.optionaldata.map((element,index) => (element.module_type === 'Default' && 
                  <StyledTableRow key={element.id}>
                    <StyledTableCell component="th" scope="row" align="center" >{index+1}</StyledTableCell>
                    <StyledTableCell align="left">{element.main_module}</StyledTableCell>
                    <StyledTableCell align="left">{element.sub_module}</StyledTableCell>
                    <StyledTableCell align="center"> 
                      <FormControlLabel control={<GreenCheckbox  name="Required" />} checked={element.DefaultMenu === 'required'}/>
                    </StyledTableCell>
                  </StyledTableRow>))}
                </TableBody>
              </Table>
            </TableContainer>
          </GridItem>
        </GridContainer>
      </Dialog>   
    )};
    renderOptedModules = () =>{
        const classes = this.props.classes;
        return(
        <Dialog fullScreen open={this.state.OptedModule} onClose={()=>this.setState({OptedModule:false})} TransitionComponent={Transition} className={classes.Overlay}>
          <AppBar className={classes.CustomappBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={()=>this.setState({OptedModule:false})} aria-label="close" className={classes.CloseButton}>
              <LeftAorrow />
              </IconButton><h4 className={classes.SliderTitle}>Modules Opted</h4>  
            </Toolbar>
          </AppBar>
          <GridContainer  justify="center" alignItems="center" style={{paddingTop:"3%",paddingBottom:"3%"}} className={classes.SliderBackground}>
            <GridItem lg={8} md={8} sm={12} xs={12}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">Sl.No</StyledTableCell>
                      <StyledTableCell align="left">Modules</StyledTableCell>
                      <StyledTableCell align="left">Sub Modules</StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.optionaldata.map((element,index) => (element.OptionalMenu === 'required' && 
                    <StyledTableRow key={element.id}>
                      <StyledTableCell component="th" scope="row" align="center" >{index+1}.</StyledTableCell>
                      <StyledTableCell align="left">{element.main_module}</StyledTableCell>
                      <StyledTableCell align="left">{element.sub_module}</StyledTableCell>
                      <StyledTableCell align="center"> 
                        <FormControlLabel control={<GreenCheckbox  name="Required" onClick={()=> {if(element.OptionalMenu != 'required'){this.handlerequired(index,'OptionalMenu','required')}else{this.handlerequired(index,'OptionalMenu','notrequired')}}} />} checked={element.OptionalMenu === 'required'}/>
                      </StyledTableCell>
                    </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </GridItem>
          </GridContainer>
        </Dialog>   
        )};

  render(){ 
    const classes = this.props.classes;
  return (
      <div className={classes.Accordianinput}>       
      {this.state.alert}
        <GridContainer justify="center" alignItems="center" style={{marginTop:"2%"}}>
          <GridItem lg={9} md={9} sm={12} xs={12}>
            <Card className={classes.MainCard}>
              <CardBody>                
                <GridContainer>
                  <GridItem lg={3} md={3} xs={12} sm={12}>
                    <button className={classes.CardButton} >
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12} lg={12} style={{textAlign:'center'}}>
                        <Typography>
                          Optional Module Value{<NumberFormat displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'₹ '} value={this.state.newpayablevalue} renderText={value => <div>{value}</div>} />}
                        </Typography>
                      </GridItem>                          
                    </GridContainer>
                    </button>
                  </GridItem>  
                  <GridItem lg={3} md={3} xs={12} sm={12}>
                    <button className={classes.CardButton} >
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12} lg={12} style={{textAlign:'center'}}>
                        <Typography>
                          Payable Value{<NumberFormat displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'₹ '} value={this.props.payablevalue} renderText={value => <div>{value}</div>} />}
                        </Typography>
                      </GridItem>                          
                    </GridContainer>
                    </button>
                  </GridItem> 
                  <GridItem lg={3} md={3} xs={12} sm={12}>
                    <button className={classes.CardButton} onClick={()=> this.setState({DefaultModule:true})} >
                    <GridContainer>
                      <GridItem xs={8} sm={8} md={10} lg={10} style={{textAlign:'center'}}>
                        <Typography style={{paddingTop:"10px"}}>Default Modules <div>{this.props.defaultdatacount}</div></Typography>
                      </GridItem> 
                      <GridItem  className="pickerGrid" xs={4} sm={4} md={2} lg={2} style={{textAlign:'center',margin:'auto'}}>    
                        <Avatar style={{float:'right',marginRight:10,color:'blue !important'}}>
                          <NavigateNext  style={{color:'blue !important'}} />
                        </Avatar>
                      </GridItem>
                    </GridContainer>
                    </button>
                    {this.renderDefaultModules()}
                  </GridItem>
                  <GridItem lg={3} md={3} xs={12} sm={12}>
                    <button className={classes.CardButton} onClick={()=>this.setState({OptedModule:true})} >
                    <GridContainer>
                      <GridItem xs={8} sm={8} md={10} lg={10} style={{textAlign:'center'}}>
                        <Typography style={{paddingTop:"10px"}}>Add-on Modules<div>{this.props.optionaldatacount}</div></Typography>
                      </GridItem> 
                      <GridItem  className="pickerGrid" xs={4} sm={4} md={2} lg={2} style={{textAlign:'center',margin:'auto'}}>    
                        <Avatar style={{float:'right',marginRight:10}}>
                          <NavigateNext />
                        </Avatar>
                      </GridItem>
                    </GridContainer>
                    </button>
                    {this.renderOptedModules()}
                  </GridItem> 
                </GridContainer>
                <GridContainer justify="center" alignItems="center"  style={{marginTop:"2%"}}  className="outlinedInput">
                  <GridItem lg={1} md={1} sm={12} xs={12}></GridItem>
                  <GridItem lg={6} md={6} sm={12} xs={12}>
                    <Autocomplete
                      freeSolo
                      id="InstituteDetails_value"  
                      options={this.state.InstituteDetails}
                      onChange={(event, value) => { if(value) {this.handleInstituteDetails(value.id,value.institute_student_count,value.institute_name)}}}
                      getOptionLabel={(option) => option.institute_name}
                      renderInput={(params) => <TextField {...params} label="Search Institution by Name" variant="outlined" />} 
                    /> 
                  </GridItem>
                  <GridItem lg={3} md={3} sm={12} xs={12}>
                    <TextField className={classes.textfields} label="No of Students" 
                      variant="outlined" id="outlined-size-small" value={this.state.client_no_student} onChange={(event)=> {this.handlestudentcount(event.target.value);this.setState({client_no_student:event.target.value})}}size="small" onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }} style={{ width: "100%" }}
                      />
                  </GridItem> 
                  {/*<GridItem  className="pickerGrid" xs={4} sm={4} md={2} lg={1} style={{textAlign:'right',margin:'auto'}}>    
                    <Avatar style={{float:'right',marginRight:10}}>
                      <NavigateNext />
                    </Avatar>
                  </GridItem>  
                  <GridItem lg={1} md={1} sm={12} xs={12}></GridItem>*/}
                </GridContainer> 
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>

        {this.state.dispaycalculator === true && <div><GridContainer justify="center" alignItems="center">
          <GridItem lg={8} md={8} xs={12} sm={12}>
            {this.state.usermenudata.map((item, index) => (item.module_type !== 'Default' && item.main_module_status !== "0" &&
            <Accordion expanded={this.state.expanded === index} onChange={this.handleChange(index)} >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="pane21bh-content"
                id="panel2bh-header"
                onToggle={() => this.toggleOpen(index)}
              >
                <Typography className={classes.Modulehead}>{item.main_module}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <GridContainer> 
                  <GridItem lg={12} md={12} sm={12} xs={12}> 
                    {this.state.optionaldata.map((subitem, subitemindex) => ( subitem.main_module === item.main_module && subitem.module_type !== 'Default' &&
                    <Card className={classes.SubmoduleCard} style={{marginBottom:'10px'}}>
                      <CardBody className={classes.SubmoduleCardBody}>
                        <GridContainer className={classes.SubmoduleCardRadio}>
                          <GridItem lg={1} md={1} xs={2} sm={2}><p className={classes.Submoduledetails}>{subitemindex+1}.</p></GridItem>
                          <GridItem lg={4} md={4} xs={10} sm={10}><p className={classes.Submoduledetails}>{subitem.sub_module}</p></GridItem>
                          <GridItem lg={3} md={3} xs={12} sm={12}>
                            <TextField
                              InputProps={{
                                readOnly: subitem.OptionalMenu !=='required' ? true : false,
                              }} 
                              className={classes.textfields} 
                              label="No of Students"
                              variant="outlined" 
                              id="outlined-size-small" 
                              size="small" 
                              value={subitem.studentcount}
                              onChange={(event)=> {this.handlerequired(subitemindex,'studentcount',event.target.value);this.handlecalculation(subitemindex,subitem.minamount,subitem.maxamount,subitem.OptionalMenu)}}
                              onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                              style={{ width: "100%" }} />
                          </GridItem>
                          <GridItem lg={4} md={4} xs={12} sm={12}>
                          <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" name="position">                               
                              <FormControlLabel control={<Radio color="primary" onClick={()=> {this.handlerequired(subitemindex,'OptionalMenu','required',subitem.pricing_id);this.handlecalculation(subitemindex,subitem.minamount,subitem.maxamount,'required')}} />} checked={subitem.OptionalMenu =='required'} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Required</span>} />
                              <FormControlLabel control={<Radio color="primary" onClick={()=> {this.handlerequired(subitemindex,'OptionalMenu','notrequired',subitem.pricing_id)}} />} checked={subitem.OptionalMenu =='notrequired'} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Not Required</span>} />
                            </RadioGroup>
                          </FormControl>
                          </GridItem>
                        </GridContainer>
                      </CardBody>
                    </Card>))}
                  </GridItem>                 
                </GridContainer>
              </AccordionDetails>
            </Accordion>))}
          </GridItem>
        </GridContainer>

        <GridContainer justify="center" alignItems="center"> 
          <GridItem md={8} lg={8} xs={12} sm={12} >
            <Card>
              <CardBody> 
                <GridContainer justify="center" alignItems="center">                 
                  <GridItem md={3} lg={3} xs={12} sm={12} style={{textAlign:"center"}} >
                    <FormControl component="fieldset">
                      <RadioGroup row aria-label="position" name="position">     							
                        <FormControlLabel control={<Radio color="primary"  />} onClick={()=> {this.handleDiscountType('rupees')}} checked={this.state.discounttype === 'rupees'} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>₹</span>} />							  
                        <FormControlLabel control={<Radio color="primary" />} onClick={()=> {this.handleDiscountType('percentage')}}  checked={this.state.discounttype === 'percentage'}  label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>%</span>} />
                      </RadioGroup>
                    </FormControl>
                  </GridItem>  
                  <GridItem md={3} lg={3} xs={12} sm={12} style={{marginTop:"20px"}} className={classes.DiscountInput}>
                    <TextField 
                    
                      error = {(this.state.discounttype !== "" && parseInt(this.state.discount) > parseInt(this.state.alloweddiscount))}
                      className={classes.textfields}   
                      label="Discount"
                      variant="outlined" 
                      id="outlined-size-small" 
                      size="small" 
                      helperText={this.state.alloweddiscounttext} 
                      disabled = {this.state.discounttype === '' ? true : false }
                      value={this.state.discount} 
                      onChange={(event)=> {this.setState({discount:parseInt(event.target.value)});this.handlediscount(event.target.value)}}
                      onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }} 
                      style={{ width: "100%" }} />
                  </GridItem>  
                
                  <GridItem md={3} lg={3} xs={12} sm={12} style={{float:"right"}} >
                  <FormControl fullWidth>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                        autoOk={true}
                        value={this.state.formdate}
                        shrink={true}
                        id="date-picker-dialog"
                        label="Date of Creation"
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
                  <GridItem md={3} lg={3} xs={12} sm={12} style={{float:"right"}} >
                  <FormControl fullWidth>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                        autoOk={true}
                        value={this.state.opentill}
                        shrink={true}
                        id="date-picker-dialog"
                        label="Proposal Valid Till"
                        inputVariant="outlined"
                        format="dd/MM/yyyy"
                        onChange={this.handleopentillChange}   
                        KeyboardButtonProps={{
                        'aria-label': 'change date', 
                        }} 
                        disabled={true}
                        />
                      </MuiPickersUtilsProvider>                  
                    </FormControl>
                  </GridItem> 
                </GridContainer>
               
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>  
        
        <GridContainer justify="center" alignItems="center"  style={{marginBottom:'20px'}}>  
          <GridItem md={8} lg={8} xs={12} sm={12} style={{float:"right"}} >
            <MButton className={classes.FinalSubmitButton} variant="outlined" style={{float:"right"}} disabled={this.state.buttondisabled}  onClick={this.handleClientPricing.bind(this)} >
              {this.state.buttonname}
            </MButton>
          </GridItem>
        </GridContainer>
        </div>}

        <Drawer anchor="right" open={this.state.dependentModule} onClose={()=>this.setState({dependentModule:false,selectedDependent:[]})} TransitionComponent={Transition} className={classes.Overlay}>
        <Box style={{width:800, backgroundColor:'#eeeeee'}} >
          <AppBar className={classes.CustomappBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={()=>this.setState({dependentModule:false})} aria-label="close" className={classes.CloseButton}>
              <LeftAorrow />
              </IconButton><h4 className={classes.SliderTitle}>Below Modules will be Removed</h4>  
            </Toolbar>
          
          </AppBar>
          </Box>
          <GridContainer  justify="center" alignItems="center" style={{paddingTop:"3%",paddingBottom:"3%"}} className={classes.SliderBackground}>
              <GridItem lg={8} md={8} sm={8} xs={8} component={Paper}>
                    {this.state.selectedDependent.map((element,index) => ( 
                       <List component="nav" className={classes.root} aria-label="mailbox folders">
                       <ListItem button key={element.id}>
                         <ListItemText primary={element.name} />
                       </ListItem>
                       <Divider />
                     </List>
                     ))}
                        <GridContainer>
                          <GridItem lg={12} md={12} sm={12} xs={12} style={{textAlign:"right"}}>
                          <MButton variant="outlined" size="sm"  style={{color:'#4caf50',border:'1px solid #4caf50',backgroundColor:'transparent',margin:"5px"}} onClick={()=>this.handleConfirm()}>Ok</MButton>
                        <MButton variant="outlined" size="sm"  style={{color:'red',border:'1px solid red',backgroundColor:'transparent',margin:"5px"}} onClick={()=>this.setState({dependentModule:false,selectedDependent:[]})} >Cancel</MButton>
                          </GridItem>
                        </GridContainer>
              </GridItem>
            </GridContainer>
        </Drawer>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToPros)(withStyles(styles)(AdminDashboard)); 