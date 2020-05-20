import React,{ Component } from 'react';
import Axios from 'axios';
import { Redirect, NavLink } from 'react-router-dom';
import './css/Home.css';
import Masonry from 'react-masonry-component';

class Home extends Component{
    constructor(){
        super();
        this.state={
            redirectBack: false,
            notes : [],
            list : []
        }
    }

    componentDidMount(){
        Axios.get('/home')
        .then((res)=>{
            if(!res.data['msg']){
                var notes = res.data['notes'].sort((a,b)=>{
                    return new Date(b.updatedAt)-new Date(a.updatedAt);
                })
                var list = res.data['list'].sort((a,b)=>{
                    return new Date(b.updatedAt) - new Date(a.updatedAt);
                })
                this.setState({notes, list})
            }else if(res.data['msg']){
                this.setState({
                    redirectBack:true
                })
            }
        })
    }

    buttonRedirect = (e)=>{
        console.log(e.target.value);
    }

    render(){
        var data = []
        this.state.notes.map((note)=>{
            data.push(note);
        })
        this.state.list.map((list)=>{
            data.push(list);
        })
        console.log(data);
        data = data.sort((a,b)=>{
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        })
        return(
            <div className="container">
                <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
                {this.state.redirectBack && <Redirect push to='/user/login' />}
                <h1 className="center">Home</h1>
                <Masonry
                className={'masonry-home'} 
                elementType={'ul'}
            >
                {data.map(function(element){
                if(element.type==='note'){
                    return (
                    <NavLink to="/user/login" className="masonry-button" style={{'textDecoration': 'none', 'color':'white'}}>
                        <div className="masonry-note box" key={element.noteID._id}>
                            {element.noteID.title}
                                <br />
                                <br />
                            {element.noteID.body}
                            
                        </div>
                    </NavLink>
                    );
                }else if(element.type==='list'){
                    return (
                        <NavLink to="/user/login" className="masonry-button" style={{'text-decoration': 'none', 'color':'white'}}>
                        <div className="masonry-list box" key={element.listID._id}>
                            {element.listID.title}
                            <br />
                            <br />
                            <ul className="incomplete">{/* eslint-disable-next-line */}
                                {element.listID.todo.map(function(todo){
                                    if(!todo.completed){
                                        return <li className="incomplete-list" key={todo._id}>{todo.item}</li>
                                    }
                                })}
                            </ul>
                            <hr style={{color:'#525355'}}/>
                            <ul className="complete">{/* eslint-disable-next-line */}
                                {element.listID.todo.map((todo)=>{
                                    if(todo.completed){
                                        return <li className="complete-list" key={todo._id}>{todo.item}</li>
                                    }
                                })}
                            </ul>
                        </div>
                        </NavLink>
                    )
                }})}
            </Masonry>
            </div>
        )
    }
}

export default Home;