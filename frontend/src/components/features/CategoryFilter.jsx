import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div className="mb-12">
      <h3 className="text-lg font-light text-black mb-4 text-center tracking-wide">Categories</h3>
      <div className="flex flex-wrap gap-6 justify-center">
        <button
          onClick={() => onCategorySelect(null)}
          className={`pb-2 font-light transition-all text-sm tracking-wide ${
            selectedCategory === null
              ? 'text-black border-b-2 border-black'
              : 'text-gray-500 hover:text-black'
          }`}
        >
          All Items
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.name)}
            className={`pb-2 font-light transition-all text-sm tracking-wide ${
              selectedCategory === category.name
                ? 'text-black border-b-2 border-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;