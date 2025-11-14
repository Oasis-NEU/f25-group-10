import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import { categories } from '../data/mockData';

const PostItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    condition: '',
    location: '',
    description: '',
  });
  const [imagePreview, setImagePreview] = useState(null);

  const conditions = ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'];
  const locations = ['North Campus', 'South Campus', 'East Campus', 'West Campus', 'Central Library'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app, this would send to backend
    console.log('Posting item:', formData);
    alert('Item posted successfully!');
    navigate('/profile');
  };

  const isFormValid = formData.title && formData.price && formData.category && 
                      formData.condition && formData.location && formData.description;

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#0D1B2A] mb-2">Post a New Item</h1>
          <p className="text-gray-600">Fill in the details to list your item</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <label className="block text-lg font-semibold text-[#0D1B2A] mb-4">
              Item Photo
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#4ECDC4] transition-colors">
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div>
                  <div className="text-6xl mb-4">📸</div>
                  <p className="text-gray-600 mb-4">Click to upload or drag and drop</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="inline-block bg-[#4ECDC4] text-white px-6 py-2 rounded-lg font-semibold cursor-pointer hover:bg-[#4ECDC4]/90 transition-colors"
                  >
                    Choose Image
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-white rounded-xl p-6 shadow-md space-y-4">
            <h3 className="text-lg font-semibold text-[#0D1B2A] mb-4">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Mid-Century Modern Desk"
                required
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4ECDC4]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0"
                required
                min="0"
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4ECDC4]"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4ECDC4]"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition *
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4ECDC4]"
                >
                  <option value="">Select condition</option>
                  {conditions.map(cond => (
                    <option key={cond} value={cond}>{cond}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meet-up Location *
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4ECDC4]"
              >
                <option value="">Select location</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your item in detail..."
              required
              rows="6"
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4ECDC4]"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`flex-1 py-4 rounded-xl font-semibold transition-all ${
                isFormValid
                  ? 'bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Post Item
            </button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
};

export default PostItem;