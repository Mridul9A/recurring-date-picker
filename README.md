# 📅 Recurring Date Picker Component

A reusable React component built with **Next.js App Router**, **Tailwind CSS**, and **Zustand** for selecting recurring dates with flexible rules. It includes a mini calendar preview to visually display selected recurring dates.

## 🧩 Features

- Select start and end dates
- Choose recurrence frequency: daily, weekly, monthly, yearly
- Set recurrence interval (e.g. every 2 weeks)
- For weekly frequency, select specific days (e.g. Mon/Wed/Fri)
- Calendar preview showing selected recurring dates
- Fully reusable and customizable for apps like event scheduling, tasks, reminders, etc.

---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **Date Management:** date-fns
- **Optional Date Picker:** react-datepicker

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Mridul9A/recurring-date-picker.git
cd recurring-date-picker

```
2. Install Dependencies
```
npm install
# or
yarn install
```

3. Run the Dev Server
```
npm run dev
# or
yarn dev
```
Open http://localhost:3000 in your browser.

## Folder Structure
```
src/
├── app/
│   └── page.tsx                # Main UI page with the component
├── components/
│   └── RecurringDatePicker.tsx # The main recurring date picker component
├── store/
│   └── recurrenceStore.ts       # Zustand store for managing recurrence state
```

## Dependencies
```
{
  "next": "14.x",
  "react": "18.x",
  "react-dom": "18.x",
  "zustand": "^4.x",
  "date-fns": "^3.x",
  "react-datepicker": "^4.x", // if you're using <DatePicker />
  "tailwindcss": "^3.x",
  "postcss": "^8.x",
  "autoprefixer": "^10.x",
  "typescript": "^5.x"
}
```
Install manually if needed:
```
npm install zustand date-fns react-datepicker
```
Tailwind setup:
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Usage
```
import RecurringDatePicker from "@/components/RecurringDatePicker";

export default function HomePage() {
  return (
    <main>
      <h1>Recurring Date Picker Demo</h1>
      <RecurringDatePicker />
    </main>
  );
}
```

## License
MIT License

## Author
Made with ❤️ by Mridul