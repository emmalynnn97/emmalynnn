import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export class HalfScroll extends Component {
  constructor(props) {
    super(props)

    this.state = {
      endpoint: this.props.endpoint,
      leftHeight:this.props.leftHeight,
      allColors: this.props.allColors,
      sectionHeight: this.props.sectionHeight,
      sectionTransition:'.15s ease-in',
      active: [false, false, false, false],
      content: []
    }
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleClick3 = this.handleClick3.bind(this);
    this.handleClickSection = this.handleClickSection.bind(this);
    this.highlightSection = this.highlightSection.bind(this);
  }
  componentDidMount() {
    window.addEventListener("scroll", (this.highlightSection));
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
    window.removeEventListener("scroll", (this.highlightSection));
    window.removeEventListener("click", (this.handleClick0));
    window.removeEventListener("click", (this.handleClick1));
    window.removeEventListener("click", (this.handleClick2));
    window.removeEventListener("click", (this.handleClick3));
  }
  handleClickSection = (sectionNum)=>{
    var links = document.querySelectorAll('.side-nav-link');
    var right = document.querySelector('.right');
    var left = document.querySelector('.left');
    var sections = document.querySelectorAll('.section');
    var scrollContainer = document.querySelector('.scroll-container');
    //If section isn't active, configure active styling upon click
    if (!this.state.active[sectionNum]) {
      left.style.width = '20%';
      right.style.width = '80%';
      left.style.height = (2*this.state.sectionHeight) + 'px';
      right.style.height = (2*this.state.sectionHeight) + 'px';
      scrollContainer.style.height=(2*this.state.sectionHeight) + 'px';
      links.forEach((link) => {link.style.width = '100%'; });
      for(var i = 0; i < sections.length;i++){
        if(i !== sectionNum){
          sections[i].style.height='0px'
          sections[i].style.padding='0px'
          sections[i].querySelector('p').style.fontSize='0'
          sections[i].querySelector('h1').style.fontSize='0'
        }
        else{
          sections[i].style.height=( (2 * this.state.sectionHeight) + 'px' );
          sections[i].style.top='0';
          links[i].style.borderBottom = '15px solid white';
          links[i].style.backgroundColor = this.state.allColors.section[sectionNum];
          links[i].style.color='white'
        }
      }
      var tempArray = [false,false,false,false];
      tempArray.splice(sectionNum, 1, true);
      this.setState({
        active: tempArray
      })
    }
    //If section IS active, configure deactived styling upon click
    else {
      //Reset left/right/side navigation styling
      left.style.width = '30%';
      right.style.width = '70%';
      left.style.height = ((4 * this.state.sectionHeight) + 500) + 'px';
      right.style.height = ((4 * this.state.sectionHeight) + 500) + 'px';
      scrollContainer.style.height=((4 * this.state.sectionHeight) + 500) + 'px';
      links.forEach((link) => { link.style.width = '275px';});
      tempArray = this.state.active;

      //Set section as deactivated
      tempArray.splice(sectionNum,1,false);
      this.setState({
        active: tempArray
      })

      for(i = 0; i < sections.length;i++){
        if(i !== sectionNum){
          sections[i].style.height=this.state.sectionHeight + 'px';
          sections[i].style.padding='50px';
          sections[i].querySelector('p').style.fontSize='16px';
          sections[i].querySelector('h1').style.fontSize='40px';
        }
        else{
          sections[i].style.height=( this.state.sectionHeight + 'px' );
          links[i].style.backgroundColor='white';
          links[i].style.color='black';
        }
      }
      
    }
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
  highlightSection() {
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
      transition: this.state.sectionTransition
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
      transition: this.state.sectionTransition
    }
    const containerStyle = {
      width: '100%',
      height: ((4 * this.state.sectionHeight) + 500) + 'px',
      transition:this.state.sectionTransition
    }
    const sections = {
      section1: {
        height: this.state.sectionHeight + 'px',
        width: '100%',
        backgroundColor: this.state.allColors.section[0],
        transition:this.state.sectionTransition,
        cursor: 'pointer'
      },
      section2: {
        height: this.state.sectionHeight + 'px',
        width: '100%',
        backgroundColor: this.state.allColors.section[1],
        transition: this.state.sectionTransition,
        cursor: 'pointer'
      },
      section3: {
        height: this.state.sectionHeight + 'px',
        width: '100%',
        backgroundColor: this.state.allColors.section[2],
        transition: this.state.sectionTransition,
        cursor: 'pointer'
      },
      section4: {
        height: this.state.sectionHeight + 'px',
        width: '100%',
        backgroundColor: this.state.allColors.section[3],
        transition: this.state.sectionTransition,
        cursor: 'pointer'
      }
    }
    const sideLinks = {
      link1: {
        fontSize: '38px',
        color: 'black',
        padding: '5px 40px',
        width: '75%',
        textAlign: 'left',
        borderBottom: '15px solid white',
        transition:this.state.sectionTransition,
        backgroundColor: this.state.allColors.link[0]
      },
      link2: {
        fontSize: '38px',
        color: 'black',
        padding: '5px 40px',
        width: '75%',
        textAlign: 'left',
        borderBottom: '15px solid white',
        marginTop: '15px',
        transition:this.state.sectionTransition,
        backgroundColor: this.state.allColors.link[1]
      },
      link3: {
        fontSize: '38px',
        color: 'black',
        padding: '5px 40px',
        width: '75%',
        textAlign: 'left',
        borderBottom: '15px solid white',
        marginTop: '15px',
        transition:this.state.sectionTransition,
        backgroundColor: this.state.allColors.link[2]
      },
      link4: {
        fontSize: '38px',
        color: 'black',
        padding: '5px 40px',
        width: '75%',
        textAlign: 'left',
        borderBottom: '15px solid white',
        marginTop: '15px',
        transition:this.state.sectionTransition,
        backgroundColor: this.state.allColors.link[3]
      }
    }
    return (
      <div className='scroll-container' style={containerStyle}>
        <div className='left' style={leftStyle}>
          <Link 
          onMouseEnter={() => {
            var links = document.querySelectorAll('.side-nav-link');
            //NOT ACTIVE MOUSE ENTER
            if(!this.state.active[0]){
              links[0].style.color='white';
              this.setState({
                allColors: {
                  link: [this.state.allColors.section[0], 'white', 'white', 'white'],
                  section: this.state.allColors.section,
                  left: this.state.allColors.left,
                  right: this.state.allColors.right,
                }
              })
            }
          }}
            onMouseLeave={() => {
              var links = document.querySelectorAll('.side-nav-link')
              //NOT ACTIVE MOUSE LEAVE
              if(!this.state.active[0]){
                links[0].style.color='black'
                this.setState({
                  allColors: {
                    link: ['white', 'white', 'white', 'white'],
                    section: this.state.allColors.section,
                    left: this.state.allColors.left,
                    right: this.state.allColors.right
                  }
                })
              }
            }}
            className='side-nav-link' style={sideLinks.link1}>Section 1</Link>
          <Link 
          onMouseEnter={() => {
            var links = document.querySelectorAll('.side-nav-link');
            //NOT ACTIVE MOUSE ENTER
            if(!this.state.active[1]){
              links[1].style.color='white';
              this.setState({
                allColors: {
                  link: ['white',this.state.allColors.section[1], 'white', 'white'],
                  section: this.state.allColors.section,
                  left: this.state.allColors.left,
                  right: this.state.allColors.right,
                }
              })
            }
          }}
            onMouseLeave={() => {
              var links = document.querySelectorAll('.side-nav-link')
              //NOT ACTIVE MOUSE LEAVE
              if(!this.state.active[1]){
                links[1].style.color='black'
                this.setState({
                  allColors: {
                    link: ['white', 'white', 'white', 'white'],
                    section: this.state.allColors.section,
                    left: this.state.allColors.left,
                    right: this.state.allColors.right
                  }
                })
              }
            }} className='side-nav-link' style={sideLinks.link2}>Section 2</Link>
          <Link onMouseEnter={() => {
            var links = document.querySelectorAll('.side-nav-link');
            //NOT ACTIVE MOUSE ENTER
            if(!this.state.active[2]){
              links[2].style.color='white';
              this.setState({
                allColors: {
                  link: ['white','white', this.state.allColors.section[2], 'white'],
                  section: this.state.allColors.section,
                  left: this.state.allColors.left,
                  right: this.state.allColors.right,
                }
              })
            }
          }}
            onMouseLeave={() => {
              var links = document.querySelectorAll('.side-nav-link')
              //NOT ACTIVE MOUSE LEAVE
              if(!this.state.active[2]){
                links[2].style.color='black'
                this.setState({
                  allColors: {
                    link: ['white', 'white', 'white', 'white'],
                    section: this.state.allColors.section,
                    left: this.state.allColors.left,
                    right: this.state.allColors.right
                  }
                })
              }
            }}  className='side-nav-link' style={sideLinks.link3}>Section 3</Link>
          <Link onMouseEnter={() => {
            var links = document.querySelectorAll('.side-nav-link');
            //NOT ACTIVE MOUSE ENTER
            if(!this.state.active[3]){
              links[3].style.color='white';
              this.setState({
                allColors: {
                  link: ['white','white', 'white', this.state.allColors.section[3]],
                  section: this.state.allColors.section,
                  left: this.state.allColors.left,
                  right: this.state.allColors.right,
                }
              })
            }
          }}
            onMouseLeave={() => {
              var links = document.querySelectorAll('.side-nav-link')
              //NOT ACTIVE MOUSE LEAVE
              if(!this.state.active[3]){
                links[3].style.color='black'
                this.setState({
                  allColors: {
                    link: ['white', 'white', 'white', 'white'],
                    section: this.state.allColors.section,
                    left: this.state.allColors.left,
                    right: this.state.allColors.right
                  }
                })
              }
            }} className='side-nav-link' style={sideLinks.link4}>Section 4</Link>
        </div>
        <div className='right' style={rightStyle}>
          <div onClick={() => {
            this.handleClickSection(0);
          }} className='section' dangerouslySetInnerHTML={{ __html: this.state.content.section_1 }} style={sections.section1}></div>
          <div onClick={() => {
            this.handleClickSection(1);
          }} className='section' dangerouslySetInnerHTML={{ __html: this.state.content.section_2 }} style={sections.section2}></div>
          <div onClick={() => {
            this.handleClickSection(2);
          }} className='section' dangerouslySetInnerHTML={{ __html: this.state.content.section_3 }} style={sections.section3}></div>
          <div onClick={() => {
            this.handleClickSection(3);
          }} className='section' dangerouslySetInnerHTML={{ __html: this.state.content.section_4 }} style={sections.section4}></div>
        </div>
      </div>
    )
  }
}

export default HalfScroll
