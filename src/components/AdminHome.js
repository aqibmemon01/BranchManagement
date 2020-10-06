import React from 'react';
import fire from '../Config/fire'
import { connect } from 'react-redux';
import '../CSS/Work.css';



class AdminHome extends React.Component {

    constructor() {
        super();
        this.state = {
            COUNTER: 0,
            COMPANY_BLOCK_USER: [],
            COMPANY_ACTIVE_USER: [],
            STUDENT_BLOCK_USER: [],
            STUDENT_ACTIVE_USER: [],

            // ALL_STUDENT:[],

        }

        this.ChangeData = this.ChangeData.bind(this);
        this.LogOutMe = this.LogOutMe.bind(this);
    }

    componentWillMount() {

        for (var x in this.props.ALL_COMPANY) {
            if (this.props.ALL_COMPANY[x].Status === "ACTIVE") {
                this.state.COMPANY_ACTIVE_USER.push({ Data: this.props.ALL_COMPANY[x], ID: x })
            }
            else if (this.props.ALL_COMPANY[x].Status === "BLOCKED") {
                this.state.COMPANY_BLOCK_USER.push({ Data: this.props.ALL_COMPANY[x], ID: x })
            }
        }

        for (var x in this.props.ALL_STUDENT) {
            if (this.props.ALL_STUDENT[x].Status === "ACTIVE") {
                this.state.STUDENT_ACTIVE_USER.push({ Data: this.props.ALL_STUDENT[x], ID: x })
            }
            else if (this.props.ALL_STUDENT[x].Status === "BLOCKED") {
                this.state.STUDENT_BLOCK_USER.push({ Data: this.props.ALL_STUDENT[x], ID: x })
            }
        }


    }

    ChangeData() {
        fire.database().ref('Detail' + "/" + "-M-C2hDo5ed35FBl2slj" + "/" + "Status").set(
            "BLOCKED"
        )

    }

    COMPANY_BLOCK_ACTIVE(Myid, Type, index) {
        if (Type === "BLOCK") {
            fire.database().ref('ALL_COMPANY/' + Myid + '/Status').set(
                "BLOCKED");
            var DeleteData = this.state.COMPANY_ACTIVE_USER.splice(index, 1)
            console.log(DeleteData)
            this.state.COMPANY_BLOCK_USER.push(DeleteData[0])
            this.setState({ COUNTER: this.state.COUNTER })
        }
        else if (Type === "UNBLOCK") {
            fire.database().ref('ALL_COMPANY/' + Myid + '/Status').set(
                "ACTIVE")
            var DeleteData = this.state.COMPANY_BLOCK_USER.splice(index, 1)
            this.state.COMPANY_ACTIVE_USER.push(DeleteData[0])
            this.setState({ COUNTER: this.state.COUNTER })
        }
    }

    STUDENT_BLOCK_ACTIVE(Myid, Type, index) {
        if (Type === "BLOCK") {
            fire.database().ref('ALL_STUDENTS/' + Myid + '/Status').set(
                "BLOCKED");
            var DeleteData = this.state.STUDENT_ACTIVE_USER.splice(index, 1)
            // console.log(DeleteData)
            this.state.STUDENT_BLOCK_USER.push(DeleteData[0])
            this.setState({ COUNTER: this.state.COUNTER })
        }
        else if (Type === "UNBLOCK") {
            fire.database().ref('ALL_STUDENTS/' + Myid + '/Status').set(
                "ACTIVE")
            var DeleteData = this.state.STUDENT_BLOCK_USER.splice(index, 1)
            this.state.STUDENT_ACTIVE_USER.push(DeleteData[0])
            this.setState({ COUNTER: this.state.COUNTER })
        }
    }

    LogOutMe() {
        fire.auth().signOut().then(() => {
            this.props.history.push('/Login')
            // alert("LogOut SuccessFull")
        }).catch(function (error) {
            console.log(error)
            // alert("Many Error in LogOut")
        });
    }



    render() {
        this.state.COUNTER = 0;

        return (

            <div>
                <div class="topnav">
                    <a class="active">Home</a>
                    <a onClick={() => this.LogOutMe()} >LogOut</a>
                    <span>ADMIN ACCOUNT</span>
                </div>
                <div>

                    {/* COMPANY ACTIVE ACCOUNTS */}
                    <h6 className="listhead" >COMPANY ACTIVE ACCOUNTS</h6>
                    <div className="listsize" >
                        <table className="customers" >
                            <tr>
                                <th>Serial Number</th>
                                <th>Email</th>
                                <th>Block</th>
                            </tr>
                            {this.state.COMPANY_ACTIVE_USER.map((val, index) => {
                                console.log(val)

                                this.state.COUNTER++
                                return (
                                    <tr>
                                        <td>
                                            {this.state.COUNTER}
                                        </td>
                                        <td>
                                            {val.Data.Email}
                                        </td>
                                        <td>
                                            <button onClick={() => this.COMPANY_BLOCK_ACTIVE(val.ID, "BLOCK", index)}>
                                                BLOCK
                 </button>
                                        </td>
                                    </tr>
                                )
                            })}
                            {this.state.COUNTER = 0,
                                this.state.COMPANY_BLOCK_USER.map((val, index) => {
                                    this.state.COUNTER++
                                    return (
                                        <tr>
                                            <td>
                                                {this.state.COUNTER}
                                            </td>
                                            <td>
                                                {val.Data.Email}
                                            </td>
                                            <td>
                                                <button onClick={() => this.COMPANY_BLOCK_ACTIVE(val.ID, "UNBLOCK", index)}>
                                                    UN BLOCK
                 </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                        </table>
                    </div>

                    <hr />

                    {/* COMPANY BLOCK ACCOUNTS */}
                    {/* <h6 className="listhead">COMPANY BLOCK ACCOUNTS</h6>
                    <div className="listsize" >
                        <table className="customers" >
                            <tr>
                                <th>Serial Number</th>
                                <th>Email</th>
                                <th>UnBlock</th>
                            </tr>

                            {this.state.COUNTER = 0,
                                this.state.COMPANY_BLOCK_USER.map((val, index) => {
                                    this.state.COUNTER++
                                    return (
                                        <tr>
                                            <td>
                                                {this.state.COUNTER}
                                            </td>
                                            <td>
                                                {val.Data.Email}
                                            </td>
                                            <td>
                                                <button onClick={() => this.COMPANY_BLOCK_ACTIVE(val.ID, "UNBLOCK", index)}>
                                                    UN BLOCK
                 </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                        </table>
                    </div> */}


                    {/* STUDENT ACTIVE ACCOUNTS */}
                    <h6 className="listhead" >STUDENT ACTIVE ACCOUNTS</h6>
                    <div className="listsize" >
                        <table className="customers" >
                            <tr>
                                <th>Serial Number</th>
                                <th>Email</th>
                                <th>Block</th>
                            </tr>
                            {this.state.STUDENT_ACTIVE_USER.map((val, index) => {
                                console.log(val)

                                this.state.COUNTER++
                                return (
                                    <tr>
                                        <td>
                                            {this.state.COUNTER}
                                        </td>
                                        <td>
                                            {val.Data.Email}
                                        </td>
                                        <td>
                                            <button onClick={() => this.STUDENT_BLOCK_ACTIVE(val.ID, "BLOCK", index)}>
                                                BLOCK
                 </button>
                                        </td>
                                    </tr>
                                )
                            })}
                         {this.state.COUNTER = 0,
                                this.state.STUDENT_BLOCK_USER.map((val, index) => {
                                    this.state.COUNTER++
                                    return (
                                        <tr>
                                            <td>
                                                {this.state.COUNTER}
                                            </td>
                                            <td>
                                                {val.Data.Email}
                                            </td>
                                            <td>
                                                <button onClick={() => this.STUDENT_BLOCK_ACTIVE(val.ID, "UNBLOCK", index)}>
                                                    UN BLOCK
                 </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                        </table>
                    </div>

                    <hr />

                    {/* STUDENT BLOCK ACCOUNTS */}
                    {/* <h6 className="listhead">STUDENT BLOCK ACCOUNTS</h6>
                    <div className="listsize" >
                        <table className="customers" >
                            <tr>
                                <th>Serial Number</th>
                                <th>Email</th>
                                <th>UnBlock</th>
                            </tr>

                            {this.state.COUNTER = 0,
                                this.state.STUDENT_BLOCK_USER.map((val, index) => {
                                    this.state.COUNTER++
                                    return (
                                        <tr>
                                            <td>
                                                {this.state.COUNTER}
                                            </td>
                                            <td>
                                                {val.Data.Email}
                                            </td>
                                            <td>
                                                <button onClick={() => this.STUDENT_BLOCK_ACTIVE(val.ID, "UNBLOCK", index)}>
                                                    UN BLOCK
                 </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                        </table>
                    </div> */}




                </div>



            </div>
        )
    }
}


function mapStateToProps(state) {
    return ({
        MY_USER: state.MyReducer.MYUSER,
        ALL_COMPANY: state.MyReducer.COMPANYDATA,
        ALL_STUDENT: state.MyReducer.STUDENTDATA,
        COMPANYPOST: state.MyReducer.COMPANYPOST,
        STUDENTPOST: state.MyReducer.STUDENTPOST
    })
}

function mapDispatchToProps(dispatch) {
    // return({
    //     ChangeStateToReducer:(PickUserName)=>{
    //         dispatch(ChangeState(PickUserName))
    //     }

    // })
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);

