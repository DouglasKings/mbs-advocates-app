# MBS Advocates Website

This project is a professional web application for MBS Advocates, a legal firm, showcasing their services, team, and providing contact and testimonial submission functionalities. It's built with Next.js, Tailwind CSS, and uses Supabase for database management.

## Features

*   **Responsive Design**: Optimized for various screen sizes (desktop, tablet, mobile).
*   **Navigation**: Smooth scrolling navigation to Home, About, Services, Team, Testimonials, and Contact sections.
*   **Home Section**: Prominent hero section with a call to action.
*   **About Section**: Detailed information about MBS Advocates.
*   **Team Section**: Introduces key team members with their roles and descriptions.
*   **Services Section**: Outlines the legal services offered by the firm.
*   **Testimonials Section**: Displays client feedback and allows new testimonial submissions (moderated via Supabase).
*   **Contact Section**: Provides contact information, a functional contact form, and an embedded map for directions.
*   **Server Actions**: Secure and efficient form submissions using Next.js Server Actions.
*   **Database Integration**: Utilizes Supabase for storing contact messages and testimonials.
*   **Toast Notifications**: Provides immediate visual feedback (success/error messages) for form submissions using `react-hot-toast`.

## Technologies Used

*   **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
*   **Icons**: [Lucide React](https://lucide.dev/icons/)
*   **Database**: [Supabase](https://supabase.com/) (PostgreSQL backend)
*   **Validation**: [Zod](https://zod.dev/)
*   **UI Notifications**: [react-hot-toast](https://react-hot-toast.com/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)

## Project Structure

\`\`\`
mbs-advocates-app/
├── .env.local           # Environment variables (local only, NOT committed to Git)
├── public/              # Static assets (images, favicons, etc.)
│   └── images/
│       ├── favicon.ico  # Favicon for the website
│       └── logo.png     # Logo used in header and hero section
│       └── placeholder.svg # Placeholder image used throughout the site
├── scripts/             # SQL migration scripts for database setup
│   ├── 001_create_contact_submissions_table.sql # Script to create contact form table
│   └── 002_create_testimonials_table.sql        # Script to create testimonials table
├── src/
│   ├── actions/         # Next.js Server Actions for backend logic
│   │   ├── contact.ts   # Handles contact form submissions to Supabase
│   │   └── testimonials.ts # Handles testimonial submissions and fetching from Supabase
│   ├── app/
│   │   ├── (main)/      # Route group for main public-facing pages
│   │   │   ├── layout.tsx # Main layout for pages within this group (header, footer)
│   │   │   └── page.tsx   # The main landing page content (Home, About, Services, etc.)
│   │   ├── globals.css  # Global Tailwind CSS styles and custom CSS
│   │   └── layout.tsx   # Root HTML layout for the entire application (includes Toaster)
│   ├── components/      # Reusable React components
│   │   ├── contact-form.tsx # Client component for the contact form
│   │   ├── image-container.tsx # Wrapper for Next.js Image component with styling
│   │   ├── team-member-card.tsx # Card component for individual team members
│   │   ├── team-section.tsx # Section component to display the team members
│   │   ├── testimonial-form.tsx # Client component for the testimonial submission form
│   │   └── ui/          # Shadcn UI components (e.g., Button, Card, Input, Textarea)
│   ├── lib/             # Utility functions and configurations
│   │   ├── db.ts        # Supabase client initialization and connection logic
│   │   ├── schema.ts    # TypeScript interfaces for database tables and table names
│   │   └── utils.ts     # Utility functions (e.g., `cn` for Tailwind class merging)
├── .gitignore           # Specifies files/directories to be ignored by Git
├── next.config.ts       # Next.js configuration file (TypeScript)
├── package.json         # Project metadata and dependencies
├── postcss.config.js    # PostCSS configuration (used by Tailwind CSS)
├── README.md            # Project documentation (this file)
├── tailwind.config.ts   # Tailwind CSS configuration file
├── tsconfig.json        # TypeScript compiler configuration
└── yarn.lock            # Yarn dependency lock file (if using yarn)
\`\`\`

## Architectural Decisions

This project's structure is intentionally designed to be scalable, maintainable, and easy to navigate by adhering to modern web development principles and Next.js App Router conventions. The core idea is a clear separation of concerns, ensuring that UI, server-side logic, and utility code are logically isolated.

1.  **Root Directory (/) vs. Source Code (/src)**
    *   **Decision**: All application source code resides within the `src` directory.
    *   **Rationale**: This provides a clean separation between your application code and the project's configuration files (like `package.json`, `tailwind.config.ts`, etc.) that live in the root, improving organization.

2.  **Application Shell: The Root Layout (`src/app/layout.tsx`)**
    *   **Technical Concept**: This file is the Root Layout, acting as the application's main entry point and global shell.
    *   **Purpose**: It defines the static `<html>` and `<body>` tags that wrap every page and is the ideal place for global functionality like loading CSS files, configuring fonts, and adding global UI components like `react-hot-toast`'s `Toaster`.

3.  **Route Organization: Route Groups (`src/app/(main)/`)**
    *   **Technical Concept**: The `(main)` folder is a Route Group. The parentheses `()` signify that it should not be part of the URL path.
    *   **Purpose**: This powerful Next.js feature allows us to group related routes and apply a specific nested layout (`src/app/(main)/layout.tsx`) to them—in this case, our main header and footer—without affecting the URL structure.

4.  **Reusability: Component-Based Architecture (`src/components/`)**
    *   **Technical Concept**: This directory embodies the Component-Based Architecture principle.
    *   **Purpose**: We create small, reusable UI pieces (like buttons or cards) to ensure a consistent design system, improve maintainability, and keep our page code clean and readable.
    *   **Sub-directories (`/ui`)**: The `ui` sub-folder is a convention popularized by shadcn/ui for holding generic, un-styled base components (like Button, Card, Input), which are then used to build more complex, business-specific components that live directly in `/components`.

5.  **Logic and Utilities: The Service Layer (`src/lib/`, `src/actions/`, `scripts/`)**
    This is where we separate the "how" from the "what" (the UI).
    *   **`src/lib` (The Toolbox)**: A library of helper functions and service initializations, such as the Supabase client connection (`db.ts`) and TypeScript schemas (`schema.ts`).
    *   **`src/actions` (Secure Backend Logic)**: Implements Next.js Server Actions. These are special functions guaranteed to run only on the server, making them perfect for secure database operations.
    *   **`scripts/` (Database Schema Management)**: Holds Database Migration Scripts. These SQL files provide a repeatable, version-controlled definition of our database structure, which is essential for professional development workflows.

## Getting Started (Local Development)

Follow these steps to set up and run the project on your local machine.

### Prerequisites

*   **Node.js**: Make sure you have Node.js (LTS version recommended) installed. You can download it from [nodejs.org](https://nodejs.org/).
*   **npm** (Node Package Manager) or **Yarn**: Comes with Node.js, or install Yarn globally: `npm install -g yarn`
*   **Git**: For version control. Download from [git-scm.com](https://git-scm.com/).
*   **Code Editor**: Visual Studio Code is recommended.

### 1. Clone the Repository

Open your terminal (Command Prompt or PowerShell on Windows) and clone the project from GitHub:

\`\`\`bash
git clone https://github.com/DouglasKings/mbs-advocates-app.git
cd mbs-advocates-app
\`\`\`

### 2. Install Dependencies

Install the required Node.js packages:

\`\`\`bash
npm install
# or if you use yarn
# yarn install
\`\`\`

### 3. Set Up Supabase Database

This project uses Supabase as its backend for storing contact form submissions and testimonials.

#### a. Create a Supabase Project

1.  Go to [supabase.com](https://supabase.com/) and sign in or create an account.
2.  From your dashboard, click "New project".
3.  Provide a **Name** for your project (e.g., `mbs-advocates-db`).
4.  Set a **strong Database Password** and save it securely.
5.  Choose a **Region** close to you or your target audience.
6.  Click "Create new project".

#### b. Get Supabase API Keys

Once your project is created:

1.  Navigate to "Project Settings" (gear icon in the left sidebar) > "API".
2.  Copy the **Project URL**.
3.  Copy the **`anon public` key**.

#### c. Configure Environment Variables

Create a `.env.local` file in the root of your project (next to `package.json`). This file will store your sensitive API keys and will not be committed to Git.

\`\`\`bash
# Create the file (if it doesn't exist)
# On Windows:
type nul > .env.local
# Or simply create it manually in your file explorer/editor
# Open .env.local in a text editor and add:
\`\`\`

```dotenv
NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
