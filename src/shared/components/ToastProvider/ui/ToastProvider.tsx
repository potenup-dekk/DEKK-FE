"use client";

import { Toaster } from "sonner";

const ToastProvider = () => {
  return (
    <Toaster
      position="top-center"
      richColors
      closeButton
      toastOptions={{
        className: "text-sm",
      }}
    />
  );
};

export default ToastProvider;
