# Eat2Lose - Customer Portal

A modern, responsive web application for customers to manage their meal plans, track progress, and interact with the Eat2Lose platform.

## Features

- 🔐 **Authentication**: Secure Firebase authentication
- 📊 **Dashboard**: Overview of today's meals and quick stats
- 📅 **Meal Plans**: View 7-day and 30-day meal plans
- 🍳 **Recipes**: Detailed recipe pages with ingredients, steps, and macros
- 🛒 **Grocery List**: Aggregated shopping list with category organization
- 📈 **Progress Tracking**: Weight tracking with interactive charts
- 👤 **Account Management**: Profile settings, subscription info, and preferences
- 🎯 **Onboarding**: First-time user setup for personalized experience

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Firebase project with Authentication and Firestore enabled

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd customer
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with your Firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
customer/
├── app/
│   ├── (auth)/
│   │   └── login/              # Login page
│   ├── (dashboard)/
│   │   ├── dashboard/          # Main dashboard
│   │   ├── plans/              # Meal plans view
│   │   ├── recipes/[id]/       # Recipe details
│   │   ├── grocery/            # Grocery list
│   │   ├── progress/           # Weight tracking
│   │   └── account/            # Account settings
│   ├── (onboarding)/           # First-time user setup
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── Sidebar.tsx             # Navigation sidebar
│   ├── Topbar.tsx              # Page header
│   ├── MealCard.tsx            # Meal display card
│   ├── RecipeCard.tsx          # Recipe card
│   ├── StatsCard.tsx           # Statistics card
│   └── ChartWeight.tsx         # Weight progress chart
├── lib/
│   ├── firebase.ts             # Firebase configuration
│   └── api.ts                  # API utilities and mock data
└── public/                     # Static assets
```

## Pages

### Authentication
- `/login` - User login with Firebase Auth

### Onboarding
- `/` (first-time users) - Multi-step onboarding form

### Dashboard
- `/dashboard` - Today's meals and quick stats
- `/plans` - 7-day and 30-day meal plan overview
- `/recipes/[id]` - Detailed recipe view
- `/grocery` - Aggregated grocery list
- `/progress` - Weight tracking with charts
- `/account` - Profile, subscription, and preferences

## Development

### Building for Production

```bash
npm run build
```

### Running Production Build

```bash
npm start
```

### Linting

```bash
npm run lint
```

## API Integration

Currently, the app uses mock data from `lib/api.ts`. To integrate with a real backend:

1. Replace the mock functions in `lib/api.ts` with actual API calls
2. Update the `NEXT_PUBLIC_API_URL` environment variable
3. Implement proper error handling and loading states

## Customization

### Styling
- Edit `tailwind.config.js` to customize colors and theme
- Primary color can be changed in the `colors.primary` section
- Global styles are in `app/globals.css`

### Features
- Add new pages by creating files in `app/(dashboard)/`
- Create reusable components in the `components/` directory
- Extend API functions in `lib/api.ts`

## Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication with Email/Password
3. Enable Firestore Database
4. Copy your config credentials to `.env.local`

### Firestore Structure (Recommended)

```
users/
  {userId}/
    profile: { name, age, height, weight, allergies, dislikes, etc. }
    mealPlans/
      {date}: { meals: [], totalCalories, totalProtein, etc. }
    weightHistory/
      {entryId}: { date, weight, note }
    groceryList/
      {itemId}: { name, amount, category, checked }
    subscription: { plan, status, startDate, endDate }
```

## License

Private - All rights reserved

## Support

For support, contact support@eat2lose.com

