import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <Toaster
          position="top-center"
          reverseOrder={true}
          toastOptions={{
            className: "rounded", 
            success: {
              className: "", // Toast background
              iconTheme: {
                primary: '#198754',   // This changes the BG of the check (Tailwind emerald-500)
                secondary: '#FFFFFF', // This changes the color of the checkmark itself
              },
            },
            error: {
              className: "", // Toast background
              iconTheme: {
                primary: '#EF4444',   // This changes the BG of the X (Tailwind red-500)
                secondary: '#FFFFFF', // This changes the color of the X itself
              },
            },
          }}
        />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
