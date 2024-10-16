import { useSearchParams } from 'react-router-dom';

const CategoryPage = () => {
  const [searchParams] = useSearchParams();
  const selectedValue = searchParams.get('selectedvalue');

  return (
    <div>
      <h1>Selected Category: {selectedValue}</h1>
      {/* Render content based on the selected category */}
    </div>
  );
};

export default CategoryPage