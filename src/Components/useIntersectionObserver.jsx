import { useCallback, useEffect, useRef, useState } from 'react';

export function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const observer = useRef(null);
  const ref = useRef(null);
  
  const setRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    if (node) {
      observer.current = new IntersectionObserver(
        ([entry]) => {
          const isIntersecting = entry.isIntersecting && entry.intersectionRatio > 0.2;
          setIsVisible((prev) => {
            // Only update state if it changed
            if (prev !== isIntersecting) return isIntersecting;
            return prev;
          });
        },
        {
          threshold: [0.2],
          rootMargin: '0px 0px 0px 0px',
          ...options,
        }
      );
      observer.current.observe(node);
    }
    ref.current = node;
  }, [options]);
  
  useEffect(() => {
    return () => {
      if (observer.current && ref.current) {
        observer.current.unobserve(ref.current);
        observer.current.disconnect();
      }
    };
  }, []);
  
  return [setRef, isVisible];
}