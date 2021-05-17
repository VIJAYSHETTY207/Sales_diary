const CREATE_USER_DATA = 'CREATE_USER_DATA';
const DELETE_USER_DATA = 'DELETE_USER_DATA';
const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
const GET_USER_DATA = 'GET_USER_DATA';
const CHANGE_ORGANIZATION_INSTITUTION = 'CHANGE_ORGANIZATION_INSTITUTION';


export const setUserData =  pData => ({
    type : CREATE_USER_DATA,
    payload : pData
});

export const getUserData =  pData => ({
    type : GET_USER_DATA,
    payload : pData
});

export const updateUserData =  pData => ({
    type : UPDATE_USER_DATA,
    payload : pData
});

export const removeUserData =  pData => ({
    type : DELETE_USER_DATA,
    payload : pData
});

export const changeOrganization =  pData => ({
    type : CHANGE_ORGANIZATION_INSTITUTION,
    payload : pData
});