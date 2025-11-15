import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import { getCategories, createListing } from '../api';

// We still use a local list of conditions/locations
const conditions = ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'];
const locations = [
  'North Campus',
  'South Campus',
  'East Campus',
  'West Campus',
  'Central Library',
];

const PostItem = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    condition: '',
    location: '',
    description: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Lazy-load categories when needed (first render)
  React.useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data || []);
      } catch (err) {
        console.error('Failed to load categories', err);
        setCategories([]);
      }
    };
    loadCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // base64 data URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setSubmitting(true);

    try {
      // For now, send imagePreview as image field directly
      await createListing({
        title: formData.title,
        price: Number(formData.price),
        category: formData.category,
        condition: formData.condition,
        location: formData.location,
        description: formData.description,
        image: imagePreview, // backend should store as image_url
      });
      alert('Item posted successfully!');
      navigate('/profile');
    } catch (err) {
      console.error('Failed to post item', err);
      alert('Failed to post item. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const isFormValid =
    formData.title &&
    formData.price &&
    formData.category &&
    formData.condition &&
    formData.location &&
    formData.description;

  return (
    <PageContainer>
      <div
        className="min-h-screen flex justify-center items-start"
        style={{ background: 'white' }}
      >
        <div className="max-w-3xl w-full px-6 py-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-light text-black mb-2">
              Post a New Item
            </h1>
            <p className="text-gray-600 font-light">
              Fill in the details to list your item
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload */}
            <div className="bg-white p-6">
              <label className="block text-lg font-light text-black mb-4">
                Item Photo
              </label>
              <div className="border-2 border-dashed border-gray-300 p-8 text-center hover:border-black transition-colors">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-64 mx-auto"
                    />
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="absolute top-2 right-2 bg-black text-white p-2 hover:bg-gray-800"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600 font-light mb-4">
                      Click to upload or drag and drop
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="inline-block bg-black text-white px-6 py-2 font-light cursor-pointer hover:bg-gray-800 transition-colors"
                    >
                      Choose Image
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="bg-white p-6 space-y-6">
              <h3 className="text-lg font-light text-black mb-6">
                Basic Information
              </h3>

              <div>
                <label className="block text-sm font-light text-gray-700 mb-2">
                  Item Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Mid-Century Modern Desk"
                  required
                  className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black font-light"
                />
              </div>

              <div>
                <label className="block text-sm font-light text-gray-700 mb-2">
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
                  className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black font-light"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black font-light"
                  >
                    <option value="">Select category</option>
                    {(categories || []).map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-light text-gray-700 mb-2">
                    Condition *
                  </label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black font-light"
                  >
                    <option value="">Select condition</option>
                    {conditions.map((cond) => (
                      <option key={cond} value={cond}>
                        {cond}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-light text-gray-700 mb-2">
                  Meet-up Location *
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black font-light"
                >
                  <option value="">Select location</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6">
              <label className="block text-sm font-light text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your item in detail..."
                required
                rows="6"
                className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black font-light"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 bg-gray-200 text-gray-700 py-4 font-light hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormValid || submitting}
                className={`flex-1 py-4 font-light transition-all ${
                  isFormValid && !submitting
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {submitting ? 'Posting...' : 'Post Item'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageContainer>
  );
};

export default PostItem;
