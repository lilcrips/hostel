// vite.config.js
// Vite is our development server and build tool.
// The React plugin lets Vite understand JSX (HTML-like code inside JavaScript).
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
