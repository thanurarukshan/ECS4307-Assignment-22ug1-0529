"use client";

import { useState, useEffect, use } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { GraduationCap, BookOpen, Plus, Trash2 } from 'lucide-react';

export default function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const [formData, setFormData] = useState({
        courseName: '',
        courseDescription: '',
        courseFee: '',
        category: '',
        courseType: 'free',
        courseThumbnail: '',
        duration: '4 weeks',
        level: 'beginner',
        maxStudents: '50'
    });
    const [modules, setModules] = useState<{ id?: number, title: string, description: string, orderIndex: number }[]>([]);
    const [deletedModuleIds, setDeletedModuleIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCourse();
        fetchModules();
    }, []);

    const fetchCourse = async () => {
        try {
            const res = await api.get(`/courses/${id}`);
            const course = res.data;
            setFormData({
                courseName: course.courseName,
                courseDescription: course.courseDescription || '',
                courseFee: course.courseFee.toString(),
                category: course.category,
                courseType: course.courseType,
                courseThumbnail: course.courseThumbnail || '',
                duration: course.duration,
                level: course.level,
                maxStudents: course.maxStudents.toString()
            });
            setLoading(false);
        } catch (err: any) {
            setError('Failed to load course');
            setLoading(false);
        }
    };

    const fetchModules = async () => {
        try {
            const res = await api.get(`/courses/${id}/modules`);
            setModules(res.data.map((m: any, index: number) => ({
                id: m.id,
                title: m.title,
                description: m.description || '',
                orderIndex: m.orderIndex || index + 1
            })));
        } catch (err) {
            console.error('Failed to load modules');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleModuleChange = (index: number, field: 'title' | 'description', value: string) => {
        const updated = [...modules];
        updated[index][field] = value;
        setModules(updated);
    };

    const addModule = () => {
        setModules([...modules, { title: '', description: '', orderIndex: modules.length + 1 }]);
    };

    const removeModule = (index: number) => {
        const moduleToRemove = modules[index];
        // If module has an ID, mark it for deletion
        if (moduleToRemove.id) {
            setDeletedModuleIds([...deletedModuleIds, moduleToRemove.id]);
        }
        setModules(modules.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Update course details
            await api.put(`/courses/${id}`, formData);

            // Delete removed modules
            for (const moduleId of deletedModuleIds) {
                await api.delete(`/modules/${moduleId}`);
            }

            // Update or create modules
            for (let i = 0; i < modules.length; i++) {
                const module = modules[i];
                if (module.title.trim() === '') continue; // Skip empty modules

                const moduleData = {
                    title: module.title,
                    description: module.description,
                    orderIndex: i + 1
                };

                if (module.id) {
                    // Update existing module
                    await api.put(`/modules/${module.id}`, moduleData);
                } else {
                    // Create new module
                    await api.post(`/courses/${id}/modules`, moduleData);
                }
            }

            router.push('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update course');
        }
    };

    if (loading) return <div className="text-center py-12">Loading...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <GraduationCap className="h-8 w-8 text-blue-600" />
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Edit Course
                        </h1>
                    </div>
                    <p className="text-gray-600">Update your course information and modules</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-600">
                    {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Course Name *</label>
                        <input
                            type="text"
                            name="courseName"
                            required
                            className="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                            value={formData.courseName}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Course Description</label>
                        <textarea
                            name="courseDescription"
                            rows={4}
                            className="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                            value={formData.courseDescription}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                            <input
                                type="text"
                                name="category"
                                required
                                className="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                                value={formData.category}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Course Fee ($) *</label>
                            <input
                                type="number"
                                name="courseFee"
                                required
                                className="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                                value={formData.courseFee}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Course Type *</label>
                            <select
                                name="courseType"
                                className="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                                value={formData.courseType}
                                onChange={handleChange}
                            >
                                <option value="free">Free</option>
                                <option value="paid">Paid</option>
                                <option value="premium">Premium</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty Level *</label>
                            <select
                                name="level"
                                className="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                                value={formData.level}
                                onChange={handleChange}
                            >
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                            <input
                                type="text"
                                name="duration"
                                className="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                                value={formData.duration}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Maximum Students *</label>
                        <input
                            type="number"
                            name="maxStudents"
                            required
                            className="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                            value={formData.maxStudents}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Course Thumbnail URL</label>
                        <input
                            type="text"
                            name="courseThumbnail"
                            className="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                            value={formData.courseThumbnail}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Course Modules Section */}
                    <div className="border-t border-gray-200 pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-blue-600" />
                                <h3 className="text-lg font-semibold text-gray-900">Course Modules</h3>
                            </div>
                            <button
                                type="button"
                                onClick={addModule}
                                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                <Plus className="h-4 w-4" />
                                Add Module
                            </button>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                            Edit existing modules or add new ones. Changes will be saved when you update the course.
                        </p>

                        <div className="space-y-4">
                            {modules.map((module, index) => (
                                <div key={module.id || `new-${index}`} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-semibold text-sm mt-1">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <input
                                                type="text"
                                                placeholder="Module Title"
                                                className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                value={module.title}
                                                onChange={(e) => handleModuleChange(index, 'title', e.target.value)}
                                            />
                                            <textarea
                                                placeholder="Module Description (optional)"
                                                rows={2}
                                                className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                value={module.description}
                                                onChange={(e) => handleModuleChange(index, 'description', e.target.value)}
                                            />
                                            {module.id && (
                                                <p className="text-xs text-gray-500">
                                                    Module ID: {module.id} (existing)
                                                </p>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeModule(index)}
                                            className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-1"
                                            title="Remove module"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {modules.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    No modules yet. Click "Add Module" to create one.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => router.push('/dashboard')}
                            className="px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white hover:from-blue-700 hover:to-purple-700"
                        >
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                Update Course
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
