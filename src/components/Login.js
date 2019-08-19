import React from 'react';
import './Login.css';
import {Link} from 'react-router-dom';

import {lam} from '../global';



class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: "",
            password: "", 
            IsLogin: lam.isLogin,
        };
        this.handlerAccountChange = this.handlerAccountChange.bind(this);
        this.handlerPasswordChange = this.handlerPasswordChange.bind(this);
       
        this.HAHA = this.HAHA.bind(this);

    }

    handlerAccountChange(e) {
        this.setState({account: e.target.value});
    }

    handlerPasswordChange(e) {
        this.setState({password: e.target.value});
    }

    // showInfo(e) {
    //     alert(this.state.account + " " + this.state.password);
    // }


    

    HAHA() {
        console.log(lam.isLogin);
    }

    render() {
        return (

            
            <div class="row">
                <div class="left">Left side</div>
                <div class="right">
                    <div class="form-group">
                        <label for="account">Account: </label>
                        <input id="account" class="form-control" onChange={this.handlerAccountChange} />
                        <label for="password">Password: </label>
                        <input id="password" class="form-control" onChange={this.handlerPasswordChange} />
                    </div>
                    <Link to="/MyPage" class="btn btn-primary"> 
                        <span onClick={this.props.changeStatusLogin}>Submit</span>  
                    </Link> 
                    {/* <a href='./MyPage' class="btn btn-primary">Submit</a>
                    <Link to="/MyPage" class="btn btn-primary"> Submit </Link>  */}
                    {/* <button onClick={this.props.changeStatusLogin}> Click here to login </button> */}
                </div>
            </div>
        )
    }
    
}



export default Login;

