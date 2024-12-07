import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface OutlineSection {
  id: number;
  title: string;
  content: string;
  completed: boolean;
}

//interface CourseDetailProps {
//  id: number;
//  name: string;
//  outline: OutlineSection[];
//  progress: number; // The current progress percentage
//  setProgress: (progress: number) => void;
//}
//
const sampleOutlines = [
  {
    id: 1,
    courseId: 1,
    title: "Introduction to React",
    content: "This section covers the basics of React.",
    completed: false,
  },
  {
    id: 2,
    courseId: 2,
    title: "Components and Props",
    content: "Learn how to create and pass props to components.",
    completed: false,
  },
  {
    id: 3,
    courseId: 3,
    title: "State and Hooks",
    content: "Understand React state management and hooks.",
    completed: false,
  },
  // Add more sections as needed
];

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = parseInt(id ?? "0");
  const [outline, setOutline] = useState<OutlineSection[]>(sampleOutlines.filter((item) => item.courseId === courseId));
  const [courseProgress, setCourseProgress] = useState(0);

  useEffect(() => {
    // Calculate the progress percentage based on completed sections
    const completedSections = outline.filter((section) => section.completed).length;
    const progress = Math.round((completedSections / outline.length) * 100);
    setCourseProgress(progress);
  }, [outline]); // Re-run the effect when `outline` state changes

  const handleCompleteSection = (sectionId: number) => {
    // Update the outline with the completed status of the section
    const updatedOutline = outline.map((section) => {
      if (section.id === sectionId) {
        return { ...section, completed: true };
      }
      return section;
    });

    setOutline(updatedOutline); // Set the updated outline to the state
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Course {courseId}</h1>
      <div className="bg-white shadow rounded-lg p-4 w-full max-w-4xl">
        <div className="mb-4">
          <div className="text-sm text-gray-600">Progress: {courseProgress}%</div>
          <div className="h-2 bg-gray-200 rounded overflow-hidden mt-1">
            <div
              className="h-full bg-blue-500"
              style={{ width: `${courseProgress}%` }}
            ></div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Outline</h2>
          {outline.map((section) => (
            <div key={section.id} className="border-b py-4">
              <h3 className="text-lg font-medium text-gray-800">{section.title}</h3>
              <p className="text-gray-600 mt-2">{section.content}</p>
              {!section.completed && (
                <button
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => handleCompleteSection(section.id)}
                >
                  Mark as Complete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;

