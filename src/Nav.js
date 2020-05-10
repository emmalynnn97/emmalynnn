import React, { Component } from 'react'

export class Nav extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             color:this.props.color
        }
    }
    
    render() {
        const navStyle={
            position:'fixed',
            top:'0',
            left:'0',
            right:'0',
            zIndex:'2',
            width:'100%',
            height:'10%',
            backgroundColor:this.state.color
        }
        return (
            <div style={navStyle}>
                
            </div>
        )
    }
}

export default Nav
