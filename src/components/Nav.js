import React, { Component } from "react";
import Logo from "../assets/resume.png";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPrinting: false,
      isMobileMenuOpen: false,
    };
  }

  handlePrint = async (e) => {
    e.preventDefault();
    
    if (this.props.onBeforePrint) {
      await this.props.onBeforePrint();
    }

    this.setState({ isPrinting: true });
    
    // Small delay to ensure state updates before printing
    setTimeout(() => {
      window.print();
      this.setState({ isPrinting: false });
    }, 100);
  };

  handleMobileMenuToggle = () => {
    this.setState((prevState) => ({
      isMobileMenuOpen: !prevState.isMobileMenuOpen,
    }));
  };

  renderNavLinks = () => {
    const { navLinks = [] } = this.props;
    
    if (navLinks.length === 0) return null;

    return (
      <ul className="hidden md:flex space-x-6 items-center">
        {navLinks.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="text-gray-700 hover:text-green transition-colors duration-200"
              aria-label={link.label}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  renderMobileMenu = () => {
    const { navLinks = [] } = this.props;
    const { isMobileMenuOpen } = this.state;

    if (navLinks.length === 0) return null;

    return (
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-20`}
      >
        <ul className="flex flex-col p-4 space-y-3">
          {navLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                className="block text-gray-700 hover:text-green transition-colors duration-200 py-2 px-4 hover:bg-gray-50 rounded"
                onClick={() => this.setState({ isMobileMenuOpen: false })}
                aria-label={link.label}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  renderDownloadButton = () => {
    const { showDownloadBtn, downloadButtonText = "Download PDF" } = this.props;
    const { isPrinting } = this.state;

    if (!showDownloadBtn) return null;

    return (
      <button
        className="z-10 rounded bg-green text-white m-2 p-2 text-center print:hidden hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={this.handlePrint}
        disabled={isPrinting}
        aria-label="Download PDF"
      >
        <svg
          className="w-5 inline-block"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        <span>{isPrinting ? "Preparing..." : downloadButtonText}</span>
      </button>
    );
  };

  render() {
    const { className = "", showLogo = true, logoAlt = "Tech Resume Logo" } = this.props;
    const { isMobileMenuOpen } = this.state;

    return (
      <nav
        className={`flex justify-between items-center bg-white mx-auto px-4 py-2 print:hidden relative ${className}`}
        role="navigation"
        aria-label="Main navigation"
      >
        {showLogo && (
          <a href="/" className="flex-shrink-0" aria-label="Home">
            <img
              className="w-12 inline-block hover:opacity-80 transition-opacity duration-200"
              src={Logo}
              alt={logoAlt}
            />
          </a>
        )}

        <div className="flex items-center space-x-4">
          {this.renderNavLinks()}
          {this.renderDownloadButton()}

          {/* Mobile Menu Toggle */}
          {this.props.navLinks && this.props.navLinks.length > 0 && (
            <button
              className="md:hidden p-2 rounded hover:bg-gray-100 transition-colors duration-200"
              onClick={this.handleMobileMenuToggle}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          )}
        </div>

        {this.renderMobileMenu()}
      </nav>
    );
  }
}

export default Nav;
