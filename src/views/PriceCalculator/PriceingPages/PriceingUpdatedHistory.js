import React from "react";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { makeStyles } from '@material-ui/styles';
import { withStyles } from "@material-ui/core/styles";
import 'react-sliding-pane/dist/react-sliding-pane.css';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Slide from '@material-ui/core/Slide';
import MButton from '@material-ui/core/Button';
import styles from "assets/jss/material-dashboard-pro-react/layouts/adminStyleNew.js";
import Moment from 'moment';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Service from 'Utils/Service';
import SweetAlert from "react-bootstrap-sweetalert";
// @material-ui/icons
import 'date-fns';
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
      disabled:'false',
      alert:null,
      button:'',
      formdate:Moment(new Date()).format("YYYY-MM-DD"),
      mainmenu:[],       
      submain:[],    
    }
  }

  handleChange = (panel) => (event, isExpanded) => {
    this.setState({expanded:(isExpanded ? panel : false)});
  };

  menuvalueappend = (Index,inputName,Value) => {
    let newarray = this.state.submain;
    newarray[Index][inputName] = Value;
    this.setState({submain:newarray});
  }

  getUserParentMenu(pricing_id) {
    const postData = {pricing_id:pricing_id };
    new Service().apiCall('PricingDetails/GetAllParentData',postData).then(response =>
    {
      if (response.data!='') 
      {      
        this.setState({mainmenu: response.data})
      }
      else{
        this.setState({mainmenu:[]})
      }
    }).catch(error => {
      alert("error.response.data.message");
    });
  }     
  
  getUserChildtMenu(pricing_id) {
    const postData = {pricing_id:pricing_id };
    new Service().apiCall('PricingDetails/GetAllChildData',postData).then(response =>
    {
      if (response.data!='') 
      {      
        this.setState({submain: response.data})
      }
      else{
        this.setState({submain:[]})
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
  editpricing()
  {    
    let formData = new FormData();
    formData.append('selected_id',this.props.selected_id);
    formData.append('userchildmenudata',JSON.stringify(this.state.submain));
    console.log(this.state.submain);
    new Service().apiCall('Pricing/EditPricing', formData).then(response => 
    { 
      if (response.status === 200 && response.data !== '') 
      {
        this.setState({ alert: ( <SweetAlert  success  confirmBtnBsStyle="success" title="Pricing Updated Successfully!" showConfirm={false} >Now you can access all</SweetAlert> ), });
        setTimeout(() => {
          this.setState({ alert:null});  
          this.props.handlePricingPage('close'); 
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

  componentDidMount() {
    this.getUserParentMenu(this.props.selected_id);
    this.getUserChildtMenu(this.props.selected_id);

    if(this.props.token === '' || this.props.token === null)
    {
      this.props.history.push('/auth/login-page');
    }
  }

  render()
  { 
    const { classes } = this.props;
    return (
      <div>
      {this.state.alert} 
          
        <GridContainer justify="center" alignItems="center" style={{paddingTop:"3%",paddingBottom:"20px"}} className={classes.SliderBackground}>
          <GridItem lg={8} md={8} sm={12} xs={12}>
            {this.state.mainmenu.map((item, index) => (
            <Accordion expanded={this.state.expanded === index} onChange={this.handleChange(index)} >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="pane21bh-content"
                id="panel2bh-header"
              >
                <GridContainer>
                  <GridItem lg={6} md={6} xs={6} sm={6} style={{textAlign:"left"}}>
                    <Typography style={{textAlign:"left"}} className={classes.Modulehead}>{item.main_module}</Typography>
                    <label>Module Name</label>
                  </GridItem>
                  <GridItem lg={6} md={6} xs={6} sm={6} style={{textAlign:"center"}}>
                  </GridItem>
                </GridContainer>
              </AccordionSummary>
              <AccordionDetails>
                <GridContainer>
                  <GridItem lg={12} md={12} sm={12} xs={12}>

                  {this.state.submain.map((subitem, index) => ( subitem.main_module === item.main_module &&
                    <Card className={classes.SubmoduleCustomCard}>
                      <CardBody className={classes.SubmoduleCustomCardBody}>
                        <GridContainer>
                          <GridItem xs={6} md={6} lg={6} xs={12} sm={12} style={{textAlign:"left"}}>
                            <h4 style={{textAlign:"left"}} className={classes.CardHeading}>{subitem.sub_module}</h4>
                            <label className={classes.labelName}>Sub Module</label>
                          </GridItem>
                          {subitem.status === '0' &&
                          <GridItem xs={6} md={6} lg={6} xs={12} sm={12} style={{textAlign:"center"}}>
                            <Chip 
                              style={{marginTop:6}}
                              label="De Activated"
                              clickable
                              color="secondary"
                              variant="outlined"
                            />
                          </GridItem>}
                          {subitem.module_type === 'Default' && subitem.status === '1' &&
                          <GridItem xs={6} md={6} lg={6} xs={12} sm={12} style={{textAlign:"center"}}>
                            <Chip 
                              style={{marginTop:6}}
                              label="Default"
                              clickable
                              color="primary"
                              variant="outlined"
                            />
                          </GridItem>} 
                          {subitem.module_type !== 'Default' && subitem.status === '1' &&
                          <GridItem xs={6} md={3} lg={3} xs={6} sm={6} style={{textAlign:"center"}}> 
                            <TextField
                              disabled={this.state.disabled === 'false'}
                              inputProps={{
                                autoComplete: 'off'
                              }}
                              id="document-type"   
                              value={subitem.minamount}
                              label="Minmum Rate" 
                              type="search" 
                              onChange={(event)=> this.menuvalueappend(index,'minamount',event.target.value)} 
                              inputRef={this.textInput} 
                              variant="outlined" />  
                          </GridItem>}
                          {subitem.module_type !== 'Default' &&
                          <GridItem xs={6} md={3} lg={3} xs={6} sm={6} style={{textAlign:"center"}}>
                            <TextField 
                              disabled={this.state.disabled === 'false'}
                              inputProps={{
                                autoComplete: 'off'
                              }}
                              id="document-type"   
                              value={subitem.maxamount}
                              label="Maximum Rate" 
                              type="search" 
                              onChange={(event)=> this.menuvalueappend(index,'maxamount',event.target.value)} 
                              inputRef={this.textInput} 
                              variant="outlined" /> 
                          </GridItem>}
                        </GridContainer>
                      </CardBody>
                    </Card>))}

                  </GridItem>
                </GridContainer>
              </AccordionDetails>
            </Accordion>
            ))}
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToPros)(withStyles(styles)(AdminDashboard));