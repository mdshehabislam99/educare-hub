export const MOCK_COURSES = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp 2024',
    instructor: 'Dr. Sarah Wilson',
    instructorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    price: 89.99,
    rating: 4.8,
    reviewsCount: 1240,
    studentsCount: 15400,
    duration: '45h 30m',
    level: 'Beginner',
    category: 'Development',
    description: 'Master HTML, CSS, JavaScript, React, and Node.js from scratch. Build real-world projects and launch your career as a full-stack developer.',
    lastUpdated: 'Jan 2024',
    curriculum: [
      {
        id: 's1',
        title: 'Introduction to Web Development',
        lessons: [
          { id: 'l1', title: 'How the Web Works', duration: '10:00', type: 'video', isLocked: false },
          { id: 'l2', title: 'Setting up your Environment', duration: '15:00', type: 'video', isLocked: false },
        ]
      },
      {
        id: 's2',
        title: 'HTML5 & CSS3 Fundamentals',
        lessons: [
          { id: 'l3', title: 'HTML Structure', duration: '20:00', type: 'video', isLocked: true },
          { id: 'l4', title: 'CSS Layouts with Flexbox', duration: '25:00', type: 'video', isLocked: true },
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Advanced UI/UX Design Masterclass',
    instructor: 'Michael Chen',
    instructorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800',
    price: 74.99,
    rating: 4.9,
    reviewsCount: 850,
    studentsCount: 8200,
    duration: '32h 15m',
    level: 'Advanced',
    category: 'Design',
    description: 'Learn advanced design principles, prototyping in Figma, and user research methodologies used by top tech companies.',
    lastUpdated: 'Feb 2024',
    curriculum: []
  },
  {
    id: '3',
    title: 'Data Science & Machine Learning with Python',
    instructor: 'Prof. David Miller',
    instructorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    price: 99.99,
    rating: 4.7,
    reviewsCount: 2100,
    studentsCount: 22000,
    duration: '55h 45m',
    level: 'Intermediate',
    category: 'Data Science',
    description: 'Comprehensive guide to Python for data analysis, visualization, and machine learning using Scikit-Learn and TensorFlow.',
    lastUpdated: 'Dec 2023',
    curriculum: []
  }
];
