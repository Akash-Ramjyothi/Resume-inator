import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Logo from "../assets/resume.png";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isButtonHovered: false,
      isSourceHovered: false,
      isLogoLoaded: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    // Preload logo for smoother experience
    const img = new Image();
    img.src = Logo;
    img.onload = () => {
      this.setState({ isLogoLoaded: true });
    };

    // Add animation class after mount
    setTimeout(() => {
      document.querySelector('.landing-content')?.classList.add('fade-in');
    }, 100);

    // Track page view (analytics ready)
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Landing Page',
        page_location: window.location.href,
      });
    }
  }

  componentWillUnmount() {
    // Cleanup any subscriptions or timeouts
    const content = document.querySelector('.landing-content');
    if (content) {
      content.classList.remove('fade-in');
    }
  }

  handleClick(e) {
    e.preventDefault();
    
    // Track button click event
    if (window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'Build Resume',
      });
    }

    // Add loading state
    const button = e.currentTarget;
    button.textContent = 'Loading...';
    button.disabled = true;

    // Navigate with slight delay for UX
    setTimeout(() => {
      this.props.history.push("/templates");
    }, 300);
  }

  handleKeyDown(e) {
    // Keyboard accessibility for Enter/Space on custom elements
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (e.currentTarget.id === 'get-started') {
        this.handleClick(e);
      } else if (e.currentTarget.href) {
        window.open(e.currentTarget.href, '_blank');
      }
    }
  }

  renderFeatureCards = () => {
    const features = [
      {
        icon: "📄",
        title: "Multiple Templates",
        description: "Choose from various professional resume templates",
      },
      {
        icon: "🎨",
        title: "Customizable Design",
        description: "Personalize colors, fonts, and layouts",
      },
      {
        icon: "📱",
        title: "Responsive & Printable",
        description: "Perfect for both digital and print formats",
      },
      {
        icon: "🚀",
        title: "Fast & Free",
        description: "Open-source and completely free to use",
      },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 w-full max-w-4xl">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
            role="article"
            aria-label={`Feature: ${feature.title}`}
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    );
  };

  renderTestimonials = () => {
    const testimonials = [
      {
        text: "The best free resume builder I've ever used!",
        author: "Sarah J.",
        role: "Software Engineer",
      },
      {
        text: "Got my dream job with a resume built here!",
        author: "Mike R.",
        role: "Product Manager",
      },
    ];

    if (!this.props.showTestimonials) return null;

    return (
      <div className="mt-12 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
            >
              <p className="text-gray-700 italic">"{testimonial.text}"</p>
              <p className="text-sm font-semibold text-gray-800 mt-3">
                {testimonial.author}
              </p>
              <p className="text-xs text-gray-500">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  renderStats = () => {
    const stats = [
      { number: "10K+", label: "Resumes Created" },
      { number: "100%", label: "Free to Use" },
      { number: "4.9⭐", label: "User Rating" },
    ];

    return (
      <div className="flex flex-wrap justify-center gap-8 mt-8 w-full">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl font-bold text-green">{stat.number}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    );
  };

  render() {
    const { isButtonHovered, isSourceHovered, isLogoLoaded } = this.state;
    const { customClass = "", showStats = true, showFeatures = true } = this.props;

    return (
      <div
        className={`flex flex-col lg:flex-row w-screen min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans overflow-x-hidden ${customClass}`}
      >
        {/* Logo Section with loading state */}
        <div className="lg:w-1/2 h-64 lg:h-screen bg-gradient-to-br from-green to-green-700 flex items-center justify-center relative overflow-hidden">
          {!isLogoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img
            className={`h-48 lg:h-96 object-contain p-4 transition-opacity duration-500 ${
              isLogoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            src={Logo}
            alt="Tech Resume Logo - Professional Resume Builder"
            loading="lazy"
          />
          <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm opacity-75">
            ✨ Create Your Professional Resume
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center items-center flex-1 p-6 lg:p-12 overflow-y-auto">
          <div className="landing-content max-w-4xl w-full transform transition-all duration-500">
            {/* Hero Section */}
            <div className="text-center lg:text-left">
              <div className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-2 rounded-full mb-4">
                🎯 Open-Source & Free
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
                <span className="text-green">Resume</span>-inator
              </h1>
              <h3 className="text-xl sm:text-2xl lg:text-3xl text-gray-700 mt-4">
                An online Open-Source Resume builder.
              </h3>
              <p className="text-gray-600 mt-2 max-w-2xl mx-auto lg:mx-0">
                Create professional resumes in minutes with our easy-to-use builder.
                No sign-up required. Start building your future today!
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6">
              <button
                id="get-started"
                className={`rounded-lg bg-green text-white text-lg font-semibold hover:shadow-xl transition-all duration-300 px-8 py-3 text-center transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:opacity-70 disabled:cursor-not-allowed ${
                  isButtonHovered ? 'shadow-xl' : ''
                }`}
                onClick={this.handleClick}
                onMouseEnter={() => this.setState({ isButtonHovered: true })}
                onMouseLeave={() => this.setState({ isButtonHovered: false })}
                onKeyDown={this.handleKeyDown}
                aria-label="Start building your resume"
              >
                🚀 Build Resume
              </button>
              <a
                href="https://github.com/Akash-Ramjyothi/Resume-inator"
                id="Source Code"
                className={`rounded-lg bg-white border-2 border-green text-green text-lg font-semibold hover:shadow-xl transition-all duration-300 px-8 py-3 text-center transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-200 ${
                  isSourceHovered ? 'shadow-xl' : ''
                }`}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => this.setState({ isSourceHovered: true })}
                onMouseLeave={() => this.setState({ isSourceHovered: false })}
                onKeyDown={this.handleKeyDown}
                aria-label="View source code on GitHub"
              >
                <span className="inline-flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  Source Code
                </span>
              </a>
            </div>

            {/* Stats Section */}
            {showStats && this.renderStats()}

            {/* Features Section */}
            {showFeatures && this.renderFeatureCards()}

            {/* Testimonials Section */}
            {this.renderTestimonials()}

            {/* Footer Credit */}
            <div className="mt-12 text-center text-gray-500 border-t border-gray-200 pt-6">
              <h3 className="text-lg">
                Built with <span className="text-red-500" aria-hidden="true">❤️</span> by{" "}
                <a
                  href="https://github.com/Akash-Ramjyothi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green hover:underline font-semibold"
                >
                  Akash Ramjyothi
                </a>
              </h3>
              <p className="text-sm mt-2">
                <span className="inline-flex items-center gap-1">
                  <span aria-hidden="true">📄</span> 
                  <a
                    href="/privacy"
                    className="hover:underline text-gray-600"
                  >
                    Privacy Policy
                  </a>
                  <span className="mx-2">•</span>
                  <span aria-hidden="true">📝</span>
                  <a
                    href="/terms"
                    className="hover:underline text-gray-600"
                  >
                    Terms of Service
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Add CSS animations via style tag (could be moved to separate CSS file)
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fade-in {
    animation: fadeIn 0.6s ease-out forwards;
  }
`;

// Inject styles (only once)
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default withRouter(LandingPage);
