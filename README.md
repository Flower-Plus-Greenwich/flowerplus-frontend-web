# FlowerPlus Frontend Web

A modern, responsive frontend application for FlowerPlus, built with Next.js 16 and Tailwind CSS v4.

## 🚀 Technologies

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```bash
src/
├── app/                  # App Router pages and layouts
│   ├── (auth)/          # Authentication routes (login, register)
│   ├── (main)/          # Main application routes (home, product, shop)
│   └── layout.tsx       # Root layout including fonts and global styles
├── components/           # Reusable UI components
│   ├── common/          # Common components (e.g., ClientOnly, BackBtn)
│   ├── features/        # Feature-specific components (e.g., product, home)
│   ├── layout/          # Layout components (Header, Footer)
│   └── ui/              # Generic UI components (e.g., Skeleton)
├── lib/                  # Library configurations (e.g., axios)
├── services/             # API service calls
├── styles/               # Global styles and theme configuration
├── types/                # TypeScript type definitions
├── hooks/                # Custom React hooks
└── constants/            # Application constants
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Flower-Plus-Greenwich/flowerplus-frontend-web.git
   ```

2. Navigate to the project directory:
   ```bash
   cd flowerplus-frontend-web
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎨 Features

- **Storefront**:
  - **Homepage**: Hero section with reveal effect, curated collections, and product highlights.
  - **Product Details**: Comprehensive product view with gallery, details, and care instructions.
- **Micro-interactions & UX**:
  - **Loading States**: Skeleton screens for instant visual feedback.
  - **Animations**: Smooth page transitions and interactive elements.
- **Authentication**:
  - Login Page with social auth UI.
  - Register Page with form validation fields.
  - Password visibility toggle.
- **Design System**:
  - Custom color palette (Cream/Beige & Brown).
  - Fonts: **Cormorant Garamond** (Serif) and **Montserrat** (Sans).
- **Architecture**:
  - Modular directory structure.
  - Client-side rendering optimization where needed.
