import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Logo from "../assets/resume.png";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
      let url = "/templates";
      this.props.history.push(url);
  }
  
  render() {
    return (
      <div className="flex flex-col lg:flex-row w-screen h-screen bg-gray-light font-sans">
        <img className="h-auto lg:h-full bg-green p-0 m-0" src={Logo} alt="tech-resume-logo"></img>
        <div className="flex flex-col justify-center items-center h-full text-gray-dark mx-auto p-2 lg:p-10">
          <h1 className="text-5xl lg:text-7xl text-green">Resume-inator</h1>
          <h3 className="text-xl lg:text-3xl">
            An online Open-Source Resume builder.
          </h3>
          <div className="flex justify-center">
            <button
              id="get-started"
              className="rounded bg-green text-white text-lg hover:shadow-xl m-4 mt-8 px-4 py-2 text-center"
              onClick={this.handleClick}
            >
              Build Resume
            </button>
            <a
              href="https://github.com/Akash-Ramjyothi/Resume-inator"
              id="Source Code"
              className="rounded bg-white border-green border-2 text-green text-lg hover:shadow-xl m-4 mt-8 px-4 py-2 text-center"
              target="blank"
            >
              Source Code
            </a>
          </div>
          <h3 className="text-xl lg:text-3xl">
            Built with ❤️ by Akash Ramjyothi.
          </h3>
        </div>
      </div>
    );
  }
}

export default withRouter(LandingPage);
