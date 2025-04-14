import { useState } from "react";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddExpense = (e) => {
    e.preventDefault();
    const form = e.target;
    const newExpense = {
      id: crypto.randomUUID(),
      description: form.description.value,
      category: form.category.value,
      amount: parseFloat(form.amount.value)
    };
    setExpenses([...expenses, newExpense]);
    form.reset();
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const filteredExpenses = expenses.filter(expense =>
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>💰 Expense Tracker</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search expenses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Add Expense Form */}
      <form onSubmit={handleAddExpense}>
        <input name="description" placeholder="Description" required />
        <input name="category" placeholder="Category" required />
        <input name="amount" type="number" placeholder="Amount" required />
        <button type="submit">Add Expense</button>
      </form>

      {/* Expense Table */}
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Amount ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>{expense.category}</td>
              <td>{expense.amount.toFixed(2)}</td>
              <td>
                <button onClick={() => handleDelete(expense.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {filteredExpenses.length === 0 && (
            <tr>
              <td colSpan="4">No expenses found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
