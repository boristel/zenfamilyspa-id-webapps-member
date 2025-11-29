**Role:** You are a Lead Frontend Architect and a UI/UX Specialist expert in Tailwind CSS.

**Current Status:**
The application functions logically, but the UI is clunky (buttons are too large, inputs are ugly) and the directory structure is disorganized.

**Objective:**
Refactor the codebase to have a professional "Atomic Design" file structure and completely overhaul the UI to look like a polished, commercial mobile app (like Instagram or Revolut).

Please execute the following 3 steps:

### Step 1: Structural Refactoring (Clean Code)
Reorganize the `src` folder exactly like this. Move existing code into these files:

```text
src/
├── components/
│   ├── ui/              # Reusable atoms (Buttons, Inputs, Cards)
│   │   ├── Button.jsx   # Custom tailored component
│   │   ├── Input.jsx    # Custom styled input wrapper
│   │   └── Card.jsx     # Glassmorphism container
│   ├── layout/          # Layout specific components
│   │   ├── Header.jsx   # Top bar (Profile name)
│   │   ├── Footer.jsx   # Bottom navigation
│   │   └── DashboardLayout.jsx # Wrapper for protected pages
├── features/            # Feature specific components
│   └── auth/
│       ├── LoginForm.jsx
│       └── RegisterForm.jsx
├── pages/               # Route components
│   ├── HomePage.jsx
│   ├── HistoryPage.jsx
│   ├── ProfilePage.jsx
│   └── LoginPage.jsx
├── context/
│   └── AuthContext.jsx
└── App.jsx
```

### Step 2: Design System & Component Rules (Fix the UI)
Rewrite the code for the components in `components/ui` using these specific Tailwind constraints:

1.  **Buttons (`Button.jsx`):**
    *   Do NOT use default HTML padding.
    *   Use specific sizing: `h-10` or `h-12` (height), `px-4` (horizontal padding), `rounded-full` or `rounded-xl`.
    *   Typography: `text-sm` or `text-base`, `font-medium`.
    *   Interaction: `active:scale-95` (click press effect), `transition-all`.
    *   Shadows: `shadow-md` for primary buttons.

2.  **Inputs (`Input.jsx`):**
    *   Remove default borders (`border-none` or custom).
    *   Style: `bg-gray-50` (light background), `border border-gray-200`, `rounded-lg`, `focus:ring-2`, `focus:ring-blue-500`, `focus:border-transparent`.
    *   Spacing: `py-3`, `px-4`.
    *   Typography: `text-gray-900`, `placeholder-gray-400`.

3.  **Layout & Cards:**
    *   Login Container: Use a max-width of `max-w-md` (so it's not huge on desktop) and centered (`mx-auto`).
    *   Background: Use `bg-white` with `shadow-xl` and `rounded-2xl` for the form container.

### Step 3: Page Polish
1.  **Header:** Make it minimal. White background, sticky top, bottom border (`border-b border-gray-100`). Profile name should be bold (`font-semibold`).
2.  **Footer:**
    *   Fixed at bottom (`fixed bottom-0 w-full`).
    *   Use a grid `grid-cols-3`.
    *   Add Icons to the buttons (use `lucide-react` icons for Home, History, User).
    *   Active state: Icon turns Blue, Inactive state: Icon is Gray.
3.  **Main Content Area:** Add padding to the top and bottom of the pages so content isn't hidden behind the fixed Header/Footer (`pt-16 pb-20`).

**Action:**
Please provide the code for the **Folder Structure setup** first, then the **UI Components (Button, Input)**, and finally the **Page Layouts**.

***

### Tips for you (The Human) to ensure success:

1.  **Check the Output:** If the AI generates the code, don't just copy-paste the whole file. Look at the `className` strings.
    *   *Bad:* `p-10 text-xl` (This makes things huge).
    *   *Good:* `py-2 px-4 text-sm font-medium`.
2.  **Icons:** The prompt asks for `lucide-react`. If you haven't installed it, run:
    ```bash
    npm install lucide-react
    ```
3.  **Mobile First:** This prompt forces a `max-w-md` (max width medium) constraint. This prevents the login form from stretching across the entire screen on your laptop, which is usually why things look "ugly" and "too big."