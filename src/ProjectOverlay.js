import React, { Component } from 'react'

export class ProjectOverlay extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             title:this.props.title,
             content:this.props.content,
             opacity:'0'
        }
    }
    
    render() {
        const fontStyle={
            color:'white',
            fontWeight:'700'
        }
        const contentStyle={
            opacity:this.state.opacity,
            backgroundColor:'rgba(0,0,0,.7)',
            position:'absolute',
            left:'0',
            height:'100%',
            width:'100%',
            padding:'5%',
            transition:'.20s ease-in'
        }
        
        return (
           <>
           <div onMouseEnter={()=>{this.setState({opacity:'1'})}} onMouseLeave={()=>{this.setState({opacity:'0'})}} style={contentStyle}>
            <h1 style={fontStyle}>{this.state.title}</h1>
            <hr style={{
                borderTop:'2px solid white'
            }}/>
            <div style={fontStyle} dangerouslySetInnerHTML={{__html:this.state.content}}></div>
                    </div>
                    
                


                    </>
        )
    }
}

export default ProjectOverlay
