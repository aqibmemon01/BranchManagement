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
                <span className="" >Required : {this.props.Post}</span><br />
                <span className="" >Salary Offer : {this.props.Salary}</span><br />
                <span className="" >Required Experience : {this.props.Experience}</span><br />
                <span className="" >Age Limite : {this.props.Age}</span><br />
                <span className="" >Email : {this.props.Email}</span><br />

                <button className="PostBtn " onClick={this.props.ClickApply} >Apply Now</button>
            </div>
        )
    }
}

export default MyPost;