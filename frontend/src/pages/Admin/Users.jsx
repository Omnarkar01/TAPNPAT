import { useState, useEffect } from 'react';
import Navbar from '../../components/Shared/Navbar';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import { adminService } from '../../services/adminService';
import { formatDate } from '../../utils/formatters';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [page, selectedRole]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminService.getUsers({
        page,
        limit: 10,
        role: selectedRole || undefined,
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await adminService.updateUserRole(userId, newRole);
      fetchUsers();
    } catch (error) {
      console.error('Failed to update role:', error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-soft-mcm-dark">
      <Navbar title="User Management" />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filter */}
        <div className="mb-6 flex gap-4">
          <select
            value={selectedRole}
            onChange={(e) => {
              setSelectedRole(e.target.value);
              setPage(1);
            }}
            className="bg-soft-mcm-dark border border-soft-mcm-sage/30 rounded-lg py-2 px-4 text-soft-mcm-light focus:outline-none focus:border-soft-mcm-sage"
          >
            <option value="">All Roles</option>
            <option value="driver">Driver</option>
            <option value="customer">Customer</option>
            <option value="merchant">Merchant</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* User Table */}
        <div className="bg-soft-mcm-dark border border-soft-mcm-sage/30 rounded-lg overflow-hidden backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-soft-mcm-dark border-b border-soft-mcm-sage/30">
                <tr>
                  <th className="text-left p-4 text-soft-mcm-light font-semibold">Name</th>
                  <th className="text-left p-4 text-soft-mcm-light font-semibold">Email</th>
                  <th className="text-left p-4 text-soft-mcm-light font-semibold">Phone</th>
                  <th className="text-left p-4 text-soft-mcm-light font-semibold">Role</th>
                  <th className="text-left p-4 text-soft-mcm-light font-semibold">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id} className="border-b border-soft-mcm-sage/20 hover:bg-soft-mcm-dark/50 transition">
                      <td className="p-4 text-soft-mcm-light">{user.name}</td>
                      <td className="p-4 text-soft-mcm-light text-sm">{user.email}</td>
                      <td className="p-4 text-soft-mcm-gray text-sm">{user.phone}</td>
                      <td className="p-4">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          className="bg-soft-mcm-dark border border-soft-mcm-sage/30 rounded py-1 px-2 text-soft-mcm-light text-sm capitalize"
                        >
                          <option value="driver">Driver</option>
                          <option value="customer">Customer</option>
                          <option value="merchant">Merchant</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="p-4 text-soft-mcm-gray text-sm">{formatDate(user.createdAt)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-soft-mcm-gray">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
