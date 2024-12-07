import React, { useState } from "react";
import NavbarHome from "../components/NavbarHome";

interface PlanDetails {
  title: string;
  references: string[];
  interval: string;
  duration: number;
  courses: string[];
}

const Planner: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [selectedReferences, setSelectedReferences] = useState<string[]>([]);
  const [interval, setInterval] = useState<string>("Days");
  const [duration, setDuration] = useState<number>(1);
  const [courses, setCourses] = useState<string[]>([]);
  const [newCourse, setNewCourse] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [previewPlan, setPreviewPlan] = useState<PlanDetails | null>(null);

  const handleReferenceChange = (reference: string) => {
    setSelectedReferences((prev) =>
      prev.includes(reference)
        ? prev.filter((ref) => ref !== reference)
        : [...prev, reference]
    );
  };

  const handleAddCourse = () => {
    if (newCourse.trim()) {
      setCourses((prev) => [...prev, newCourse]);
      setNewCourse("");
    }
  };

  const handleGeneratePlan = () => {
    setIsGenerating(true);

    // Simulate loading and set preview data
    setTimeout(() => {
      const planDetails: PlanDetails = {
        title,
        references: selectedReferences,
        interval,
        duration,
        courses,
      };
      setPreviewPlan(planDetails);
      setIsGenerating(false);
    }, 2000);
  };

  const handleSavePlan = () => {
    alert("Plan saved successfully!");
    setPreviewPlan(null);
  };

  return (
    <>
      <NavbarHome />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Study Planner</h1>

          {/* Plan Title */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Study Plan Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for your plan"
              className="w-full border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Reference Types */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Reference Types
            </label>
            <div className="flex flex-col space-y-2">
              {["Books", "YouTube", "Web Articles", "Research Papers"].map(
                (type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={type}
                      checked={selectedReferences.includes(type)}
                      onChange={() => handleReferenceChange(type)}
                      className="text-blue-500"
                    />
                    <span className="text-gray-700">{type}</span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Interval and Duration Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Plan Duration
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value) || 0)}
                min={1}
                placeholder="Enter duration"
                className="w-1/2 border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <select
                value={interval}
                onChange={(e) => setInterval(e.target.value)}
                className="w-1/2 border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {["Days", "Weeks", "Years"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Add Course Section */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Add a Course
            </label>
            <div className="flex">
              <input
                type="text"
                value={newCourse}
                onChange={(e) => setNewCourse(e.target.value)}
                placeholder="Enter course name"
                className="w-full border-gray-300 rounded-l px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={handleAddCourse}
                className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition duration-200"
              >
                Add
              </button>
            </div>
          </div>

          {/* List of Courses */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Planned Courses
            </h2>
            {courses.length > 0 ? (
              <ul className="list-disc pl-5">
                {courses.map((course, index) => (
                  <li key={index} className="text-gray-800">
                    {course}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No courses added yet.</p>
            )}
          </div>

          {/* Generate Study Plan Button */}
          <button
            onClick={handleGeneratePlan}
            className="w-full bg-green-500 text-white py-2 px-4 rounded flex justify-center items-center hover:bg-green-600 transition duration-200"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            ) : (
              "Generate Study Plan"
            )}
          </button>
        </div>

        {/* Preview Modal */}
        {previewPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Plan Preview</h2>
              <p>
                <strong>Title:</strong> {previewPlan.title}
              </p>
              <p>
                <strong>References:</strong> {previewPlan.references.join(", ")}
              </p>
              <p>
                <strong>Duration:</strong> {previewPlan.duration}{" "}
                {previewPlan.interval}
              </p>
              <p>
                <strong>Courses:</strong> {previewPlan.courses.join(", ")}
              </p>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setPreviewPlan(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePlan}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Save Plan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Planner;

