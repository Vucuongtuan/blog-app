
# Blog App

A modern, full-stack blog application built with Next.js, TypeScript, and Tailwind CSS. It provides a rich authoring experience with a dedicated dashboard, real-time community features, and AI-powered content assistance.

## Features

-   **Author Dashboard**: A comprehensive dashboard for content creators to manage their articles, view statistics, and update their profiles.
-   **CRUD for Blogs**: Functionality for creating, reading, updating, and deleting blog posts.
-   **Rich Text Editor**: Uses ReactQuill for a WYSIWYG editing experience, allowing for formatted content, images, and videos.
-   **Real-time Community Chat**: A Socket.IO-powered chat group for authors to connect and collaborate.
-   **AI Content Generation**: Integrated with Google's Gemini AI to assist authors in generating content ideas and text directly within the editor.
-   **User Authentication**: Secure login and registration system for authors.
-   **Dynamic Theming**: Switch between light and dark modes.
-   **Responsive Design**: Built with Tailwind CSS and Shadcn/UI for a seamless experience on all devices.
-   **SEO Optimized**: Generates dynamic metadata and sitemaps for better search engine visibility.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Shadcn/UI](https://ui.shadcn.com/)
-   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
-   **Real-time Communication**: [Socket.IO Client](https://socket.io/)
-   **AI Integration**: [Google Generative AI (Gemini)](https://ai.google.dev/)
-   **Data Fetching**: [Axios](https://axios-http.com/), [SWR](https://swr.vercel.app/)
-   **UI Components**: [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or later)
-   npm, yarn, or pnpm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/vucuongtuan/blog-app.git
    cd blog-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the root of your project and add the following variables. Replace the placeholder values with your actual API details.

    ```env
    # The base URL for your backend API
    NEXT_PUBLIC_BASE_URL=https://be-blogs.onrender.com

    # Your Google Generative AI API Key
    # Note: The project currently has a key hardcoded in src/components/tabAi/index.tsx.
    # It is recommended to replace it with this environment variable for security.
    NEXT_PUBLIC_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The project follows the standard Next.js App Router structure.

```
src
├── api/            # Functions for making API calls
├── app/            # Next.js App Router: pages, layouts, server actions
│   ├── (auth)/     # Auth routes (login, register)
│   ├── [slug]/     # Dynamic route for blog post details
│   └── author/     # Protected routes for the author dashboard
├── components/     # Reusable React components
│   ├── dashboard/  # Components specific to the author dashboard
│   ├── layout/     # Global layout components (Header, Footer)
│   ├── ui/         # Reusable UI elements from Shadcn/UI
│   └── ...
├── hooks/          # Custom React hooks
├── lib/            # Core utilities, helpers, and state management
│   ├── stores/     # Zustand store definitions
│   └── ...
├── types/          # TypeScript type definitions
└── utils/          # Utility functions and animation presets
