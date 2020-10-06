import React from 'react';
import fire from '../Config/fire';
import { connect } from 'react-redux';



class AddPost extends React.Component {

    constructor() {
        super();
        this.state = {
            JobTitle: "",
            Edu: "",
            Exp: "",
            Age: "",
            Name: "",
            Salary: "",

        }
        this.PostProf = this.PostProf.bind(this)
    }



    PostProf() {

        fire.database().ref('StudentPost').push(
            {
                Job_Title: this.state.JobTitle,
                Name: this.state.Name,
                Salary: this.state.Salary,
                Education: this.state.Edu,
                Experience: this.state.Exp,
                Age: this.state.Age,
                Email: this.props.MYUSER.email
            }
        )
    }


    render() {
        return (
            <div>
                <h4>POST PROFILE</h4>
                <label>Job Title :
            <input onChange={(e) => this.setState({ JobTitle: e.target.value })} />
                </label>
                <label>Name :
            <input onChange={(e) => this.setState({ Name: e.target.value })} />
                </label>
                <label>Education :
            <input onChange={(e) => this.setState({ Edu: e.target.value })} />
                </label>
                <label>Experience this Field :
            <input onChange={(e) => this.setState({ Exp: e.target.value })} />
                </label>
                <label>Age :
            <input onChange={(e) => this.setState({ Age: e.target.value })} />
                </label>
                <label>Expected Salary :
            <input type="Number" onChange={(e) => this.setState({ Salary: e.target.value })} />
                </label>

                <button className="postbtn btn" onClick={() => this.PostProf()} >
                    POST JOB
</button><br />
                <button className="postbtn btn red" onClick={() => this.props.history.push('/Home/Student')} >
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

