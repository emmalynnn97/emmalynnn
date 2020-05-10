import React, { Component } from 'react'

export class Project extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            image:this.props.image,
            title:this.props.title,
            content:this.props.content,
            width:'22.5vw',
            height:'25vh',
            opacity:0
        }
    }
    render() {
        const projectStyle={
            backgroundImage:`url("${this.state.image}")`,
            backgroundSize:'cover',
            backgroundPosition:'center',
            height:this.state.height,
            width:this.state.width
        }
        const fontStyle={
            color:'white',
            fontWeight:'700'
        }
        const contentStyle={
            opacity:this.state.opacity,
            backgroundColor:'rgba(0,0,0,.7)',
            position:'absolute',
            width:this.state.width,
            height:this.state.height,
            transition:'.20s ease-in'
        }
        return (
        <div onMouseEnter={()=>{
            this.setState({
                opacity:1
            })
        }}
        onMouseLeave={()=>{
            this.setState({
                opacity:0
            })
        }} 
        className='project' style={projectStyle}>
            <div style={contentStyle}>
            <h1 style={fontStyle}>{this.state.title}</h1>
                        <hr></hr>
            <div style={fontStyle} dangerouslySetInnerHTML={{__html:this.state.content}}></div>
                    </div>
            </div>
           
                  
                   
        )
    }
}
export default Project
