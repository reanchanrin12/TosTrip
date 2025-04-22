import React, { useEffect, useState } from "react";
import { FaUsers, FaUserCheck, FaUserTimes } from "react-icons/fa";
import { Link } from "react-router";
import { fetchAllUsers } from "../../services/userService";

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await fetchAllUsers();
        if (data && data.length > 0) {
          setUsers(data);
        } else {
          setUsers([]);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("សូម Login ម្តងទៀត (Token Expired ឬ Unauthorized)");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDisableUser = async (uuid) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${uuid}/disable`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.uuid === uuid ? { ...u, disabled: true } : u
          )
        );
      } else {
        console.error("Failed to disable user");
      }
    } catch (error) {
      console.error("Error disabling user:", error);
    }
  };

  const stats = [
    {
      label: "ចំនួនអ្នកប្រើសរុប",
      value: users.length,
      growth: "+12%",
      icon: <FaUsers className="w-6 h-6 text-blue-500" />,
    },
    {
      label: "អ្នកប្រើសកម្ម",
      value: users.filter((u) => !u.disabled).length,
      growth: "+8%",
      icon: <FaUserCheck className="w-6 h-6 text-green-500" />,
    },
    {
      label: "អ្នកប្រើស្ដី",
      value: users.filter((u) => u.disabled).length,
      growth: "+15%",
      icon: <FaUserTimes className="w-6 h-6 text-red-500" />,
    },
  ];

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-khmer">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl shadow-md flex items-center gap-4">
            <div className="p-3 bg-gray-100 rounded-full">{stat.icon}</div>
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-green-600 text-sm">{stat.growth} កាលពីម្សិលមិញ</p>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="mb-4">
        <Link to="/Login">
          <div className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition-all cursor-pointer">
            ចុះឈ្មោះ
          </div>
        </Link>
      </div> */}

      <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="ស្វែងរក..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-2 rounded-md shadow-sm w-full sm:w-1/3"
          />
        </div>

        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50">
            <tr className="border-b text-gray-600 text-sm">
              <th className="py-3 px-2">អ៊ីមែល</th>
              <th className="px-2">កាលបរិច្ឆេទ</th>
              <th className="px-2">តួនាទី</th>
              <th className="px-2">ស្ថានភាព</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200 last:border-none hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-2 text-sm text-heade">{user.email}</td>
                <td className="px-2 text-sm text-gray-700">
                  {user.createdAt
                    ? new Date(`1970-01-01T${user.createdAt}Z`).toLocaleTimeString()
                    : "-"}
                </td>
                <td className="px-2 text-sm capitalize text-gray-700">user</td>
                <td className="px-2 flex items-center gap-2">
                  <span
                    className={`px-2 mt-3 py-1 text-xs font-medium rounded-full ${
                      user.disabled
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {user.disabled ? "Disable" : "Enable"}
                  </span>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
