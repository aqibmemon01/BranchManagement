import React from 'react';
import fire from '../Config/fire'
import Background from '../Images/Login.jpg';
import '../CSS/App.css';
import '../CSS/Work.css';
import {connect} from 'react-redux';
import { LoadUser,GetStudent,GetCompany } from '../ReduxStore/Action/action';



var sectionStyle = {
  backgroundImage: `url(${Background})`
};


class Login extends React.Component{

componentDidMount(){
this.props.COMPANY_MOVE_STORE();
this.props.STUDENT_MOVE_STORE();

}

constructor(){
    super();
     this.state={
       email:"",
       passwd:"",
       signin:false,
       currentuser:"",
       
       LoginType:"",
       ActiveClass:"No"
     };
this.PickData=this.PickData.bind(this);
this.Login=this.Login.bind(this);
this.check=this.check.bind(this);
this.Logout=this.Logout.bind(this);
this.LoginType=this.LoginType.bind(this);

    }
PickData(e,data){
  if(data=="email"){
  this.state.email=e.target.value;
  }
else if(data=="passwd"){
  this.state.passwd=e.target.value;}
}

Login(e){
  var CompanyAc = false;
  var StudentAc = false;
  var AdminAc = false;

  e.preventDefault();
  fire.auth().signInWithEmailAndPassword(this.state.email, this.state.passwd).then(()=>
     { fire.auth().onAuthStateChanged((user)=> {
        if (user) {
            this.props.LoadMyUser();
          if(this.state.LoginType=="Company"){
              for(var x in this.props.CompanyData){
                if(this.props.CompanyData[x].Email==user.email){
                      if(this.props.CompanyData[x].Status=="ACTIVE"){
                         CompanyAc=true;
                        this.props.history.push('/Home/Company')
                        break;
                       }
                       else if(this.props.CompanyData[x].Status=="BLOCKED"){
                        CompanyAc=true;
                        this.props.history.push('/Blocked');
                        break;
                       }
                   }    
              }
              if(CompanyAc==false) alert("Your A/C is Not Available in Company Accounts")
          }
           else if(this.state.LoginType=="Student"){
                for(var x in this.props.StudentData){
                  if(this.props.StudentData[x].Email==user.email){
                        if(this.props.StudentData[x].Status=="ACTIVE"){
                           StudentAc=true;
                          this.props.history.push('/Home/Student')
                          break;
                         }
                         else if(this.props.StudentData[x].Status=="BLOCKED"){
                          StudentAc=true;
                          this.props.history.push('/Blocked');
                          break;
                         }
                     }    
                }
                if(StudentAc==false) alert("Your A/C is Not Available in Student Accounts")
            }
            else if(this.state.LoginType=="Admin"){
                if(user.email==="admin@admin.com"){
              this.props.history.push('/Home/Admin')}
                else{
                  alert("You have No Admin Authority")
                }
            }        
        }
         else {
          // User is signed out.
          // ...
        }
      })
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
    // ...
  })
}

Logout(){
  fire.auth().signOut().then(function() {
    // Sign-out successful.
    alert("LogOut SuccessFull")
  }).catch(function(error) {
    // An error happened.
  });
}

check(){
  fire.auth().onAuthStateChanged(function(user) {
    if (user) {
      alert(user.email)
      // User is signed in.
    } else {
      // No user is signed in.
      console.log("NO USER AVAILABLE")
    }
  });
}

LoginType(Type){
this.setState({LoginType:Type})
}

  
render(){
     return(
       <div  className='SignUpPage' style={sectionStyle} >
                <div class="topnav">
                    <a class={this.state.LoginType==="Company"?"active":""} 
                    onClick={() => this.LoginType("Company")}>Company Login</a>
                    <a class={this.state.LoginType==="Student"?"active":""}
                    onClick={() => this.LoginType("Student")} >Student Login</a>
                    <a class={this.state.LoginType==="Admin"?"active":""} 
                    onClick={() => this.LoginType("Admin")} >Admin Login</a>
                    <span onClick={()=>this.props.history.push("SignUp/COMPANY")} >SignUP Company</span>
                    <span onClick={()=>this.props.history.push("SignUp/STUDENTS")} >SignUP Student</span>
                </div>


      <form  >
     <h5 className='login' >{this.state.LoginType} Login</h5>
      <div className='logininput' >
       {/* <TextInput email validate label="Email" onChange={(e)=>this.PickData(e,"email")} />
       <TextInput password label="Password" onChange={(e)=>this.PickData(e,"passwd")} /> */}
       <input className="MyWhite" type='text' onChange={(e)=>this.PickData(e,"email")} />
       <br /><br />
       <input className="MyWhite" type='password' onChange={(e)=>this.PickData(e,"passwd")} />


       </div>
         <button className="waves-effect waves-light btn-large logbtn" type="submit"
          onClick={this.Login} >LOGIN</button><br /><br />
         {/* <button className="btn" type="button" onClick={this.Logout} >LOG OUT</button> */}
         </form><br />
         {/* <button onClick={this.check} >CHECK</button> */}
       </div>
     )
    }
}


function mapStateToProps(state){
  return({
      CompanyData:state.MyReducer.COMPANYDATA,
      StudentData:state.MyReducer.STUDENTDATA
  })
  }
  
function mapDispatchToProps(dispatch){
return({
    LoadMyUser:()=>{
        dispatch(LoadUser())
    },
    COMPANY_MOVE_STORE:()=>{
      dispatch(GetCompany())
  },
    STUDENT_MOVE_STORE:()=>{
      dispatch(GetStudent())
  }
})
}
  
  
export default connect(mapStateToProps,mapDispatchToProps)(Login);
  
  