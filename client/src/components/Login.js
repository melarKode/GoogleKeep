import React,{ Component } from 'react';
import './css/Login.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password: '',
            error:'',
            redirect:false
        }
    }    
    changeHandler = (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e)=>{
        e.preventDefault();
        axios.post('/user/login', this.state)
            .then((response)=>{
                console.log(response)
                if(response.data.error){
                    this.setState({
                        error: response.data.error,
                        password: '',
                        username:''
                    })
                }else{
                    this.setState({
                        username:'',
                        password:'',
                        redirect:true
                    })
                }
            })
            .catch((err)=>{
                this.setState({
                    password:'',
                    error: 'Please try again.'
                })
            })
    }
    componentDidMount(){
        axios.get('/user/login')
            .then((response)=>{
                console.log(response);
                if(response){
                    this.setState({
                        redirect:true
                    })
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }
    render(){
        const {username, password, error} = this.state;
        return(
                <div className="form">
                <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@500&display=swap" rel="stylesheet" />
                {this.state.redirect && <Redirect push to='/home' />}
                <br /><br /><br /><br />
                    <form action="/user/login" method="POST" onSubmit={this.submitHandler}>
                    <div className='input-wrapper'>
                        <label htmlFor="username">Username: </label>
                        <input placeholder='Username' spellCheck={false} type="text" name="username" value={username} onChange={this.changeHandler} autoComplete="off" required/>
                        <br />
                        <label htmlFor="password">Password: </label>&nbsp;
                        <input placeholder="Password" spellCheck={false} type="password" name="password" value={password} onChange={this.changeHandler} autoComplete="off" required/>
                        <br /><br />
                        <button type="submit">Log in</button>
                        <br /><br />
                    </div>
                    </form>
                    <div className="alert">
                            {error}
                        </div>
                </div>
        )
    }
}

export default Login;