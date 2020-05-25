import React from 'react';
import {connect} from 'react-redux'
import CardList from '../components/CardList'
import Scroll from '../components/Scroll'
import SearchBox from '../components/SearchBox'
import {setSearchField} from '../actions'
import ErrorBoundary from '../components/ErrorBoundry'
import './App.css'

const mapStateToProps = state => {
  return {
  searchField: state.searchField
}}

const mapDispatchToProps = dispatch => {
  return {onSearchChange: (event) => dispatch(setSearchField(event.target.value))}
}

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      robots: [],
     
    }
  }
  // Without Redux use below
  // onSearchChange = (event) => {
  //   this.setState({searchField: event.target.value})
  // }
  componentDidMount () {

    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({robots: users})
    )
  }
  render() {
    const {robots} = this.state
    const {searchField, onSearchChange} = this.props
    const filteredRobots = robots.filter(robot => {
       return robot.name.toLowerCase().includes(searchField.toLowerCase())
    }) 
    return  !robots.length ? <h1 className="tc">Loading</h1> : (
    <div className="tc">
       <h1 className="f1">Robot Friends</h1>
       <SearchBox searchChange = {onSearchChange} />
       <Scroll>
         <ErrorBoundary>
         <CardList robots={filteredRobots}/>
         </ErrorBoundary>
       
       </Scroll>
     
    </div>
   
  )
    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
