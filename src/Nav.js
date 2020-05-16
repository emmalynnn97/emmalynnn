import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export class Nav extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
             color:this.props.color,
             height:'100px'
        }
    }
    componentDidMount() {
        window.addEventListener("scroll", (this.shrinkNavOnScroll));
       
      }
      componentWillUnmount() {
        window.removeEventListener("scroll", (this.shrinkNavOnScroll));
       
      }
      shrinkNavOnScroll(){
        const distanceY = window.pageYOffset || document.documentElement.scrollTop,
          shrinkOn = 250;
          var nav = document.querySelector('.shrink');
          if (distanceY > shrinkOn) {
            nav.style.height='42px'
          } else {
            nav.style.height='100px'
          }
      }
      
    render() {
        const navStyle={
            position:'fixed',
            top:'0',
            left:'0',
            zIndex:'2',
            width:'100vw',
            height:this.state.height,
            backgroundColor:this.state.color,
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            transition:'.15s ease-in',
        }
        const linkStyle={
            color:'white',
            fontSize:'24px',
            margin:'0 1vw',
            padding:'1px 60px',
            fontWeight:'700',
            border:'2px solid white'
        }
        return (
            <div className='nav shrink' style={navStyle}>
                <Link href='#' className='link' style={linkStyle} to="/contact">Contact</Link>
                <Link href='#' className='link' style={linkStyle} to="/">Home</Link>
                <Link href='#' className='link' style={linkStyle} to="/Portfolio">Portfolio</Link>
            </div>
        )
    }
}

export default Nav
