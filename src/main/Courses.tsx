import React from "react";
import { Link } from "react-router-dom";

interface Course {
  id: number;
  name: string;
  progress: number; // Percentage progress (0-100)
}

const sampleCourses: Course[] = [
  { id: 1, name: "React Fundamentals", progress: 70 },
  { id: 2, name: "Advanced JavaScript", progress: 45 },
  { id: 3, name: "Full Stack Web Development", progress: 90 },
];

const Courses: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {sampleCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white border rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
          >
            <Link to={`/home/course/${course.id}`} className="block">
              <h2 className="text-lg font-semibold text-gray-800">{course.name}</h2>
              <div className="mt-2 mb-4">
                <div className="text-sm text-gray-600">Progress: {course.progress}%</div>
                <div className="h-2 bg-gray-200 rounded overflow-hidden mt-1">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;

