import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-flowhero-dark p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-flowhero-orange mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-6">Diese Seite existiert nicht oder ist noch in der Entwicklung.</p>
        <Button asChild>
          <Link to="/">Zurück zum Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
