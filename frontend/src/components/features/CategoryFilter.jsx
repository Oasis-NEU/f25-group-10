import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-semibold text-[#0D1B2A] mb-4">Categories</h3>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onCategorySelect(null)}
          className={`px-5 py-3 rounded-full font-medium transition-all ${
            selectedCategory === null
              ? 'bg-[#0D1B2A] text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          All Items
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.name)}
            className={`px-5 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
              selectedCategory === category.name
                ? 'bg-[#4ECDC4] text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-xl">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;