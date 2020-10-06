import React from 'react';
import fire from '../Config/fire'
import MyPost from './MyPost(Company)'
import { connect } from 'react-redux';
import { LoadApplyRequest, LoadStudentPost, LoadCompanyPost } from '../ReduxStore/Action/action';
import '../CSS/Work.css';



class CompanyHome extends React.Component {


    componentDidMount() {
        this.props.LoadPosts();
        this.props.LoadApplyReq();
        this.props.LoadPostsComp();
        setTimeout(() => {
            for (var x in this.props.PostRec) {
                var ApplyChk = false;
                this.props.PostRec[x].Requests.map((val) => {
                    if (val === this.props.MYUSER.email) {
                        ApplyChk = true;
                    }
                })
                this.state.MyPosts.push({ Data: this.props.PostRec[x], ID: x, ApplyStatus: ApplyChk })
            }

            for (var x in this.props.PostRec) {
                this.state.SendRequest.push(this.props.PostRec[x])
            }

            for (var x in this.props.PostRecComp) {
                if (this.props.MYUSER.email === this.props.PostRecComp[x].Email) {
                    console.log(this.props.PostRecComp[x])
                    this.state.OwnPosts.push(this.props.PostRecComp[x])
                }
            }

            for (var x in this.props.ApplyRequest) {
                if (this.props.MYUSER.email === this.props.ApplyRequest[x].To) {
                    this.state.MyApply.push(this.props.ApplyRequest[x])
                }
            }
            this.setState({ ApplyData: this.state.ApplyData })
        }, 1500)
    }



    constructor(props) {
        super(props);
        this.state = {
            MyPosts: [],
            MyApply: [],
            OwnPosts: [],
            SendRequest: [],
            MyCounter: 0,
            MyStyle: {
                display: "none"
            },
            StyleReq: {
                display: "none"
            },
            ApplyData: '',

            ComName: "",
            Salary: "",
            WorkHour: "",
        }

    }

    CurrentJob = ""
    PickData(val, myindex) {
        this.setState({ ApplyData: val });
        this.CurrentJob = { ID: val.ID, index: myindex }
        this.setState({ MyStyle: { display: "block" } });
    }

    ApplyJob(Ref) {

        if (this.state.ComName, this.state.Salary, this.state.WorkHour != "") {
            fire.database().ref('HireRequests').push(
                {
                    From: this.props.MYUSER.email,
                    To: this.state.ApplyData.Data.Email,
                    Name: this.state.ComName,
                    Mobile: this.state.Salary,
                    Age: this.state.WorkHour,
                    Ref: this.state.ApplyData.Data
                }
            )
            fire.database().ref('StudentPost/' + Ref.ID + '/Requests/' + this.state.MyPosts[Ref.index].Data.Requests.length).set(
                this.props.MYUSER.email
            )
            this.props.LoadPosts();
            this.setState({ MyStyle: { display: "none" } })
        }
        else { alert("Please Fill All Fields") }
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
        if(this.props.PostRec===""){
            return(
                <div>
                    <h3>Loading....</h3>
                </div>
            )
        }
        else{
        return (

            <div>
                <div class="topnav">
                    <a class="active">Home</a>
                    <a onClick={() => this.props.history.push("/Home/Company/PostJob")} >Post Job</a>
                    <a onClick={() => this.LogOutMe()} >LogOut</a>
                    <span>COMPANY ACCOUNT<br /> Hi, {this.props.MYUSER.email}</span>
                </div>

                {/* MY REQUESTS */}
                <div className="RequestForm" style={this.state.StyleReq} >
                    <button className="ReqClose btn red" onClick={() => this.setState({ StyleReq: { display: "none" } })} >
                        CLOSE</button>
                    <table className="customers" >
                        <tr>
                            <th>Student Name</th>
                            <th>Education</th>
                            <th>Experience</th>
                            <th>Against Post</th>
                            <th>Email</th>
                        </tr>
                        {this.state.MyApply.map((val) => {
                            return (
                                <tr>
                                    <td>{val.Name}</td>
                                    <td>{val.Education}</td>
                                    <td>{val.Experience}</td>
                                    <td>{val.Ref.Job_Title}</td>
                                    <td>{val.From}</td>
                                </tr>
                            )
                        })}

                    </table>

                </div>

                {/* HIDDEN APPLY FORM */}
                <div className="ApplyForm" style={this.state.MyStyle} >
                    <button className="postbtn2 btn red" onClick={() => this.setState({ MyStyle: { display: "none" } })}>X</button>
                    <h5>Provide Detail</h5>
                    <label>
                        Company Name <input onChange={(e) => this.setState({ ComName: e.target.value })} />
                    </label>
                    <label>
                        Salary Offer <input onChange={(e) => this.setState({ Salary: e.target.value })} type="Number" />
                    </label>
                    <label>
                        Working Hours <input onChange={(e) => this.setState({ WorkHour: e.target.value })} type="Number" />
                    </label>

                    <button className="postbtn2 btn" onClick={() => this.ApplyJob(this.CurrentJob)} >SUBMIT</button>
                </div>


                <div className="MainDiv" >
                    <div className="FirstDiv" >
                        <h6>Requests Received</h6>
                        <table className="customers" >
                            <tr>
                                <th>Student Name</th>
                                <th>Against Post</th>
                                <th>Email</th>
                            </tr>
                            {this.state.MyApply.map((val) => {
                                return (
                                    <tr>
                                        <td>{val.Name}</td>
                                        <td>{val.Ref.Job_Title}</td>
                                        <td>{val.From}</td>
                                    </tr>
                                )
                            })}
                        </table>
                        <br />
                        <br />

                        <h6>My Requests</h6>
                        <table className="customers" >
                            <tr>
                                <th>Job_Title</th>
                                <th>Exp Salary</th>
                                <th>Email</th>
                            </tr>
                            {this.state.MyPosts.map((val) => {

                                if (val.ApplyStatus) {
                                    return (
                                        <tr>
                                            <td>{val.Data.Name}</td>
                                            <td>{val.Data.Job_Title}</td>
                                            <td>{val.Data.Email}</td>
                                        </tr>
                                    )
                                }
                            })}
                        </table>


                    </div>
                    <div className="SecDiv" >
                        {this.state.MyPosts.map((Val, index) => {
                            return (
                                <MyPost Title={Val.Data.Job_Title} Name={Val.Data.Name} Experience={Val.Data.Experience} Education={Val.Data.Education}
                                    Salary={Val.Data.Salary} Age={Val.Data.Age} Email={Val.Data.Email}

                                    ClickApply={Val.ApplyStatus ? () => alert("Already Applied") :
                                        () => this.PickData(Val, index)}
                                    btntext={Val.ApplyStatus ? "Requested" : "Hire Now"}
                                    bgColor={Val.ApplyStatus ? "white" : "blue"}
                                    mycolor={Val.ApplyStatus ? "black" : "white"}
                                />
                            )
                            // this.state.MyCounter++
                        })}
                    </div>

                    <div className="ThirdDiv" >
                        <h6>My Posts</h6>
                        <table className="customers" >
                            <tr>
                                <th>Title</th>
                                <th>Salary</th>
                                <th>Company Name</th>
                            </tr>
                            {this.state.OwnPosts.map((val) => {
                                return (
                                    <tr>
                                        <td>{val.Job_Title}</td>
                                        <td>{val.Salary}</td>
                                        <td>{val.Company_Name}</td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>




                </div>

            </div>

        )
            }
    }
}

function mapStateToProps(state) {
    return ({
        MYUSER: state.MyReducer.MYUSER,
        PostRec: state.MyReducer.STUDENTPOST,
        ApplyRequest: state.MyReducer.APPLYREQUEST,
        PostRecComp: state.MyReducer.COMPANYPOST,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        LoadPosts: () => {
            dispatch(LoadStudentPost())
        },
        LoadPostsComp: () => {
            dispatch(LoadCompanyPost())
        },

        LoadApplyReq: () => {
            dispatch(LoadApplyRequest())
        },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyHome);