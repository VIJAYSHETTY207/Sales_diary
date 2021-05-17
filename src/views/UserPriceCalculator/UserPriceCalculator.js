import React from "react";
import 'date-fns';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import {Animated} from "react-animated-css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MButton from '@material-ui/core/Button';
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { withStyles } from '@material-ui/styles';
import Service from 'Utils/Service';
import Avatar from '@material-ui/core/Avatar';
import NavigateNext from "@material-ui/icons/NavigateNext";
import UserPricingForm from './UserPriceingPages/UserPricingForm.js';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToPros } from '../../Utils/MapStateDispatchProps.js';
import CheckAccess from "components/CheckAccess.js";  

const divStyle = {
  display: 'flex',  justifyContent:'center', alignItems:'center' // 'ms' is the only lowercase vendor prefix
};
const divStyle2 = {
  marginTop:'10px',marginBottom:'10px',display: 'flex',justifyContent:'center', alignItems:'center' // 'ms' is the only lowercase vendor prefix
};

const panelStyles = {
  panelClass: {
    zIndex:999
  },
  ModalStyle: {
    width:'100% !important',
    backgroundColor:'#ddd'
  }
};

const pageStyles = {...styles, ...panelStyles }
const useStyles = makeStyles(pageStyles);

class Dashboard extends React.Component 
{
  constructor(props) 
  {
    super(props);
    this.state = {
      selectType:'',
      UserPricingForm:false,
      UserPricingHistory:false, 
      tableData: [],
      NoDatatableData: [],
      payablevalue: 40000,
      defaultdatacount:0,
      optionaldatacount:0,

    }
  }

  scrollToTop = (type) => {
    if(type === 'close'){
      this.setState({ UserPricingForm: false });
    }
    const container = document.querySelector('.slide-pane__content');  
    container.scrollTo({top: 0, left: 0, behavior: 'smooth' });
  }; 

  getLeadDashboardData() {
    const postData = {
      pincode:''
    };
    new Service().apiCall('Dashboards/get_dashboard_data',postData).then(response =>
    {
      if (response.data!='') 
      {                
        this.setState({todays_schedule_count:response.data.todays_schedule_count});
        this.setState({upcoming_schedule_count:response.data.upcoming_schedule_count});
      }
      else{
        this.setState({countData:[]})
      }
    }).catch(error => {
      alert("error.response.data.message");
    });
  }

  getSchedulePlannerData() {
    const postData = {
      status:'Todays'
    };
    new Service().apiCall('SchedulePlanner/GetScheduleDataByStatus',postData).then(response =>
    {
      if (response.data!='') 
      {                
        this.setState({tableData:response.data});
      }
    }).catch(error => {
      this.setState({NoDatatableData: [{ id: '1', name: '',}]})
    });
  }   

  valuecalculation= (type,value)=>{
    if(type==='payablevalue'){
      this.setState({payablevalue:value});
    }else if(type==='optional'){
      this.setState({optionaldatacount:value});
    }else{
      this.setState({defaultdatacount:value});
    }
  }

  componentDidMount() {
    this.getLeadDashboardData(); 
    this.getSchedulePlannerData();

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
  renderHeader = () => {
    return (
      <GridContainer>
        <GridItem xs={12} sm={10} md={6} style={{margin:'auto'}}>
          <div>User Price Calculation</div>
        </GridItem> 
        <GridItem xs={12} sm={10} md={6} style={{textAlign:'right'}}> 
          <Chip
            style={{marginRight:5}}
            avatar={<Avatar>{this.state.defaultdatacount}</Avatar>}
            label="Default"
            clickable
            color="primary"
            variant="outlined"
          /> 
          <Chip
            style={{marginRight:5}}
            avatar={<Avatar>{this.state.optionaldatacount}</Avatar>}
            label="Optional"
            clickable
            color="primary"
            variant="outlined"
          /> 
          
          <Tooltip title="Payable Value" aria-label="add">
          <Chip
            style={{marginRight:5}}
            avatar={<Avatar>₹</Avatar>}
            label={<NumberFormat displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh"  value={this.state.payablevalue} renderText={value => <div>{value}</div>} />}
            clickable
            color="primary"
            variant="outlined"
          /> 
          </Tooltip>
        </GridItem>
      </GridContainer>
    )
  }

  render(){
  const { classes } = this.props;

  return (
    <div>
      <Animated  className="Animated" animationIn="slideInRight" animationOut="slideOutLeft" >         
        
        <GridContainer  justify="center" alignItems="center" style={{marginTop:'10px',padding:'0px'}}>              
          <GridItem xs={12} sm={12} md={6}>  
            <Card style={{marginTop:0,marginBottom:'10px',padding:'0px'}} className="cardBackgroundTransparent">
              <CardBody style={{padding:'0px'}} onClick={()=> this.setState({UserPricingForm:true})}>
              <div style={{display:'block',cursor:'pointer'}}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={10}> <Button style={{float:'center',fontSize:'20px'}} color="transparent">Price Calculator</Button></GridItem> 
                  <GridItem  className="pickerGrid"  xs={12} sm={12} md={2} style={{textAlign:'right',margin:'auto'}}>    
                    <Avatar style={{float:'right',marginRight:10}}>
                      <NavigateNext />
                    </Avatar>
                  </GridItem>
                </GridContainer>
              </div>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>

      </Animated>	 

      <SlidingPane
        style={{backgroundColor:'#39bdd6 !important'}}
        closeIcon={<div >   
          <Button justIcon round color="white" style={{color:'black'}} >
          <KeyboardArrowLeft style={{width:36,height:36}} className={classes.sidebarMiniIcon} />
          </Button></div>}  
          className={classes.ModalStyle}
          overlayClassName={classes.panelClass}
          isOpen={ this.state.UserPricingForm }
          title={this.renderHeader()}
          // title="User Price Calculation"
          onRequestClose={ () => this.setState({ UserPricingForm: false })}>
          <div>  
            <UserPricingForm handleSelectedButton={this.scrollToTop} handleValueButton={this.valuecalculation} {...this.props} optionaldatacount={this.state.optionaldatacount} defaultdatacount={this.state.defaultdatacount} payablevalue={this.state.payablevalue} />
          </div> 
      </SlidingPane>       	
    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToPros)(withStyles(pageStyles)(Dashboard));  
