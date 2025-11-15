'use client';

import { allCourse } from '@/app/apis/apis';
import CourseCard from '@/components/courseCard';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useEffect, useState } from 'react';

type Course = {
  id: number;
  title: string;
  price: string;
  shortDescription: string;
  courseHighlight: string[];
};

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await allCourse({});

        console.log('Fetched Courses:', response);

        setCourses(response.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full p-6">
        {loading && <div>Loading courses...</div>}
        {error && <div className="text-red-500">{error}</div>}

        {!loading && !error && courses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                price={course.price}
                description={course.shortDescription}
                highlights={course.courseHighlight}
              />
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
