import fire from '../../Config/fire'


export function GetCompany() {

    return dispatch => {
        fire.database().ref("ALL_COMPANY").once('value', (snapshot) => {
            var getData = snapshot.val();
        }).then((getData) => {

            dispatch({ type: 'ALLCOMPANY', payload: getData.val() })
        })
    }
}
export function GetStudent() {
    return dispatch => {
        fire.database().ref("ALL_STUDENTS").once('value', (snapshot) => {
            var getData = snapshot.val();
        }).then((getData) => {

            dispatch({ type: 'ALLSTUDENT', payload: getData.val() })
        })
    }
}

export function LoadCompanyPost() {
    return dispatch => {
        fire.database().ref("CompanyPost").once('value', (snapshot) => {
            var getData = snapshot.val();
        }).then((getData) => {

            dispatch({ type: 'LOADCOMPANYPOST', payload: getData.val() })
        })
    }
}

export function LoadStudentPost() {
    return dispatch => {
        fire.database().ref("StudentPost").once('value', (snapshot) => {
            var getData = snapshot.val();
        }).then((getData) => {

            dispatch({ type: 'LOADSTUDENTPOST', payload: getData.val() })
        })
    }
}

export function LoadHireRequest() {
    return dispatch => {
        fire.database().ref("HireRequests").once('value', (snapshot) => {
            var getData = snapshot.val();
        }).then((getData) => {

            dispatch({ type: 'LOADHIREREQ', payload: getData.val() })
        })
    }
}

export function LoadApplyRequest() {
    return dispatch => {
        fire.database().ref("ApplyRequests").once('value', (snapshot) => {
            var getData = snapshot.val();
        }).then((getData) => {

            dispatch({ type: 'LOADAPPLYREQ', payload: getData.val() })
        })
    }
}

export function LoadUser() {
    return dispatch => {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                dispatch({ type: 'GET_USER', payload: user })
            }
        })
    }
}




export function ChangeState(PickUserName) {
    return dispatch => {
        dispatch({ type: 'CHANGEUSERNAME', payload: PickUserName })
    }
}
