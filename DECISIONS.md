# Decision Log - Woolong ROI

## 2026-02-05: Selection of Tech Stack (Expo & Supabase)

**Decision:** Use Expo (React Native) for the frontend and Supabase for the backend.

**Rationale:** * **Expo:** Allows for rapid mobile development and easy testing on physical devices via the Expo Go app. NativeWind (Tailwind CSS) will be used for styling to ensure a professional, responsive UI.
* **Supabase:** Provides an "all-in-one" solution for Authentication and PostgreSQL database management. Its Row Level Security (RLS) features are critical for protecting user profit data with minimal backend configuration.

**Alternatives Considered:** * **Vanilla React (Web):** Rejected because resellers need a mobile-first tool to use while "in the field" at thrift stores.
* **Firebase:** Rejected in favor of Supabase’s relational database (PostgreSQL), which handles complex "Inventory" and "Category" relationships more effectively than a NoSQL structure.