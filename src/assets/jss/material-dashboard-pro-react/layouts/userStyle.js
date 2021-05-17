import {
    drawerWidth,
    drawerMiniWidth,
    transition,
    containerFluid
  } from "assets/jss/material-dashboard-pro-react.js";
  
  const appStyle = theme => ({
    wrapper: {
      overflowX:"hidden",
      position: "relative",
      top: "0",
      height: "100vh",
      "&:after": {
        display: "table",
        clear: "both",
        content: '" "'
      },
      '& .MuiAppBar-colorPrimary':{
        color:" #fff",
        backgroundColor: "#39bdd6"
    }
    },
    mainPanel: {
      transitionProperty: "top, bottom, width",
      transitionDuration: ".2s, .2s, .35s",
      transitionTimingFunction: "linear, linear, ease",
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${drawerWidth}px)`
      },
      overflow: "auto",
      position: "relative",
      float: "right",
      ...transition,
      maxHeight: "100%",
      width: "100%",
      overflowScrolling: "touch"
    },
    content: {
      marginTop: "70px",
      padding: "30px 15px",
      minHeight: "calc(100vh - 123px)"
    },
    container: { ...containerFluid },
    map: {
      marginTop: "70px"
    },
    mainPanelSidebarMini: {
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${drawerMiniWidth}px)`
      }
    },
    mainPanelWithPerfectScrollbar: {
      overflow: "hidden !important"
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
        display: 'flex',
    },
    MarginTop:{
      marginTop:"5%"
  },
  MainCard:{
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline' :{
        borderColor:"#18b4d2",
      },
    '& .MuiGrid-grid-lg-4': {
      padding: "0 5px !important",
      textAlign:"center"
    },
    '& .MuiGrid-grid-md-4': {
      padding: "0 5px !important",
      textAlign:"center"
    },
    '& .MuiGrid-grid-sm-12': {
      padding: "5px 5px !important",
      textAlign:"center"
    },
    '& .MuiGrid-grid-xs-12': {
      padding: "5px 5px !important",
      textAlign:"center"
    },
  },
  Accordianinput :{
    '& .MuiGrid-grid-lg-4': {
        padding: "0 5px !important",
        textAlign:"center"
      },
      '& .MuiGrid-grid-md-4': {
        padding: "0 5px !important",
        textAlign:"center"
      },
      '& .MuiGrid-grid-sm-12': {
        padding: "5px 5px !important",
        textAlign:"center"
      },
      '& .MuiGrid-grid-xs-12': {
        padding: "5px 5px !important",
        textAlign:"center"
      },
      '& .MuiGrid-grid-lg-8': {
        padding: "0 5px !important"
      },
    '& .MuiAccordionSummary-root':{
     boxShadow: "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12) !important"
    },
   '& .MuiAccordionDetails-root' :{
     padding: "10px 16px 10px"
   },
   '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
     transform: "translate(14px, -6px) scale(0.75)",
     color:" #000"
   },
   '& .MuiInputLabel-outlined': {
     transform: "translate(14px, 14px) scale(1)",
     fontSize: "0.9rem !important",
     color:"black"
   },
   '& .MuiOutlinedInput-input': {
     paddingTop: "10px",
     paddingBottom: "10px",
     paddingLeft: "10px",
     paddingRight: "0px",
     color:"white"
   },
   '& .MuiFormControl-root ': {
     width: "100%",
     marginTop: "10px",
     marginBottom: "10px",
     marginLeft: "0px",
     marginRight: "0px",
  
   },
   '& .makeStyles-grid-166': {
     padding: "0 5px !important"
   },
   
   '& .MuiGrid-grid-lg-1': {
     padding: "0 5px !important",
     textAlign:"center"
   
   },
   '& .MuiGrid-grid-lg-1 .MuiInputBase-input ': {
     textAlign:"center"
   },
   '& .MuiGrid-grid-md-1 .MuiInputBase-input ': {
     textAlign:"center"
   },
   
   '& .MuiGrid-grid-md-1': {
     padding: "0 5px !important",
     textAlign:"center"
   },
  },
   FloatRight: {
  float: "right"
  },
  FloatLeft: {
  float: "Left",
  '& .MuiButton-outlined' :{
    padding: "4px 2px"
  }
  },
  ButtonLeftSpace :{
  paddingLeft:"10px"
  },
  Accordianinput :{
  '& .MuiAccordionSummary-root':{
  boxShadow: "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12) !important"
  },
  '& .MuiAccordionDetails-root' :{
  padding: "10px 16px 10px"
  },
  '& .MuiSvgIcon-root-expandIcon':{
    color:" #39bdd6"
   },
  },
  SmallText:{
    fontSize:"13px",
    color:"#aaaaaa",
    fontWeight:"400",
    textAlign:"center",
    marginBottom:"5px",
    marginTop:"5px"
  },
  CardHeading:{
    textAlign:"center",
    color:"#000!important",
    fontWeight:"400",
    marginBottom:"3px",
    marginTop:"3px",
    fontSize:"15px"
  },
  CustomCardBody:{
    padding: "0px 0px",
   
  },
  
  CustomCard:{
    background:" #b3e5fcab",
    marginTop: "5px",
    marginBottom: "5px",
    border: "0",
    display: "flex",
    position: "relative",
    fontSize: ".875rem",
    minWidth: "0",
    wordWrap: "break-word",
    boxShadow: "0 1px 4px 0 rgb(0 0 0 / 51%)",
    borderRadius: "6px",
    flexDirection: "column",
  },
  CardButton :{
    textAlign:"left",
    color:"black!important",
    cursor:'pointer',
    fontWeight:"400",
    width:"100%",
    backgroundColor:"#eee",
    fontSize: "18px",
    boxShadow:"0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    paddingTop:"5px",
    paddingBottom:"5px",
    paddingLeft:"16px",
    paddingRight:"10px",
    verticalAlign:" middle",
    borderRadius:"3px",
    border:"none",
    '& .MuiAvatar-colorDefault': {
      color: "blue",
      backgroundColor: "#39bdd6"
    },
    '& .MuiAvatar-colorDefault:hover': {
      color: "blue",
      backgroundColor: "#ddd"
    },
  },
  SubmoduleCustomCardBody:{
    padding: "0px 0px",
  },
  SubmoduleCustomCard:{
    background:" #b3e5fcab",
    marginTop: "5px",
    marginBottom: "5px",
    border: "0",
    display: "flex",
    position: "relative",
    fontSize: ".875rem",
    minWidth: "0",
    wordWrap: "break-word",
    boxShadow: "0 1px 4px 0 rgb(0 0 0 / 51%)",
    borderRadius: "6px",
    flexDirection: "column",
  
  },
  heading:{
    fontSize:"17px",
    color:"#000",
    fontWeight:"400"
  },
  
  Overlay :{
    '& .MuiList-padding':{
      paddingTop:"1px",
      paddingBottom:"1px"
    },
    '& .MuiListItem-root':{
      paddingTop:"1px",
      paddingBottom:"1px"
    },
    '& .MuiDrawer-paper':{
      backgroundColor:"#ddd",
      overflowX:"hidden",
    },
      '& .PrivateSwitchBase-root-107' :{
        padding:"3px"
      },
      '& .MuiCheckbox-root':{
        padding:"3px"
      },
    '& .MuiSvgIcon-root-expandIcon':{
      color:" #39bdd6"
     },
   '& .MuiAppBar-colorPrimary': {
      color: "#000",
      backgroundColor:"#39bdd6"
  },
    '& .MuiAccordionSummary-content' :{
      margin: "5px 0",
      display: "flex",
      flexGrow: "1",
      transition: "margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
    },
    '& .MuiIconButton-root:hover ' :{
      backgroundColor:'#ddd', 
      color:"#39bdd6"
  },       
    '& .MuiToolbar-gutters' :{
      marginLeft:"24px",
      marginRight:"24px"
    }, 
   '& .makeStyles-SliderTitle-167  ' :{
     fontSize:"20px!important"
  },
      '& .MuiFormControlLabel-root' :{ 
          paddingTop:"6px!important" ,
          marginRight:"15px!important",
         
    },
      '& .MuiGrid-container' :{
        paddingLeft:"6px",
        paddingRight:"6px"
      },
      
      '& .MuiInputLabel-outlined.MuiInputLabel-shrink' :{
        transform:"translate(14px, -6px) scale(0.75)",
        color:" #000"
      },
      '& .MuiInputLabel-outlined' : { 
        transform: "translate(14px, 14px) scale(1)",
        fontSize:"0.9rem !important",
        color:"black"
      }, 
      '& .MuiOutlinedInput-input':{
        paddingTop: "10px", 
         paddingBottom: "10px",
         paddingLeft: "10px",
      paddingRight:"10px",
      fontSize:"15px",
      color:"black"
      },
      '& .MuiFormControl-root ' :{
        width: "100%",
        marginTop:"10px",
        marginBottom:"10px",
        marginLeft:"0px",
        marginRight:"0px",
      
    },
   
      '& .MuiButton-label' :{
          fontSize:"0.875rem",
          fontWeight:"bold"
      },
     
      '& .MuiAppBar-positionFixed':{
          top:"0",
          left: "auto",
          right: "0",
          position:" relative!important",
          height: "64px",
          borderBottom:" 1px solid rgba(0,0,0,0.1)",
          background: "#ebebeb",
          color:"#3c4858"

      },
      
        '& .MuiToolbar-regular': {
          minHeight:"66px!important",
          overflowX:" hidden !important"
      },
      '& .MuiDialog-paperFullScreen' :{
          backgroundColor: "#dddddd!important",
          overflowX:" hidden !important"
      },
     
     '&  .MuiFormLabel-root.Mui-disabled': {
        color: "#39bdd6"
    },
    '& .MuiInputBase-root.Mui-disabled ' :{
        color:" #000000" 
    },
    '& .MuiInputBase-root' :{
      color:" #000"
      
  },
    '& .MuiAccordionSummary-root':{
        boxShadow: "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12) !important"
        },
        '& .MuiAccordionDetails-root' :{
        padding: "10px 16px 10px"
        },
        '& .MuiTypography-root' :{
          
        },
        '& .MuiOutlinedInput-notchedOutline ':{
          borderColor:" #a5a0a0"
      },
     '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline' :{
       borderColor:"#18b4d2",
     },
     '& .MuiButton-outlined':{
      padding:" 6px 16px"
     }
  },
  CloseButton :{
    backgroundColor:"white",
    borderRadius:"#000",
    color:"#39bdd6 ",
    width: "41px",
    height: "41px",
    minWidth: "41px", 
    paddingLeft: "12px",
    paddingRight: "12px",
    '& .MuiSvgIcon-root':{
      width:"36px",
      height:"36px",
      color:"#474747"
    }
  
  },
  SliderTitle :{
    fontSize:"20px",
    paddingLeft:"30px",
    color:"#3c4858!important",
    fontWeight:"400"
  
  },
  Modulehead:{
    fontSize:"17px",
    color:"#000",
    [theme.breakpoints.down('sm')]: {
      fontSize:"15px",
    },
  
  },
  SubmitButton :{
    borderColor:"#39bdd6",
    color:"#39bdd6",
  },
  FinalSubmitButton :{
    borderColor:"#39bdd6",
    backgroundColor:"#39bdd6",
    color:"#fff",
    marginTop:"10px",
  },
  SubmoduleCardRadio:{
      marginTop:"10px",
    '& .MuiSvgIcon-root' :{
        fill: "currentColor",
        width:" 0.8em",
        height: "0.8em",
        display:" inline-block",
        fontSize: "1.5rem",
        transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        flexShrink: "0",
        userSelect: "none"
    }
  },
  Submoduledetails :{
      fontSize:"15px",
      marginTop:"10px",
      fontWeight:"400"
  },
  SubmoduleCardBody:{
        paddingTop: "0px", 
        paddingRight: "0px", 
        paddingLeft: "0px", 
        paddingBottom: "7px", 
  },

  SubmoduleCard :{
    marginTop:"10px!important",
    textAlign:"left",
    color:"black!important",
    cursor:'pointer',
    fontWeight:"400",
    width:"100%",
    backgroundColor:"#eee",
    boxShadow:"0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    // paddingTop:"2px",
    // paddingBottom:"2px",
    paddingLeft:"16px",
    paddingRight:"10px",
    verticalAlign:" middle",
    borderRadius:"3px",
    border:"none",
      '& .MuiFormControlLabel-root' :{
          fontSize:"14px !important",
          color:"black !important"
      },
      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline' :{
        borderColor:"#18b4d2",
      },
      '& .makeStyles-card-197' :{
        marginBottom:"10px !important",      
      },
 
  },
  panelClass: {
    zIndex:999
  },
  ModalStyle1: {
    width:'50% !important',
    backgroundColor:'#ddd',
    '& .MuiPaper-root':{
      backgroundColor:"#dddddd"
    }
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  });
  
  export default appStyle;
  