import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Search, ShieldAlert, ShieldCheck, ArrowRight, Eye, UserX, UserCheck } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { Card, Button, Input, Select, Badge, Loader, EmptyState } from '../../components/common';

export function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await adminService.getUsers({ search, status: statusFilter });
      if (res.success && res.data.users) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, statusFilter]);

  const handleToggleStatus = async (userId, currentStatus) => {
    const nextStatus = currentStatus === 'active' ? 'suspended' : 'active';
    if (!window.confirm(`Are you sure you want to change this user status to ${nextStatus}?`)) return;

    setActionLoading(true);
    try {
      await adminService.updateUserStatus(userId, nextStatus);
      await fetchUsers();
    } catch (error) {
      alert('Error updating status: ' + (error.response?.data?.message || error.message));
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <Users className="w-6 h-6 text-purple-600" />
          Client User Directory
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Inspect client profiles, oversee account verification, and manage access authorizations.
        </p>
      </div>

      {/* Filter bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="w-full sm:w-80">
          <Input
            icon={Search}
            placeholder="Search by name, email, company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-44"
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="pending">Pending</option>
        </Select>
      </div>

      {/* Users Table */}
      {loading ? (
        <Loader text="Loading client directory..." />
      ) : users.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No users found"
          description="No client accounts match your query."
        />
      ) : (
        <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3.5 px-4">User / Name</th>
                  <th className="py-3.5 px-4">Company & Country</th>
                  <th className="py-3.5 px-4 text-center">Projects</th>
                  <th className="py-3.5 px-4 text-right">Total Invested</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-slate-100">{u.name}</p>
                          <p className="text-[11px] text-slate-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-medium text-slate-800 dark:text-slate-200">{u.company_name || 'Individual Client'}</p>
                      <p className="text-[11px] text-slate-400">{u.country_name || 'Global'}</p>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-800 dark:text-slate-200">
                      {u.total_projects || 0}
                    </td>
                    <td className="py-3.5 px-4 text-right font-extrabold text-slate-900 dark:text-slate-100">
                      ${Number(u.total_spent || 0).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={u.status === 'active' ? 'success' : 'danger'} size="sm">
                        {u.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/admin/users/${u.id}`}>
                          <Button size="sm" variant="outline" icon={Eye}>
                            View
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant={u.status === 'active' ? 'danger' : 'success'}
                          onClick={() => handleToggleStatus(u.id, u.status)}
                          isLoading={actionLoading}
                        >
                          {u.status === 'active' ? 'Suspend' : 'Activate'}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
