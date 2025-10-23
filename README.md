🧠 MicroCourse Studio – AI-Powered Micro-Course Generator

MicroCourse Studio is a full-stack AI-driven platform that helps creators generate structured micro-courses — complete with lessons, email sequences, and drip schedules — all from a single course idea.
Users can log in, generate new course drafts using AI, and view organized lessons, emails, and schedules for each micro-course.

⸻

🚀 Features

🧩 Core Features
	•	AI-Generated Lessons – Automatically create complete course lesson plans with AI.
	•	Draft Management – Save generated micro-courses as drafts and revisit them later.
	•	Email Sequence Generator – Generate automated follow-up email content for each course.
	•	Drip Schedule Visualization – Interactive timeline that shows how lessons and emails are released day by day.
	•	JWT Authentication – Secure login and route protection using JSON Web Tokens.
	•	Responsive Dashboard – View and manage all your micro-courses in a clean, modern UI.

⸻

🛠️ Tech Stack

🖥️ Frontend
	•	React.js
	•	Tailwind CSS
	•	Lucide-React Icons
	•	React Router

⚙️ Backend
	•	Node.js
	•	Express.js
	•	PostgreSQL (via Supabase)
	•	JWT Authentication
	•	OpenAI API (for AI-generated lessons & emails)

⸻

⚙️ Setup & Installation

1️⃣ Clone the Repository

git clone https://github.com/yourusername/MicroCourse-Studio.git
cd MicroCourse-Studio


⸻

2️⃣ Backend Setup

cd backend
npm install

Create a .env file in the backend folder:

PORT=3001
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_role_key
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_jwt_secret

Run the backend server:

npm run dev


⸻

3️⃣ Frontend Setup

cd ../frontend
npm install
npm run dev


⸻

🧠 How It Works
	1.	User Authentication – User logs in and gets a JWT token.
	2.	AI Course Generation – User enters a topic → AI generates lessons and emails.
	3.	Draft Storage – Generated lessons and emails are saved in the database under one draft ID.
	4.	Dashboard Overview – User can view all drafts with creation dates.
	5.	Course Detail View – Each draft shows its related lessons, email sequence, and drip schedule.

⸻

📦 Current Database Schema

Table	Columns
drafts	id, title, user_id, created_at
lessons	id, title, content, draft_id, created_at
emails	id, subject, body, draft_id, created_at
