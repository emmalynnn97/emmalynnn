import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export class HalfScroll extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    componentDidMount() {
        window.addEventListener("scroll", (this.shrinkNavOnScroll));
        document.querySelectorAll('.side-nav-link')[0].addEventListener('click',(this.handleClick0));
        document.querySelectorAll('.side-nav-link')[1].addEventListener('click',(this.handleClick1));
        document.querySelectorAll('.side-nav-link')[2].addEventListener('click',(this.handleClick2));
        document.querySelectorAll('.side-nav-link')[3].addEventListener('click',(this.handleClick3));
      }
      componentWillUnmount() {
        window.removeEventListener("scroll", (this.shrinkNavOnScroll));
        window.removeEventListener("click", (this.handleClick0));
        window.removeEventListener("click", (this.handleClick1));
        window.removeEventListener("click", (this.handleClick2));
        window.removeEventListener("click", (this.handleClick3));
      }
      handleClick0(){
        window.scrollTo({top:0,behavior:'smooth'});
      }
      handleClick1(){
        window.scrollTo({top:501,behavior:'smooth'});
      }
      handleClick2(){
        window.scrollTo({top:1001,behavior:'smooth'});
      }
      handleClick3(){
        window.scrollTo({top:1501,behavior:'smooth'});
      }
      shrinkNavOnScroll(){
        const distanceY = window.pageYOffset || document.documentElement.scrollTop;
          var links = document.querySelectorAll('.side-nav-link');
          if(distanceY > 50){
              links[0].style.borderBottom='20px solid blue'
              links[1].style.borderBottom='0px solid black';
              links[2].style.borderBottom='0px solid black';
              links[3].style.borderBottom='0px solid black';
          }
          if(distanceY > 500){
            links[0].style.borderBottom='0px solid black'
            links[1].style.borderBottom='20px solid green';
            links[2].style.borderBottom='0px solid black';
            links[3].style.borderBottom='0px solid black';
          }
          if(distanceY > 1000){
            links[0].style.borderBottom='0px solid black'
            links[1].style.borderBottom='0px solid black';
            links[2].style.borderBottom='20px solid violet';
            links[3].style.borderBottom='0px solid black';
          }
          if(distanceY > 1500){
            links[0].style.borderBottom='0px solid black'
            links[1].style.borderBottom='0px solid black';
            links[2].style.borderBottom='0px solid black';
            links[3].style.borderBottom='20px solid pink';
          }
          if(distanceY > 2000){
            links[0].style.borderBottom='0px solid black'
            links[1].style.borderBottom='0px solid black';
            links[2].style.borderBottom='0px solid black';
            links[3].style.borderBottom='0px solid pink';
          }
      }
    render() {
        const leftStyle = {
            width: '30%',
            height: '300vh',
            display: 'flex',
            flexDirection:'column',
            justifyContent:'flex-start',
            alignItems:'flex-end',
            backgroundColor: 'white',
            float: 'left',
            position: 'fixed',
            top: '0',
        }
        const rightStyle = {
            width: '70%',
            height: '300vh',
            display: 'flex',
            flexDirection:'column',
            justifyContent:'flex-start',
            alignItems:'center',
            backgroundColor: 'black',
            overflow: 'auto',
            float: 'right',
            position: 'absolute',
            top: '0',
            right: '0',
            color: 'white'
        }
        const containerStyle = {
            height: '300vh',
            width: '100%',
            paddingTop: '100px',
        }
        const linkStyle={
            fontSize:'38px',
            color:'black',
            padding:'5px 40px',
            width:'275px',
            textAlign:'left',
        }
        const section1Style={
            height:'500px',
            width:'100%',
            backgroundColor:'blue'
        }
        const section2Style={
            height:'500px',
            width:'100%',
            backgroundColor:'green'
        }
        const section3Style={
            height:'500px',
            width:'100%',
            backgroundColor:'violet'
        }
        const section4Style={
            height:'500px',
            width:'100%',
            backgroundColor:'pink'
        }
        return (
            <div style={containerStyle}>
                <div className='left' style={leftStyle}>
                    <Link className='side-nav-link' style={linkStyle}>Home</Link>
                    <Link className='side-nav-link' style={linkStyle}>Portfolio</Link>
                    <Link className='side-nav-link' style={linkStyle}>Contact</Link>
                    <Link className='side-nav-link' style={linkStyle}>Template 1</Link>
                </div>
                <div className='right' style={rightStyle}>
                    <div style={section1Style}>
                    </div>
                    <div style={section2Style}>
                    </div>
                    <div style={section3Style}>
                    </div>
                    <div style={section4Style}>
                    </div>
                </div>
            </div>
        )
    }
}

export default HalfScroll
