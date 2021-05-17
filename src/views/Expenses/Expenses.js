import React from "react";
import 'date-fns';
import axios from 'axios';
// react plugin for creating charts
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MButton from '@material-ui/core/Button';
// @material-ui/icons
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import ButtonGroup from '@material-ui/core/ButtonGroup';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import {Animated} from "react-animated-css";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { withStyles } from '@material-ui/styles';
import Summary from "./ExpensesPages/Summary.js";
import Approval from "./ExpensesPages/Approval.js";
import CreateSelfExpenses from "./ExpensesPages/CreateClaimExpenses.js";
import ViewSelfExpenses from "./ExpensesPages/ViewClaimExpensex.js";
import Payment from "./ExpensesPages/ViewClaimExpensex.js";
import Service from 'Utils/Service';
//redux functions
import CheckAccess from "components/CheckAccess.js";
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToPros } from '../../Utils/MapStateDispatchProps.js'
const panelStyles = {   
  divStyle : {
    display: 'flex',  justifyContent:'center', alignItems:'center' 
  },  
  divStyle2 : {
    marginTop:'10px',marginBottom:'10px',display: 'flex',justifyContent:'center', alignItems:'center',fontSize:'14px'

  },  
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
      teamexpenses:false,
      selfexpenses:false,
      create_selfexpenses:false,
      view_selfexpenses:false,
      payment:false,
      total_leads:0,
      active_leads:0,
      deactive_leads:0,
      lead_count:0,
      prospect_count:0,
      qualified_count:0,
      unqualified_count:0,
      commited_count:0,
      converted_count:0,
      countData:[],
      optype:'',
    }  
    this.statecreate = {
      isOpen:false
    }
  }

  scrollToTop = (type) => {
    if(type === 'close'){
      this.setState({ teamexpenses: false });
    }
    const container = document.querySelector('.slide-pane__content');  
    container.scrollTo({top: 0, left: 0, behavior: 'smooth' });
    this.getLeadDashboardData();
  }

  renderHeader = () => {
    return (
      <GridContainer>
        {this.state.optype === 'selfexpenses' && <>
        <GridItem xs={12} sm={10} md={6} style={{margin:'auto'}}>
        <div>Claim Expenses</div>
         </GridItem> 
          <GridItem xs={12} sm={10} md={6} style={{textAlign:'right'}}>
            <ButtonGroup  color="secondary" aria-label="outlined secondary button group" className="buttonGroup">
              <MButton variant={this.state.selectType == "createselfexpenses" ?"contained":"outlined"} onClick={()=>this.setState({selectType:'createselfexpenses'})}>Create</MButton> 
              <MButton variant={this.state.selectType == "viewselfexpenses" ?"contained":"outlined"} onClick={()=>this.setState({selectType:'viewselfexpenses'})}>View</MButton>          
            </ButtonGroup>
          </GridItem>
          </>} 
          {this.state.optype === 'teamexpenses' && <>
          <GridItem xs={12} sm={10} md={6} style={{margin:'auto'}}>
          <div>Team Expenses</div>
         </GridItem> 
          <GridItem xs={12} sm={10} md={6} style={{textAlign:'right'}}>
            <ButtonGroup  color="secondary" aria-label="outlined secondary button group" className="buttonGroup">
              <MButton variant={this.state.selectType == "Summary" ?"contained":"outlined"} onClick={()=>this.setState({selectType:'Summary'})}>Summary</MButton>
              <MButton variant={this.state.selectType == "Approval" ?"contained":"outlined"} onClick={()=>this.setState({selectType:'Approval'})}>Approval</MButton>
            </ButtonGroup>
          </GridItem>
          </>}
          {this.state.optype === 'payment' && <>
          <GridItem xs={12} sm={10} md={6} style={{margin:'auto'}}>
          <div>Payment</div>
         </GridItem> 
          </>}
      </GridContainer>
    )
  }

  operationtype(name){
    this.setState({optype:name});
  }

  getLeadDashboardData() {
    const postData = {
      pincode:''
    };
    new Service().apiCall('Dashboards/get_dashboard_data',postData).then(response =>
    {
      if (response.data!='') 
      {                
        this.setState({total_leads:response.data.total_leads});
        this.setState({active_leads:response.data.active});
        this.setState({deactive_leads:response.data.deactive});
        this.setState({lead_count:response.data.lead_count});
        this.setState({prospect_count:response.data.prospect_count});
        this.setState({qualified_count:response.data.qualified_count});
        this.setState({unqualified_count:response.data.unqualified_count});
        this.setState({commited_count:response.data.commited_count});
        this.setState({converted_count:response.data.converted_count});
      }
      else{
        this.setState({countData:[]})
      }
    }).catch(error => {
      alert("error.response.data.message");
    });
  }

  componentDidMount() {
    this.getLeadDashboardData();
  }
  checkAccess = () => {
    return (
    <CheckAccess {...this.props} />
    )
  }
  render(){
  const { classes } = this.props;

  return (
      <div>    
        <Animated  className="Animated" animationIn="slideInRight" animationOut="slideOutLeft" > 
          <GridContainer>	 
            <GridItem xs={12} sm={6} md={6} lg={3}>
              <Card>
                <CardBody>
                  <div className={classes.divStyle}>
                  <a style={{color:'#000',cursor:'pointer'}}><h4>Submitted</h4>
                    <h3 className={classes.divStyle2}>Rs. 500</h3>
                  </a>
                  </div>
                </CardBody>
              </Card>
            </GridItem> 
            <GridItem xs={12} sm={6} md={6} lg={3}>
              <Card>
                <CardBody>
                  <div className={classes.divStyle} >
                  <a style={{color:'#000',cursor:'pointer'}}><h4>Approved</h4>
                    <h3 className={classes.divStyle2}>Rs. 1000</h3>
                  </a>
                  </div>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6} lg={3}>
              <Card>
                <CardBody>
                  <div className={classes.divStyle}>
                  <a style={{color:'#000',cursor:'pointer'}}><h4>Paid</h4>
                    <h3 className={classes.divStyle2}>Rs. 2000</h3>
                  </a>
                  </div>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6} lg={3}>
              <Card>
                <CardBody>
                  <div className={classes.divStyle}>
                  <a style={{color:'#000',cursor:'pointer'}}><h4>Rejected</h4>
                    <h3 className={classes.divStyle2}>Rs. 100</h3>
                  </a>
                  </div>
                </CardBody>
              </Card>
            </GridItem>	 
            <GridItem xs={12} sm={12} md={12} lg={4}>   
              <button style={{width:'100%',padding:'.5rem 1rem',fontSize: '1.1rem'}} type="submit" class="btn btn-warning" onClick={() => {this.setState({teamexpenses:true,selectType:'createselfexpenses'});this.operationtype('selfexpenses')}}>Claim Expenses</button>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={4}>   
              <button style={{width:'100%',padding:'.5rem 1rem',fontSize: '1.1rem'}} type="submit" class="btn btn-warning" onClick={() => {this.setState({teamexpenses:true,selectType:'Summary'});this.operationtype('teamexpenses')}}>Team Expenses</button>
            </GridItem> 
            <GridItem xs={12} sm={12} md={12} lg={4}>   
              <button style={{width:'100%',padding:'.5rem 1rem',fontSize: '1.1rem'}} type="submit" class="btn btn-warning" onClick={() => {this.setState({payment:true,selectType:'Payment'});this.operationtype('payment')}}>Payment</button>
            </GridItem>
          </GridContainer>
        </Animated>		

        <SlidingPane
          closeIcon={<div>   
            <Button justIcon round color="white" style={{color:'black'}} >
            <KeyboardArrowLeft style={{width:36,height:36}} className={classes.sidebarMiniIcon} />
            </Button></div>}  
            className={classes.ModalStyle}
            overlayClassName={classes.panelClass}
            isOpen={ this.state.teamexpenses }
            title="Expenses"
            title={this.renderHeader()}
            onRequestClose={ () => {
              this.setState({ teamexpenses: false, currentForm:'teamexpenses' });
            }}>
          <div> 
            {this.state.selectType == "viewselfexpenses" &&  <>
            <ViewSelfExpenses  handleSelectedButton={this.scrollToTop} {...this.props} />
            </>}
            {this.state.selectType == "createselfexpenses" &&  <>
            <CreateSelfExpenses  handleSelectedButton={this.scrollToTop} {...this.props} />
            </>}
            {this.state.selectType == "Summary" &&  <>
            <Summary  handleSelectedButton={this.scrollToTop} {...this.props} />
            </>}
            {this.state.selectType == "Approval" &&  <>
            <Approval  handleSelectedButton={this.scrollToTop} {...this.props} />
            </>}
            {this.state.selectType == "payment" &&  <>
            <ViewSelfExpenses  handleSelectedButton={this.scrollToTop} {...this.props} />
            </>}
          </div>
        </SlidingPane>                 	
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToPros)(withStyles(pageStyles)(Dashboard));
