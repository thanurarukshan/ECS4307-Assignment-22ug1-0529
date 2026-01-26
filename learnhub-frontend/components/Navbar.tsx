"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User, LogOut, Bell, PlusCircle, Settings, Key } from 'lucide-react';
import api from '@/lib/api';

interface Notification {
    id: number;
    type: string;
    message: string;
    isRead: boolean;
    createdAt: string;
    relatedId: number;
}

const Navbar = () => {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        setToken(localStorage.getItem('token'));
        setUsername(localStorage.getItem('username'));
    }, []);

    useEffect(() => {
        if (token) {
            fetchUnreadCount();
            // Poll for new notifications every 30 seconds
            const interval = setInterval(fetchUnreadCount, 30000);
            return () => clearInterval(interval);
        }
    }, [token]);

    const fetchUnreadCount = async () => {
        try {
            const res = await api.get('/notifications/unread-count');
            setUnreadCount(res.data.count);
        } catch (err) {
            console.error('Failed to fetch unread count');
        }
    };

    const fetchNotifications = async () => {
        try {
            const res = await api.get('/notifications');
            setNotifications(res.data.slice(0, 5)); // Show only last 5
        } catch (err) {
            console.error('Failed to fetch notifications');
        }
    };

    const handleNotificationClick = async () => {
        if (!showNotificationDropdown) {
            await fetchNotifications();
        }
        setShowNotificationDropdown(!showNotificationDropdown);
    };

    const markAsRead = async (id: number) => {
        try {
            await api.put(`/notifications/${id}/read`);
            fetchUnreadCount();
            fetchNotifications();
        } catch (err) {
            console.error('Failed to mark notification as read');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        setToken(null);
        setUsername(null);
        setShowProfileDropdown(false);
        router.push('/login');
    };

    const getTimeAgo = (dateString: string) => {
        const seconds = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000);
        if (seconds < 60) return 'just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    };

    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">LearnHub</span>
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link href="/" className="border-transparent text-gray-500 hover:border-blue-300 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Browse Courses
                            </Link>
                            {token && (
                                <Link href="/dashboard" className="border-transparent text-gray-500 hover:border-blue-300 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                    Dashboard
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        {token ? (
                            <div className="flex items-center space-x-4">
                                <Link href="/add-course">
                                    <button className="flex items-center text-sm font-medium text-gray-500 hover:text-blue-700">
                                        <PlusCircle className="mr-1 h-5 w-5" />
                                        Add Course
                                    </button>
                                </Link>

                                {/* Notification Bell */}
                                <div className="relative">
                                    <button
                                        onClick={handleNotificationClick}
                                        className="relative p-2 text-gray-400 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full"
                                    >
                                        <Bell className="h-6 w-6" />
                                        {unreadCount > 0 && (
                                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                                {unreadCount}
                                            </span>
                                        )}
                                    </button>

                                    {showNotificationDropdown && (
                                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 max-h-96 overflow-y-auto">
                                            <div className="py-1">
                                                <div className="px-4 py-2 border-b">
                                                    <h3 className="text-sm font-semibold">Notifications</h3>
                                                </div>
                                                {notifications.length === 0 ? (
                                                    <div className="px-4 py-6 text-center text-sm text-gray-500">
                                                        No notifications
                                                    </div>
                                                ) : (
                                                    notifications.map((notif) => (
                                                        <div
                                                            key={notif.id}
                                                            onClick={() => notif.isRead || markAsRead(notif.id)}
                                                            className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b ${!notif.isRead ? 'bg-indigo-50' : ''
                                                                }`}
                                                        >
                                                            <p className="text-sm text-gray-800">{notif.message}</p>
                                                            <p className="text-xs text-gray-500 mt-1">{getTimeAgo(notif.createdAt)}</p>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Profile Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                        className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <User className="h-5 w-5" />
                                        <span className="text-sm font-medium">{username || 'User'}</span>
                                    </button>

                                    {showProfileDropdown && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                                            <div className="py-1">
                                                <Link
                                                    href="/profile"
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() => setShowProfileDropdown(false)}
                                                >
                                                    <Settings className="mr-3 h-5 w-5 text-gray-400" />
                                                    Profile Settings
                                                </Link>
                                                <Link
                                                    href="/change-password"
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() => setShowProfileDropdown(false)}
                                                >
                                                    <Key className="mr-3 h-5 w-5 text-gray-400" />
                                                    Change Password
                                                </Link>
                                                <hr className="my-1" />
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="space-x-4">
                                <Link href="/login" className="text-gray-500 hover:text-blue-700 font-medium">Login</Link>
                                <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
