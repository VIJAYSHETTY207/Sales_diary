import React from "react";
import 'date-fns';

// react plugin for creating charts
import 'react-sliding-pane/dist/react-sliding-pane.css';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Link from '@material-ui/core/Link';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import SendIcon from '@material-ui/icons/Send';
import PrintIcon from '@material-ui/icons/Print';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { withStyles } from '@material-ui/styles';
import Button from "components/CustomButtons/Button.js";
import Service from 'Utils/Service';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToPros } from '../../../../Utils/MapStateDispatchProps.js';
import CheckAccess from "components/CheckAccess.js";

const panelStyles = {
  panelClass: {
    zIndex:999
  },
  inputMargin: {
    marginTop:15
  },
  tabs: {
    borderRight: `1px solid #ddd`, 
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
      alert: null,
      InstituteProposals: [],
    }
  }

  GetDataByInstituteID(){
    const postData = {proposalid:this.props.proposalid };
    new Service().apiCall('InstitutePricingHistory/GetDataByInstituteID',postData).then(response =>
    {
      if (response.data!='') 
      {           
        this.setState({InstituteProposals:response.data});
      }
    }).catch(error => {
      this.setState({InstituteProposals:[]});
    });
  }
  checkAccess = () => {
    return (
    <CheckAccess {...this.props} />
    )
  }
  componentDidMount() {
    this.GetDataByInstituteID();
  }

  render(){
  const { classes } = this.props;

  return (
      <div> 
        <GridContainer  justify="center" alignItems="center">  
          <GridItem xs={12} sm={12} md={10} lg={10}>
            <Card>
              <CardBody>
                <div class="invoice-box">    
                  <table style={{fontSize:'12px'}}>
                    <tr className="information">
                      <td  colspan="2">
                        <table>
                          <tr>
                            <td>
                              <strong><Link href="#" onClick={()=> this.ProposalsViewIndividual()}>PRO-000011</Link></strong><br />
                              <strong><Link href="#" onClick={()=> this.ProposalsViewIndividual()}>AMS Test Proposal</Link></strong><br />                                          
                            </td>                                                
                            <td>
                              <strong>To</strong><br />
                              <strong>Vidhya Vahini School</strong><br />
                              <strong>Krishnarajapuram</strong><br />                           
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr className="information">
                      <td  colspan="2">
                        <table>
                          <tr>
                            <td>
                              <strong>eReleGo Digi Media Pvt Ltd</strong><br />
                              <strong>3rd Floor, 2Y/40, 20th Main, 3rd Block,</strong><br />
                              <strong>Bhashyam Circle, Rajajinagar</strong><br />
                              <strong>Bangalore Karnataka</strong><br />                                          
                              <strong>India 560010</strong><br />                                          
                              <strong>GSTIN: 29AADCE5442N1Z8</strong><br />                                          
                            </td>                                                
                            <td>
                              <strong>IN</strong><br />
                              <strong>9036909066</strong><br />
                              <strong>karthick.r@erelego.com</strong><br />                            
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr className="">
                      <td  colspan="4" style={{padding:0}}>
                        <table>
                          <tr className="heading">
                            <td style={{textAlign:"center",width:"50px"}}>
                              S No
                            </td>
                            <td style={{textAlign:"left"}}>
                              Particulars
                            </td>                                          
                            <td style={{width:"150px"}}>
                              No of Sheets
                            </td>
                            <td style={{width:"150px"}}>
                              Unique No.
                            </td>
                          </tr>
                          <tr className="item">
                            <td style={{textAlign:"center",width:"50px"}}>
                              1
                            </td>
                            <td style={{textAlign:"left"}}>
                              SSLC Mark Sheet
                            </td>
                            <td style={{width:"150px"}}>1</td>
                            <td style={{width:"150px"}}>769786</td>
                          </tr>
                          <tr className="item">
                            <td style={{textAlign:"center",width:"50px"}}>
                              2
                            </td>
                            <td style={{textAlign:"left"}}>
                              SSLC Mark Sheet
                            </td>
                              <td style={{width:"150px"}}>1</td>
                              <td style={{width:"150px"}}>453453</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr className="item">
                        <td colspan="1" style={{textAlign:'center'}}>
                          <strong>We confirm the above mentioned documents are in our custody.</strong>
                        </td>
                    </tr>
                    <br /><br />
                    <tr>
                      <td  colspan="1">
                        <table>
                          <tr>
                            <td style={{textAlign:"right",padding:"0 !important"}}>
                              <strong>Authorized Signatory</strong>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>                                      
                  </table>
                </div>
              </CardBody>
              <CardFooter style={{textAlign:'right'}}> 
                <div style={{textAlign:'right'}}>
                  <Button
                    style={{backgroundColor:'#17a2b8'}}
                    variant="contained"
                    color="#28a745"
                    className={classes.button}
                    startIcon={<PrintIcon />}
                  >
                    Print
                  </Button> 
                  <Button
                    style={{backgroundColor:'#28a745'}}
                    variant="contained"
                    color="#28a745"
                    className={classes.button}
                    startIcon={<SendIcon />}
                  >
                    Send
                  </Button>
                </div> 
              </CardFooter>
            </Card>
          </GridItem> 
        </GridContainer>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToPros)(withStyles(pageStyles)(Dashboard));  
