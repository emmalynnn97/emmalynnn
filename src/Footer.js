import React, { Component } from 'react'
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
export class Footer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             color:this.props.color
        }
    }
    
    render() {
        const footerStyle={
            width:'100%',
            height:'100px',
            backgroundColor:this.state.color,
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            zIndex:'2',
            borderTop:'2px solid white',
            position:'absolute',
            top:'2500px'
        }
        const iconStyle={
            height:'50px',
            width:'50px',
            color:'white',
            margin:'0 1vw'
        }
        return (
            <div style={footerStyle}>
                <a rel='noopener noreferrer' target='_blank' href='https://github.com/emmalynnn97'><FaGithub style={iconStyle}></FaGithub></a>
                <a rel='noopener noreferrer' target='_blank' href='https://www.linkedin.com/in/emma-guy-639014189/'><FaLinkedin style={iconStyle}></FaLinkedin></a>
            </div>
        )
    }
}

export default Footer
