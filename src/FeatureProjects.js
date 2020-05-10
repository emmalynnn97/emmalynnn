import React, { Component } from 'react'
import Project from './Project'
import './App.css';
export class FeatureProjects extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            endpoint:this.props.endpoint,
            content:[]
        }
    }
    componentDidMount() {
        fetch(this.state.endpoint)
            .then(res => res.json())
            .then((data) => {
                this.setState({ content:data.object.metadata.feature_projects})
            })
            .catch(console.log)
    }
    render() {
        const containerStyle={
            display:'flex',
            width:'100%',
            justifyContent:'space-evenly',
            border:'2px solid black',
            backgroundColor:'#706677',
            marginTop:'5%',
            padding:'25px 25px',
        }
        
        let projects = this.state.content.map((project)=>(
            <Project content={project.content} title={project.title} image={project.metadata.image.url}/>
        ))
        return (
        <div style={containerStyle}>
            {projects}
            </div>
        )
    }
}

export default FeatureProjects
