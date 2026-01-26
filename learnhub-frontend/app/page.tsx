"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import CourseCard from '@/components/CourseCard';
import { Search, GraduationCap } from 'lucide-react';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    courseType: '',
    level: '',
    search: ''
  });

  const fetchCourses = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.courseType) params.append('courseType', filters.courseType);
      if (filters.level) params.append('level', filters.level);
      if (filters.search) params.append('search', filters.search);

      const res = await api.get(`/courses?${params.toString()}`);
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCourses();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero / Search Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-t-4 border-blue-600">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Discover Your Next Course
            </h1>
          </div>
          <p className="text-gray-600 mb-6">Explore thousands of courses and start learning today</p>

          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <input
              type="text"
              name="search"
              placeholder="Search courses..."
              className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.search}
              onChange={handleChange}
            />
            <input
              type="text"
              name="category"
              placeholder="Category (e.g., Web Development)"
              className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.category}
              onChange={handleChange}
            />
            <select
              name="level"
              className="border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.level}
              onChange={handleChange}
            >
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <select
              name="courseType"
              className="border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.courseType}
              onChange={handleChange}
            >
              <option value="">All Types</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
              <option value="premium">Premium</option>
            </select>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg px-6 py-2.5 hover:from-blue-700 hover:to-purple-700 flex items-center justify-center font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </button>
          </form>
        </div>

        {/* Course List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course: any) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        {courses.length === 0 && (
          <div className="text-center py-16">
            <GraduationCap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No courses found. Try adjusting your search filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
