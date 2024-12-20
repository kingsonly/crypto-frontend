import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function ProfileTab() {
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Change password form states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const baseUrl = import.meta.env.VITE_API_URL;
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [token, setToken] = useState<string>("");
  // State to hold user data
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    id: "",
  });

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserData({
        name: storedUser.name || "",
        username: storedUser.username || "",
        email: storedUser.email || "",
        id: storedUser.id || "",
      });
    }

    const getToken: any = JSON.parse(localStorage.getItem("user") || "{}");
    if (getToken && getToken.token) {
      setToken(getToken.token)
      setIsAdmin(getToken.is_admin || false); // Assuming `is_admin` is a boolean property
    }
  }, []);

  // Handle password change
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    // Validate inputs
    if (!currentPassword || !newPassword) {
      setMessage("Both fields are required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = JSON.parse(localStorage.getItem("user") || "{}").token;
      if (!token) {
        setMessage("You are not authenticated. Please log in.");
        return;
      }

      const response = await axios.post(
        `${baseUrl}/user/update/${userData.id}`, // Replace with your endpoint
        { password:
         "Password" // Send currentPassword and newPassword to the backend
          
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        setMessage("Password changed successfully!");
        setIsModalOpen(false);
      } else {
        setMessage(response.data.message || "Failed to change password.");
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
    {!isAdmin && (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
          Profile
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Personal Information */}
          <Card className="bg-gray-800 border-gray-700 md:col-span-2 text-white">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name:</Label>
                    <Input
                      id="fullName"
                      value={userData.name}
                      className="bg-gray-700 border-gray-600"
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userName">UserName:</Label>
                    <Input
                      id="userName"
                      value={userData.username}
                      className="bg-gray-700 border-gray-600"
                      disabled
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email:</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    className="bg-gray-700 border-gray-600"
                    disabled
                  />
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Account Security */}
          <Card className="bg-gray-800 border-gray-700 text-white">
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Change Password</span>
                <Button size="sm" onClick={() => setIsModalOpen(true)}>
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md text-white space-y-4">
              <h3 className="text-xl font-semibold">Change Password</h3>
              <form className="space-y-4" onSubmit={handlePasswordChange}>
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password:</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="bg-gray-700 border-gray-600"
                    placeholder="Enter current password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password:</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-gray-700 border-gray-600"
                    placeholder="Enter new password"
                  />
                </div>
                {message && <p className="text-sm text-red-500">{message}</p>}
                <div className="flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-600 hover:bg-gray-500"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-teal-500 hover:bg-teal-400"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Update"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    )}
    </div>
  );
}