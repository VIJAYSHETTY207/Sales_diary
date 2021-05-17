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
import CheckAccess from "components/CheckAccess.js";
import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { withStyles } from '@material-ui/styles';
import LeadsCreation from "./LeadsPages/LeadsCreation.js";
import LeadsView from "./LeadsPages/LeadsView.js";
import Service from 'Utils/Service';
import { connect } from 'react-redux';
import {mapStateToProps , mapDispatchToPros} from '../../Utils/MapStateDispatchProps.js';

const panelStyles = {   
  divStyle : {
    display: 'flex',  justifyContent:'center', alignItems:'center' 
  },  
  divStyle2 : {
    marginTop:'10px',marginBottom:'10px',display: 'flex',justifyContent:'center', alignItems:'center' 
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
      viewleads:false,
      createlead:false,
      total_leads:0,
      active_leads:0,
      deactive_leads:0,
      lead_count:0,
      prospect_count:0,
      qualified_count:0,
      unqualified_count:0,
      commited_count:0,
      converted_count:0,
      countData:[]
    }  
    this.statecreate = {
      isOpen:false
    }
  }

  scrollToTop = (type) => {
    if(type === 'close'){
      this.setState({ viewleads: false });
    }
    const container = document.querySelector('.slide-pane__content');  
    container.scrollTo({top: 0, left: 0, behavior: 'smooth' });
    this.getLeadDashboardData();
  }

  renderHeader = () => {
    return (
      <GridContainer>
        <GridItem xs={12} sm={10} md={6} style={{margin:'auto'}}>
          <div>Leads</div>
        </GridItem> 
        <GridItem xs={12} sm={10} md={6} style={{textAlign:'right'}}> 
          <ButtonGroup  color="secondary" aria-label="outlined secondary button group" className="buttonGroup">
            <MButton variant={this.state.selectType == "createlead" ?"contained":"outlined"} onClick={()=>this.setState({selectType:'createlead'})}>Create</MButton> 
            <MButton variant={this.state.selectType == "viewleads" ?"contained":"outlined"} onClick={()=>this.setState({selectType:'viewleads'})}>View</MButton>
          </ButtonGroup>
        </GridItem>
      </GridContainer>
    )
  }

  getLeadDashboardData() {
    const postData = {
      id:this.props.data.id,
      user_id:this.props.data.user_id,
      role_id:this.props.data.role_id
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

  checkAccess = () => {
    return (
    <CheckAccess {...this.props} />
    )
  }

  componentDidMount() {
    this.getLeadDashboardData(); 

    if(this.props.token === '' || this.props.token === null)
    {
      this.props.history.push('/auth/login-page');
    }
  }

  render(){
  const { classes } = this.props;

  return (
      <div>  
        {this.checkAccess()}  
        <Animated  className="Animated" animationIn="slideInRight" animationOut="slideOutLeft" > 
          <GridContainer>	 
            <GridItem xs={12} sm={6} md={6} lg={2}>
              <Card>
                <CardBody>
                  <div className={classes.divStyle}>
                  <a style={{color:'#000',cursor:'pointer'}}><h4>Leads</h4>
                    <h3 className={classes.divStyle2}>{this.state.lead_count}</h3>
                  </a>
                  </div>
                </CardBody>
              </Card>
            </GridItem> 
            <GridItem xs={12} sm={6} md={6} lg={2}>
              <Card>
                <CardBody>
                  <div className={classes.divStyle} >
                  <a style={{color:'#000',cursor:'pointer'}}><h4>Prospectus</h4>
                    <h3 className={classes.divStyle2}>{this.state.prospect_count}</h3>
                  </a>
                  </div>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6} lg={2}>
              <Card>
                <CardBody>
                  <div className={classes.divStyle}>
                  <a style={{color:'#000',cursor:'pointer'}}><h4>Qualified</h4>
                    <h3 className={classes.divStyle2}>{this.state.qualified_count}</h3>
                  </a>
                  </div>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6} lg={2}>
              <Card>
                <CardBody>
                  <div className={classes.divStyle}>
                  <a style={{color:'#000',cursor:'pointer'}}><h4>Unqualified</h4>
                    <h3 className={classes.divStyle2}>{this.state.unqualified_count}</h3>
                  </a>
                  </div>
                </CardBody>
              </Card>
            </GridItem>	 
            <GridItem xs={12} sm={6} md={6} lg={2}>
              <Card>
                <CardBody>
                  <div className={classes.divStyle}>
                  <a style={{color:'#000',cursor:'pointer'}}><h4>Committed</h4>
                    <h3 className={classes.divStyle2}>{this.state.commited_count}</h3>
                  </a>
                  </div>
                </CardBody>
              </Card>
            </GridItem> 
            <GridItem xs={12} sm={6} md={6} lg={2}>
              <Card>
                <CardBody>
                  <div className={classes.divStyle} >
                  <a style={{color:'#000',cursor:'pointer'}}><h4>Converted</h4>
                    <h3 className={classes.divStyle2}>{this.state.converted_count}</h3>
                  </a>
                  </div>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={3}> </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={3}>   
              <button style={{width:'100%',padding:'.5rem 1rem',fontSize: '1.1rem'}} type="submit" class="btn btn-warning" onClick={() => this.setState({viewleads:true,selectType:'createlead'})}>Create Lead</button>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={3}>   
              <button style={{width:'100%',padding:'.5rem 1rem',fontSize: '1.1rem'}} type="submit" class="btn btn-warning" onClick={() => this.setState({viewleads:true,selectType:'viewleads'})}>View Lead</button>
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
            isOpen={ this.state.viewleads }
            title="Leads"
            title={this.renderHeader()}
            onRequestClose={ () => {
              this.setState({ viewleads: false, currentForm:'viewleads' });this.getLeadDashboardData();
            }}>
          <div> 
            {this.state.selectType == "viewleads" &&  
            <LeadsView  handleSelectedButton={this.scrollToTop} {...this.props} />
            }
            {this.state.selectType == "createlead" &&  
            <LeadsCreation  handleSelectedButton={this.scrollToTop} {...this.props} />
            }
          </div>
        </SlidingPane>                 	
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToPros)(withStyles(pageStyles)(Dashboard))
