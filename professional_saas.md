# Mobile App UX/UI Overhaul: "Professional SaaS Standard"

**Context:** We have a functional Expo/React Native app (as seen in current screenshots) for staff users to manage appointments.
**Problem:** The current UI is structurally weak, visually outdated, the dark mode is too harsh, and the navigation is broken.
**Goal:** Refactor the entire UI layer to match a high-fidelity, modern SaaS design system (similar to Linear/Raycast mobile apps), focusing on the "Emerald & Zinc" theme established in our web specs.

---

## Design System Rules (Apply Globally)

1.  **Color Palette (NativeWind/Tailwind):**
    - **Backgrounds:** Stop using pure black/dark blue. Use `bg-zinc-50` for light mode background, and `bg-zinc-950` for dark mode background. Cards should be `bg-white` (light) and `bg-zinc-900` (dark).
    - **Primary Brand Color:** Use **Emerald-600** (`text-emerald-600`, `bg-emerald-600`) for primary actions, active tab icons, and accents.
    - **Text:** Use `text-zinc-900` for headings, `text-zinc-500` for secondary info.

2.  **Typography & Spacing:**
    - Use a clean, modern sans-serif font.
    - Increase padding inside cards (`p-5`). Don't let text touch the edges.
    - Use `rounded-2xl` or `rounded-3xl` for cards and buttons for a friendlier, modern feel.

3.  **Navigation (CRITICAL FIX):**
    - Replace the current custom bottom bar with a standard **Bottom Tab Navigator** (using Expo Router's tabs).
    - **Tabs:**
        1.  **Takvim (Home):** Icon: `Calendar` (Lucide/Feather).
        2.  **Profil (Profile):** Icon: `User`.
    - Active tab color must be Emerald-600.

---

## Screen-Specific Refactoring Instructions

### 1. Home Screen (Appointments) - The "Cockpit"
*Refactor the list view into a timeline view.*

- **Header:** Remove the large "Randevularım" title and the top filter pills (Tümü, Beklemede...).
- **Date Navigator (New):** Implement a horizontal, swipeable date strip at the top (e.g., "Pzt 12", "Sal 13"). The current day should be highlighted in Emerald.
- **Body (Timeline):** Below the dates, show a vertical list of hours (09:00, 10:00...).
- **Appointment Cards:**
    - Place appointment cards next to their corresponding time slots.
    - **Card Style:** Clean `bg-white/bg-zinc-900` card with a subtle shadow (`shadow-sm`).
    - **Indicator:** Add a thin vertical colored strip on the left edge of the card to indicate status (Emerald for "Onaylandı", Amber for "Beklemede").
    - **Content:** Make the Customer Name and Service bold (`font-semibold`). Show the exact time range clearly.

### 2. Profile Screen
*Clean up and modernize.*

- **Avatar:** Keep it large, but ensure it's centered nicely.
- **Info Cards:** Merge the separate info cards into one cohesive section or a grouped list style (like iOS settings).
- **Logout Button:** Change the large red primary button to a **Ghost Button** or a simple list item row with red text ("Çıkış Yap") to reduce visual aggression.

**Execution Strategy:**
Start by setting up the new Bottom Tab Navigation structure. Then, overhaul the Home Screen into the new Timeline/Date-strip layout using NativeWind for styling.