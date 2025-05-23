import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    setEditableUser(storedUser);
  }, []);

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(editableUser));
    setUser(editableUser);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-gray-700 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-orange-950 to-orange-600 p-6 text-white">
          <h1 className="text-3xl font-bold">
            {isEditing ? "Edit Your Profile" : `Welcome, ${user.firstName}!`}
          </h1>
          {!isEditing && <p className="text-sm opacity-75">Here is your profile information:</p>}
        </div>
        <div className="p-6 space-y-4">
          {isEditing ? (
            <>
              <div className="space-y-2">
                <div>
                  <label className="block text-gray-700 font-medium">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={editableUser.firstName}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={editableUser.lastName}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={editableUser.username}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editableUser.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={editableUser.phone}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
                >
                  Save
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-indigo-100 text-orange-950 flex items-center justify-center rounded-full font-bold text-xl">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-sm text-gray-600">@{user.username}</p>
                </div>
              </div>
              <hr className="border-gray-200" />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Email:</span>
                  <span className="text-gray-500">{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Phone:</span>
                  <span className="text-gray-500">{user.phone}</span>
                </div>
              </div>
              <hr className="border-gray-200" />
              <div className="text-center">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-orange-900 text-white rounded-lg hover:bg-orange-700 transition"
                >
                  Edit Profile
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
