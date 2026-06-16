import React from "react";

const Classic = (props) => {
  const {
    user,
    employment,
    empCount,
    education,
    eduCount,
    project,
    projectCount,
    headerColor,
    headerTextColor,
  } = props;

  // ... Similar implementation to Modern but with classic styling (more traditional, serif fonts, etc.)
  // (I can provide the full Classic template if needed)

  return (
    <div className="bg-white max-w-4xl mx-auto p-8 font-serif border border-gray-200">
      <div className="text-center border-b-2 pb-6" style={{ borderColor: headerColor }}>
        <h1 className="text-5xl font-bold" style={{ color: headerColor }}>
          {user.name || "Your Name"}
        </h1>
        <p className="text-xl mt-2">{user.wantedJobTitle || "Job Title"}</p>
        <div className="flex justify-center flex-wrap gap-4 text-sm mt-4">
          {user.email && <span>✉ {user.email}</span>}
          {user.phone && <span>📱 {user.phone}</span>}
          {user.location && <span>📍 {user.location}</span>}
        </div>
      </div>
      
      {/* ... Rest of classic layout */}
    </div>
  );
};

export default Classic;
