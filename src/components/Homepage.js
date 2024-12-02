import React from "react";
import { Link } from "react-router-dom"; // For navigation between different pages

const Homepage = () => {
  return (
    <div>
      <h1>Welcome to the Expense Management System</h1>
      <nav>
        <ul>
          <li><Link to="/add-expense">Add Expense</Link></li>
          <li><Link to="/update-expense">Update Expense</Link></li>
          <li><Link to="/view-expense">View Expense</Link></li>
          <li><Link to="/delete-expense">Delete Expense</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Homepage;
