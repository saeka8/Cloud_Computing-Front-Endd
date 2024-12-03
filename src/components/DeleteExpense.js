import React, { useState } from "react";
import axios from "axios";

const DeleteExpense = () => {
  const [expenseId, setExpenseId] = useState(""); // Track the expense ID
  const [message, setMessage] = useState("");     // Track response or error message
  const [loading, setLoading] = useState(false);  // Track loading state to avoid multiple submits

  // Handle input change
  const handleChange = (e) => {
    setExpenseId(e.target.value);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!expenseId) {
      setMessage("Expense ID is required.");
      return;
    }

    setLoading(true);  // Set loading to true while waiting for response

    try {
      // Send the DELETE request to the server
      const response = await axios.post(
        "https://expensemanagementccb8.azurewebsites.net/api/deleteexpense?code=2mDTVUZ0dzvAaY7iasJXLLThKFiN4Ma02m_L6lODOSjdAzFuxz8qJA==",
        JSON.stringify({ Expense_ID: expenseId }),  // Ensure the payload is in JSON format
        {
          headers: {
            "Content-Type": "application/json",  // Correct header to indicate JSON body
          },
        }
      );

      // Handle success response
      setMessage(response.data.message || "Expense deleted successfully!");  // Show success message
    } catch (error) {
      // Handle error if the API call fails
      setMessage("Error: " + (error.response?.data?.error || "Unknown error"));
      console.error("Delete request failed:", error); // Log error for debugging
    } finally {
      setLoading(false);  // Stop loading state after the request
    }
  };

  return (
    <div>
      <h2>Delete Expense</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="expenseId"
          placeholder="Expense ID"
          value={expenseId}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Deleting..." : "Delete Expense"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteExpense;

