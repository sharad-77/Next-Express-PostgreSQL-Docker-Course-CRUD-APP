import CourseCard from '@/components/courseCard';

export default function Courses() {
  return (
    <div className="h-screen w-full flex flex-row justify-center items-center ">
      <CourseCard
        title="Full Stack Web Development"
        price="2999"
        description="Master MERN Stack with hands-on projects and real-world experience."
        highlights={[
          'Build 5+ full-stack projects',
          'Learn MongoDB, Express, React, Node.js',
          'Understand authentication & deployment',
          'Includes certification and mentorship',
        ]}
      />
      <CourseCard
        title="Full Stack Web Development"
        price="2999"
        description="Master MERN Stack with hands-on projects and real-world experience."
        highlights={[
          'Build 5+ full-stack projects',
          'Learn MongoDB, Express, React, Node.js',
          'Understand authentication & deployment',
          'Includes certification and mentorship',
        ]}
      />
      <CourseCard
        title="Full Stack Web Development"
        price="2999"
        description="Master MERN Stack with hands-on projects and real-world experience."
        highlights={[
          'Build 5+ full-stack projects',
          'Learn MongoDB, Express, React, Node.js',
          'Understand authentication & deployment',
          'Includes certification and mentorship',
        ]}
      />
    </div>
  );
}
