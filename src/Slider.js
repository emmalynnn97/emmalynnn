import React, { Component } from 'react'

export class Slider extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             offsetX:0
        }
    }
    
    render() {
  const sliderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:'100%'
  }
  const slideStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '180px',
    height: '375px',
    margin:'0px 10px',
    border: '2px solid black',
    transform:`translateX(${this.state.offsetX}px)`,
    transition:'.15s ease-in'
  }
  const slideBtnStyle = {
    cursor:'pointer',
    padding:'5px 40px',
    border:'2px solid black',
    marginBottom:'500px'
  }
        return (
            <div style={sliderStyle} className='slider'>
        <div onClick={()=>{
            this.setState({
                offsetX:this.state.offsetX - 200
            })
            this.setState({})
        }} style={slideBtnStyle}>
          Left
        </div>
        <div style={slideStyle}>
          a
        </div>
        <div style={slideStyle}>
          b
        </div>
        <div style={slideStyle}>
          c
        </div>
        <div onClick={()=>{
            this.setState({
                offsetX:this.state.offsetX + 200
            })
            this.setState({})
        }}  style={slideBtnStyle}>
          Right
        </div>
      </div>
        )
    }
}

export default Slider
