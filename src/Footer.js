import React, { Component } from 'react'

export class Footer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             color:this.props.color
        }
    }
    
    render() {
        const footerStyle={
            position:'absolute',
            top:'200vh',
            left:'0',
            right:'0',
            width:'100%',
            height:'10%',
            backgroundColor:this.state.color
        }
        return (
            <div style={footerStyle}>
                
            </div>
        )
    }
}

export default Footer
