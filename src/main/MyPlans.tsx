import React, { useState, useEffect } from "react";

interface Plan {
  title: string;
  references: string[];
  duration: string;
}

const MyPlans: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editPlan, setEditPlan] = useState<Plan | null>(null);

  // Fetch plans from local storage or API on component mount
  useEffect(() => {
    const savedPlans = localStorage.getItem("studyPlans");
    if (savedPlans) {
      setPlans(JSON.parse(savedPlans));
    }
  }, []);

  // Save updated plans to local storage
  const savePlansToLocalStorage = (updatedPlans: Plan[]) => {
    setPlans(updatedPlans);
    localStorage.setItem("studyPlans", JSON.stringify(updatedPlans));
  };

  // Delete a plan
  const deletePlan = (index: number) => {
    const updatedPlans = plans.filter((_, i) => i !== index);
    savePlansToLocalStorage(updatedPlans);
  };

  // Enable edit mode
  const startEditing = (index: number) => {
    setIsEditing(index);
    setEditPlan(plans[index]);
  };

  // Handle changes in the edit form
  const handleEditChange = (field: keyof Plan, value: string) => {
    if (editPlan) {
      setEditPlan({ ...editPlan, [field]: value });
    }
  };

  // Save changes to the plan
  const saveEdit = () => {
    if (isEditing !== null && editPlan) {
      const updatedPlans = plans.map((plan, index) =>
        index === isEditing ? editPlan : plan
      );
      savePlansToLocalStorage(updatedPlans);
      setIsEditing(null);
      setEditPlan(null);
    }
  };

  return (
    <div className="bg-gray-600 min-h-screen">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <h1 className="text-center text-3xl font-bold">My Study Plans</h1>
      </header>

      <main className="container mx-auto py-8 px-4">
        {plans.length === 0 ? (
          <div className="text-center text-gray-200">
            <p className="text-lg">You have no saved plans yet.</p>
            <p className="mt-2">
              Go to the <a href="/home/planner" className="text-blue-500 underline">Planner</a> to create one!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan, index) =>
              isEditing === index ? (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-6"
                >
                  <input
                    type="text"
                    className="border border-gray-300 rounded p-2 w-full mb-4"
                    value={editPlan?.title || ""}
                    onChange={(e) =>
                      handleEditChange("title", e.target.value)
                    }
                  />
                  <textarea
                    className="border border-gray-300 rounded p-2 w-full mb-4"
                    value={editPlan?.references.join(", ") || ""}
                    onChange={(e) =>
                      handleEditChange(
                        "references",
                        e.target.value.split(",").map((ref) => ref.trim())
                      )
                    }
                  />
                  <input
                    type="text"
                    className="border border-gray-300 rounded p-2 w-full mb-4"
                    value={editPlan?.duration || ""}
                    onChange={(e) =>
                      handleEditChange("duration", e.target.value)
                    }
                  />
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded mr-2"
                    onClick={saveEdit}
                  >
                    Save
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded"
                    onClick={() => setIsEditing(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
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
                  <div className="mt-4">
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                      onClick={() => startEditing(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded"
                      onClick={() => deletePlan(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyPlans;
