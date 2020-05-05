import React, { Fragment } from 'react';
import {robots} from '../components/robots';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';
class App extends React.Component{
    constructor(){
        super();
        this.state={
            robots:[],
            serachfield:''
        }
    }
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users=>{ this.setState({robots:users})});
       
    }
    onSearchChange = (event) =>{
        this.setState({serachfield:event.target.value});
      
      
    }
    render(){
        const {robots,serachfield}= this.state;
        const filteredRobots = robots.filter(robot=>{
            return robot.name.toLowerCase().includes(serachfield.toLowerCase());
        });
        return !robots.length ?  <h1>Loading</h1> :       
       <Fragment>
        <div className='tc'>
        <h1 className='f2'>RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
        <ErrorBoundry>
        <CardList  robots={filteredRobots}/>
        </ErrorBoundry>
        </Scroll>
        </div>
        </Fragment>
    
}


}

export default App;