
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Check if we're running as an extension popup or a regular web page
const isExtension = window.location.protocol === 'moz-extension:' || 
                   window.location.protocol === 'chrome-extension:';

// Initialize the app
const init = () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    createRoot(rootElement).render(<App />);
  }
};

// In extension context, render immediately
// For web page context, wait for DOMContentLoaded
if (isExtension) {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
