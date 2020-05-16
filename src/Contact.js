import React, { Component } from 'react'
import Hero from './Hero'
export class Contact extends Component {
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
            </>
        )
    }
}

export default Contact
