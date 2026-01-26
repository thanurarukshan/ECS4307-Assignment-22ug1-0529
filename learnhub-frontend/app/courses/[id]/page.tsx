"use client";

import { useEffect, useState, use } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Tag, User, Clock, Users, Award, BookOpen, CheckCircle, GraduationCap, Check } from 'lucide-react';

export default function CourseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [course, setCourse] = useState<any>(null);
    const [modules, setModules] = useState<any[]>([]);
    const [enrollments, setEnrollments] = useState([]);
    const [paymentAmount, setPaymentAmount] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [myEnrollment, setMyEnrollment] = useState<any>(null);
    const [moduleProgress, setModuleProgress] = useState<{ [key: number]: boolean }>({});

    // Unwrap params using React.use()
    const { id } = use(params);

    useEffect(() => {
        setCurrentUserId(localStorage.getItem('id'));
        if (id) {
            fetchCourse(id);
        }
    }, [id]);

    const fetchCourse = async (id: string) => {
        try {
            const res = await api.get(`/courses/${id}`);
            setCourse(res.data);
            setPaymentAmount(res.data.courseFee.toString());
            if (res.data.instructorId === Number(localStorage.getItem('id'))) {
                fetchEnrollments(id);
            }
            // Fetch modules for all users (public)
            await fetchModules(id);
            // Check if user is enrolled
            await fetchMyEnrollment(id);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchModules = async (courseId: string) => {
        try {
            const res = await api.get(`/courses/${courseId}/modules`);
            setModules(res.data);
        } catch (err) {
            console.error('Error fetching modules:', err);
        }
    };

    const fetchMyEnrollment = async (courseId: string) => {
        try {
            const res = await api.get('/enrollments/my-enrollments');
            const enrollment = res.data.find((e: any) => e.courseId === parseInt(courseId));
            if (enrollment && enrollment.enrollmentStatus === 'enrolled') {
                setMyEnrollment(enrollment);
                // Fetch module progress
                fetchModuleProgress(enrollment.id);
            }
        } catch (err) {
            console.error('Error fetching enrollment:', err);
        }
    };

    const fetchModuleProgress = async (enrollmentId: number) => {
        try {
            const res = await api.get(`/enrollments/${enrollmentId}/progress`);
            const progressMap: { [key: number]: boolean } = {};
            res.data.forEach((p: any) => {
                progressMap[p.moduleId] = p.completed;
            });
            setModuleProgress(progressMap);
        } catch (err) {
            console.error('Error fetching module progress:', err);
        }
    };

    const handleModuleToggle = async (moduleId: number, currentStatus: boolean) => {
        if (!myEnrollment) return;

        try {
            await api.post(`/enrollments/${myEnrollment.id}/modules/${moduleId}/complete`, {
                completed: !currentStatus
            });

            // Update local state
            setModuleProgress(prev => ({
                ...prev,
                [moduleId]: !currentStatus
            }));

            // Refresh enrollment to get updated progress
            await fetchMyEnrollment(id);
        } catch (err) {
            console.error('Error updating module progress:', err);
        }
    };

    const fetchEnrollments = async (id: string) => {
        try {
            const res = await api.get(`/enrollments/course/${id}`);
            setEnrollments(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    const handleRequestEnrollment = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await api.post('/enrollments', { courseId: course.id, paymentAmount: paymentAmount });
            setSuccess('Enrollment request submitted successfully! The instructor will review your request.');
            setPaymentAmount('');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to request enrollment');
        }
    }

    const getLevelColor = (level: string) => {
        switch (level?.toLowerCase()) {
            case 'beginner':
                return 'bg-green-100 text-green-800';
            case 'intermediate':
                return 'bg-yellow-100 text-yellow-800';
            case 'advanced':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (!course) return <div className="text-center py-12">Loading...</div>;

    const isInstructor = currentUserId && Number(currentUserId) === course.instructorId;
    const isEnrolled = myEnrollment && myEnrollment.enrollmentStatus === 'enrolled';
    const completedModulesCount = Object.values(moduleProgress).filter(Boolean).length;
    const progressPercent = modules.length > 0 ? Math.round((completedModulesCount / modules.length) * 100) : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white shadow-lg overflow-hidden rounded-2xl">
                    <div className="relative h-64 sm:h-96 bg-gradient-to-br from-blue-100 to-purple-100">
                        {course.courseThumbnail ? (
                            <img src={course.courseThumbnail} alt={course.courseName} className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex items-center justify-center h-full text-blue-400">
                                <GraduationCap className="h-24 w-24" />
                            </div>
                        )}
                        <div className="absolute top-4 right-4">
                            <span className={`${getLevelColor(course.level)} px-4 py-2 rounded-full text-sm font-semibold shadow-lg`}>
                                {course.level}
                            </span>
                        </div>
                    </div>
                    <div className="px-6 py-6 sm:px-8">
                        <h1 className="text-3xl leading-tight font-bold text-gray-900">{course.courseName}</h1>
                        <div className="mt-4 flex flex-wrap gap-4 items-center text-sm text-gray-600">
                            <p className="flex items-center">
                                <Tag className="h-4 w-4 mr-1 text-blue-600" /> {course.category}
                            </p>
                            <p className="flex items-center">
                                <Clock className="h-4 w-4 mr-1 text-blue-600" /> {course.duration}
                            </p>
                            <p className="flex items-center">                                <Users className="h-4 w-4 mr-1 text-blue-600" /> {course.enrolledStudents}/{course.maxStudents} Students
                            </p>
                        </div>
                        <div className="mt-4">
                            {course.courseFee > 0 ? (
                                <p className="text-3xl font-bold text-blue-600">
                                    ${Number(course.courseFee).toLocaleString()}
                                    <span className="text-sm font-normal text-gray-500 ml-2">Course Fee</span>
                                </p>
                            ) : (
                                <p className="text-3xl font-bold text-green-600">FREE COURSE</p>
                            )}
                        </div>
                    </div>
                    <div className="border-t border-gray-200 px-6 py-6 sm:px-8">
                        <dl className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <dt className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Course Description</dt>
                                <dd className="mt-2 text-base text-gray-900">{course.courseDescription}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Instructor</dt>
                                <dd className="mt-2 text-base text-gray-900 flex items-center">
                                    <User className="h-5 w-5 mr-2 text-blue-600" /> {course.instructor?.username}
                                </dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Course Type</dt>
                                <dd className="mt-2">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 uppercase">
                                        {course.courseType}
                                    </span>
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* Course Modules Section */}
                    {modules.length > 0 && (
                        <div className="border-t border-gray-200 px-6 py-6 sm:px-8">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <BookOpen className="h-6 w-6 text-blue-600" />
                                    <h3 className="text-xl font-bold text-gray-900">Course Content</h3>
                                </div>
                                {isEnrolled && (
                                    <div className="text-sm font-semibold text-blue-600">
                                        {completedModulesCount}/{modules.length} completed ({progressPercent}%)
                                    </div>
                                )}
                            </div>

                            {isEnrolled && progressPercent === 100 && (
                                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                                    <Award className="h-8 w-8 text-green-600" />
                                    <div>
                                        <p className="font-bold text-green-800 text-lg">🎉 Course Completed!</p>
                                        <p className="text-sm text-green-700">Congratulations! You've finished all modules.</p>
                                    </div>
                                </div>
                            )}

                            <p className="text-sm text-gray-600 mb-4">{modules.length} modules in this course</p>

                            {!isEnrolled && !isInstructor && (
                                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                    <p className="text-sm text-blue-800">
                                        <strong>ℹ️ Preview:</strong> Enroll in this course to track your progress and mark modules as complete.
                                    </p>
                                </div>
                            )}

                            <div className="space-y-3">
                                {modules.map((module, index) => {
                                    const isComplete = moduleProgress[module.id] || false;
                                    return (
                                        <div
                                            key={module.id}
                                            className={`flex items-start gap-3 p-4 rounded-lg transition-all ${isComplete
                                                    ? 'bg-green-50 border-2 border-green-300'
                                                    : 'bg-blue-50 hover:bg-blue-100 border-2 border-transparent'
                                                }`}
                                        >
                                            {isEnrolled ? (
                                                <button
                                                    onClick={() => handleModuleToggle(module.id, isComplete)}
                                                    className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all ${isComplete
                                                            ? 'bg-green-600 text-white'
                                                            : 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                                                        }`}
                                                >
                                                    {isComplete ? <Check className="h-5 w-5" /> : <span className="text-sm font-semibold">{index + 1}</span>}
                                                </button>
                                            ) : (
                                                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-semibold text-sm">
                                                    {index + 1}
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <h4 className={`font-semibold ${isComplete ? 'text-green-900 line-through' : 'text-gray-900'}`}>
                                                    {module.title}
                                                </h4>
                                                {module.description && (
                                                    <p className={`text-sm mt-1 ${isComplete ? 'text-green-700' : 'text-gray-600'}`}>
                                                        {module.description}
                                                    </p>
                                                )}
                                            </div>
                                            {isComplete && (
                                                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Enrollment Section */}
                <div className="mt-8">
                    {isInstructor ? (
                        <div className="bg-white shadow-lg rounded-2xl">
                            <div className="px-6 py-5 sm:px-8 border-b border-gray-200">
                                <h3 className="text-xl leading-6 font-bold text-gray-900">Enrollment Requests</h3>
                            </div>
                            <ul className="divide-y divide-gray-200">
                                {enrollments.map((enrollment: any) => (
                                    <li key={enrollment.id} className="px-6 py-4 sm:px-8 flex justify-between items-center hover:bg-gray-50">
                                        <div>
                                            <p className="text-sm font-medium text-blue-600">
                                                {enrollment.student?.username}
                                            </p>
                                            <p className="text-xs text-gray-500">Payment: ${Number(enrollment.paymentAmount).toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${enrollment.enrollmentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                enrollment.enrollmentStatus === 'enrolled' ? 'bg-green-100 text-green-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                {enrollment.enrollmentStatus}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                                {enrollments.length === 0 && <li className="px-6 py-8 text-center text-gray-500">No enrollment requests yet.</li>}
                            </ul>
                        </div>
                    ) : (
                        currentUserId && !isEnrolled && (
                            <div className="bg-white shadow-lg rounded-2xl p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <Award className="h-6 w-6 text-blue-600" />
                                    <h3 className="text-xl leading-6 font-bold text-gray-900">Enroll in this Course</h3>
                                </div>
                                <form onSubmit={handleRequestEnrollment} className="flex flex-col sm:flex-row gap-4">
                                    <input
                                        type="number"
                                        required
                                        placeholder="Payment amount"
                                        className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={paymentAmount}
                                        onChange={(e) => setPaymentAmount(e.target.value)}
                                    />
                                    <button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 font-semibold shadow-md hover:shadow-lg transition-all duration-200">
                                        Request Enrollment
                                    </button>
                                </form>
                                {success && <p className="mt-4 text-green-600 text-sm flex items-center"><CheckCircle className="h-5 w-5 mr-2" />{success}</p>}
                                {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}
                            </div>
                        )
                    )}
                    {!currentUserId && (
                        <div className="mt-8 text-center bg-white rounded-2xl p-8 shadow-lg">
                            <BookOpen className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                            <p className="text-gray-700 mb-4">Please login to enroll in this course</p>
                            <Link href="/login" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
                                Login to Enroll
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
