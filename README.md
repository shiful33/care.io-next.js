🛡️ Care-IO | Professional Caregiving Service Marketplace

Care-IO is a robust, full-stack web application built with Next.js. It connects users with professional caregivers for various services like nursing, elderly care, and babysitting. The platform features a seamless booking flow, automated email invoicing, and a dedicated admin management system.

🚀 Key Features
👤 For Users
Service Exploration: 
Browse through a wide range of caregiving categories with detailed pricing and info.

Dynamic Booking System: 
Interactive booking modal that calculates total costs based on duration and hourly rates.

Automated Invoicing: 
Receive an immediate HTML-formatted email invoice upon successful booking via Nodemailer.

My Bookings Dashboard: 
A personal space for users to track their booking status (Pending/Confirmed) and cancel orders if needed.

🛡️ For AdminsComprehensive Oversight: 
Access to all bookings made across the platform.

Real-time Status Management: 
Update service status from Pending to Confirmed, Completed, or Cancelled via a dedicated dashboard.

Secure Access: 
Role-based access control ensuring only authorized admins can reach the dashboard.

🛠️ Technology StackLayer TechnologyFrontendNext.
js (App Router), Tailwind CSS, Daisy UIBackendNext.

js API Routes (Serverless Functions)DatabaseMongoDB AtlasAuthenticationFirebase AuthenticationEmailingNodemailer (SMTP Integration)FeedbackSweetAlert2, React Hot Toast

🔐 Admin Demo CredentialsTo test the administrative features, use the following account:Email: admin@care.io.comPassword: Admin@123

⚙️ Local Installation
Clone the repository:
Bash: git clone https://github.com/your-username/care-io.git

Install dependencies:
Bashnpm install
Setup Environment Variables:Create a .env.local file in the root directory:
Code snippetMONGODB_URI=your_mongodb_connection_string
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_specific_password

Run the development server:
Bash: npm run dev

🌐 Deployment
This project is optimized for deployment on Vercel. Ensure all Environment Variables are configured in the Vercel dashboard to enable database and email functionality.