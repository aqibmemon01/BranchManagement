import React from 'react';
import fire from '../Config/fire'
import MyPost from './MyPost(Students)'
import { connect } from 'react-redux';
import { LoadCompanyPost, LoadHireRequest } from '../ReduxStore/Action/action';
import '../CSS/Work.css';



class StudentHome extends React.Component {


    componentDidMount() {
        this.props.LoadPosts();
        this.props.LoadHireReq();

        setTimeout(() => {
            for (var x in this.props.PostRec) {
                // console.log(this.props.PostRec[x])
                this.state.MyPosts.push(this.props.PostRec[x])
            }
            for (var x in this.props.HireRequest) {
                console.log(this.props.HireRequest[x])
                if (this.props.MYUSER.email === this.props.HireRequest[x].To) {
                    this.state.MyHire.push(this.props.HireRequest[x])
                }
            }
            this.setState({ ApplyData: this.state.ApplyData })
        }, 3000)

    }


    constructor() {
        super();
        this.state = {
            MyPosts: [],
            MyHire: [],
            MyStyle: {
                display: "none"
            },
            StyleReq: {
                display: "none"
            },
            ApplyData: {},
            Name: "",
            Age: "",
            Education: "",
            Experience: ""

        }
    }


    PickData(Val) {
        this.setState({ ApplyData: Val });
        this.setState({ MyStyle: { display: "block" } });
    }

    ApplyJob() {

        if (this.state.Age, this.state.Education, this.state.Experience != "") {

            fire.database().ref('ApplyRequests').push(
                {
                    From: this.props.MYUSER.email,
                    To: this.state.ApplyData.Email,
                    Name: this.state.Name,
                    Age: this.state.Age,
                    Education: this.state.Education,
                    Experience: this.state.Experience,
                    Ref: this.state.ApplyData
                }
            )
            this.setState({ MyStyle: { display: "none" } })
        }
        else { alert("Please Fill All Required Field") }
    }

    LogOutMe() {
        fire.auth().signOut().then(() => {
            this.props.history.push('/LoginType')
            // alert("LogOut SuccessFull")
        }).catch(function (error) {
            console.log(error)
            // alert("Many Error in LogOut")
        });
    }

    render() {

        return (

            <div>
                <h6 className="welcome">WELCOME STUDENT</h6>


                <div className="topnav">
                    <a className="active">Home</a>
                    <a onClick={() => this.props.history.push("/Home/Student/PostProfile")} >Post Profile</a>
                    <a onClick={() => this.setState({ StyleReq: { display: "block" } })} >Requests</a>
                    <a onClick={() => this.LogOutMe()} >LogOut</a>
                    <span>STUDENT ACCOUNT<br /> Hi, {this.props.MYUSER.email}</span>
                </div>


                <br />
                <br />
                <div>

                    {/* MY REQUESTS */}
                    <div className="RequestForm" style={this.state.StyleReq} >
                        <button className="ReqClose btn red" onClick={() => this.setState({ StyleReq: { display: "none" } })} >
                            CLOSE</button>
                        <table className="customers" >
                            <tr>
                                <th>Company Name</th>
                                <th>Offer Sal</th>
                                <th>Against</th>
                                <th>Against Post</th>
                                <th>Email</th>
                            </tr>
                            {this.state.MyHire.map((val) => {
                                return (
                                    <tr>
                                        <td>{val.Name}</td>
                                        <td>{val.Mobile}</td>
                                        <td>{val.Ref.Salary}</td>
                                        <td>{val.Ref.Job_Title}</td>
                                        <td>{val.From}</td>
                                    </tr>
                                )
                            })}

                        </table>

                    </div>

                    {/* HIDDEN APPLY FORM */}
                    <div className="ApplyForm" style={this.state.MyStyle} >
                        <button onClick={() => this.setState({ MyStyle: { display: "none" } })}>X</button>
                        <h5>Provide Detail</h5>
                        <label>
                            Name <input value={this.state.Name} onChange={(e) => this.setState({ Name: e.target.value })} />
                        </label>
                        <label>
                            Age <input onChange={(e) => this.setState({ Age: e.target.value })} type="Number" />
                        </label>
                        <label>
                            Education <input onChange={(e) => this.setState({ Education: e.target.value })} />
                        </label>
                        <label>
                            Experience <input onChange={(e) => this.setState({ Experience: e.target.value })} />
                        </label>

                        <button onClick={() => this.ApplyJob()} >SUBMIT</button>
                    </div>


                    {this.state.MyPosts.map((Val) => {
                        return (
                            <MyPost Title={Val.Company_Name} Post={Val.Job_Title} Experience={Val.Experience_Req}
                                Salary={Val.Salary} Age={Val.Age_Limite} Email={Val.Email} ClickApply={() => this.PickData(Val)} />
                        )
                    })}


                </div>

            </div>

        )
    }
}

function mapStateToProps(state) {
    return ({
        MYUSER: state.MyReducer.MYUSER,
        PostRec: state.MyReducer.COMPANYPOST,
        HireRequest: state.MyReducer.HIREREQUEST

    })
}

function mapDispatchToProps(dispatch) {
    return ({
        LoadPosts: () => {
            dispatch(LoadCompanyPost())
        },
        LoadHireReq: () => {
            dispatch(LoadHireRequest())
        }

    })
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentHome);