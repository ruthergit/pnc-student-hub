// components/SlimProgressBar.jsx
import { useState, useEffect } from 'react';
import useLoadingStore from '../store/useLoadingStore';

const SlimProgressBar = () => {
  const isLoading = useLoadingStore((state: any) => state.isLoading);
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let interval;

    if (isLoading) {
      setVisible(true);
      setWidth(5);

      interval = setInterval(() => {
        setWidth((prev) => {
          if (prev >= 90) return prev;
          // Slowly trickle
          return prev + Math.random() * 2;
        });
      }, 300);
    } else {
      // Finish the animation
      setWidth(100);
      const timer = setTimeout(() => {
        setVisible(false);
        // Reset after fade out
        setTimeout(() => setWidth(0), 200);
      }, 500);
      
      return () => clearTimeout(timer);
    }

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!visible && width === 0) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-9999 pointer-events-none">
      <div
        className={`h-1 bg-green-500 transition-all duration-500 ease-out ${
          !visible ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ 
          width: `${width}%`,
          boxShadow: width > 0 && width < 100 ? '0 0 8px #2563eb' : 'none'
        }}
      />
    </div>
  );
};

export default SlimProgressBar;