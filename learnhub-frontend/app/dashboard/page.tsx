"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import CourseCard from '@/components/CourseCard';
import Link from 'next/link';
import { Check, X, GraduationCap, BookOpen, User, Award, Edit, Trash2, AlertCircle } from 'lucide-react';

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('courses');
    const [myCourses, setMyCourses] = useState([]);
    const [myEnrollments, setMyEnrollments] = useState([]);
    const [courseEnrollments, setCourseEnrollments] = useState<{ [key: number]: any[] }>({});
    const [userId, setUserId] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string>('student');

    useEffect(() => {
        const id = localStorage.getItem('id');
        const role = localStorage.getItem('role') || 'student';
        setUserId(id);
        setUserRole(role);

        if (id) {
            fetchMyCourses(id);
            fetchMyEnrollments();
        }
    }, []);

    // Refresh enrollments when tab changes or component focuses
    useEffect(() => {
        if (activeTab === 'enrollments' && userId) {
            fetchMyEnrollments();
        }
    }, [activeTab]);

    // Refresh data when window regains focus (user returns from course page)
    useEffect(() => {
        const handleFocus = () => {
            if (userId) {
                fetchMyEnrollments();
                if (activeTab === 'courses') {
                    fetchMyCourses(userId);
                }
            }
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, [userId, activeTab]);

    const fetchMyCourses = async (id: string) => {
        try {
            const res = await api.get(`/courses?instructorId=${id}`);
            setMyCourses(res.data);
            // Fetch enrollments for each course
            res.data.forEach(async (course: any) => {
                const enrollmentsRes = await api.get(`/enrollments/course/${course.id}`);
                setCourseEnrollments(prev => ({ ...prev, [course.id]: enrollmentsRes.data }));
            });
        } catch (err) {
            console.error(err);
        }
    };

    const fetchMyEnrollments = async () => {
        try {
            const res = await api.get('/enrollments/my-enrollments');
            // Ensure we have the latest enrollment data with progress
            setMyEnrollments(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleApproveEnrollment = async (enrollmentId: number, courseId: number) => {
        try {
            await api.put(`/enrollments/${enrollmentId}/approve`);
            const enrollmentsRes = await api.get(`/enrollments/course/${courseId}`);
            setCourseEnrollments(prev => ({ ...prev, [courseId]: enrollmentsRes.data }));
            if (userId) fetchMyCourses(userId);
        } catch (err) {
            console.error('Failed to approve enrollment');
        }
    };

    const handleRejectEnrollment = async (enrollmentId: number, courseId: number) => {
        try {
            await api.put(`/enrollments/${enrollmentId}/reject`);
            const enrollmentsRes = await api.get(`/enrollments/course/${courseId}`);
            setCourseEnrollments(prev => ({ ...prev, [courseId]: enrollmentsRes.data }));
        } catch (err) {
            console.error('Failed to reject enrollment');
        }
    };

    const handleDeleteCourse = async (courseId: number) => {
        if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
            return;
        }
        try {
            await api.delete(`/courses/${courseId}`);
            if (userId) fetchMyCourses(userId);
        } catch (err) {
            console.error('Failed to delete course');
            alert('Failed to delete course');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <GraduationCap className="h-8 w-8 text-blue-600" />
                        <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
                    </div>
                    <p className="text-gray-600">Manage your courses and enrollments</p>
                </div>

                {/* Tabs */}
                <div className="mb-6 border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('courses')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'courses'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5" />
                                <span>My Courses</span>
                                <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs font-semibold">
                                    {myCourses.length}
                                </span>
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('enrollments')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'enrollments'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <Award className="h-5 w-5" />
                                <span>Enrollments</span>
                                <span className="ml-2 bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full text-xs font-semibold">
                                    {myEnrollments.length}
                                </span>
                            </div>
                        </button>
                    </nav>
                </div>

                {/* My Courses Tab - Shows courses created by user */}
                {activeTab === 'courses' && (
                    <div>
                        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-800">
                                <strong>📚 My Courses:</strong> Courses you created as an instructor. Manage your content and view enrollment requests from students.
                            </p>
                        </div>

                        {myCourses.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-lg shadow">
                                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 mb-4">You haven't created any courses yet</p>
                                <Link
                                    href="/add-course"
                                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
                                >
                                    Create Your First Course
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {myCourses.map((course: any) => (
                                    <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                        {/* Course Header */}
                                        <div className="p-6 border-b border-gray-200">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{course.courseName}</h3>
                                                    <p className="text-gray-600 text-sm mb-3">{course.courseDescription}</p>
                                                    <div className="flex flex-wrap gap-4 text-sm">
                                                        <span className="text-gray-600">
                                                            👥 <strong>{course.enrolledStudents}/{course.maxStudents}</strong> students
                                                        </span>
                                                        <span className="text-gray-600">
                                                            📂 <strong>{course.category}</strong>
                                                        </span>
                                                        <span className="text-gray-600">
                                                            💰 <strong>${course.courseFee}</strong>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 ml-4">
                                                    <Link
                                                        href={`/edit-course/${course.id}`}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit course"
                                                    >
                                                        <Edit className="h-5 w-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteCourse(course.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete course"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Enrollment Requests */}
                                        <div className="p-6">
                                            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                <User className="h-5 w-5 text-blue-600" />
                                                Enrollment Requests
                                            </h4>
                                            {courseEnrollments[course.id]?.filter((e: any) => e.enrollmentStatus === 'pending').length > 0 ? (
                                                <div className="space-y-3">
                                                    {courseEnrollments[course.id]
                                                        .filter((e: any) => e.enrollmentStatus === 'pending')
                                                        .map((enrollment: any) => (
                                                            <div
                                                                key={enrollment.id}
                                                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                                            >
                                                                <div>
                                                                    <p className="font-medium text-gray-900">{enrollment.student?.username}</p>
                                                                    <p className="text-sm text-gray-600">Payment: ${enrollment.paymentAmount}</p>
                                                                    <p className="text-xs text-gray-500">
                                                                        {new Date(enrollment.createdAt).toLocaleDateString()}
                                                                    </p>
                                                                </div>
                                                                <div className="flex gap-2">
                                                                    <button
                                                                        onClick={() => handleApproveEnrollment(enrollment.id, course.id)}
                                                                        className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                                                                    >
                                                                        <Check className="h-4 w-4" />
                                                                        Approve
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleRejectEnrollment(enrollment.id, course.id)}
                                                                        className="flex items-center gap-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                                                                    >
                                                                        <X className="h-4 w-4" />
                                                                        Reject
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                </div>
                                            ) : (
                                                <p className="text-gray-500 text-sm">No pending enrollment requests</p>
                                            )}
                                        </div>

                                        {/* Enrolled Students */}
                                        {courseEnrollments[course.id]?.filter((e: any) => e.enrollmentStatus === 'enrolled').length > 0 && (
                                            <div className="px-6 pb-6">
                                                <h4 className="font-semibold text-gray-700 mb-3 text-sm">Enrolled Students</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {courseEnrollments[course.id]
                                                        .filter((e: any) => e.enrollmentStatus === 'enrolled')
                                                        .map((enrollment: any) => (
                                                            <div
                                                                key={enrollment.id}
                                                                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium"
                                                            >
                                                                {enrollment.student?.username} ({enrollment.progressPercent || 0}%)
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Enrollments Tab - Shows courses user enrolled in */}
                {activeTab === 'enrollments' && (
                    <div>
                        <div className="mb-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <p className="text-sm text-purple-800">
                                <strong>🎓 Enrollments:</strong> Courses you've enrolled in as a student. Track your learning progress and access course materials.
                            </p>
                        </div>

                        {myEnrollments.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-lg shadow">
                                <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet</p>
                                <Link
                                    href="/"
                                    className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-semibold transition-colors"
                                >
                                    Browse Courses
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {myEnrollments.map((enrollment: any) => (
                                    <div key={enrollment.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                        <Link href={`/courses/${enrollment.course.id}`}>
                                            <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                                                {enrollment.course.courseThumbnail ? (
                                                    <img
                                                        src={enrollment.course.courseThumbnail}
                                                        alt={enrollment.course.courseName}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full">
                                                        <BookOpen className="h-16 w-16 text-blue-400" />
                                                    </div>
                                                )}
                                                {/* Status Badge */}
                                                <div className="absolute top-3 right-3">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${enrollment.enrollmentStatus === 'enrolled'
                                                            ? 'bg-green-100 text-green-800'
                                                            : enrollment.enrollmentStatus === 'pending'
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : 'bg-red-100 text-red-800'
                                                            }`}
                                                    >
                                                        {enrollment.enrollmentStatus}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-5">
                                                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                                                    {enrollment.course.courseName}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-3">
                                                    Instructor: {enrollment.course.instructor?.username}
                                                </p>

                                                {/* Progress for enrolled students */}
                                                {enrollment.enrollmentStatus === 'enrolled' && (
                                                    <div className="mb-3">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="text-xs font-medium text-gray-700">Progress</span>
                                                            <span className="text-xs font-semibold text-blue-600">
                                                                {enrollment.progressPercent || 0}%
                                                            </span>
                                                        </div>
                                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                                                                style={{ width: `${enrollment.progressPercent || 0}%` }}
                                                            ></div>
                                                        </div>
                                                        {enrollment.progressPercent === 100 && (
                                                            <div className="mt-2 flex items-center gap-1 text-green-600 text-xs font-semibold">
                                                                <Award className="h-4 w-4" />
                                                                Course Completed!
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-between text-xs text-gray-500">
                                                    <span>Enrolled: {new Date(enrollment.createdAt).toLocaleDateString()}</span>
                                                    {enrollment.enrollmentStatus === 'pending' && (
                                                        <span className="text-yellow-600 flex items-center gap-1">
                                                            <AlertCircle className="h-3 w-3" />
                                                            Awaiting approval
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
