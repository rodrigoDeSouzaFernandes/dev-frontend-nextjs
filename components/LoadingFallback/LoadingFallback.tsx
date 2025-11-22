import React from "react";
import { Spinner } from "../ui/spinner";

interface LoadingFallbackProps {
  message?: string;
}

const LoadingFallback: React.FC<LoadingFallbackProps> = ({
  message = "Loading",
}) => {
  return (
    <div className="flex justify-center items-center fixed w-full inset-0 bg-white/50 z-[10]">
      <Spinner className="w-8 h-8 text-primary animate-spin" />
      <span className="sr-only">{message}</span>
    </div>
  );
};

export default LoadingFallback;
