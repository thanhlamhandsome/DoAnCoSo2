import React, { Suspense, useState } from "react";
import AdminRow from "./AdminRow";
import TableHeader from "./TableHeader";
import FormAddAdmin from "./FormAddAdmin";  // Import the FormAddUser component
import { Await, useLoaderData } from "react-router-dom";
import Loader from "../../Root/Loader";

const AdminLayoutChild = () => {
  const [showForm, setShowForm] = useState(false);  // State to toggle between form and table view
  const { loaderAdmin } = useLoaderData();  // Loader data from the router
  const [admin, setAdmin] = useState();  // User state for handling user data in the form

  // Function to show the form with selected user for update
  function handleShowFormUpdate(admin) {
    setShowForm(true); 
    setAdmin(admin); 
  }

  // Function to turn off the form and show the table
  function handleTurnOffForm() {
    setShowForm(false); 
    setAdmin(undefined);  // Reset user state
  }

  return (
    <div className="py-8">
      {/* Title Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>

        {/* Conditionally render buttons based on the state */}
        {!showForm ? (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
            onClick={() => setShowForm(true)}  // Show the form when clicked
          >
            Add Admin
          </button>
        ) : (
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={handleTurnOffForm}  // Show the table when clicked
          >
            Back
          </button>
        )}
      </div>

      {/* Show the FormAddUser when the state is true */}
      {showForm ? (
        <FormAddAdmin user={admin} />
      ) : (
        // User Table only appears when showForm is false
        <Suspense fallback={<Loader />}>
          <Await resolve={loaderAdmin}>
            {(data) => (
              <div className="bg-white shadow rounded-lg overflow-hidden mt-8">
                <table className="min-w-full bg-white border border-gray-200">
                  <TableHeader />
                  <tbody>
                    {data.map((user, index) => (
                      <AdminRow
                        key={index}
                        index={index}
                        user={user}
                        showForm={handleShowFormUpdate}  // Pass the function to handle editing
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Await>
        </Suspense>
      )}
    </div>
  );
};

export default AdminLayoutChild;
