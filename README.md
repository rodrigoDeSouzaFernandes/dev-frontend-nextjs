# Next Store

This project is a frontend application built with **Next.js**, using React, TypeScript, and TailwindCSS. It includes state management with Zustand, forms with React Hook Form, dialogs and dropdowns with Radix UI, theme management with next-themes, icons with Lucide React, and notifications with Sonner. Additionally, it has tests with Jest and React Testing Library (RTL).

# Technologies Used

Next.js 16, React 19, TypeScript 5, TailwindCSS 4, Zustand, React Hook Form, React Query (tanstack), Shadcn UI, Axios, Zod, Jest, React Testing Library.

# Prerequisites

Before running this project, make sure you have installed:

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [pnpm](https://pnpm.io/) (for managing dependencies)

# Getting Started

Follow these steps to run the project locally:

## 1. Clone the repository

```
git clone git@github.com:rodrigoDeSouzaFernandes/dev-frontend-nextjs.git
```

## 2. Navigate to the project folder

```
cd dev-frontend-nextjs
```

Replace "dev-frontend-nextjs" with the folder name you used if it's different.

## 3. Install dependencies

This project uses **pnpm**, but you can also use npm or yarn:

```
pnpm install
# or
npm install
# or
yarn
```

## 4. Configure environment variables

Create a `.env` file in the root of the project with the following content:

```
NEXT_PUBLIC_API_URL=https://fakestoreapi.com
```

## 5. Run the development server

```
pnpm dev
# or
npm run dev
# or
yarn dev
```

## 6. To login on application use these credentials:

```
Username: mor_2314
Password: 83r5^_
```

# Available Scripts

- **Build for production**

```
pnpm build
```

- **Start production server locally**

```
pnpm start
```

- **Run ESLint**

```
pnpm lint
```

- **Run tests**

```
pnpm test
```

- **Run tests in watch mode**

```
pnpm test:watch
```

# Notes

- Make sure the `.env` file is present before running the project.
- PNPM is preferred, but npm or yarn also work.
