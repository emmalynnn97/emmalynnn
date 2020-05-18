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
      hasSubmenu:this.props.hasSubmenu,
      hasTransitions:this.props.hasTransitions,
      content: [],
      linkWidth: '75%',
      leftWidth: '30%',
      leftHeight: 4 * this.props.sectionHeight,
      rightWidth: '70%',
      rightHeight: 4 * this.props.sectionHeight,
      containerHeight: 4 * this.props.sectionHeight
    }
    this.linkHover = this.linkHover.bind(this);
    this.linkExit = this.linkExit.bind(this);
    this.linkClicks = this.linkClicks.bind(this);
    this.handleClickSection = this.handleClickSection.bind(this);
    this.highlightSection = this.highlightSection.bind(this);
    this.hideSections = this.hideSections.bind(this);
    this.setActive = this.setActive.bind(this);
    this.setNotActive = this.setNotActive.bind(this);
    this.showSections = this.showSections.bind(this);
  
  }
  componentDidMount() {
    if(!this.state.hasTransitions){this.setState({sectionTransition:'0s ease'})}
    window.addEventListener("scroll", (this.highlightSection));
    fetch(this.state.endpoint)
      .then(res => res.json())
      .then((data) => {
        this.setState({ content: data.object.metadata })
      })
      .catch(console.log)
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", (this.highlightSection));
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
  linkClicks = (sectionNum) =>{
    let anyActive = (
      this.state.active[0] || this.state.active[1] || this.state.active[2] || this.state.active[3]
    )
    if(!anyActive){
      window.scrollTo({ top: (sectionNum*this.state.sectionHeight) + 1, behavior: 'smooth' });
    }
    else {
      //Set the width of links to initial values
      this.setState({ 
        leftWidth: '30%', 
        rightWidth: '70%', 
        linkWidth: '75%' 
      });
      this.showSections(sectionNum);
      this.setNotActive(sectionNum);
      window.scrollTo({ top: (sectionNum*this.state.sectionHeight) + 1, behavior: 'smooth' });
    }
  }
  linkHover = (sectionNum) =>{
    if (!this.state.active[sectionNum]) {
      var tempLink = ['white','white','white','white']
      tempLink.splice(sectionNum, 1, this.state.allColors.section[sectionNum])
      var tempLinkText = ['black','black','black','black']
      tempLinkText.splice(sectionNum, 1, this.state.allColors.left)
      
      this.setState({
        allColors: {
          link: tempLink,
          linkText:tempLinkText,
          section: this.state.allColors.section,
          left: this.state.allColors.left,
          right: this.state.allColors.right,
        }
      })
    }
  }
  linkExit = (sectionNum) => {
    
    if (!this.state.active[sectionNum]) {
      this.setState({
        allColors: {
          link: ['white','white','white','white'],
          linkText:['black','black','black','black'],
          section: this.state.allColors.section,
          left: this.state.allColors.left,
          right: this.state.allColors.right
        }
      })
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
        window.scrollTo({ top: 1, behavior: 'smooth' });
      }
      if(sectionNum === 1){
        window.scrollTo({ top: this.state.sectionHeight + 1, behavior: 'smooth' });
      }
      if(sectionNum === 2){
        window.scrollTo({ top: ((2 * this.state.sectionHeight) + 1), behavior: 'smooth' });
      }
      if(sectionNum === 3){
        window.scrollTo({ top: ((3 * this.state.sectionHeight) + 1), behavior: 'smooth' });
      }
    }
    /*if(this.state.hasSubmenu[0]){
      var left = document.querySelector('.left');
      var newEl = document.createElement('p');
      var links = document.querySelectorAll('.side-nav-link');
      newEl.innerHTML='TEST';
      newEl.id = 'test-item';
      newEl.classList.add('.side-nav-link')
      if(document.getElementById('test-item') === null){
        left.insertBefore(newEl, links[0].nextSibling)
      }
      
    }*/
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
    const borderHidden = `${seperatorThickness} solid ${this.state.allColors.left}`;

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
        color: this.state.allColors.linkText[0],
        padding: '5px 40px',
        width: this.state.linkWidth,
        textAlign: 'left',
        borderBottom: '15px solid white',
        transition: this.state.sectionTransition,
        backgroundColor: this.state.allColors.link[0],
       
      },
      link2: {
        fontSize: '38px',
        color: this.state.allColors.linkText[1],
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
        color: this.state.allColors.linkText[2],
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
        color: this.state.allColors.linkText[3],
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
            onClick={()=>{
              this.linkClicks(0);
            }}
            onMouseEnter={()=>{
              this.linkHover(0);
            }}
            onMouseLeave={() => {
              this.linkExit(0);
            }}
            className='side-nav-link' style={sideLinks.link1}>Section 1
            </Link>
          
          <Link
         onClick={()=>{
          this.linkClicks(1);
        }}
        onMouseEnter={()=>{
          this.linkHover(1);
        }}
        onMouseLeave={() => {
          this.linkExit(1);
        }}
            className='side-nav-link' style={sideLinks.link2}>Section 2
            </Link>
          
          <Link
            onClick={()=>{
              this.linkClicks(2);
            }}
            onMouseEnter={()=>{
              this.linkHover(2);
            }}
            onMouseLeave={() => {
              this.linkExit(2);
            }}
            className='side-nav-link' style={sideLinks.link3}>Section 3
            </Link>
          
          <Link
            onClick={()=>{
              this.linkClicks(3);
            }}
            onMouseEnter={()=>{
              this.linkHover(3);
            }}
            onMouseLeave={() => {
              this.linkExit(3);
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
