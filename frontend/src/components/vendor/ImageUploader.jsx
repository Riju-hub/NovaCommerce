import React, { useState } from 'react';
import { Upload, X, Star, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import InputField from '../common/InputField';
import Button from '../common/Button';

const ImageUploader = ({ images = [], fileItems = [], onChange }) => {
  const [urlInput, setUrlInput] = useState('');

  const handleAddUrl = () => {
    if (!urlInput.trim()) return;
    onChange([...images, urlInput.trim()], fileItems);
    setUrlInput('');
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newFileItems = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    onChange(images, [...fileItems, ...newFileItems]);
  };

  const handleRemoveExistingUrl = (index) => {
    const updatedUrls = images.filter((_, i) => i !== index);
    onChange(updatedUrls, fileItems);
  };

  const handleRemoveFileItem = (index) => {
    const updatedFiles = fileItems.filter((_, i) => i !== index);
    onChange(images, updatedFiles);
  };

  const handleSetPrimaryExisting = (index) => {
    const selected = images[index];
    const filtered = images.filter((_, i) => i !== index);
    onChange([selected, ...filtered], fileItems);
  };

  return (
    <div className="space-y-4 border border-slate-200 rounded-lg p-4 bg-white">
      <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
        Product Media
      </label>

      <div className="border-2 border-dashed border-slate-200 rounded-lg p-5 text-center hover:bg-slate-50 transition-colors relative cursor-pointer">
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/jpg"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center justify-center gap-2 text-slate-500">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-full">
            <ImageIcon className="w-5 h-5" />
          </div>
          <p className="text-xs font-medium text-slate-700">
            Click or drag & drop files here to upload to Cloudinary
          </p>
          <span className="text-[10px] text-slate-400">PNG, JPG, WEBP up to 5MB each</span>
        </div>
      </div>

      <div className="flex gap-2">
        <InputField
          placeholder="Or paste external image URL (https://...)"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          icon={LinkIcon}
        />
        <Button variant="outline" size="md" type="button" onClick={handleAddUrl} icon={Upload}>
          Attach
        </Button>
      </div>

      {images.length > 0 || fileItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {images.map((imgUrl, index) => (
            <div
              key={`url-${index}`}
              className="relative group rounded-lg border border-slate-200 overflow-hidden bg-slate-100 aspect-square flex items-center justify-center"
            >
              <img src={imgUrl} alt={`Product ${index}`} className="w-full h-full object-cover" />

              {index === 0 && fileItems.length === 0 && (
                <span className="absolute top-1 left-1 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                  Primary
                </span>
              )}

              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => handleSetPrimaryExisting(index)}
                    title="Make Primary"
                    className="p-1.5 bg-white text-slate-800 rounded-full hover:bg-amber-400 hover:text-white transition-colors"
                  >
                    <Star className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveExistingUrl(index)}
                  title="Remove Image"
                  className="p-1.5 bg-white text-slate-800 rounded-full hover:bg-red-600 hover:text-white transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {fileItems.map((item, index) => (
            <div
              key={`file-${index}`}
              className="relative group rounded-lg border border-blue-300 overflow-hidden bg-slate-100 aspect-square flex items-center justify-center"
            >
              <img src={item.previewUrl} alt={`New file ${index}`} className="w-full h-full object-cover" />

              <span className="absolute top-1 left-1 bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                Pending Upload
              </span>

              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handleRemoveFileItem(index)}
                  title="Remove File"
                  className="p-1.5 bg-white text-slate-800 rounded-full hover:bg-red-600 hover:text-white transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-slate-100 rounded-lg p-4 text-center text-xs text-slate-400">
          No images added yet. Upload files or paste links above.
        </div>
      )}
    </div>
  );
};

export default ImageUploader;