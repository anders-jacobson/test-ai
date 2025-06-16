import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        base: '1rem', // 16px minimum for accessibility
      },
      borderRadius: {
        DEFAULT: '0.65rem',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        destructive: 'var(--destructive)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        // Chart colors
        chart1: 'var(--chart-1)',
        chart2: 'var(--chart-2)',
        chart3: 'var(--chart-3)',
        chart4: 'var(--chart-4)',
        chart5: 'var(--chart-5)',
        // Sidebar
        sidebar: 'var(--sidebar)',
        sidebarForeground: 'var(--sidebar-foreground)',
        sidebarPrimary: 'var(--sidebar-primary)',
        sidebarPrimaryForeground: 'var(--sidebar-primary-foreground)',
        sidebarAccent: 'var(--sidebar-accent)',
        sidebarAccentForeground: 'var(--sidebar-accent-foreground)',
        sidebarBorder: 'var(--sidebar-border)',
        sidebarRing: 'var(--sidebar-ring)',
      },
    },
  },
  plugins: [forms, typography],
};

export default config;
