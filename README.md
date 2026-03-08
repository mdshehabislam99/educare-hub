# Educare Hub
A full-stack e-learning platform for students and instructors with role-based dashboards, course management, cart, and enrollment flow.

## About the Project
Educare Hub is a modern learning management web app where instructors publish courses and students discover, purchase, and enroll in them. It solves the need for a single platform that combines course creation, authentication, cart/checkout flow, and dashboard analytics.


## Project Overview
- Goal: Build a scalable course marketplace and learning dashboard experience.
- User Roles: `student`, `instructor`
- Core Modules:
  - Authentication (NextAuth + credentials/Google)
  - Course CRUD for instructors
  - Cart and Buy Now enrollment flow
  - Enrollment-driven student dashboard
  - Instructor dashboard with live data refresh

You can add screenshots/GIFs here for better GitHub presentation.


## Key Features
- Role-based Authentication � secure login/signup and protected dashboard routes.
- Instructor Dashboard � create, edit, and manage courses with dynamic metrics.
- Student Dashboard � enrolled courses and progress from the enrollments collection.
- Cart & Enrollment Flow � add/remove cart items and enroll instantly using Buy Now.
- REST API Integration � App Router API routes for auth, courses, enrollments, and cart.



## Tech Stack
**Frontend:** Next.js (App Router) � React � Tailwind CSS � Framer Motion  
**Backend:** Next.js API Routes � MongoDB � NextAuth  
**Tools:** Git � VS Code � JWT (`jose`) � ESLint



## Dependencies
Major dependencies used in this project:

```json
{
  "next": "16.1.6",
  "react": "19.2.3",
  "react-dom": "19.2.3",
  "next-auth": "^4.24.13",
  "mongodb": "^5.9.2",
  "bcryptjs": "^3.0.3",
  "jose": "^6.2.0",
  "framer-motion": "^12.35.0",
  "lucide-react": "^0.577.0",
  "tailwindcss": "^4"
}
```


## Installation & Setup
1. Clone the repo and install dependencies:

```bash
git clone https://github.com/<your-username>/educare-hub.git
cd educare-hub
npm install
```

2. Set up environment variables by creating a `.env.local` (or `.env`) file:

```env
MONGODB_URI=your_mongodb_connection_string
DB_NAME=your_database_name
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret
```

3. Run the application:

```bash
npm run dev
```

4. Production build:

```bash
npm run build
npm run start
```


## Folder Structure

```plaintext
educare-hub/
�
+-- public/
+-- src/
�   +-- app/
�   �   +-- api/
�   �   +-- dashboard/
�   �   +-- course/
�   �   +-- ...
�   +-- components/
�   +-- lib/
�   +-- services/
�   +-- assets/
+-- package.json
+-- README.md
```


## License
Distributed under the MIT License. See `LICENSE` for more information.


## Contact
**Live URL:** [Live Site](https://educare-hub-git-master-md-shehab-islams-projects.vercel.app/)  
**Email:** shihabkhanahab@gmail.com  
**Portfolio:** [Portfolio](https://shehabislam99.netlify.app/)
