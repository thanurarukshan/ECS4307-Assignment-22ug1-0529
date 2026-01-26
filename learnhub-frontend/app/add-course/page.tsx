"use client";

import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { GraduationCap, BookOpen, Plus, Trash2, GripVertical } from 'lucide-react';

export default function AddCoursePage() {
    const router = useRouter();
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
    const [modules, setModules] = useState<{ title: string, description: string }[]>([
        { title: '', description: '' }
    ]);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleModuleChange = (index: number, field: 'title' | 'description', value: string) => {
        const updated = [...modules];
        updated[index][field] = value;
        setModules(updated);
    };

    const addModule = () => {
        setModules([...modules, { title: '', description: '' }]);
    };

    const removeModule = (index: number) => {
        if (modules.length > 1) {
            setModules(modules.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Create course first
            const courseRes = await api.post('/courses', formData);
            const courseId = courseRes.data.id;

            // Then create modules if any have titles
            const validModules = modules.filter(m => m.title.trim() !== '');
            if (validModules.length > 0) {
                for (let i = 0; i < validModules.length; i++) {
                    await api.post(`/courses/${courseId}/modules`, {
                        title: validModules[i].title,
                        description: validModules[i].description,
                        orderIndex: i + 1
                    });
                }
            }

            router.push('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create course');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <GraduationCap className="h-8 w-8 text-blue-600" />
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Create a New Course
                        </h1>
                    </div>
                    <p className="text-gray-600">Share your knowledge and help students learn</p>
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
                            placeholder="e.g., Introduction to Web Development"
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
                            placeholder="Describe what students will learn in this course..."
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
                                placeholder="e.g., Web Development, Data Science"
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
                                placeholder="0 for free course"
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
                                placeholder="e.g., 4 weeks, 2 months"
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
                            placeholder="50"
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
                            placeholder="https://example.com/course-image.jpg"
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
                            Add modules to structure your course content. Students will be able to track their progress through these modules.
                        </p>

                        <div className="space-y-4">
                            {modules.map((module, index) => (
                                <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-semibold text-sm mt-1">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <input
                                                type="text"
                                                placeholder="Module Title (e.g., Introduction, Getting Started)"
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
                                        </div>
                                        {modules.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeModule(index)}
                                                className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-1"
                                                title="Remove module"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                        >
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                Create Course
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
