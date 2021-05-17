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
import CreateTask from 'views/Tasks/TasksPages/CreateTasks.js'
import ViewTask from 'views/Tasks/TasksPages/ViewTasks.js'
import Service from 'Utils/Service';


const panelStyles = {   
  divStyle : {
    display: 'flex',  justifyContent:'center', alignItems:'center' 
  },  
  divStyle2 : {
    marginTop:'10px',marginBottom:'10px',display: 'flex',justifyContent:'center', alignItems:'center' 
  },  
  panelClass: {
    zIndex:999,
  },
  notificationModalStyle: {
    width:'40% !important',
    backgroundColor:'#ddd'
  },
  ModalStyle: {
    width:'100% !important',
    backgroundColor:'#ddd',
    '& .MuiInputLabel-outlined ':{
      zIndex: '1',
      transform: 'translate(14px, 13px) scale(1)',
      pointerEvents: 'none'
  },
  '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
    transform: 'translate(14px, -6px) scale(0.75)'
}
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
      activeAccordion:0,
      edit_institute:false,
      CreateTasks:false,
      ViewTasks:false, 
         
    }
  }

  componentDidMount() {
  }

  setPostData = (name,value) => {
    this.setState({ [name]: value, formChanged:true });
  }
  handleImageChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
    });
    this.setState({
      selectedFileName: event.target.files[0].name
    });
    let reader = new FileReader();
     
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(event.target.files[0])
  }
  renderHeader = () => {
    return (
      <GridContainer>
        <GridItem xs={12} sm={10} md={6} style={{margin:'auto'}}>
          <div>Tasks</div>
        </GridItem> 
        <GridItem xs={12} sm={10} md={6} style={{textAlign:'right'}}> 
          <ButtonGroup  color="secondary" aria-label="outlined secondary button group" className="buttonGroup">
            <MButton variant={this.state.selectType == "CreateTasks" ?"contained":"outlined"} onClick={()=>this.setState({selectType:'CreateTasks'})}>Create</MButton> 
            <MButton variant={this.state.selectType == "ViewTasks" ?"contained":"outlined"} onClick={()=>this.setState({selectType:'ViewTasks'})}>View</MButton>
          </ButtonGroup>
        </GridItem>
      </GridContainer>
    )
  }
  render(){
  const { classes } = this.props;

  return (
      <div> 
        <Animated  className="Animated" animationIn="slideInRight" animationOut="slideOutLeft" > 
          <GridContainer>	 
            <GridItem xs={12} sm={6} md={6} lg={2}>
              <Card>
                <CardBody>
                  <div className={classes.divStyle}>
                  <a style={{color:'#000',cursor:'pointer'}}><h4>Not Started</h4>
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
                  <a style={{color:'#000',cursor:'pointer'}}><h4>In Progress</h4>
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
                  <a style={{color:'#000',cursor:'pointer'}}><h4>On Hold</h4>
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
                  <a style={{color:'#000',cursor:'pointer'}}><h4>Cancelled</h4>
                    <h3 className={classes.divStyle2}>{this.state.unqualified_count}</h3>
                  </a>
                  </div>
                </CardBody>
              </Card>
            </GridItem>	 
            
            <GridItem xs={12} sm={6} md={6} lg={2}>
              <Card>
                <CardBody>
                  <div className={classes.divStyle} >
                  <a style={{color:'#000',cursor:'pointer'}}><h4>Finished</h4>
                    <h3 className={classes.divStyle2}>{this.state.converted_count}</h3>
                  </a>
                  </div>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={3}> </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={3}>   
              <button style={{width:'100%',padding:'.5rem 1rem',fontSize: '1.1rem'}} type="submit" class="btn btn-warning" onClick={() => this.setState({ViewTasks:true,selectType:'CreateTasks'})}>New Tasks</button>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={3}>   
              <button style={{width:'100%',padding:'.5rem 1rem',fontSize: '1.1rem'}} type="submit" class="btn btn-warning" onClick={() => this.setState({ViewTasks:true,selectType:'ViewTasks'})}>View Task</button>
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
            isOpen={ this.state.ViewTasks }
            title="Tasks"
            title={this.renderHeader()}
            onRequestClose={ () => {
              this.setState({ ViewTasks: false, currentForm:'ViewTasks' });
            }}>
          <div> 
            {this.state.selectType == "ViewTasks" &&  
            <ViewTask  handleSelectedButton={this.scrollToTop} {...this.props} />
            }
            {this.state.selectType == "CreateTasks" &&  
            <CreateTask  handleSelectedButton={this.scrollToTop} {...this.props} />
            }
          </div>
        </SlidingPane> 		
      </div>
      
    );
  }
}
export default withStyles(pageStyles)(Dashboard)
 