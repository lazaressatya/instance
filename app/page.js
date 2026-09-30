"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: ""
  });

  async function getEmployees() {
    const response = await fetch("/api/employees");

    const data = await response.json();

    setEmployees(data);
  }

  async function addEmployee(e) {
    e.preventDefault();

    await fetch("/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    setForm({
      name: "",
      email: "",
      department: ""
    });

    getEmployees();
  }

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <main
      style={{
        maxWidth: "800px",
        margin: "50px auto",
        fontFamily: "Arial"
      }}
    >
      <h1>Employee Management</h1>

      <form onSubmit={addEmployee}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value
            })
          }
        />

        <br />
        <br />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
        />

        <br />
        <br />

        <input
          placeholder="Department"
          value={form.department}
          onChange={(e) =>
            setForm({
              ...form,
              department: e.target.value
            })
          }
        />

        <br />
        <br />

        <button type="submit">
          Add Employee
        </button>
      </form>

      <hr />

      <h2>Employees</h2>

      {employees.map((employee) => (
        <div key={employee._id}>
          <p>
            <strong>{employee.name}</strong>
          </p>

          <p>{employee.email}</p>

          <p>{employee.department}</p>

          <hr />
        </div>
      ))}
    </main>
  );
}
