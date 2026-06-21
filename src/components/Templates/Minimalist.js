import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Extracted icon components for reusability
const Icons = {
  Phone: () => (
    <svg className="w-5 inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  Email: () => (
    <svg className="w-5 inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Location: () => (
    <svg className="w-5 inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
};

// Reusable Section component
const Section = ({ title, children, className = '' }) => (
  <section className={`flex flex-col w-full mb-5 px-5 ${className}`}>
    <div className="text-md text-gray-dark border-b border-gray-dark tracking-widest pb-1">
      {title}
    </div>
    {children}
  </section>
);

// Reusable Experience Item component
const ExperienceItem = ({ 
  title, 
  startDate, 
  endDate, 
  company, 
  description,
  titleColor = 'text-gray-dark'
}) => (
  <div className="flex flex-col">
    <div className="flex justify-between flex-wrap">
      <div className={`text-sm pt-3 ${titleColor}`}>
        <li className="font-medium">{title}</li>
      </div>
      <div className={`text-sm pt-3 ${titleColor}`}>
        <span>{startDate}</span> - <span>{endDate || 'Present'}</span>
      </div>
    </div>
    {company && <div className="text-sm pt-1 text-gray-600 italic">{company}</div>}
    <div className="text-sm pt-2 text-gray-dark leading-relaxed">{description}</div>
  </div>
);

// Skill Tag component
const SkillTag = ({ skill, color = 'bg-gray-dark' }) => (
  <div className={`inline-block px-3 py-1 mt-3 mx-1 ${color} text-sm text-white rounded-full`}>
    {skill.trim()}
  </div>
);

// Contact Info component
const ContactInfo = ({ type, value }) => {
  const Icon = Icons[type];
  if (!value || !Icon) return null;
  
  return (
    <div className="text-md flex items-center">
      <Icon />
      <span className="break-all">{value}</span>
    </div>
  );
};

class Minimalist extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      wantedJobTitle: PropTypes.string.isRequired,
      skills: PropTypes.string,
      summary: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      location: PropTypes.string,
    }).isRequired,
    headerColor: PropTypes.string,
    headerTextColor: PropTypes.string,
    empCount: PropTypes.number,
    employment: PropTypes.shape({
      jobTitles: PropTypes.object,
      jobStartDate: PropTypes.object,
      jobEndDate: PropTypes.object,
      emp: PropTypes.object,
      jobDesc: PropTypes.object,
    }),
    projectCount: PropTypes.number,
    project: PropTypes.shape({
      projectTitles: PropTypes.object,
      projectStartDate: PropTypes.object,
      projectEndDate: PropTypes.object,
      projectDesc: PropTypes.object,
    }),
    eduCount: PropTypes.number,
    education: PropTypes.shape({
      qual: PropTypes.object,
      eduStartDate: PropTypes.object,
      eduEndDate: PropTypes.object,
      edu: PropTypes.object,
      eduDesc: PropTypes.object,
    }),
  };

  static defaultProps = {
    headerColor: '#2d3748',
    headerTextColor: '#ffffff',
    empCount: 0,
    projectCount: 0,
    eduCount: 0,
    employment: { jobTitles: {}, jobStartDate: {}, jobEndDate: {}, emp: {}, jobDesc: {} },
    project: { projectTitles: {}, projectStartDate: {}, projectEndDate: {}, projectDesc: {} },
    education: { qual: {}, eduStartDate: {}, eduEndDate: {}, edu: {}, eduDesc: {} },
  };

  renderContactInfo = () => {
    const { phone, email, location } = this.props.user;
    const contactItems = [
      { type: 'Phone', value: phone },
      { type: 'Email', value: email },
      { type: 'Location', value: location },
    ];

    const renderedItems = contactItems
      .filter(item => item.value)
      .map(item => (
        <ContactInfo key={item.type} type={item.type} value={item.value} />
      ));

    // Add spacing between contact items
    return renderedItems.map((item, index) => (
      <div key={index} className={index > 0 ? 'pt-3' : ''}>
        {item}
      </div>
    ));
  };

  renderSkills = () => {
    const { skills } = this.props.user;
    if (!skills) return <div className="text-sm pt-3 text-gray-500">No skills listed</div>;

    const skillList = skills.split(',').filter(skill => skill.trim());
    if (skillList.length === 0) {
      return <div className="text-sm pt-3 text-gray-500">No skills listed</div>;
    }

    return (
      <div className="flex flex-wrap">
        {skillList.map((skill) => (
          <SkillTag key={skill.trim()} skill={skill} />
        ))}
      </div>
    );
  };

  renderExperience = () => {
    const { empCount, employment } = this.props;
    if (!empCount) {
      return <div className="text-sm pt-3 text-gray-500">No experience listed</div>;
    }

    return Array.from({ length: empCount }, (_, i) => {
      const index = i + 1;
      return (
        <ExperienceItem
          key={`emp${index}`}
          title={employment.jobTitles[`jobTitle${index}`]}
          startDate={employment.jobStartDate[`jobStartDate${index}`]}
          endDate={employment.jobEndDate[`jobEndDate${index}`]}
          company={employment.emp[`emp${index}`]}
          description={employment.jobDesc[`jobDesc${index}`]}
          titleColor="text-gray-dark"
        />
      );
    });
  };

  renderProjects = () => {
    const { projectCount, project } = this.props;
    if (!projectCount) {
      return <div className="text-sm pt-3 text-gray-500">No projects listed</div>;
    }

    return Array.from({ length: projectCount }, (_, i) => {
      const index = i + 1;
      return (
        <ExperienceItem
          key={`project${index}`}
          title={project.projectTitles[`projectTitle${index}`]}
          startDate={project.projectStartDate[`projectStartDate${index}`]}
          endDate={project.projectEndDate[`projectEndDate${index}`]}
          description={project.projectDesc[`projectDesc${index}`]}
          titleColor="text-gray-dark"
        />
      );
    });
  };

  renderEducation = () => {
    const { eduCount, education } = this.props;
    if (!eduCount) {
      return <div className="text-sm pt-3 text-gray-500">No education listed</div>;
    }

    return Array.from({ length: eduCount }, (_, i) => {
      const index = i + 1;
      return (
        <ExperienceItem
          key={`edu${index}`}
          title={education.qual[`qual${index}`]}
          startDate={education.eduStartDate[`eduStartDate${index}`]}
          endDate={education.eduEndDate[`eduEndDate${index}`]}
          company={education.edu[`educ${index}`]}
          description={education.eduDesc[`eduDesc${index}`]}
          titleColor="text-gray-dark"
        />
      );
    });
  };

  render() {
    const { user, headerColor, headerTextColor } = this.props;

    return (
      <div
        style={{
          boxSizing: 'border-box',
          margin: '0 auto',
          width: '8.5in',
          height: '11in',
          backgroundColor: '#fff',
          boxShadow: '0 3px 8px -3px rgba(0, 0, 0, 0.7)',
        }}
        className="print:shadow-none print:w-full print:h-auto font-sans"
      >
        {/* Header */}
        <header
          style={{ backgroundColor: headerColor, color: headerTextColor }}
          className="flex justify-between items-center w-full h-1/6"
        >
          <div className="flex flex-col px-5">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <h2 className="text-lg pt-3">{user.wantedJobTitle}</h2>
          </div>
          <div className="flex flex-col px-5 text-right">
            {this.renderContactInfo()}
          </div>
        </header>

        {/* Summary */}
        {user.summary && (
          <Section title="SUMMARY">
            <div className="text-sm pt-3 text-gray-dark leading-relaxed">
              {user.summary}
            </div>
          </Section>
        )}

        {/* Skills */}
        <Section title="SKILLS">
          {this.renderSkills()}
        </Section>

        {/* Professional Experience */}
        <Section title="PROFESSIONAL EXPERIENCE">
          {this.renderExperience()}
        </Section>

        {/* Projects */}
        <Section title="PROJECTS">
          {this.renderProjects()}
        </Section>

        {/* Education */}
        <Section title="EDUCATION">
          {this.renderEducation()}
        </Section>
      </div>
    );
  }
}

export default Minimalist;
