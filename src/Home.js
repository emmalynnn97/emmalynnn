
import React, { Component } from 'react'
import Hero from './Hero'
import FeatureProjects from './FeatureProjects'
export class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             endpoint:this.props.endpoint
        }
    }
        
    render() {
        return (
            <>
    <Hero endpoint={this.state.endpoint}/>
    <h2>Recent Projects</h2>
    <FeatureProjects endpoint={this.state.endpoint}/>
    </>
        )
    }
}

export default Home
