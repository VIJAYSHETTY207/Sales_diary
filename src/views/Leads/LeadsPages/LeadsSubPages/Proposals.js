import React from "react";
import 'date-fns';

// react plugin for creating charts
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import 'react-sliding-pane/dist/react-sliding-pane.css';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MButton from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Link from '@material-ui/core/Link';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { withStyles } from '@material-ui/styles';
import SweetAlert from "react-bootstrap-sweetalert";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import Button from "components/CustomButtons/Button.js";
import Service from 'Utils/Service';
import SlidingPane from 'react-sliding-pane';
import NumberFormat from 'react-number-format';
import ProposalInvoice from "./ProposalInvoice.js";
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToPros } from '../../../../Utils/MapStateDispatchProps.js'
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

function filterCaseInsensitive(filter, row) 
{
  const id = filter.pivotId || filter.id;
  if (row[id] !== null) 
  {
    return (
      row[id] !== undefined ?
        String(row[id].toString().toLowerCase())
        .includes(filter.value.toString().toLowerCase()):true
    );
  }
}

const getColumnWidth = (rows, accessor, headerText) => {
  const maxWidth = 400
  const magicSpacing = 10
  const cellLength = Math.max(
    ...rows.map(row => (`${row[accessor]}` || '').length),
    headerText.length,
  )
  return Math.min(maxWidth, cellLength * magicSpacing)
}

class Dashboard extends React.Component 
{
  constructor(props) 
  {
    super(props);
    this.state = {
      alert: null,
      proposalid:'',
      InstituteProposals: [],
    }
  }

  GetDataByInstituteID(){
    const postData = {institute_id:this.props.institute_id };
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

  setPostData = (name,value) => {
    this.setState({ [name]: value, formChanged:true });
  }

  render(){
  const { classes } = this.props;

  return (
      <div> 
        {this.state.alert}
        <GridContainer  justify="center" alignItems="center">              
          <GridItem xs={12} sm={12} md={9}>
            <Card style={{marginTop:10}}>
              <CardHeader color="primary" icon>
                <div className={classes.buttonGroup} style={{float:'right',marginTop:10}}> 
                  <ButtonGroup >
                    <MButton variant="outlined" color="primary" onClick={()=>this.addproposal()}>New Proposal</MButton> 
                    <MButton variant="outlined" color="primary" >Export</MButton>
                  </ButtonGroup>
                </div> 
                <h4 className={classes.cardIconTitle}>Proposals List</h4>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data=
                  {
                    this.state.InstituteProposals.map((original,key) => {
                      return({
                              slno: key+1,
                              institute_name:<Link href="#" onClick={()=> {this.setState({proposalinvoice:true});this.setState({proposalid:original.id})}}>{original.institute_name}</Link>,
                              proposalamount:<NumberFormat displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'₹ '} value={original.institute_pricing} renderText={value => <div>{value}</div>} />,
                              proposaldate:original.date,
                              proposalopentill:original.open_till,
                              proposalcreated_on:original.created_on,
                              ststus: <Chip label="Open" color="primary" size="small" clickable variant="outlined"/>,
                            })
                    })
                  }
                  filterable
                  minRows={0}
                  columns={[
                  {
                    Header: "S No",
                    accessor: "slno",
                    width: 90,
                    className: "center",
                      Filter: ({filter, onChange}) => (
                        <input type='text' style={{textAlign:'center'}} placeholder="Search S No" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                      )
                    },
                  {
                    Header: "Institute Name",
                    accessor: "institute_name",
                    width:getColumnWidth(this.state.InstituteProposals, 'institute_name', 'Institute Name'),
                    className: "center",
                      Filter: ({filter, onChange}) => (
                        <input type='text' style={{textAlign:'center'}} placeholder="Search Institute" value={filter ? filter.value : ''}  onChange={event => onChange(event.target.value)} />
                      )
                    },
                  {
                    Header: "Total",
                    accessor: "proposalamount",
                    className: "center",
                      Filter: ({filter, onChange}) => (
                        <input type='text' style={{textAlign:'center'}} placeholder="Search Amount" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                      )
                  },
                  {
                    Header: "Date",
                    accessor: "proposaldate",
                    className: "center",
                      Filter: ({filter, onChange}) => (
                        <input type='text' style={{textAlign:'center'}} placeholder="Search Date" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                      )
                  },
                  {
                    Header: "Open Till",
                    accessor: "proposalopentill",
                    className: "center",
                      Filter: ({filter, onChange}) => (
                        <input type='text' style={{textAlign:'center'}} placeholder="Search Open Till" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                      )
                  }, 
                  {
                    Header: "Created On",
                    accessor: "proposalcreated_on",
                    className: "center",
                      Filter: ({filter, onChange}) => (
                        <input type='text' style={{textAlign:'center'}} placeholder="Search Created On" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                      )
                  },
                  {
                    Header: "Status",
                    accessor: "ststus",
                    className: "center",
                      Filter: ({filter, onChange}) => (
                        <input type='text' style={{textAlign:'center'}} placeholder="Search Status" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                      )
                  }
                  
                  ]}
                  defaultFilterMethod={filterCaseInsensitive}
                  defaultPageSize={10}
                  showPaginationTop={false}
                  showPaginationBottom={true}
                  className="-striped -highlight"
                />
              </CardBody>
              <CardFooter stats style={{marginTop:0}}>
                <div className={classes.stats}> 
                  <a style={{color:'#000',fontSize:'14px',cursor:'pointer'}}> Showing 10 of 20 entries</a>
                </div>
                <div className={classes.stats}>
                  <MButton   variant="outlined" color="primary" >Export</MButton>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>

        <SlidingPane
          closeIcon={<div>   
            <Button justIcon round color="white" style={{color:'black'}} >
            <KeyboardArrowLeft style={{width:36,height:36}} className={classes.sidebarMiniIcon} />
            </Button></div>}  
              className={classes.ModalStyle5}
              overlayClassName={classes.panelClass}
              isOpen={ this.state.proposalinvoice }
              title="Proposal invoice"
              onRequestClose={ () => {
                this.setState({ proposalinvoice: false});
            }}>
          <div> 
           <ProposalInvoice handleProposalInvoice={this.scrollToTop} {...this.props} proposalid={this.state.proposalid} />
          </div>
        </SlidingPane>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToPros)(withStyles(pageStyles)(Dashboard));  
