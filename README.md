# givemymenu.com

Landing Page for a QR-based menu SaaS platform for restaurants to create contactless dining experiences.

## Getting Started

### Prerequisites

1. Node.js 16+ and npm
2. MySQL server (local or remote)

### Environment Setup

Create a `.env.local` file in the root directory with the following content:

```
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=databasename
JWT_SECRET=your_secret_key_for_jwt_tokens
```

### Installation

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- **Landing Page**: Modern, responsive landing page with early access signup
- **Email Collection**: Collect early-access emails and store them in MySQL
- **Admin Dashboard**: Password-protected dashboard to view collected emails
- **Dark Mode**: Beautiful dark mode for a modern user experience

## Tech Stack

- Next.js
- TypeScript
- TailwindCSS
- MySQL

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
