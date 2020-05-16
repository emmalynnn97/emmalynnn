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
            justifyContent:'center',
            alignItems:'center',
            height:'40vh',
            width:'100%'
        }
        let projects = this.state.content.map((project)=>(
            <Project content={project.content} title={project.title} image={project.metadata.image.url}/>
        ))
        return (

           
        <div className='container-fluid' style={containerStyle}>
            <div className='row'>
            {projects}
            </div>
            </div>
           
        )
    }
}

export default FeatureProjects
