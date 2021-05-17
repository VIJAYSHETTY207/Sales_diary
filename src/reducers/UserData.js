const lStrUserData = localStorage.getItem('user') ? localStorage.getItem('user') : '{}';
const lStrToken = localStorage.getItem('token') ? localStorage.getItem('token') : null;
const initialState = {
    token : lStrToken,
    data : JSON.parse(lStrUserData),
}

//const CREATE_USER_DATA = 'CREATE_USER_DATA';
//const DELETE_USER_DATA = 'DELETE_USER_DATA';
//const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
//const GET_USER_DATA = 'GET_USER_DATA';

const UserData = (state = initialState , action) =>{
    switch(action.type){
        
        case 'CREATE_USER_DATA':{
            localStorage.setItem('user',JSON.stringify(action.payload.data));
            localStorage.setItem('token',JSON.stringify(action.payload.token));
            return {
                token : action.payload.token,
                data : action.payload.data
            };
        }

        case 'UPDATE_USER_DATA':{
            localStorage.setItem('user',JSON.stringify(action.payload.data));
            return {
                data : action.payload.data
            };
        }

        case 'GET_USER_DATA':{
            return {
                token : state.token,
                data : state.data
            };
        }

        case 'DELETE_USER_DATA':{
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            return {
                token : null,
                data : null
            };
        }

        case 'CHANGE_ORGANIZATION_INSTITUTION':{
           const data = state.data;
            data.selectedOrganizationId = action.payload.selectedOrganizationId;
            data.selectedInstitutionId = action.payload.selectedInstitutionId;
            data.selectedOrgIndex = action.payload.selectedOrgIndex;
            data.selectedInstIndex = action.payload.selectedInstIndex;
            data.selectedBoardId = action.payload.selectedBoardId;
            data.selectedAcademicId = action.payload.selectedAcademicId;
            data.selectedBoardIndex = action.payload.selectedBoardIndex;
            data.selectedAcademicIndex = action.payload.selectedAcademicIndex;
            return {
              data:data
            };
        }

        default : 
            return state;
    }
}

export default UserData;