import React, { Component } from "react";
import Nav from "./Nav";
import Resume from "./Resume";

class TemplateData extends Component {
  constructor(props) {
    super(props);
    
    // Initial state structure
    this.state = {
      data: {
        name: "",
        email: "",
        phone: "",
        location: "",
        wantedJobTitle: "",
        summary: "",
        skills: "",
        linkedin: "",
        website: "",
      },
      type: "two-column",
      headerColor: "#7F1D1D",
      headerTextColor: "#ffffff",
      accentColor: "#4A5568",
      empTemplate: [],
      eduTemplate: [],
      projectTemplate: [],
      empCount: 0,
      eduCount: 0,
      projectCount: 0,
      employment: this.createEmptySection(),
      education: this.createEmptySection(),
      project: this.createEmptySection(),
      formErrors: {},
      isFormValid: true,
    };
    
    // Bind methods
    this.handleChange = this.handleChange.bind(this);
    this.handleEmpClick = this.handleEmpClick.bind(this);
    this.handleProjectClick = this.handleProjectClick.bind(this);
    this.handleEduClick = this.handleEduClick.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.exportData = this.exportData.bind(this);
    this.importData = this.importData.bind(this);
  }

  // Helper method to create empty section
  createEmptySection() {
    return {
      titles: {},
      organizations: {},
      descriptions: {},
      startDates: {},
      endDates: {},
    };
  }

  // Enhanced employment handler with validation
  handleEmpClick(e) {
    e.preventDefault();
    const i = this.state.empCount + 1;
    
    const template = (
      <div className="w-4/5 p-4 m-2 bg-white rounded-lg shadow-md relative" key={`empKey${i}`}>
        <button
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
          onClick={(e) => this.handleRemoveItem(e, 'empTemplate', i)}
          aria-label="Remove employment"
        >
          ×
        </button>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={`jobStartDate${i}`}>
              Start Date
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              type="month"
              id={`jobStartDate${i}`}
              name={`jobStartDate${i}`}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={`jobEndDate${i}`}>
              End Date
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              type="month"
              id={`jobEndDate${i}`}
              name={`jobEndDate${i}`}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <input
          className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          type="text"
          id={`jobTitle${i}`}
          name={`jobTitle${i}`}
          placeholder="Job Title *"
          onChange={this.handleChange}
          required
        />
        <input
          className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          type="text"
          id={`emp${i}`}
          name={`emp${i}`}
          placeholder="Employer *"
          onChange={this.handleChange}
          required
        />
        <textarea
          className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          name={`jobDesc${i}`}
          placeholder="Description (e.g., responsibilities, achievements)"
          rows="4"
          onChange={this.handleChange}
        />
      </div>
    );

    this.setState((prevState) => ({
      empTemplate: [...prevState.empTemplate, template],
      empCount: i,
    }));
  }

  // Enhanced project handler
  handleProjectClick(e) {
    e.preventDefault();
    const i = this.state.projectCount + 1;
    
    const template = (
      <div className="w-4/5 p-4 m-2 bg-white rounded-lg shadow-md relative" key={`projKey${i}`}>
        <button
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
          onClick={(e) => this.handleRemoveItem(e, 'projectTemplate', i)}
          aria-label="Remove project"
        >
          ×
        </button>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={`projectStartDate${i}`}>
              Start Date
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              type="month"
              id={`projectStartDate${i}`}
              name={`projectStartDate${i}`}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={`projectEndDate${i}`}>
              End Date
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              type="month"
              id={`projectEndDate${i}`}
              name={`projectEndDate${i}`}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <input
          className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          type="text"
          id={`projectTitle${i}`}
          name={`projectTitle${i}`}
          placeholder="Project Title *"
          onChange={this.handleChange}
          required
        />
        <input
          className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          type="text"
          id={`projectTech${i}`}
          name={`projectTech${i}`}
          placeholder="Technologies Used"
          onChange={this.handleChange}
        />
        <textarea
          className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          name={`projectDesc${i}`}
          placeholder="Project Description"
          rows="4"
          onChange={this.handleChange}
        />
      </div>
    );

    this.setState((prevState) => ({
      projectTemplate: [...prevState.projectTemplate, template],
      projectCount: i,
    }));
  }

  // Enhanced education handler
  handleEduClick(e) {
    e.preventDefault();
    const i = this.state.eduCount + 1;
    
    const template = (
      <div className="w-4/5 p-4 m-2 bg-white rounded-lg shadow-md relative" key={`eduKey${i}`}>
        <button
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
          onClick={(e) => this.handleRemoveItem(e, 'eduTemplate', i)}
          aria-label="Remove education"
        >
          ×
        </button>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={`eduStartDate${i}`}>
              Start Date
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              type="month"
              id={`eduStartDate${i}`}
              name={`eduStartDate${i}`}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={`eduEndDate${i}`}>
              End Date
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              type="month"
              id={`eduEndDate${i}`}
              name={`eduEndDate${i}`}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <input
          className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          type="text"
          id={`qual${i}`}
          name={`qual${i}`}
          placeholder="Qualification *"
          onChange={this.handleChange}
          required
        />
        <input
          className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          type="text"
          id={`educ${i}`}
          name={`educ${i}`}
          placeholder="School/College *"
          onChange={this.handleChange}
          required
        />
        <input
          className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          type="text"
          id={`eduLocation${i}`}
          name={`eduLocation${i}`}
          placeholder="Location"
          onChange={this.handleChange}
        />
        <textarea
          className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          name={`eduDesc${i}`}
          placeholder="Description (e.g., achievements, activities)"
          rows="3"
          onChange={this.handleChange}
        />
      </div>
    );

    this.setState((prevState) => ({
      eduTemplate: [...prevState.eduTemplate, template],
      eduCount: i,
    }));
  }

  // Remove item handler
  handleRemoveItem(e, templateType, index) {
    e.preventDefault();
    this.setState((prevState) => {
      const templates = [...prevState[templateType]];
      templates.splice(index - 1, 1);
      return { [templateType]: templates };
    });
  }

  // Comprehensive change handler with data persistence
  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    // Update data
    this.setState((prevState) => {
      const newState = { ...prevState };

      if (name === "templates") {
        newState.type = value;
        newState.headerColor = value === "minimalist" ? "#F3F4F6" : "#7F1D1D";
        newState.headerTextColor = value === "minimalist" ? "#1F2937" : "#ffffff";
      } else if (name === "headerColor" || name === "headerTextColor" || name === "accentColor") {
        newState[name] = value;
      } else if (name.includes("jobTitle")) {
        newState.employment.titles[name] = value;
      } else if (name.includes("emp")) {
        newState.employment.organizations[name] = value;
      } else if (name.includes("jobDesc")) {
        newState.employment.descriptions[name] = value;
      } else if (name.includes("jobStartDate")) {
        newState.employment.startDates[name] = value;
      } else if (name.includes("jobEndDate")) {
        newState.employment.endDates[name] = value;
      } else if (name.includes("qual")) {
        newState.education.titles[name] = value;
      } else if (name.includes("educ")) {
        newState.education.organizations[name] = value;
      } else if (name.includes("eduLocation")) {
        newState.education.locations = { ...newState.education.locations, [name]: value };
      } else if (name.includes("eduDesc")) {
        newState.education.descriptions[name] = value;
      } else if (name.includes("eduStartDate")) {
        newState.education.startDates[name] = value;
      } else if (name.includes("eduEndDate")) {
        newState.education.endDates[name] = value;
      } else if (name.includes("projectTitle")) {
        newState.project.titles[name] = value;
      } else if (name.includes("projectTech")) {
        newState.project.technologies = { ...newState.project.technologies, [name]: value };
      } else if (name.includes("projectDesc")) {
        newState.project.descriptions[name] = value;
      } else if (name.includes("projectStartDate")) {
        newState.project.startDates[name] = value;
      } else if (name.includes("projectEndDate")) {
        newState.project.endDates[name] = value;
      } else {
        newState.data[name] = value;
      }

      return newState;
    });
  }

  // Validate form before submission
  validateForm() {
    const errors = {};
    const { data } = this.state;
    
    if (!data.name?.trim()) errors.name = "Name is required";
    if (!data.email?.trim()) errors.email = "Email is required";
    if (!data.email?.includes('@')) errors.email = "Invalid email format";
    if (!data.wantedJobTitle?.trim()) errors.wantedJobTitle = "Job title is required";
    
    this.setState({ formErrors: errors, isFormValid: Object.keys(errors).length === 0 });
    return Object.keys(errors).length === 0;
  }

  // Reset form
  resetForm() {
    if (window.confirm("Are you sure you want to reset all data?")) {
      this.setState({
        data: {
          name: "",
          email: "",
          phone: "",
          location: "",
          wantedJobTitle: "",
          summary: "",
          skills: "",
          linkedin: "",
          website: "",
        },
        empTemplate: [],
        eduTemplate: [],
        projectTemplate: [],
        empCount: 0,
        eduCount: 0,
        projectCount: 0,
        employment: this.createEmptySection(),
        education: this.createEmptySection(),
        project: this.createEmptySection(),
        formErrors: {},
      });
    }
  }

  // Export data as JSON
  exportData() {
    const data = {
      personal: this.state.data,
      employment: this.state.employment,
      education: this.state.education,
      project: this.state.project,
      settings: {
        type: this.state.type,
        headerColor: this.state.headerColor,
        headerTextColor: this.state.headerTextColor,
        accentColor: this.state.accentColor,
      }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume-data.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  // Import data from JSON
  importData(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        this.setState({
          data: data.personal || this.state.data,
          employment: data.employment || this.state.employment,
          education: data.education || this.state.education,
          project: data.project || this.state.project,
          type: data.settings?.type || this.state.type,
          headerColor: data.settings?.headerColor || this.state.headerColor,
          headerTextColor: data.settings?.headerTextColor || this.state.headerTextColor,
          accentColor: data.settings?.accentColor || this.state.accentColor,
        });
        alert("Data imported successfully!");
      } catch (error) {
        alert("Error importing data. Please check the file format.");
      }
    };
    reader.readAsText(file);
  }

  render() {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
        <Nav showDownloadBtn={true} />
        
        <div className="flex p-4 print:p-0 max-w-7xl mx-auto gap-6">
          {/* Form Section */}
          <form className="w-2/5 flex flex-col space-y-4 print:hidden overflow-y-auto max-h-screen pb-20">
            {/* Header with actions */}
            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800">Resume Editor</h2>
              <div className="space-x-2">
                <button
                  type="button"
                  onClick={this.resetForm}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={this.exportData}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Export
                </button>
                <label className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer">
                  Import
                  <input
                    type="file"
                    accept=".json"
                    onChange={this.importData}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Template Settings */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Template Settings</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Template Type
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    name="templates"
                    id="templates"
                    onChange={this.handleChange}
                    value={this.state.type}
                  >
                    <option value="two-column">Two-Column</option>
                    <option value="minimalist">Minimalist</option>
                    <option value="modern">Modern</option>
                    <option value="classic">Classic</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Header Color
                    </label>
                    <input
                      className="w-full h-10 p-1 border border-gray-300 rounded"
                      type="color"
                      id="headerColor"
                      name="headerColor"
                      onChange={this.handleChange}
                      value={this.state.headerColor}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Header Text Color
                    </label>
                    <input
                      className="w-full h-10 p-1 border border-gray-300 rounded"
                      type="color"
                      id="headerTextColor"
                      name="headerTextColor"
                      onChange={this.handleChange}
                      value={this.state.headerTextColor}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Accent Color
                  </label>
                  <input
                    className="w-full h-10 p-1 border border-gray-300 rounded"
                    type="color"
                    id="accentColor"
                    name="accentColor"
                    onChange={this.handleChange}
                    value={this.state.accentColor}
                  />
                </div>
              </div>
            </div>

            {/* Personal Details */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Personal Details</h3>
              <div className="space-y-3">
                <div>
                  <input
                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                      this.state.formErrors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    type="text"
                    id="name"
                    name="name"
                    value={this.state.data.name || ''}
                    onChange={this.handleChange}
                    placeholder="Full Name *"
                  />
                  {this.state.formErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{this.state.formErrors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                      this.state.formErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    type="email"
                    id="email"
                    name="email"
                    value={this.state.data.email || ''}
                    onChange={this.handleChange}
                    placeholder="Email Address *"
                  />
                  {this.state.formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{this.state.formErrors.email}</p>
                  )}
                </div>
                <input
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  type="tel"
                  id="phone"
                  name="phone"
                  value={this.state.data.phone || ''}
                  onChange={this.handleChange}
                  placeholder="Phone Number"
                />
                <input
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  type="text"
                  id="location"
                  name="location"
                  value={this.state.data.location || ''}
                  onChange={this.handleChange}
                  placeholder="Location (City, Country)"
                />
                <input
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  type="text"
                  id="linkedin"
                  name="linkedin"
                  value={this.state.data.linkedin || ''}
                  onChange={this.handleChange}
                  placeholder="LinkedIn URL"
                />
                <input
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  type="text"
                  id="website"
                  name="website"
                  value={this.state.data.website || ''}
                  onChange={this.handleChange}
                  placeholder="Personal Website/Portfolio"
                />
              </div>
            </div>

            {/* Professional Details */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Professional Details</h3>
              <div className="space-y-3">
                <div>
                  <input
                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                      this.state.formErrors.wantedJobTitle ? 'border-red-500' : 'border-gray-300'
                    }`}
                    type="text"
                    id="wantedJobTitle"
                    name="wantedJobTitle"
                    value={this.state.data.wantedJobTitle || ''}
                    onChange={this.handleChange}
                    placeholder="Target Job Title *"
                  />
                  {this.state.formErrors.wantedJobTitle && (
                    <p className="text-red-500 text-sm mt-1">{this.state.formErrors.wantedJobTitle}</p>
                  )}
                </div>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  name="summary"
                  placeholder="Professional Summary (2-3 sentences)"
                  rows="4"
                  value={this.state.data.summary || ''}
                  onChange={this.handleChange}
                />
                <input
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  type="text"
                  id="skills"
                  name="skills"
                  value={this.state.data.skills || ''}
                  onChange={this.handleChange}
                  placeholder="Skills (comma-separated)"
                />
              </div>
            </div>

            {/* Employment */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Employment History</h3>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  onClick={this.handleEmpClick}
                >
                  + Add Employment
                </button>
              </div>
              {this.state.empTemplate.length === 0 && (
                <p className="text-gray-500 text-sm italic">No employment added yet</p>
              )}
              {this.state.empTemplate.map((el) => el)}
            </div>

            {/* Projects */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Projects</h3>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  onClick={this.handleProjectClick}
                >
                  + Add Project
                </button>
              </div>
              {this.state.projectTemplate.length === 0 && (
                <p className="text-gray-500 text-sm italic">No projects added yet</p>
              )}
              {this.state.projectTemplate.map((el) => el)}
            </div>

            {/* Education */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Education</h3>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  onClick={this.handleEduClick}
                >
                  + Add Education
                </button>
              </div>
              {this.state.eduTemplate.length === 0 && (
                <p className="text-gray-500 text-sm italic">No education added yet</p>
              )}
              {this.state.eduTemplate.map((el) => el)}
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 sticky bottom-4 bg-white p-4 rounded-lg shadow-lg">
              <button
                type="button"
                onClick={() => this.validateForm()}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Validate Form
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                Print Resume
              </button>
            </div>
          </form>

          {/* Resume Preview */}
          <div className="w-3/5">
            <Resume
              userData={this.state.data}
              empData={this.state.employment}
              empCount={this.state.empCount}
              eduData={this.state.education}
              eduCount={this.state.eduCount}
              projectData={this.state.project}
              projectCount={this.state.projectCount}
              type={this.state.type}
              headerColor={this.state.headerColor}
              headerTextColor={this.state.headerTextColor}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TemplateData;
