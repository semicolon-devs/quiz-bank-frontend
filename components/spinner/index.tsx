import React from "react";

export default function Spinner() {
  return (
    <div className="h-full w-full items-center justify-center">
      <div className="border-light h-16 w-16 animate-spin rounded-full border-6 border-t-blue-600" />
    </div>
  );
}
