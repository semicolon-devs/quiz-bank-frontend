import React from "react";

export default function Spinner() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-5 w-5 animate-spin rounded-full border-4 border-light border-t-blue-600"></div>
    </div>
  );
}