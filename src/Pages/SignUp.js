import React from 'react';
import fire from '../Config/fire'
import 'materialize-css/dist/css/materialize.min.css';
// import {TextInput} from 'react-materialize';
import Background from '../Images/SignUp3.jpg';
import {connect} from 'react-redux';
import { LoadUser } from '../ReduxStore/Action/action';

var sectionStyle = {
  backgroundImage: `url(${Background})`
};


class SignUpCompany extends React.Component{
 
 componentDidMount(){

  // fire.database().ref('UsersCode').on('value', (snapshot)=>{       
  //   this.setState({UserCode:snapshot.val()})  
// })


}
 
 
 
 
  constructor(){
    super();
     this.state={
       email:'',
       passwd:'',
       confirmpasswd:'',
       firstName:'',
       lastName:'',
       Phone:'',
       currentuser:"",
      };
this.PickData=this.PickData.bind(this);
this.SignUp=this.SignUp.bind(this);

    }
PickData(e,data){

  if(data=="email"){
  this.state.email=e.target.value;
}
else if(data=="passwd"){
  this.state.passwd=e.target.value;
}
else if(data=="confirmpasswd"){
  this.state.confirmpasswd=e.target.value;
}
else if(data=="FName"){
  this.state.firstName=e.target.value;
}
else if(data=="LName"){
  this.state.lastName=e.target.value;
}
else if(data=="Phone"){
  this.state.Phone=e.target.value;
}
}

SignUp(e){
  e.preventDefault();

  if(this.state.firstName!="" && this.state.lastName!="" && this.state.email!="" 
    && this.state.Phone!="" && this.state.passwd!="" && this.state.confirmpasswd!="")
     {
        if(this.state.passwd===this.state.confirmpasswd){

          fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.passwd).then((val)=>{
    
            fire.auth().currentUser.updateProfile({
              // photoURL:this.state.UserCode,
              displayName: this.state.firstName+" "+this.state.lastName,
            })
            .then(()=>{
               this.props.LoadMyUser();
              fire.database().ref('ALL_'+this.props.match.params.Type).push(
               {
            Email:this.state.email,
            AccType:this.props.match.params.Type,
            Status:"ACTIVE"
                }
                )
                if(this.props.match.params.Type==="COMPANY"){
                  this.props.history.push('/Home/Company')
                }
                else if(this.props.match.params.Type==="STUDENTS"){
                  this.props.history.push('/Home/Student')
                }
              })
            // .then(()=>{
            //   fire.database().ref('UsersCode').set(this.state.UserCode+1);
            // })
          })
          .catch(function(error) {
            alert(error)
          });        
        }
        else{
          alert("PLease Enter Same Password in Both Field");
        }
}
else{
  alert("Please Fill All Fields")
}

  


}

  
    render(){
     return(
       <div className='SignUpPage' style={sectionStyle} >
      <form onSubmit={(e)=>this.SignUp(e)} >
       <h5  >Sign Up FORM {this.props.match.params.want}</h5>
       <p>User ID : {this.state.UserCode}</p>
   <div className="ColSet" >
       <label>
           First Name
          <input className="MyWhite" onChange={(e)=>this.PickData(e,"FName")} type="text" />
       </label>

       <label>
           Last Name
          <input className="MyWhite" onChange={(e)=>this.PickData(e,"LName")} type="text" />
       </label>

       <label>
           E-MAIL
          <input className="MyWhite" onChange={(e)=>this.PickData(e,"email")} type="email" />
       </label>

       <label>
           Phone # 
          <input className="MyWhite" onChange={(e)=>this.PickData(e,"Phone")} type="Number" />
       </label>

       <label>
           Password
          <input className="MyWhite" onChange={(e)=>this.PickData(e,"passwd")} type="password" />
       </label>
       
       <label>
           Confirm Password
          <input className="MyWhite" onChange={(e)=>this.PickData(e,"confirmpasswd")} type="password" />
       </label>
       {/* <TextInput inputClassName=""
        label="First Name" onChange={(e)=>this.PickData(e,"FName")}/> */}
       {/* <TextInput inputClassName=""
        email validate label="Email" onChange={(e)=>this.PickData(e,"email")} /> */}
       {/* <TextInput inputClassName=""
        type="number" label="Phone Number" onChange={(e)=>this.PickData(e,"Phone")}  
         /> */}
    </div>
    {/* <div className="ColSet" >
       <TextInput inputClassName="" 
       label="Last Name" onChange={(e)=>this.PickData(e,"LName")}  
        />
       <TextInput inputClassName=""
        password label="Password" onChange={(e)=>this.PickData(e,"passwd")}  
        />
       <TextInput inputClassName=""
        password label="Confirm Password" onChange={(e)=>this.PickData(e,"confirmpasswd")}  
        />
    </div>   */}
     <br /> 
         <button className="waves-effect waves-light btn-large logbtn" type="submit" >Sign Up</button>
         </form>

<p>Already Member? <span style={{color:"blue"}} onClick={()=>this.props.history.push('/Login')}>Login Here.</span></p>

 
  
       </div>
     )
    }
}

function mapStateToProps(state){
  return({
      // CompanyData:state.MyReducer.COMPANYDATA,
      // StudentData:state.MyReducer.STUDENTDATA
  })
  }
  
function mapDispatchToProps(dispatch){
return({
    LoadMyUser:()=>{
        dispatch(LoadUser())
    }
})
}
  
  
export default connect(mapStateToProps,mapDispatchToProps)(SignUpCompany);
  
  