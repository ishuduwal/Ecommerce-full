import React, { useState, useEffect } from 'react';
import { GetUser, DeleteUser } from '../function/User';

export const UserList = () => {
    const [users, setUsers] = useState([]); // Ensure it's initialized as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch users from the API
    const fetchUsers = async () => {
        try {
            const fetchedUsers = await GetUser();
            setUsers(fetchedUsers || []); // Ensure users is an array
            setLoading(false);
        } catch (error) {
            setError("Failed to fetch users");
            setLoading(false);
            console.error(error);
        }
    };

    // Function to handle user deletion
    const handleDelete = async (id) => {
        try {
            await DeleteUser(id);
            setUsers(users.filter((user) => user._id !== id)); // Update the users state after deletion
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-5 bg-white rounded-lg shadow max-lg:flex justify-center items-center flex-col">
            <h2 className="text-2xl font-bold mb-5">Users List</h2>
            <div className="hidden lg:block">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">First Name</th>
                            <th className="py-2 px-4 border-b">Last Name</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(users) && users.map((user, index) => (
                            <tr key={user._id} className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                                <td className="py-2 px-4 border-b text-center">{user.firstname}</td>
                                <td className="py-2 px-4 border-b text-center">{user.lastname}</td>
                                <td className="py-2 px-4 border-b text-center">{user.email}</td>
                                <td className="py-2 px-4 border-b text-center">
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="block lg:hidden max-lg:flex justify-center flex-col items-center">
                {Array.isArray(users) && users.map((user, index) => (
                    <div key={user._id} className={`bg-white p-4 mb-4 rounded-lg shadow ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                        <div className="flex justify-between items-center">
                            <div className="text-right">
                                <div className="text-lg font-bold">{user.firstname} {user.lastname}</div>
                                <div className="text-sm">{user.email}</div>
                            </div>
                        </div>
                        <div className="mt-2 text-center space-x-2">
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                                onClick={() => handleDelete(user._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
