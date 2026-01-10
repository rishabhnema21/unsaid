# Unsaid

## Anonymous Message Sharing Platform

### Project Description

Unsaid is a lightweight and engaging platform that allows users to send
and receive anonymous messages. After registering, each user receives a
personalized shareable link. Anyone with the link can submit a message
without signing up or revealing their identity. To enhance interaction,
the platform integrates generative AI to produce five randomized, fun messages.
Users can click any suggestion to auto-fill their message before
submitting.

### Features

- **Anonymous Messaging**: Users receive messages without exposing the
  sender's identity.
- **Personal Shareable Link**: Each registered user gets a unique link
  to collect messages.
- **AI-Powered Message Suggestions**: Integrated Gemini AI for
  generating five fun and engaging message suggestions that auto-fill
  on click.
- **Secure User Authentication**: Account creation and login via
  session-based auth.
- **Modern UI/UX**: Clean, responsive interface with theme support and
  smooth components.
- **Email Capability**: React Email templates and Resend support for
  future notification workflows.

### Technology Stack

- **Next.js 16** (App Router, server components)
- **React 19** - **NextAuth** for secure authentication
- **TypeScript** for type safety
- **Mongoose** for database modeling with
  MongoDB
- **Tailwind CSS 4** for responsive styling
- **AI SDK (Google + React)** for Gemini interaction
- **Zod + React Hook Form** for robust
  form validation
- **Axios** for API calls

### Installation Guide

1.  Clone the repository:

    ```bash
    git clone https://github.com/rishabhnema21/unsaid.git
    cd unsaid
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Configure environment variables: Create a `.env` file with required
    authentication, database and AI configs.

4.  Run the development server:

    ```bash
    npm run dev
    ```

5.  Build for production:

    ```bash
    npm run build
    npm start
    ```

### Thank You

Thank you for exploring Unsaid. This project reflects a blend of
creativity, modern tooling, and thoughtful user experience. Feedback,
contributions and suggestions are always appreciated.
