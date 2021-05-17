import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import {Animated} from "react-animated-css";

import AddAlert from "@material-ui/icons/AddAlert";
import Cake from "@material-ui/icons/Cake";
// import InfoOutline from "@material-ui/icons/InfoOutline";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import AccessTime from "@material-ui/icons/AccessTime";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const divStyle = {
  display: 'flex',  justifyContent:'center', alignItems:'center' // 'ms' is the only lowercase vendor prefix
};
const divStyle2 = {
  marginTop:'10px',marginBottom:'10px',display: 'flex',justifyContent:'center', alignItems:'center' // 'ms' is the only lowercase vendor prefix
};


var mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920
};

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>   
      <Animated  className="Animated" animationIn="slideInRight" animationOut="slideOutLeft" > 
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart className={classes.cardHover}>
              <CardHeader color="info" className={classes.cardHeaderHover}>
                <ChartistGraph
                  className="ct-chart-white-colors"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <div className={classes.cardHoverUnder}>
                  <Tooltip
                    id="tooltip-top"
                    title="Refresh"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button simple color="info" justIcon>
                      <Refresh className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Change Date"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="transparent" simple justIcon>
                      <Edit className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                </div>
                <h4 className={classes.cardTitle}>Last 7 Days Meetings</h4>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
		      <GridItem xs={12} sm={12} md={6}>
            <Card chart className={classes.cardHover}>
              <CardHeader color="warning" className={classes.cardHeaderHover}>
                <ChartistGraph
                  className="ct-chart-white-colors"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <div className={classes.cardHoverUnder}>
                  <Tooltip
                    id="tooltip-top"
                    title="Refresh"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button simple color="info" justIcon>
                      <Refresh className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Change Date"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="transparent" simple justIcon>
                      <Edit className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                </div>
                <h4 className={classes.cardTitle}>Last 7 Days Collection</h4>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>	 				
		      <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardBody>
                <div className={classes.center}>
                <a style={{color:'#000',cursor:'pointer'}} >  
                  <h4 style={divStyle}>Today so far</h4>
                  <h3 style={divStyle2}>Rs.0</h3>
                  <p style={divStyle2}>Rs.0</p>
                  </a>
                </div>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardBody>
                <div className={classes.center}>
                <a style={{color:'#000',cursor:'pointer'}} >  
                  <h4 style={divStyle}>This week so far</h4>
                  <h3 style={divStyle2}>Rs.0</h3>
                  <p style={divStyle2}>Rs.0</p>
                  </a>
                </div>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardBody>
                <div className={classes.center}>
                <a style={{color:'#000',cursor:'pointer'}} >  
                  <h4 style={divStyle}>This month so far</h4>
                  <h3 style={divStyle2}>Rs.0</h3>
                  <p style={divStyle2}>Rs.0</p>
                  </a>
                </div>
              </CardBody>
            </Card>
          </GridItem>
		      <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardBody>
                <div className={classes.center}>
                <a style={{color:'#000',cursor:'pointer'}} >  
                  <h4 style={divStyle}>This year so far</h4>
                  <h3 style={divStyle2}>Rs.0</h3>
                  <p style={divStyle2}>Rs.0</p>
                  </a>
                </div>
              </CardBody>
            </Card>
          </GridItem>		        
        </GridContainer>
	  
        <h3>Counts</h3> <br />
        <GridContainer>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                <span class="material-icons">
                account_box
                </span>
                </CardIcon>
                <p className={classes.cardCategory}>Leads</p>
                <h3 className={classes.cardTitle}> 49 </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Get more space
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">                
                <span class="material-icons">
                account_box
                </span>
                </CardIcon>
                <p className={classes.cardCategory}>Prospect</p>
                <h3 className={classes.cardTitle}>34</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                <span class="material-icons">
                account_box
                </span>
                </CardIcon>
                <p className={classes.cardCategory}>Qualifed</p>
                <h3 className={classes.cardTitle}>75</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Tracked from Github
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                <span class="material-icons">
                account_box
                </span>
                </CardIcon>
                <p className={classes.cardCategory}>Committed</p>
                <h3 className={classes.cardTitle}>245</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
	  
	      <h3>Latest Notification</h3>
	      <GridContainer>
		      <GridItem xs={12} sm={12} md={2}></GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardBody> <br />
                <SnackbarContent
                  message={"This is a plain notification"}
                  color="danger"
                  icon={AddAlert}
                /> <br />
                <SnackbarContent
                  message={"This is a plain notification"}
                  color="danger"
                  icon={AddAlert}
                /> 
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer> 
	  
        <h3>Today's Birthday</h3>
        <GridContainer>
          <GridItem xs={12} sm={12} md={2}></GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardBody> <br />
                <SnackbarContent
                  message={"This is a plain notification"}
                  color="info"
                  icon={Cake}
                /> 
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>   
	  
        <h3>Tomorrow's Birthday</h3>
        <GridContainer>
          <GridItem xs={12} sm={12} md={2}></GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardBody><br />
                <SnackbarContent
                  message={"This is a plain notification"}
                  color="info"
                  icon={Cake}
                /> 
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer> 
	    </Animated>	 
	  
    </div>
  );
}
