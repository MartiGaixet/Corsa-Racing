import React, { useEffect, useState } from "react";
import axios from "axios";
import Pencil from "../assets/editPencil.png";
import Casco from "../assets/cascoPerfil.png";

function ProfileWidget({ show, onClose }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); 
  const [editableUser, setEditableUser] = useState({ name: "", country: "" });
  const [editingField, setEditingField] = useState(null); 

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) {
        console.error("No user ID found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://localhost:7033/api/UsersApi/${userId}`);
        setUser(response.data);
        setEditableUser({ name: response.data.name, country: response.data.country });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (show) {
      fetchUserProfile();
    }
  }, [show, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    try {
      await axios.put(`https://localhost:7033/api/UsersApi/${userId}`, {
        ...user,
        name: editableUser.name,
        country: editableUser.country,
      });
      setUser((prev) => ({ ...prev, ...editableUser }));
      setEditingField(null);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (!show) return null;

  return (
    <div className={`profile-widget ${show ? "show" : ""}`}>
      <div className="profile-content">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h3 className="profile-title">My Profile</h3>
        
        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <>
            <img src={Casco} width="120" height="auto" className="profile-image" alt="Profile Icon" />

            {/* Nombre en negrita debajo del casco */}
            <div className="editable-name">
              {editingField === "name" ? (
                <input 
                  type="text" 
                  name="name" 
                  value={editableUser.name} 
                  onChange={handleChange} 
                  onBlur={() => setEditingField(null)}
                  autoFocus
                  className="profile-input"
                />
              ) : (
                <span onClick={() => setEditingField("name")} className="name-text">
                  {editableUser.name}
                </span>
              )}
              <img src={Pencil} className="edit-icon" onClick={() => setEditingField("name")} />
            </div>

            <div className="profile-info">
              <label>Email</label>
              <p>{user.email}</p>
            </div>

            <div className="profile-info">
              <label>Country</label>
              <div className="editable-field">
                {editingField === "country" ? (
                  <input 
                    type="text" 
                    name="country" 
                    value={editableUser.country} 
                    onChange={handleChange} 
                    onBlur={() => setEditingField(null)}
                    autoFocus
                    className="profile-input"
                  />
                ) : (
                  <span onClick={() => setEditingField("country")}>{editableUser.country}</span>
                )}
                <img src={Pencil} className="edit-icon" onClick={() => setEditingField("country")} />
              </div>
            </div>

            <button 
              className="botonLogin mt-5" 
              onClick={handleSaveChanges} 
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </>
        ) : (
          <p>User not found.</p>
        )}
      </div>
    </div>
  );
}

export default ProfileWidget;
