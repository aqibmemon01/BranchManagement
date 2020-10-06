import React from 'react';
import {connect} from 'react-redux';
import {GetCompany, GetStudent} from '../ReduxStore/Action/action';
import '../CSS/Work.css';



class LoginType extends React.Component{

componentWillMount(){



}



constructor(){
super();


this.Companylogin=this.Companylogin.bind(this);
this.Studentlogin=this.Studentlogin.bind(this);
this.Adminlogin=this.Adminlogin.bind(this);

}



Companylogin(){
this.props.COMPANY_MOVE_STORE();
this.props.history.push("Login/Company")
}
Studentlogin(){
this.props.STUDENT_MOVE_STORE();
this.props.history.push("Login/Student")    
}
Adminlogin(){
this.props.COMPANY_MOVE_STORE();
this.props.STUDENT_MOVE_STORE();
this.props.history.push("Login/Admin")
}

render(){

return(
<div className="logtype" >
{/* <button className="btn">COMPANY LOGIN</button> */}
<h5>Login Type</h5>
<button className="btn" onClick={this.Companylogin}>COMPANY LOGIN</button>
<button className="btn" onClick={this.Studentlogin}>STUDENT LOGIN</button>
<button className="btn" onClick={this.Adminlogin}>ADMIN LOGIN</button>
<h5>SignUp Type</h5>
<button className="btn" onClick={()=>this.props.history.push('SignUp/COMPANY')}>SIGNUP COMPANY</button>
<button className="btn" onClick={()=>this.props.history.push('SignUp/STUDENTS')}>SIGNUP STUDENT</button>

</div>
)

}

}

function mapStateToProps(state){
    return({
        UserName:state.MyReducer.UserName
    })
    }
    
function mapDispatchToProps(dispatch){
    return({
        COMPANY_MOVE_STORE:()=>{
            dispatch(GetCompany())
        },
        STUDENT_MOVE_STORE:()=>{
            dispatch(GetStudent())
        }
    
    })
    }
    
    
export default connect(mapStateToProps,mapDispatchToProps)(LoginType);