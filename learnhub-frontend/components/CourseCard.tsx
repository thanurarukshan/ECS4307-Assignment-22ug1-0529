import Link from 'next/link';
import { BookOpen, Tag, Users, Clock, Award } from 'lucide-react';

interface Course {
    id: number;
    courseName: string;
    courseDescription: string;
    courseFee: number;
    category: string;
    courseThumbnail?: string;
    courseType: string;
    level: string;
    duration: string;
    enrolledStudents: number;
    maxStudents: number;
}

const CourseCard = ({ course }: { course: Course }) => {
    const getLevelColor = (level: string) => {
        switch (level.toLowerCase()) {
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

    const getTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'free':
                return 'bg-blue-600';
            case 'paid':
                return 'bg-purple-600';
            case 'premium':
                return 'bg-amber-600';
            default:
                return 'bg-gray-600';
        }
    };

    return (
        <div className="bg-white overflow-hidden shadow-md rounded-xl hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1">
            <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 w-full relative">
                {course.courseThumbnail ? (
                    <img src={course.courseThumbnail} alt={course.courseName} className="w-full h-full object-cover" />
                ) : (
                    <div className="flex items-center justify-center h-full text-blue-400">
                        <BookOpen className="h-16 w-16" />
                    </div>
                )}
                <span className={`absolute top-2 right-2 ${getTypeColor(course.courseType)} text-white text-xs px-3 py-1 rounded-full uppercase font-bold shadow-lg`}>
                    {course.courseType}
                </span>
                <span className={`absolute top-2 left-2 ${getLevelColor(course.level)} text-xs px-3 py-1 rounded-full font-semibold`}>
                    {course.level}
                </span>
            </div>
            <div className="px-5 py-4">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 flex-1">{course.courseName}</h3>
                </div>
                <p className="text-sm text-gray-600 flex items-center mb-3">
                    <Tag className="h-4 w-4 mr-1 text-blue-500" />
                    {course.category}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {course.duration}
                    </div>
                    <div className="flex items-center">
                        <Users className="h-3.5 w-3.5 mr-1" />
                        {course.enrolledStudents}/{course.maxStudents}
                    </div>
                </div>
                <div className="mt-3 flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex flex-col">
                        {course.courseFee > 0 ? (
                            <>
                                <span className="text-2xl font-bold text-blue-600">${Number(course.courseFee).toLocaleString()}</span>
                                <span className="text-xs text-gray-500">Course Fee</span>
                            </>
                        ) : (
                            <span className="text-2xl font-bold text-green-600">FREE</span>
                        )}
                    </div>
                    <Link href={`/courses/${course.id}`} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        Enroll Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
