import React, { Component } from 'react'

export class Hero extends Component {
    constructor(props) {
        super(props)

        this.state = {
            endpoint:this.props.endpoint,
            overlayColor:'',
            hasOverlay:false,
            height:'75vh',
            width:'100%',
            content:[]
        }
    }
    componentDidMount() {
        fetch(this.state.endpoint)
            .then(res => res.json())
            .then((data) => {
                this.setState({ content: data.object.metadata.hero_image.url,hasOverlay:data.object.metadata.hero_overlay,overlayColor:data.object.metadata.overlay_color})
            })
            .catch(console.log)
    }
    render() {
        const heroStyle = {
            backgroundImage: `url("${this.state.content}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment:'fixed',
            height:this.state.height,
            display:'flex',
            justifyContent:'center',
            width:this.state.width
        }
        var overlayStyle= {
            position:'absolute',
            left:'0',
            top:'0',
            height:this.state.height,
            width:this.state.width,
            backgroundColor:this.state.overlayColor
        }
        if(!this.state.hasOverlay){
            const hideOverlay={
                display:'none'
            }
            overlayStyle = {...hideOverlay,...overlayStyle}
        }
        else{
            const showOverlay={
                display:''
            }
            overlayStyle={...showOverlay,...overlayStyle}
        }
        return (
        <div style={heroStyle}>
            <div style={overlayStyle}>

            </div>
            </div>
        )
    }
}

export default Hero
