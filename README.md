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

