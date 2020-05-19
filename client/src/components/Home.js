import React,{ Component } from 'react';

class Home extends Component{
    constructor(){
        super();
        this.state={
            data: []
        }
    }

    componentDidMount(){
        fetch('/home')
        .then((data)=>{
            this.setState({
                data
            },()=>{
                console.log('Data fetched ',data);
            })
        })
    }

    render(){
        return(
            <div className="container">
                <h4 className="center">Home</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, ut consequuntur! Temporibus voluptate minima voluptates laboriosam esse similique enim, soluta iste architecto numquam, illum placeat perferendis ex obcaecati. Sed, repudiandae?</p>
            </div>
        )
    }
}

export default Home;