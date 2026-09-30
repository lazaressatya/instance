"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: ""
  });

  const [error, setError] = useState("");

  async function getEmployees() {
    try {
      const res = await fetch("/api/employees");

      if (!res.ok) {
        throw new Error("Unable to fetch employees");
      }

      const data = await res.json();

      setEmployees(data);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function addEmployee(e) {
    e.preventDefault();

    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        throw new Error("Unable to add employee");
      }

      setForm({
        name: "",
        email: "",
        department: ""
      });

      await getEmployees();
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <main style={{
      maxWidth: "700px",
      margin: "50px auto",
      fontFamily: "Arial",
      padding: "20px"
    }}>
      <h1>Employee Management System</h1>

      <form onSubmit={addEmployee}>
        <input
          placeholder="Employee Name"
          required
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <br /><br />

        <input
          type="email"
          placeholder="Employee Email"
          required
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <br /><br />

        <input
          placeholder="Department"
          required
          value={form.department}
          onChange={(e) =>
            setForm({
              ...form,
              department: e.target.value
            })
          }
        />

        <br /><br />

        <button type="submit">
          Add Employee
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <hr />

      <h2>Employee List</h2>

      {employees.map((emp) => (
        <div key={emp._id}>
          <h3>{emp.name}</h3>
          <p>Email: {emp.email}</p>
          <p>Department: {emp.department}</p>
          <hr />
        </div>
      ))}
    </main>
  );
}
