import { setUserData , getUserData , updateUserData , removeUserData, changeOrganization} from '../actions/';
export const mapStateToProps  = state  => (
    { 
        token : state.UserData.token,
        data : state.UserData.data,
  });
export const mapDispatchToPros = dispatch => ({
    setUserData: data => dispatch(setUserData(data)),
    getUserData : data => dispatch(getUserData(data)),
    updateUserData : data => dispatch(updateUserData(data)),
    removeUserData : data => dispatch(removeUserData(data)),  
    changeOrganization : data => dispatch(changeOrganization(data)),      
});