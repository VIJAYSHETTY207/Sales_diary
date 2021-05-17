import {
  container,
  cardTitle,
  whiteColor,
  grayColor
} from "assets/jss/material-dashboard-pro-react.js";

const loginPageStyle = theme => ({
  container: {
    ...container,
    zIndex: "4",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "100px"
    }
  },
  cardTitle: {
    ...cardTitle,
    color: whiteColor
  },
  textCenter: {
    textAlign: "center"
  },
  justifyContentCenter: {
    justifyContent: "center !important"
  },
  customButtonClass: {
    "&,&:focus,&:hover": {
      color: whiteColor
    },
    marginLeft: "5px",
    marginRight: "5px"
  },
  inputAdornment: {
    marginRight: "18px"
  },
  inputAdornmentIcon: {
    color: grayColor[6]
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)"
  },
  cardHeader: {
    marginBottom: "20px",
    padding:"4px !important"
  },
  socialLine: {
    padding: "0.9375rem 0"
  },
  cardTitle:{
    fontWeight:"500"
  },
  CustomCardBody:{
    padding: "10px 20px !important",
    '& .formControl':{
      margin: "0 0 5px 0 "
    },
  },
  justifyContentCenter:{
    marginTop:"0px !important",
    margin:" 0 5px 10px",
    '& .MuiButtonBase-root':{
      padding: "10px 2.25rem !important"
    },
    '& .makeStyles-button':{
      padding: "10px 2.25rem !important"
    }
  }
});

export default loginPageStyle;
