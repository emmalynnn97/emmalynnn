import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export class HalfScroll extends Component {
  constructor(props) {
    super(props)

    this.state = {
      endpoint: this.props.endpoint,
      leftColor:this.props.leftColor,
      rightColor:this.props.rightColor,
      content: [],
    }
  }
  componentDidMount() {
    window.addEventListener("scroll", (this.shrinkNavOnScroll));
    document.querySelectorAll('.side-nav-link')[0].addEventListener('click', (this.handleClick0));
    document.querySelectorAll('.side-nav-link')[1].addEventListener('click', (this.handleClick1));
    document.querySelectorAll('.side-nav-link')[2].addEventListener('click', (this.handleClick2));
    document.querySelectorAll('.side-nav-link')[3].addEventListener('click', (this.handleClick3));
    fetch(this.state.endpoint)
      .then(res => res.json())
      .then((data) => {
        this.setState({ content: data.object.metadata })
      })
      .catch(console.log)
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", (this.shrinkNavOnScroll));
    window.removeEventListener("click", (this.handleClick0));
    window.removeEventListener("click", (this.handleClick1));
    window.removeEventListener("click", (this.handleClick2));
    window.removeEventListener("click", (this.handleClick3));
  }
  handleClick0() {
    window.scrollTo({ top: 1, behavior: 'smooth' });
  }
  handleClick1() {
    window.scrollTo({ top: 501, behavior: 'smooth' });
  }
  handleClick2() {
    window.scrollTo({ top: 1001, behavior: 'smooth' });
  }
  handleClick3() {
    window.scrollTo({ top: 1501, behavior: 'smooth' });
  }
  shrinkNavOnScroll() {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop;
    const thickness = '15px';
    const borderHidden = `${thickness} solid white`;
    var links = document.querySelectorAll('.side-nav-link');
    if (distanceY === 0) {
      links[0].style.borderBottom = borderHidden;
    }
    if (distanceY >= 1) {
      links[0].style.borderBottom = `${thickness} solid blue`;
      links[1].style.borderBottom = borderHidden
      links[2].style.borderBottom = borderHidden
      links[3].style.borderBottom = borderHidden
    }
    if (distanceY > 480) {
      links[0].style.borderBottom = borderHidden
      links[1].style.borderBottom = `${thickness} solid green`;
      links[2].style.borderBottom = borderHidden
      links[3].style.borderBottom = borderHidden
    }
    if (distanceY > 980) {
      links[0].style.borderBottom = borderHidden
      links[1].style.borderBottom = borderHidden
      links[2].style.borderBottom = `${thickness} solid violet`;
      links[3].style.borderBottom = borderHidden
    }
    if (distanceY > 1480) {
      links[0].style.borderBottom = borderHidden
      links[1].style.borderBottom = borderHidden
      links[2].style.borderBottom = borderHidden
      links[3].style.borderBottom = `${thickness} solid pink`;
    }
  }
  render() {
    const leftStyle = {
      width: '30%',
      height: '2500px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      backgroundColor: this.state.leftColor,
      float: 'left',
      position: 'fixed',
      top: '0',
    }
    const rightStyle = {
      width: '70%',
      height: '2500px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: this.state.rightColor,
      overflow: 'auto',
      float: 'right',
      position: 'absolute',
      top: '0',
      right: '0',
      color: 'white',
    }
    const containerStyle = {
      height: '2000px',
      width: '100%',
      paddingTop: '100px',
    }
    const linkStyle = {
      fontSize: '38px',
      color: 'black',
      padding: '5px 40px',
      width: '75%',
      textAlign: 'left',
      borderBottom: '15px solid white',
      marginTop: '15px'
    }
    const section1Style = {
      height: '500px',
      width: '100%',
      backgroundColor: 'blue',
    }
    const section2Style = {
      height: '500px',
      width: '100%',
      backgroundColor: 'green'
    }
    const section3Style = {
      height: '500px',
      width: '100%',
      backgroundColor: 'violet'
    }
    const section4Style = {
      height: '500px',
      width: '100%',
      backgroundColor: 'pink'
    }
    return (
      <div style={containerStyle}>
        <div className='left' style={leftStyle}>
          <Link className='side-nav-link' style={linkStyle}>Section 1</Link>
          <Link className='side-nav-link' style={linkStyle}>Section 2</Link>
          <Link className='side-nav-link' style={linkStyle}>Section 3</Link>
          <Link className='side-nav-link' style={linkStyle}>Section 4</Link>
        </div>
        <div className='right' style={rightStyle}>
          <div className='section' dangerouslySetInnerHTML={{ __html: this.state.content.section_1 }} style={section1Style}></div>
          <div className='section' dangerouslySetInnerHTML={{ __html: this.state.content.section_2 }} style={section2Style}></div>
          <div className='section' dangerouslySetInnerHTML={{ __html: this.state.content.section_3 }} style={section3Style}></div>
          <div className='section' dangerouslySetInnerHTML={{ __html: this.state.content.section_4 }} style={section4Style}></div>
        </div>
      </div>
    )
  }
}

export default HalfScroll
