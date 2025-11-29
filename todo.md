Act as a Senior React Developer and UI/UX Designer specialized in PWAs.
I need you to build the core authentication and user management flow for a Reflexology & Spa application called "ZenApps".

### Tech Stack (Strict Adherence)
*   **Core:** React 19, Vite, React Router 7.
*   **Styling:** Tailwind CSS 4 (Use the new v4 configuration approach).
*   **Auth:** Firebase Auth (Google + Email/Password).
*   **Backend:** Strapi CMS (Accessed via Axios).
*   **Icons:** Lucide React.

### Design Aesthetic ("Zen Mode")
*   **Palette:** Use a custom Tailwind palette in the CSS variables: `zen-green` (#8DA399), `zen-sand` (#F5F5F1), `zen-brown` (#5D4037).
*   **Vibe:** Premium, calming, rounded corners, glassmorphism effects, sufficient whitespace.

### Core Requirements

**1. Authentication Context (`AuthProvider.jsx`)**
Implement a robust Context that handles:
*   **Strapi Synchronization (The Shadow User):**
    *   Upon Firebase login, check if the user exists in Strapi (filter by `firebase_uid`).
    *   If NOT exists: Create a new user in Strapi (store `email`, `firebase_uid`, `username`).
    *   If EXISTS: Fetch their profile (including `has_pin_setup` boolean).
*   **State Exposed:** `user` (Firebase object), `profile` (Strapi object), `loading`.

**2. The 6-Digit PIN System**
The app requires a PIN for security.
*   **Route Protection:**
    *   If user is logged in (Firebase) but `!profile.has_pin_setup` -> Redirect to `/setup-pin`.
    *   If user is logged in AND `profile.has_pin_setup` -> Redirect to `/verify-pin` (Session unlock).
*   **UI Component:** Create a `PinInput` component (6 boxes, auto-focus next input, accessible).

**3. Page Structure**
*   **Login/Signup:** Beautiful form with "Sign in with Google" and Email/Pass.
*   **Pin Setup:** "Create your 6-digit security PIN".
*   **Verify Pin:** "Welcome back, [Name]. Enter PIN to unlock."
*   **Main Layout:**
    *   **Header:** User Avatar & Name.
    *   **Content:** `<Outlet />`
    *   **Footer:** Fixed bottom nav (Home, History, Profile).

### Configuration
*   Use `axios` for Strapi calls.
*   Expect environment variables: `VITE_STRAPI_URL`, `VITE_FIREBASE_API_KEY`, etc.

### Task List
1.  Provide the `axios` instance setup (`src/lib/axios.js`).
2.  Provide the `AuthProvider.jsx` with the synchronization logic described above.
3.  Create the `PinInput` component (UI focus).
4.  Create the `RequireAuth` wrapper component for React Router 7 to handle the redirects logic.
5.  Create the `LoginPage.jsx` with high-end "Zen" styling using Tailwind 4.

Start by defining the Axios setup and the AuthProvider logic.
```
