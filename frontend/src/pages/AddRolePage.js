import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

const AddRolePage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const [editData, setEditData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const roles = [
    {
      role: "Super Admin",
      description:
        "Has complete access to the admin module. Can approve or disapprove requests, upload and edit properties, and manage all administrative tasks.",
    },
    {
      role: "Admin",
      description:
        "Can approve or disapprove incoming property requests uploaded by users. Limited to managing approval-related tasks.",
    },
    {
      role: "Operator",
      description:
        "Can upload property projects and manage builder information. No access to approval or editing functionalities.",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
  };

  const handleEditRoleSelect = (role) => {
    setEditData({ ...editData, role });
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert("Please create a username and password.");
      return;
    }
    if (!formData.role) {
      alert("Please select a role.");
      return;
    }
    alert(
      `Username: ${formData.username}\nRole: ${formData.role} assigned successfully!`
    );
    // Save the new role data to the backend here
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editData.username || !editData.password) {
      alert("Please enter a username and password for the role to edit.");
      return;
    }
    if (!editData.role) {
      alert("Please select a new role.");
      return;
    }
    alert(
      `Role updated for Username: ${editData.username}\nNew Role: ${editData.role}`
    );
    // Save the updated role data to the backend here
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Manage Roles</h3>

      {/* Add Role Section */}
      <div className="mb-5">
        <h4>Create Role</h4>
        <Form onSubmit={handleCreateSubmit}>
          {/* Username Field */}
          <Form.Group className="mb-3" controlId="createUsername">
            <Form.Label>Create Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          {/* Password Field */}
          <Form.Group className="mb-3" controlId="createPassword">
            <Form.Label>Create Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          {/* Role Selection */}
          <h5 className="mb-3">Select Role</h5>
          <div className="d-flex justify-content-around flex-wrap">
            {roles.map((roleObj, index) => (
              <Card
                key={index}
                className={`mb-3 ${
                  formData.role === roleObj.role ? "border-primary" : ""
                }`}
                style={{ width: "18rem", cursor: "pointer" }}
                onClick={() => handleRoleSelect(roleObj.role)}
              >
                <Card.Body>
                  <Card.Title
                    className={`text-center ${
                      formData.role === roleObj.role ? "text-primary" : ""
                    }`}
                  >
                    {roleObj.role}
                  </Card.Title>
                  <Card.Text>{roleObj.description}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>

          {/* Submit Button */}
          <div className="text-center mt-4">
            <Button variant="primary" type="submit">
              Create Role
            </Button>
          </div>
        </Form>
      </div>

      {/* Edit Role Section */}
      <div>
        <h4>Edit Role</h4>
        <Form onSubmit={handleEditSubmit}>
          {/* Username Field */}
          <Form.Group className="mb-3" controlId="editUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter username to edit"
              value={editData.username}
              onChange={handleEditInputChange}
              required
            />
          </Form.Group>

          {/* Password Field */}
          <Form.Group className="mb-3" controlId="editPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={editData.password}
              onChange={handleEditInputChange}
              required
            />
          </Form.Group>

          {/* Role Selection */}
          <h5 className="mb-3">Select New Role</h5>
          <div className="d-flex justify-content-around flex-wrap">
            {roles.map((roleObj, index) => (
              <Card
                key={index}
                className={`mb-3 ${
                  editData.role === roleObj.role ? "border-primary" : ""
                }`}
                style={{ width: "18rem", cursor: "pointer" }}
                onClick={() => handleEditRoleSelect(roleObj.role)}
              >
                <Card.Body>
                  <Card.Title
                    className={`text-center ${
                      editData.role === roleObj.role ? "text-primary" : ""
                    }`}
                  >
                    {roleObj.role}
                  </Card.Title>
                  <Card.Text>{roleObj.description}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>

          {/* Submit Button */}
          <div className="text-center mt-4">
            <Button variant="success" type="submit">
              Update Role
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddRolePage;
