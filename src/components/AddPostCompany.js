import React from 'react';
import fire from '../Config/fire';
import { connect } from 'react-redux';
import '../CSS/Work.css';



class AddPost extends React.Component {

    constructor() {
        super();
        this.state = {
            JobTitle: "",
            EduReq: "",
            ExpReq: "",
            AgeLimite: "",
            ComName: "",
            Salary: "",
        }

        this.PostJob = this.PostJob.bind(this);
    }


    PostJob() {

        if (this.state.JobTitle, this.state.AgeLimite, this.state.ComName, this.state.EduReq, this.state.ExpReq,
            this.state.Salary != "") {
            fire.database().ref('CompanyPost').push(
                {
                    Job_Title: this.state.JobTitle,
                    Company_Name: this.state.ComName,
                    Salary: this.state.Salary,
                    Education_Req: this.state.EduReq,
                    Experience_Req: this.state.ExpReq,
                    Age_Limite: this.state.AgeLimite,
                    Email: this.props.MYUSER.email
                }
            )
            this.props.history.push('/Home/Company')
        }
        else { alert("Please Fill Out Fields") }
    }


    render() {
        return (
            <div>
                <h4>POST JOB</h4>
                <label>Job Title :
            <input onChange={(e) => this.setState({ JobTitle: e.target.value })} />
                </label>
                <label>Education Required :
            <input onChange={(e) => this.setState({ EduReq: e.target.value })} />
                </label>
                <label>Experience Required :
            <input onChange={(e) => this.setState({ ExpReq: e.target.value })} />
                </label>
                <label>Age Limit :
            <input onChange={(e) => this.setState({ AgeLimite: e.target.value })} />
                </label>
                <label>Company Name :
            <input onChange={(e) => this.setState({ ComName: e.target.value })} />
                </label>
                <label>Salary Package :
            <input type="Number" onChange={(e) => this.setState({ Salary: e.target.value })} />
                </label>

                <button className="postbtn btn" onClick={() => this.PostJob()} >
                    POST JOB
</button><br />
                <button className="postbtn btn red" onClick={() => this.props.history.push('/Home/Company')} >
                    Close
</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return ({
        MYUSER: state.MyReducer.MYUSER
    })
}

// function mapDispatchToProps(dispatch){
// return({
//     ChangeStateToReducer:(PickUserName)=>{
//         dispatch(ChangeState(PickUserName))
//     }

// })
// }


export default connect(mapStateToProps)(AddPost);

