import React, { useState, useEffect } from "react";

interface Plan {
  title: string;
  references: string[];
  duration: string;
}

const MyPlans: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);

  // Fetch plans from local storage or API on component mount
  useEffect(() => {
    const savedPlans = localStorage.getItem("studyPlans");
    if (savedPlans) {
      setPlans(JSON.parse(savedPlans));
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <h1 className="text-center text-3xl font-bold">My Study Plans</h1>
      </header>

      <main className="container mx-auto py-8 px-4">
        {plans.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="text-lg">You have no saved plans yet.</p>
            <p className="mt-2">
              Go to the <a href="/home/planner" className="text-blue-500 underline">Planner</a> to create one!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300"
              >
                <h2 className="text-xl font-bold text-blue-600 mb-2">
                  {plan.title}
                </h2>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">References:</span>{" "}
                  {plan.references.join(", ")}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Duration:</span> {plan.duration}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyPlans;

