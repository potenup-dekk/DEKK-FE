"use client";

interface LayoutBodyClientProps {
  children: React.ReactNode;
}

const LayoutBodyClient = ({ children }: LayoutBodyClientProps) => {
  return <div className="flex min-h-0 flex-1 pb-20">{children}</div>;
};

export default LayoutBodyClient;
