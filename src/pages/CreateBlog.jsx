import React, { useState, useRef } from "react";
import { FaGlobe } from "react-icons/fa6";
import { Editor } from "primereact/editor";
import {
  Upload,
  ImageIcon,
  Tag,
  Save,
  X,
  Plus,
  FileText,
  Send,
  Hash,
  Clock,
  Zap,
  BookOpen,
} from "lucide-react";
import { createBlog } from "../services/apiCalls/blogCall";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "Technology",
    tags: [],
    status: "draft",
    featuredImage: null,
    relatedCourses: [],
  });

  const [newTag, setNewTag] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [wordCount, setWordCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const categories = [
    "Technology",
    "Programming",
    "Web Development",
    "Data Science",
    "AI/ML",
    "Business",
    "Career",
    "Other",
  ];

  // Helper function to strip HTML tags and count words
  const getWordCount = (htmlContent) => {
    const textContent = htmlContent
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return textContent ? textContent.split(" ").length : 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Calculate reading time for content (if it's the regular inputs)
    if (name === "content") {
      const words = value.split(/\s+/).filter((word) => word.length > 0).length;
      setWordCount(words);
      setReadingTime(Math.ceil(words / 200));
    }
  };

  // Handle editor content change
  const handleEditorChange = (e) => {
    const content = e.htmlValue || "";
    setFormData((prev) => ({
      ...prev,
      content: content,
    }));

    // Clear content error when user starts typing
    if (errors.content) {
      setErrors((prev) => ({
        ...prev,
        content: "",
      }));
    }

    // Calculate word count and reading time
    const words = getWordCount(content);
    setWordCount(words);
    setReadingTime(Math.ceil(words / 200));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setErrors((prev) => ({
          ...prev,
          featuredImage: "Image size should be less than 5MB",
        }));
        return;
      }
      setFormData((prev) => ({
        ...prev,
        featuredImage: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      // Clear error
      if (errors.featuredImage) {
        setErrors((prev) => ({
          ...prev,
          featuredImage: "",
        }));
      }
    }
  };

  console.log("imagePreview", imagePreview);

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim().toLowerCase())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim().toLowerCase()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 200) {
      newErrors.title = "Title must be less than 200 characters";
    }

    if (
      !formData.content.trim() ||
      formData.content === "<p><br></p>" ||
      formData.content === "<p></p>"
    ) {
      newErrors.content = "Content is required";
    }

    if (formData.excerpt && formData.excerpt.length > 300) {
      newErrors.excerpt = "Excerpt must be less than 300 characters";
    }

    if (!formData.featuredImage) {
      newErrors.featuredImage = "Featured image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    try {
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("content", formData.content);
      submitData.append("excerpt", formData.excerpt);
      submitData.append("category", formData.category);
      submitData.append("tags", JSON.stringify(formData.tags));
      submitData.append("status", formData.status);
      submitData.append("image", formData.featuredImage);

      // Here you would make the API call to create the blog
      const response = await createBlog(submitData);
      // Reset form or redirect
      setFormData({
        title: "",
        content: "",
        excerpt: "",
        category: "",
        tags: [],
        status: "",
        featuredImage: null,
      });
       navigate(`/blogs/${response.slug}`);
    } catch (error) {
      console.error("Error creating blog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Custom editor toolbar
  const editorHeader = (
    <span className="ql-formats">
      <button className="ql-bold" aria-label="Bold"></button>
      <button className="ql-italic" aria-label="Italic"></button>
      <button className="ql-underline" aria-label="Underline"></button>
      <button className="ql-strike" aria-label="Strike"></button>
      <select
        className="ql-header"
        defaultValue=""
        onChange={(e) => e.persist()}
      >
        <option value="1"></option>
        <option value="2"></option>
        <option value="3"></option>
        <option value=""></option>
      </select>
      <select className="ql-font" defaultValue="" onChange={(e) => e.persist()}>
        <option value=""></option>
        <option value="serif"></option>
        <option value="monospace"></option>
      </select>
      <select className="ql-size" defaultValue="" onChange={(e) => e.persist()}>
        <option value="small"></option>
        <option value=""></option>
        <option value="large"></option>
        <option value="huge"></option>
      </select>
      <button
        className="ql-list"
        value="ordered"
        aria-label="Ordered List"
      ></button>
      <button
        className="ql-list"
        value="bullet"
        aria-label="Unordered List"
      ></button>
      <button className="ql-link" aria-label="Insert Link"></button>
      <button className="ql-image" aria-label="Insert Image"></button>
      <button className="ql-code-block" aria-label="Insert Code Block"></button>
      <button className="ql-blockquote" aria-label="Insert Blockquote"></button>
      <select
        className="ql-align"
        defaultValue=""
        onChange={(e) => e.persist()}
      >
        <option value=""></option>
        <option value="center"></option>
        <option value="right"></option>
        <option value="justify"></option>
      </select>
      <select className="ql-color" defaultValue="">
        <option value=""></option>
        {/* Black & White */}
        <option value="#000000"></option>
        <option value="#ffffff"></option>
        {/* Grays */}
        <option value="#1f2937"></option>
        <option value="#374151"></option>
        <option value="#4b5563"></option>
        <option value="#6b7280"></option>
        <option value="#9ca3af"></option>
        <option value="#d1d5db"></option>
        <option value="#e5e7eb"></option>
        <option value="#f3f4f6"></option>
        {/* Reds */}
        <option value="#7f1d1d"></option>
        <option value="#dc2626"></option>
        <option value="#ef4444"></option>
        <option value="#f87171"></option>
        {/* Oranges */}
        <option value="#9a3412"></option>
        <option value="#ea580c"></option>
        <option value="#f97316"></option>
        <option value="#fb923c"></option>
        {/* Yellows */}
        <option value="#a16207"></option>
        <option value="#d97706"></option>
        <option value="#f59e0b"></option>
        <option value="#fbbf24"></option>
        {/* Greens */}
        <option value="#14532d"></option>
        <option value="#15803d"></option>
        <option value="#16a34a"></option>
        <option value="#22c55e"></option>
        {/* Blues */}
        <option value="#1e3a8a"></option>
        <option value="#1d4ed8"></option>
        <option value="#2563eb"></option>
        <option value="#3b82f6"></option>
        {/* Purples */}
        <option value="#581c87"></option>
        <option value="#7c3aed"></option>
        <option value="#8b5cf6"></option>
        <option value="#a855f7"></option>
        {/* Pinks */}
        <option value="#be185d"></option>
        <option value="#ec4899"></option>
      </select>

      <select className="ql-background" defaultValue="">
        <option value=""></option>
        {/* Light Grays */}
        <option value="#f9fafb"></option>
        <option value="#f3f4f6"></option>
        <option value="#e5e7eb"></option>
        <option value="#d1d5db"></option>
        <option value="#f8fafc"></option>
        <option value="#f1f5f9"></option>
        <option value="#e2e8f0"></option>
        <option value="#cbd5e1"></option>
        {/* Light Blues */}
        <option value="#eff6ff"></option>
        <option value="#dbeafe"></option>
        <option value="#bfdbfe"></option>
        <option value="#93c5fd"></option>
        <option value="#f0f9ff"></option>
        <option value="#e0f2fe"></option>
        <option value="#b3e5fc"></option>
        {/* Light Greens */}
        <option value="#f0fdf4"></option>
        <option value="#dcfce7"></option>
        <option value="#bbf7d0"></option>
        <option value="#86efac"></option>
        <option value="#ecfdf5"></option>
        <option value="#d1fae5"></option>
        {/* Light Yellows */}
        <option value="#fefce8"></option>
        <option value="#fef3c7"></option>
        <option value="#fde68a"></option>
        <option value="#fffbeb"></option>
        <option value="#fef7cd"></option>
        {/* Light Oranges */}
        <option value="#fff7ed"></option>
        <option value="#fed7aa"></option>
        <option value="#fdba74"></option>
        {/* Light Reds */}
        <option value="#fef2f2"></option>
        <option value="#fecaca"></option>
        <option value="#fca5a5"></option>
        {/* Light Purples */}
        <option value="#faf5ff"></option>
        <option value="#e9d5ff"></option>
        <option value="#c4b5fd"></option>
      </select>

      <button className="ql-clean" aria-label="Remove Styles"></button>
    </span>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white relative">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-60 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(99, 69, 241, .6) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-[#6366F1] rounded-full animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-3 h-3 bg-[#EC4899] rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-2 h-2 bg-[#10B981] rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-3 h-3 bg-[#8B5CF6] rounded-full animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      {/* Header */}
      <header className="relative pt-12 pb-8">
        <div className="max-w-4xl mx-auto px-6">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#6366F1]/20 rounded-full">
              <Zap className="w-4 h-4 text-[#6366F1]" />
              <span className="text-sm font-medium text-gray-300">
                Create Story
              </span>
              <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              <span className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
                Create
              </span>{" "}
              <span className="text-white">Amazing</span>
              <br />
              <span className="bg-gradient-to-r from-[#10B981] to-[#6366F1] bg-clip-text text-transparent">
                Content
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Share your knowledge and inspire others with compelling stories
              and insights.
            </p>
          </div>
        </div>
      </header>

      {/* Main Form */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="space-y-8">
          {/* Featured Image Upload */}
          <div className="relative bg-gradient-to-br from-[#1A1A1A]/90 to-[#0F0F0F]/80 backdrop-blur-sm border border-richblue-300/70 rounded-2xl md:p-8 p-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="md:p-[11px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-xl">
                <ImageIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Featured Image</h2>
                <p className="text-gray-400 text-sm">
                  Upload a compelling cover image for your article
                </p>
              </div>
            </div>

            <div className="relative">
              {!imagePreview ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-richblack-400 rounded-xl p-1 md:p-12 text-center cursor-pointer hover:border-[#6366F1] transition-colors group"
                >
                  <div className="flex flex-col items-center">
                    <div className="p-4 bg-gray-800 rounded-full group-hover:bg-[#6366F1]/5 transition-colors mb-4">
                      <Upload className="w-8 h-8 text-gray-400 group-hover:text-[#6366F1] transition-colors" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">
                      Upload Featured Image
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Click to browse or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-60 md:h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData((prev) => ({ ...prev, featuredImage: null }));
                    }}
                    className="absolute top-4 right-4 p-2 bg-pink-500/80 hover:bg-pink-500 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-4 left-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm hover:bg-white/30 transition-colors"
                  >
                    Change Image
                  </button>
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            {errors.featuredImage && (
              <p className="text-pink-400 text-sm mt-2">
                {errors.featuredImage}
              </p>
            )}
          </div>

          {/* Title and Basic Info */}
          <div className="relative bg-gradient-to-br from-[#1A1A1A]/90 to-[#0F0F0F]/80 backdrop-blur-sm border border-richblue-300/70 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-[#EC4899] to-[#F472B6] rounded-xl">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Article Details</h2>
                <p className="text-gray-400 text-sm">
                  Basic information about your article
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Article Title <span className="text-[#FF0000]">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter an engaging title for your article..."
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-richblack-500 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#6366F1] transition-colors"
                />
                <div className="flex justify-between items-center mt-2">
                  {errors.title && (
                    <p className="text-pink-400 text-sm">{errors.title}</p>
                  )}
                  <p className="text-gray-500 text-xs text-right ml-auto">
                    {formData.title.length}/200 characters
                  </p>
                </div>
              </div>

              {/* Category and Tags Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category <span className="text-[#FF0000]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-richblack-500 rounded-xl text-white focus:outline-none focus:border-[#6366F1] transition-colors appearance-none cursor-pointer"
                    >
                      {categories.map((category) => (
                        <option
                          key={category}
                          value={category}
                          className="bg-[#1A1A1A]"
                        >
                          {category}
                        </option>
                      ))}
                    </select>
                    <Hash className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-richblack-500 rounded-xl text-white focus:outline-none focus:border-[#6366F1] transition-colors appearance-none cursor-pointer"
                    >
                      <option value="draft" className="bg-[#1A1A1A]">
                        Draft
                      </option>
                      <option value="published" className="bg-[#1A1A1A]">
                        Published
                      </option>
                    </select>
                    <FaGlobe className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Excerpt <span className="text-[#FF0000]">*</span>
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Write a brief summary of your article..."
                  rows={3}
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-richblack-500 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#6366F1] transition-colors resize-none"
                />
                <div className="flex justify-between items-center mt-2">
                  {errors.excerpt && (
                    <p className="text-pink-400 text-sm">{errors.excerpt}</p>
                  )}
                  <p className="text-gray-500 text-xs text-right ml-auto">
                    {formData.excerpt.length}/300 characters
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="relative bg-gradient-to-br from-[#1A1A1A]/90 to-[#0F0F0F]/80 backdrop-blur-sm border border-richblue-300/70 rounded-2xl md:p-8 p-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-xl">
                <Hash className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Tags</h2>
                <p className="text-gray-400 text-sm">
                  Add relevant tags to help readers find your content
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {formData.tags.map((tag, index) => {
                const tagColors = [
                  "from-[#6366F1]/20 to-[#8B5CF6]/10 border-[#6366F1]/30 text-[#A5B4FC]",
                  "from-[#EC4899]/20 to-[#F472B6]/10 border-[#EC4899]/30 text-[#FBCFE8]",
                  "from-[#10B981]/20 to-[#34D399]/10 border-[#10B981]/30 text-[#A7F3D0]",
                  "from-[#F59E0B]/20 to-[#FBBF24]/10 border-[#F59E0B]/30 text-[#FDE68A]",
                ];
                const colorClass = tagColors[index % tagColors.length];

                return (
                  <span
                    key={index}
                    className={`inline-flex items-center gap-2 md:px-3 px-1.5  py-1 md:py-2 bg-gradient-to-r ${colorClass} border rounded-full text-sm font-medium backdrop-blur-sm`}
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-pink-400 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                );
              })}
            </div>

            <div className="flex gap-1 md:gap-2 ">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag..."
                className="md:flex-1 md:px-4 px-2.5 py-2 md:py-3 bg-[#0A0A0A] border border-richblack-500 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#6366F1] transition-colors"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
              />
              <button
                type="button"
                onClick={addTag}
                className="md:px-6 px-1.5 py-.5 rounded-full md:py-3 bg-gradient-to-r from-[#10B981] to-[#34D399] text-white md:rounded-xl hover:shadow-lg hover:shadow-[#10B981]/25 transition-all duration-300 flex items-center gap-2 "
              >
                <Plus className="w-4 h-4" />
                <span className=" hidden md:block">Add</span>
              </button>
            </div>
          </div>

          {/* Content Editor with PrimeReact Editor */}
          <div className="relative bg-gradient-to-br from-[#1A1A1A]/90 to-[#0F0F0F]/80 backdrop-blur-sm border border-richblue-300/70 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6 flex-col md:flex-row gap-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] rounded-xl">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Content</h2>
                  <p className="text-gray-400 text-sm">
                    Write your article content using the rich text editor
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{readingTime}m read</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>{wordCount} words</span>
                </div>
              </div>
            </div>

            <div className="editor-container">
              <Editor
                value={formData.content}
                onTextChange={handleEditorChange}
                headerTemplate={editorHeader}
                style={{
                  height: "600px",
                  backgroundColor: "#0A0A0A",
                  color: "white",
                  border: "1px solid #374151",
                  borderRadius: "12px",
                }}
                placeholder="Start writing your article content here..."
              />
            </div>

            {errors.content && (
              <p className="text-pink-400 text-sm mt-2">{errors.content}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, status: "draft" }))
              }
              className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <Save className="w-5 h-5" />
              Save as Draft
            </button>

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-8 py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-xl hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 flex items-center gap-2 justify-center "
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Publishing...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Publish Article
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Animation for form sections */
        .relative.bg-gradient-to-br {
          animation: fadeInUp 0.6s ease-out both;
        }

        .relative.bg-gradient-to-br:nth-child(2) {
          animation-delay: 0.1s;
        }

        .relative.bg-gradient-to-br:nth-child(3) {
          animation-delay: 0.2s;
        }

        .relative.bg-gradient-to-br:nth-child(4) {
          animation-delay: 0.3s;
        }

        .relative.bg-gradient-to-br:nth-child(5) {
          animation-delay: 0.4s;
        }

        .relative.bg-gradient-to-br:nth-child(6) {
          animation-delay: 0.5s;
        }

        /* Improved focus states */
        input:focus,
        textarea:focus,
        select:focus {
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        /* PrimeReact Editor Dark Theme Styling */
        .editor-container  {
          background-color: #0a0a0a !important;
          border: 1px solid #374151 !important;
          // border-radius: 12px !important;
          overflow: hidden;
        }

        .editor-container .p-editor-toolbar {
          background-color: #1a1a1a !important;
          border-bottom: 1px solid #374151 !important;
          padding: 12px 16px !important;
        }

        .editor-container .p-editor-content {
          background-color: #0a0a0a !important;
          color: white !important;
          min-height: 350px !important;
        }

        .editor-container .p-editor-content .ql-editor {
          color: white !important;
          font-size: 16px !important;
          line-height: 1.6 !important;
          padding: 24px !important;
        }

        .editor-container .p-editor-content .ql-editor.ql-blank::before {
          color: #9ca3af !important;
          font-style: italic !important;
        }

        .editor-container .ql-toolbar button,
        .editor-container .ql-toolbar select {
          color: #d1d5db !important;
          border: 1px solid #374151 !important;
          background-color: #111827 !important;
          border-radius: 6px !important;
          margin: 2px !important;
          padding: 4px 8px !important;
        }

        .editor-container .ql-toolbar button:hover,
        .editor-container .ql-toolbar select:hover {
          background-color: #6366f1 !important;
          color: white !important;
          border-color: #6366f1 !important;
        }

        .editor-container .ql-toolbar button.ql-active {
          background-color: #6366f1 !important;
          color: white !important;
          border-color: #6366f1 !important;
        }

        .editor-container .ql-toolbar select option {
          background-color: #1a1a1a !important;
          color: white !important;
        }

        .editor-container .ql-snow .ql-stroke {
          stroke: #d1d5db !important;
        }

        .editor-container .ql-snow .ql-fill {
          fill: #d1d5db !important;
        }

        .editor-container .ql-snow.ql-toolbar button:hover .ql-stroke,
        .editor-container .ql-snow .ql-toolbar button.ql-active .ql-stroke {
          stroke: white !important;
        }

        .editor-container .ql-snow.ql-toolbar button:hover .ql-fill,
        .editor-container .ql-snow .ql-toolbar button.ql-active .ql-fill {
          fill: white !important;
        }

        /* Custom scrollbar for editor */
        .editor-container .ql-editor {
          scrollbar-width: thin;
          scrollbar-color: #6366f1 #1a1a1a;
        }

        .editor-container .ql-editor::-webkit-scrollbar {
          width: 8px;
        }

        .editor-container .ql-editor::-webkit-scrollbar-track {
          background: #1a1a1a;
          border-radius: 4px;
        }

        .editor-container .ql-editor::-webkit-scrollbar-thumb {
          background: #6366f1;
          border-radius: 4px;
        }

        .editor-container .ql-editor::-webkit-scrollbar-thumb:hover {
          background: #8b5cf6;
        }

        /* Focus state for editor */
        .editor-container .p-editor:focus-within {
          border-color: #6366f1 !important;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1) !important;
        }

        /* Gradient border animation for image upload */
        .border-dashed:hover::before {
          content: "";
          position: absolute;
          inset: -2px;
          background: linear-gradient(
            45deg,
            #6366f160,
            #8b5cf670,
            #ec489965,
            #10b98175
          );
          border-radius: 12px;
          z-index: -1;
          opacity: 0.3;
        }

        /* Enhanced tag animations */
        .inline-flex.items-center.gap-2:hover {
          transform: translateY(-2px);
          transition: all 0.2s ease;
        }

        /* Loading state for submit button */
        .disabled\\:opacity-50:disabled {
          pointer-events: none;
        }

        /* Enhanced button hover effects */
        button:hover {
          transform: translateY(-1px);
          transition: all 0.2s ease;
        }

        button:active {
          transform: translateY(0);
        }

        /* File input styling improvements */
        .cursor-pointer:hover .group-hover\\:border-\\[\\#6366F1\\] {
          border-color: #6366f1;
        }

        .cursor-pointer:hover .group-hover\\:bg-\\[\\#6366F1\\]\\/20 {
          background-color: rgba(99, 102, 241, 0.2);
        }

        .cursor-pointer:hover .group-hover\\:text-\\[\\#6366F1\\] {
          color: #6366f1;
        }

        /* Dark theme for editor dropdown menus */
        .ql-picker-options {
          background-color: #1a1a1a !important;
          border: 1px solid #374151 !important;
          border-radius: 8px !important;
        }

        .ql-picker-item {
          color: #d1d5db !important;
        }

        .ql-picker-item:hover {
          background-color: #6366f1 !important;
          color: white !important;
        }

        /* Custom styles for different heading levels in editor */
        .editor-container .ql-editor h1 {
          font-size: 2em !important;
          font-weight: bold !important;
          margin: 16px 0 !important;
          color: #f3f4f6 !important;
        }

        .editor-container .ql-editor h2 {
          font-size: 1.5em !important;
          font-weight: bold !important;
          margin: 14px 0 !important;
          color: #f3f4f6 !important;
        }

        .editor-container .ql-editor h3 {
          font-size: 1.25em !important;
          font-weight: bold !important;
          margin: 12px 0 !important;
          color: #f3f4f6 !important;
        }

        .editor-container .ql-editor blockquote {
          border-left: 4px solid #6366f1 !important;
          background-color: #1a1a1a !important;
          padding: 16px !important;
          margin: 16px 0 !important;
          font-style: italic !important;
          color: #d1d5db !important;
        }

        .editor-container .ql-editor code {
          background-color: #1a1a1a !important;
          color: #10b981 !important;
          padding: 2px 6px !important;
          border-radius: 4px !important;
          font-family: "Courier New", monospace !important;
        }

        .editor-container .ql-editor pre {
          background-color: #1a1a1a !important;
          color: #d1d5db !important;
          padding: 16px !important;
          border-radius: 8px !important;
          border: 1px solid #374151 !important;
          overflow-x: auto !important;
        }

        .editor-container .ql-editor ul li,
        .editor-container .ql-editor ol li {
          color: #f3f4f6 !important;
          margin: 4px 0 !important;
        }

        .editor-container .ql-editor a {
          color: #6366f1 !important;
          text-decoration: underline !important;
        }

        .editor-container .ql-editor a:hover {
          color: #8b5cf6 !important;
        }
      `}</style>
    </div>
  );
}
export default CreateBlog;
