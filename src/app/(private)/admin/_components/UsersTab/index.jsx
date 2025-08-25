// src/app/BackOffice/_components/UsersList.jsx
"use client";

import AccessDenied from "@/components/AccessDenied";
import LoadingScreen from "@/components/LoadingScreen";

export default function UsersList({
  users,
  selectedRoles,
  setSelectedRoles,
  updateUserRole,
  loading,
}) {
  if (loading) {
    return (
      <div className="text-center text-purple-700 dark:text-purple-300">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="overflow-hidden transition-all duration-700 ease-in-out bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <table className="w-full table-auto border-collapse border border-purple-300 dark:border-purple-700 rounded-lg overflow-hidden">
        <thead className="bg-purple-100 dark:bg-purple-900">
          <tr>
            {["Nome", "Username", "Email", "Role", "Ações"].map((th) => (
              <th
                key={th}
                className="border border-purple-300 dark:border-purple-700 p-3 text-left text-purple-900 dark:text-purple-300 font-semibold"
              >
                {th}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-purple-50 dark:hover:bg-purple-800 transition-colors"
            >
              <td className="border border-purple-300 dark:border-purple-700 p-3 text-gray-800 dark:text-gray-200">
                {user.name}
              </td>
              <td className="border border-purple-300 dark:border-purple-700 p-3 text-gray-800 dark:text-gray-200">
                {user.userName}
              </td>
              <td className="border border-purple-300 dark:border-purple-700 p-3 text-gray-800 dark:text-gray-200">
                {user.email}
              </td>
              <td className="border border-purple-300 dark:border-purple-700 p-3 text-gray-800 dark:text-gray-200">
                <select
                  value={selectedRoles[user.id]}
                  onChange={(e) =>
                    setSelectedRoles({
                      ...selectedRoles,
                      [user.id]: e.target.value,
                    })
                  }
                  className="p-2 rounded border border-purple-300 dark:border-purple-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="consumer">Consumer</option>
                  <option value="moderator">Moderator</option>
                  <option value="administrator">Administrator</option>
                </select>
              </td>
              <td className="border border-purple-300 dark:border-purple-700 p-3 space-x-2">
                <button
                  onClick={() => updateUserRole(user.id)}
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                >
                  Atualizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
