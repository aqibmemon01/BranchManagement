import ActionType from '../Contant/Constant'


const INITIAL_STATE = {
    UserName: 'Aqib Memon',
    MYUSER: "",
    COMPANYDATA: "",
    STUDENTDATA: "",
    COMPANYPOST: "",
    STUDENTPOST: "",
    HIREREQUEST: "",
    APPLYREQUEST: ""

}



export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionType.CHANGEUSERNAME:
            return ({
                ...state,
                UserName: action.payload
            })
        case ActionType.ALLCOMPANY:
            return ({
                ...state,
                COMPANYDATA: action.payload
            })
        case ActionType.ALLSTUDENT:
            return ({
                ...state,
                STUDENTDATA: action.payload
            })
        case ActionType.GET_USER:
            console.log(action.payload.email)
            return ({
                ...state,
                MYUSER: action.payload
            })
        case ActionType.LOADCOMPANYPOST:
            return ({
                ...state,
                COMPANYPOST: action.payload
            })
        case ActionType.LOADSTUDENTPOST:
            return ({
                ...state,
                STUDENTPOST: action.payload
            })
        case ActionType.LOADHIREREQ:
            return ({
                ...state,
                HIREREQUEST: action.payload
            })
        case ActionType.LOADAPPLYREQ:
            return ({
                ...state,
                APPLYREQUEST: action.payload
            })
        default:
            return state;
    }
}