import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export class HalfScroll extends Component {
  constructor(props) {
    super(props)

    this.state = {
      endpoint: this.props.endpoint,
      allColors:this.props.allColors,
      leftColor: this.props.leftColor,
      rightColor: this.props.rightColor,
      sectionHeight: this.props.sectionHeight,
      content: []
    }
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleClick3 = this.handleClick3.bind(this);
    this.shrinkNavOnScroll = this.shrinkNavOnScroll.bind(this);
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
    window.scrollTo({ top: this.state.sectionHeight + 1, behavior: 'smooth' });
  }
  handleClick2() {
    window.scrollTo({ top: ((2 * this.state.sectionHeight) + 1), behavior: 'smooth' });
  }
  handleClick3() {
    window.scrollTo({ top: ((3 * this.state.sectionHeight) + 1), behavior: 'smooth' });
  }
  shrinkNavOnScroll() {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop;
    const seperatorThickness = '15px';
    const borderHidden = `${seperatorThickness} solid white`;
    var links = document.querySelectorAll('.side-nav-link');
    //Hide at seperator of page
    if (distanceY === 0) {
      links[0].style.borderBottom = borderHidden;
    }
    //Show initial seperator after 1px has been scrolled, hide others
    if (distanceY >= 1) {
      for (var i = 0; i < links.length; i++) {
        if (i === 0) {
          links[i].style.borderBottom = `${seperatorThickness} solid ${this.state.allColors.section[i]}`;
        }
        else {
          links[i].style.borderBottom = borderHidden
        }
      }
    }
    //Show next seperator after 480px has been scrolled, hide others
    if (distanceY > (this.state.sectionHeight - 20)) {
      for (i = 0; i < links.length; i++) {
        if (i === 1) {
          links[i].style.borderBottom = `${seperatorThickness} solid ${this.state.allColors.section[i]}`;
        }
        else {
          links[i].style.borderBottom = borderHidden
        }
      }
    }
    //Show next seperator after 980px has been scrolled, hide others
    if (distanceY > ((2 * this.state.sectionHeight) - 20)) {
      for (i = 0; i < links.length; i++) {
        if (i === 2) {
          links[i].style.borderBottom = `${seperatorThickness} solid ${this.state.allColors.section[i]}`;
        }
        else {
          links[i].style.borderBottom = borderHidden
        }
      }
    }
    //Show next seperator after 1480px has been scrolled, hide others
    if (distanceY > ((3 * this.state.sectionHeight) - 20)) {
      for (i = 0; i < links.length; i++) {
        if (i === 3) {
          links[i].style.borderBottom = `${seperatorThickness} solid ${this.state.allColors.section[i]}`;
        }
        else {
          links[i].style.borderBottom = borderHidden
        }
      }
    }
  }
  render() {
    const leftStyle = {
      width: '30%',
      height: ((4 * this.state.sectionHeight) + 500) + 'px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      backgroundColor: this.state.allColors.left,
      float: 'left',
      position: 'fixed',
      top: '0',
    }
    const rightStyle = {
      width: '70%',
      height: ((4 * this.state.sectionHeight) + 500) + 'px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: this.state.allColors.right,
      overflow: 'auto',
      float: 'right',
      position: 'absolute',
      top: '0',
      right: '0',
      color: 'white',
    }
    const containerStyle = {
      height: (4 * this.state.sectionHeight) + 'px',
      width: '100%',
    }
    const sections={
      section1:{
        height: this.state.sectionHeight + 'px',
        width: '100%',
        backgroundColor: this.state.allColors.section[0]
      },
      section2:{
        height: this.state.sectionHeight + 'px',
        width: '100%',
        backgroundColor: this.state.allColors.section[1]
      },
      section3:{
        height: this.state.sectionHeight + 'px',
        width: '100%',
        backgroundColor: this.state.allColors.section[2]
      },
      section4:{
        height: this.state.sectionHeight + 'px',
        width: '100%',
        backgroundColor: this.state.allColors.section[3]
      }
    }
    const sideLinks = {
      link1:{
        fontSize: '38px',
        color: 'black',
        padding: '5px 40px',
        width: '75%',
        textAlign: 'left',
        borderBottom: '15px solid white',
        marginTop: '15px',
        backgroundColor:this.state.allColors.link[0]
      },
      link2:{
        fontSize: '38px',
        color: 'black',
        padding: '5px 40px',
        width: '75%',
        textAlign: 'left',
        borderBottom: '15px solid white',
        marginTop: '15px',
        backgroundColor:this.state.allColors.link[1]
      },
      link3:{
        fontSize: '38px',
        color: 'black',
        padding: '5px 40px',
        width: '75%',
        textAlign: 'left',
        borderBottom: '15px solid white',
        marginTop: '15px',
        backgroundColor:this.state.allColors.link[2]
      },
      link4:{
        fontSize: '38px',
        color: 'black',
        padding: '5px 40px',
        width: '75%',
        textAlign: 'left',
        borderBottom: '15px solid white',
        marginTop: '15px',
        backgroundColor:this.state.allColors.link[3]
      }
    }
    return (
      <div style={containerStyle}>
        <div className='left' style={leftStyle}>
          <Link onMouseEnter={()=>{
            this.setState({
              allColors:{
                link:[this.state.allColors.section[0],'white','white','white'],
                section:this.state.allColors.section,
                left:this.state.allColors.left,
                right:this.state.allColors.right
              }
            })
          }} 
          onMouseLeave={()=>{
            this.setState({
              allColors:{
                link:['white','white','white','white'],
                section:this.state.allColors.section,
                left:this.state.allColors.left,
                right:this.state.allColors.right
                
              }
            })
          }}
          className='side-nav-link' style={sideLinks.link1}>Section 1</Link>
          <Link onMouseEnter={()=>{
            this.setState({
              allColors:{
                link:['white',this.state.allColors.section[1],'white','white'],
                section:this.state.allColors.section,
                left:this.state.allColors.left,
                right:this.state.allColors.right
              }
            })
          }} 
          onMouseLeave={()=>{
            this.setState({
              allColors:{
                link:['white','white','white','white'],
                section:this.state.allColors.section,
                left:this.state.allColors.left,
                right:this.state.allColors.right
              }
            })
          }} className='side-nav-link' style={sideLinks.link2}>Section 2</Link>
          <Link onMouseEnter={()=>{
            this.setState({
              allColors:{
                link:['white','white',this.state.allColors.section[2],'white'],
                section:this.state.allColors.section,
                left:this.state.allColors.left,
                right:this.state.allColors.right
              }
            })
          }} 
          onMouseLeave={()=>{
            this.setState({
              allColors:{
                link:['white','white','white','white'],
                section:this.state.allColors.section,
                left:this.state.allColors.left,
                right:this.state.allColors.right
              }
            })
          }} className='side-nav-link' style={sideLinks.link3}>Section 3</Link>
          <Link onMouseEnter={()=>{
            this.setState({
              allColors:{
                link:['white','white','white',this.state.allColors.section[3]],
                section:this.state.allColors.section,
                left:this.state.allColors.left,
                right:this.state.allColors.right
              }
            })
          }} 
          onMouseLeave={()=>{
            this.setState({
              allColors:{
                link:['white','white','white','white'],
                section:this.state.allColors.section,
                left:this.state.allColors.left,
                right:this.state.allColors.right
              }
            })
          }} className='side-nav-link' style={sideLinks.link4}>Section 4</Link>
        </div>
        <div className='right' style={rightStyle}>
          <div className='section' dangerouslySetInnerHTML={{ __html: this.state.content.section_1 }} style={sections.section1}></div>
          <div className='section' dangerouslySetInnerHTML={{ __html: this.state.content.section_2 }} style={sections.section2}></div>
          <div className='section' dangerouslySetInnerHTML={{ __html: this.state.content.section_3 }} style={sections.section3}></div>
          <div className='section' dangerouslySetInnerHTML={{ __html: this.state.content.section_4 }} style={sections.section4}></div>
        </div>
      </div>
    )
  }
}

export default HalfScroll
