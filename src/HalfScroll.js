import React, { Component } from 'react'
import { Link } from 'react-router-dom';
/*
*
* Component with smooth scroll effects on nav click,
* Component Sections represent (condensed) pages of a typical website,
* On click, each section animates to reveal a full (uncondensed) page
*
*/
export class HalfScroll extends Component {
  constructor(props) {
    super(props)

    this.state = {
      endpoint: this.props.endpoint,
      allColors: this.props.allColors,
      sectionHeight: this.props.sectionHeight,
      sectionTransition: '.65s ease',
      active: [false, false, false, false],
      content: [],
      linkWidth: '75%',
      leftWidth: '30%',
      leftHeight: 4 * this.props.sectionHeight,
      rightWidth: '70%',
      rightHeight: 4 * this.props.sectionHeight,
      containerHeight: 4 * this.props.sectionHeight
    }
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleClick3 = this.handleClick3.bind(this);
    this.handleClickSection = this.handleClickSection.bind(this);
    this.highlightSection = this.highlightSection.bind(this);
    this.hideSections = this.hideSections.bind(this);
    this.setActive = this.setActive.bind(this);
    this.setNotActive = this.setNotActive.bind(this);
    this.showSections = this.showSections.bind(this);
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
  setActive(sectionNum) {
    var tempArray = [false, false, false, false];
    tempArray.splice(sectionNum, 1, true);
    this.setState({
      active: tempArray
    })
  }
  setNotActive(sectionNum) {
    //Set section as deactivated
    var tempArray = this.state.active;
    tempArray.splice(sectionNum, 1, false);
    this.setState({
      active: tempArray
    })
  }
  showSections(sectionNum) {
    var links = document.querySelectorAll('.side-nav-link');
    var sections = document.querySelectorAll('.section');
    for (var i = 0; i < sections.length; i++) {
      if (i !== sectionNum) {
        sections[i].style.height = this.state.sectionHeight + 'px';
        sections[i].style.padding = '50px';
        sections[i].querySelector('p').style.fontSize = '16px';
        sections[i].querySelector('h1').style.fontSize = '40px';
        sections[i].style.transform = 'translateX(0%) translateY(0%)';
        sections[i].style.opacity = '1';
        links[i].style.opacity='1';
        links[i].style.visibility = '';
      }
      else {
        sections[i].style.height = (this.state.sectionHeight + 'px');
        links[i].style.backgroundColor = 'white';
        links[i].style.color = 'black';
      }

    }
  }
  hideSections(sectionNum) {
    //Get any variables that need to be updated on section click
    var links = document.querySelectorAll('.side-nav-link');
    var sections = document.querySelectorAll('.section');
    for (var i = 0; i < sections.length; i++) {
      if (i !== sectionNum) {
        sections[i].style.transform = 'translateX(-100%) translateY(-100%)';
        sections[i].style.opacity = '0';
        sections[i].style.height = '0px';
        sections[i].style.padding = '0px';
        links[i].style.opacity='0';
        links[i].style.visibility = 'hidden';
      }
      else {
        sections[i].style.height = '100%';
        links[i].style.backgroundColor = this.state.allColors.section[sectionNum];
        links[i].style.color = 'white'
      }
    }
  }
  /*
  *
  * This method is used to animate and configure the page based upon 
  * the section that has been selected by the user (given by sectionNum)
  *
  */
  handleClickSection = (sectionNum) => {
    //If selected section isn't active, configure as activated
    if (!this.state.active[sectionNum]) {
      window.scrollTo({ top: ((this.state.sectionHeight) + 'px'), behavior: 'smooth' });
      this.setState({
        leftWidth: '20%', 
        rightWidth: '80%', 
        linkWidth: '100%',
      })
      this.hideSections(sectionNum);
      this.setActive(sectionNum);
    }
    //If selected section is active, configure as deactivated
    else {
      //Set the width of links to initial values
      this.setState({ 
        leftWidth: '30%', 
        rightWidth: '70%', 
        linkWidth: '75%' 
      });
      this.showSections(sectionNum);
      this.setNotActive(sectionNum);
      if(sectionNum === 0){
      this.handleClick0();
      }
      if(sectionNum === 1){
        this.handleClick1();
      }
      if(sectionNum === 2){
        this.handleClick2();
      }
      if(sectionNum === 3){
        this.handleClick3();
      }
    }
  }

  /*
  *
  * This method is used to highlight and animate the side navigation
  * links as the user scrolls down the page
  *
  */
  highlightSection() {
    //Get scrollDistance from the user, set seperator thickness
    const distanceY = window.pageYOffset || document.documentElement.scrollTop;
    const seperatorThickness = '15px';
    const borderHidden = `${seperatorThickness} solid white`;

    //Get all links in the side bound navigation
    var links = document.querySelectorAll('.side-nav-link');

    //Check whether any sections are active
    let anyActive = (
      this.state.active[0] || this.state.active[1] || this.state.active[2] || this.state.active[3]
    )

    //Hide seperator at very top of page
    if (distanceY === 0) {
      links[0].style.borderBottom = borderHidden;
    }

    //Show first seperator after 1px has been scrolled, hide other seperators
    if (distanceY >= 1) {
      for (var i = 0; i < links.length; i++) {
        if (i === 0 && !anyActive) {
          links[i].style.borderBottom = `${seperatorThickness} solid ${this.state.allColors.section[i]}`;
        }
        else {
          links[i].style.borderBottom = borderHidden
        }
      }
    }
    //Show next seperator after the 1st section has been scrolled, hide other seperators
    if (distanceY > (this.state.sectionHeight - 20) && (!this.state.active[1])) {
      for (i = 0; i < links.length; i++) {
        if (i === 1 && !anyActive) {
          links[i].style.borderBottom = `${seperatorThickness} solid ${this.state.allColors.section[i]}`;
        }
        else {
          links[i].style.borderBottom = borderHidden
        }
      }
    }
    //Show next seperator after the 2nd section has been scrolled, hide other seperators
    if (distanceY > ((2 * this.state.sectionHeight) - 20)) {
      for (i = 0; i < links.length; i++) {
        if (i === 2 && !anyActive) {
          links[i].style.borderBottom = `${seperatorThickness} solid ${this.state.allColors.section[i]}`;
        }
        else {
          links[i].style.borderBottom = borderHidden
        }
      }
    }
    //Show next seperator after the 3rd section has been scrolled, hide other seperators
    if (distanceY > ((3 * this.state.sectionHeight) - 20)) {
      for (i = 0; i < links.length; i++) {
        if (i === 3 && !anyActive) {
          links[i].style.borderBottom = `${seperatorThickness} solid ${this.state.allColors.section[i]}`;
        }
        else {
          links[i].style.borderBottom = borderHidden
        }
      }
    }
  }

  /*
  *
  * A set of methods used to smooth scroll to specific locations on the
  * page based upon the link selected and the height of each section
  */
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
  render() {
    const leftStyle = {
      width: this.state.leftWidth,
      height: this.state.leftHeight + 'px',
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
      width: this.state.rightWidth,
      height: this.state.rightHeight + 'px',
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
      height: this.state.containerHeight + 'px',
      transition: this.state.sectionTransition,
      position: 'relative'
    }
    const sections = {
      section1: {
        height: this.state.sectionHeight + 'px',
        width: '100%',
        backgroundColor: this.state.allColors.section[0],
        transition: this.state.sectionTransition,
        cursor: 'pointer',
      },
      section2: {
        height: this.state.sectionHeight + 'px',
        width: '100%',
        backgroundColor: this.state.allColors.section[1],
        transition: this.state.sectionTransition,
        cursor: 'pointer',
      },
      section3: {
        height: this.state.sectionHeight + 'px',
        width: '100%',
        backgroundColor: this.state.allColors.section[2],
        transition: this.state.sectionTransition,
        cursor: 'pointer',
      },
      section4: {
        height: this.state.sectionHeight + 'px',
        width: '100%',
        backgroundColor: this.state.allColors.section[3],
        transition: this.state.sectionTransition,
        cursor: 'pointer',
      }
    }
    const sideLinks = {
      link1: {
        fontSize: '38px',
        color: 'black',
        padding: '5px 40px',
        width: this.state.linkWidth,
        textAlign: 'left',
        borderBottom: '15px solid white',
        transition: this.state.sectionTransition,
        backgroundColor: this.state.allColors.link[0],
       
      },
      link2: {
        fontSize: '38px',
        color: 'black',
        padding: '5px 40px',
        width: this.state.linkWidth,
        textAlign: 'left',
        borderBottom: '15px solid white',
        marginTop: '15px',
        transition: this.state.sectionTransition,
        backgroundColor: this.state.allColors.link[1],
       
      },
      link3: {
        fontSize: '38px',
        color: 'black',
        padding: '5px 40px',
        width: this.state.linkWidth,
        textAlign: 'left',
        borderBottom: '15px solid white',
        marginTop: '15px',
        transition: this.state.sectionTransition,
        backgroundColor: this.state.allColors.link[2],
        
      },
      link4: {
        fontSize: '38px',
        color: 'black',
        padding: '5px 40px',
        width: this.state.linkWidth,
        textAlign: 'left',
        borderBottom: '15px solid white',
        marginTop: '15px',
        transition: this.state.sectionTransition,
        backgroundColor: this.state.allColors.link[3],
      }
    }
    return (
      <div className='scroll-container' style={containerStyle}>
        <div className='left' style={leftStyle}>
          <Link
            onMouseEnter={() => {
              var links = document.querySelectorAll('.side-nav-link');
              //NOT ACTIVE MOUSE ENTER
              if (!this.state.active[0]) {
                links[0].style.color = 'white';
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
              if (!this.state.active[0]) {
                links[0].style.color = 'black'
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
            className='side-nav-link' style={sideLinks.link1}>Section 1
            </Link>
          <Link
            onMouseEnter={() => {
              var links = document.querySelectorAll('.side-nav-link');
              //NOT ACTIVE MOUSE ENTER
              if (!this.state.active[1]) {
                links[1].style.color = 'white';
                this.setState({
                  allColors: {
                    link: ['white', this.state.allColors.section[1], 'white', 'white'],
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
              if (!this.state.active[1]) {
                links[1].style.color = 'black'
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
            className='side-nav-link' style={sideLinks.link2}>Section 2
            </Link>
          <Link
            onMouseEnter={() => {
              var links = document.querySelectorAll('.side-nav-link');
              //NOT ACTIVE MOUSE ENTER
              if (!this.state.active[2]) {
                links[2].style.color = 'white';
                this.setState({
                  allColors: {
                    link: ['white', 'white', this.state.allColors.section[2], 'white'],
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
              if (!this.state.active[2]) {
                links[2].style.color = 'black'
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
            className='side-nav-link' style={sideLinks.link3}>Section 3
            </Link>
          <Link
            onMouseEnter={() => {
              var links = document.querySelectorAll('.side-nav-link');
              //NOT ACTIVE MOUSE ENTER
              if (!this.state.active[3]) {
                links[3].style.color = 'white';
                this.setState({
                  allColors: {
                    link: ['white', 'white', 'white', this.state.allColors.section[3]],
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
              if (!this.state.active[3]) {
                links[3].style.color = 'black'
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
            className='side-nav-link' style={sideLinks.link4}>Section 4
            </Link>
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
