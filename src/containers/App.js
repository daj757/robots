import React from 'react';
import CardList from '../components/CardList'
import Scroll from '../components/Scroll'
import SearchBox from '../components/SearchBox'
import ErrorBoundary from '../components/ErrorBoundry'
import './App.css'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      robots: [],
      searchField: ''
    }
  }
  onSearchChange = (event) => {
    this.setState({searchField: event.target.value})
  }
  componentDidMount () {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({robots: users})
    )
  }
  render() {
    const {robots, searchField} = this.state
    const filteredRobots = this.state.robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase())
    }) 
    return  !robots.length ? <h1 className="tc">Loading</h1> : (
    <div className="tc">
       <h1 className="f1">Robot Friends</h1>
       <SearchBox searchChange = {this.onSearchChange} />
       <Scroll>
         <ErrorBoundary>
         <CardList robots={filteredRobots}/>
         </ErrorBoundary>
       
       </Scroll>
     
      
    </div>
   
  )
    
    }
}

export default App;
