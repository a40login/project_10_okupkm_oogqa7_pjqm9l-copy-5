import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-flowhero-dark">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">FlowHero.AI wird geladen...</h1>
      </div>
    </div>
  );
};

export default Index;
