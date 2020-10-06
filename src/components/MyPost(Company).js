import React from 'react';
import '../CSS/Work.css';
// import 'materialize-css/dist/css/materialize.min.css';

class MyPost extends React.Component {

        constructor(props) {
                super(props);

        }

        render() {
                return (

                        <div className="PostDiv" onClick={this.props.MyClick} >
                                <h6 className="">{this.props.Title}</h6>
                                <span className="" >{this.props.Name}</span><br />
                                <span className="" >Expected Salary : {this.props.Salary}</span><br />
                                <span className="" >Education : {this.props.Education}</span><br />
                                <span className="" >Experience : {this.props.Experience}</span><br />
                                <span className="" >Email : {this.props.Email}</span><br />

                                <button style={{
                                        backgroundColor: this.props.bgColor,
                                        color: this.props.mycolor
                                }}
                                        className="PostBtn " onClick={this.props.ClickApply} >{this.props.btntext}</button>
                        </div>
                )
        }
}

export default MyPost;