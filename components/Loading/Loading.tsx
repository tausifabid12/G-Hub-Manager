import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center space-x-2 h-[500px] w-full">
      <div className="w-6 h-6 rounded-full animate-pulse bg-primary"></div>
      <div className="w-6 h-6 rounded-full animate-pulse bg-primary"></div>
      <div className="w-6 h-6 rounded-full animate-pulse bg-primary"></div>
    </div>
  );
};

export default Loading;
