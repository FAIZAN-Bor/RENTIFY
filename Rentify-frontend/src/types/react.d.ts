import 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

// Re-declare React namespace to fix module resolution
declare module 'react' {
  namespace React {
    type ReactNode = import('react').ReactNode;
  }
}

export {};
