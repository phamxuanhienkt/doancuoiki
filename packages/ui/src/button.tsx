"use client";
export const Button = ({ children, className }: any) => {
  return (
    <button className={className} onClick={() => alert(`Hello `)}>
      {children}
    </button>
  );
};
