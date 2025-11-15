import CourseForm from '@/components/courseForm';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function NewCourse() {
  return (
    <ProtectedRoute>
      <CourseForm />
    </ProtectedRoute>
  );
}
