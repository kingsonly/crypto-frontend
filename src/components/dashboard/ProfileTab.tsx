import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProfileTab() {
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Change password form states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [users, setUsers] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const baseUrl = import.meta.env.VITE_API_URL;
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [token, setToken] = useState<string>("");
  const navigate = useNavigate();
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

    getUsers();

  
  }, []);

  const nextCategory = () => {
    localStorage.removeItem("user"); // Clear user data
  navigate("/login"); // Redirect to the login page (or your desired route)
  };

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


  const getUsers = async () => {
    let getToken:any = JSON.parse(localStorage.getItem('user'))
    await axios.post(`${ baseUrl }/user`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken.token}`, // Include Bearer token in headers
          'Content-Type': 'application/json', // Optional, specify content type
        },
      }
    ).then((response) => {
      // console.log(response.data)
      if(response.data.status ==='success') {
        setUsers(response.data.data)
        console.log('allUsers',response.data.data)
      }
      console.log("allDeposit:", response.data);
    }).catch((error) => {
       console.log(error);
       console.error("Error fetching deposits:", error);
    }
    ) 
  };

  const convertToDateFormat = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }

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
              <div>
           <Button
             onClick={() => setShowModal(true)}
            >
               Logout
          </Button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-medium text-gray-800">
              Are you sure you want to logout?
            </p>
            <div className="mt-6 flex justify-around">
              <button
                className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
                onClick={nextCategory}
              >
                Yes
              </button>
              <button
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
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

    {isAdmin && (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
          All Users
        </h2>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle style={{color: 'white'}}>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400">
                  <th className="pb-4">SN</th>
                  <th className="pb-4">Name</th>
                  <th className="pb-4">Username</th>
                  <th className="pb-4">Email</th>
                  <th className="pb-4">Phone</th>
                  <th className="pb-4">Role</th>
                  {/* <th className="pb-4">Date</th> */}
                </tr>
              </thead>
              <tbody>
                {users.map((user,i) => <tr key={user.id} className="border-t border-gray-700">
                  <td className="py-4 text-white">{i+1}</td>
                  <td className="py-4 text-white">{user.name != null ? user.name : "NULL"}</td>
                  <td className="py-4 text-white">{user.username != null ? user.username : "NULL"}</td>
                  <td className="py-4 text-white">{user.email != null ? user.email : "NULL"}</td>
                  <td className="py-4 text-white">{user.phone != null ? user.phone : "NULL"}</td>
                  <td className="py-4 text-white">
                    <span className={`px-2 py-1 rounded-full text-xs ${user.is_admin === 1 ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'
                      }`}>
                        {user.is_admin === 1 ? 'Admin' : 'User'}
                      
                    </span>
                  </td>
                  {/* <td className="py-4 text-white">{user != null ? convertToDateFormat(tx.withdrawal.created_at) : "NULL"}</td> */}
                </tr>
                )}
              </tbody>
            
              </table>
              
            </CardContent>
        </Card>
      </div>
    )}
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

    