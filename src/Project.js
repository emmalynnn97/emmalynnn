import React, { Component } from 'react'
import ProjectOverlay from './ProjectOverlay'

export class Project extends Component {
    constructor(props) {
        super(props)

        this.state = {
            image: this.props.image,
            title: this.props.title,
            content: this.props.content,
            width: '30vw',
            height: '30vh'
        }
    }
    render() {
        const projectStyle = {
            backgroundImage: `url("${this.state.image}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: this.state.height,
            width: this.state.width,
            overflow: 'hidden'
        }
        return (
            <div className='project col col-lg-4 col-md-6 col-sm-12' style={projectStyle}>
                <ProjectOverlay content={this.state.content} title={this.state.title} />
            </div>
        )
    }
}
export default Project
