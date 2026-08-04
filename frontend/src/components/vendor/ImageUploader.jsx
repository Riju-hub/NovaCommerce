import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Star, Link as LinkIcon, Image as ImageIcon, Sparkles, Cpu } from 'lucide-react';
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
    <div className="space-y-4 border border-slate-800 rounded-2xl p-5 bg-slate-950/60 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <label className="text-xs font-black text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
          <ImageIcon className="w-4 h-4" /> Product Media Matrix
        </label>
        <span className="text-[10px] font-mono font-bold text-slate-500 flex items-center gap-1">
          <Cpu className="w-3 h-3 text-indigo-400" /> Cloudinary CDN Ready
        </span>
      </div>

      {/* Drag and Drop Zone */}
      <div className="border-2 border-dashed border-slate-800 hover:border-indigo-500/60 rounded-2xl p-6 text-center bg-slate-900/40 hover:bg-slate-900/80 transition-all relative cursor-pointer group">
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/jpg"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
          <div className="p-3 bg-indigo-950/80 border border-indigo-800/50 text-indigo-400 rounded-2xl group-hover:scale-110 transition-transform shadow-inner">
            <Upload className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-white">
            Click or drag & drop files here to upload
          </p>
          <span className="text-[10px] font-mono text-slate-500">PNG, JPG, WEBP up to 5MB each</span>
        </div>
      </div>

      {/* External URL Attachment */}
      <div className="flex gap-2">
        <InputField
          placeholder="Or paste external image URL (https://...)"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          icon={LinkIcon}
          className="[&_label]:text-slate-300 [&_input]:!bg-slate-950 [&_input]:!text-slate-100 [&_input]:!placeholder-slate-500 [&_input]:!border-slate-800 focus-within:[&_input]:!border-indigo-500 focus-within:[&_input]:!ring-indigo-500/20"
        />
        <Button variant="outline" size="md" type="button" onClick={handleAddUrl} icon={Upload} className="shrink-0 border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-white cursor-pointer">
          Attach
        </Button>
      </div>

      {/* Image Grid Preview */}
      <AnimatePresence>
        {images.length > 0 || fileItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {images.map((imgUrl, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={`url-${index}`}
                className="relative group rounded-xl border border-slate-800 overflow-hidden bg-slate-950 aspect-square flex items-center justify-center"
              >
                <img src={imgUrl} alt={`Product ${index}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />

                {index === 0 && fileItems.length === 0 && (
                  <span className="absolute top-1.5 left-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-md shadow-md border border-indigo-400/30">
                    Primary
                  </span>
                )}

                <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {index !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleSetPrimaryExisting(index)}
                      title="Make Primary"
                      className="p-1.5 bg-slate-900 text-slate-200 border border-slate-700 rounded-lg hover:bg-amber-500 hover:text-white transition-colors cursor-pointer"
                    >
                      <Star className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveExistingUrl(index)}
                    title="Remove Image"
                    className="p-1.5 bg-slate-900 text-slate-200 border border-slate-700 rounded-lg hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}

            {fileItems.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={`file-${index}`}
                className="relative group rounded-xl border border-indigo-500/50 overflow-hidden bg-slate-950 aspect-square flex items-center justify-center"
              >
                <img src={item.previewUrl} alt={`New file ${index}`} className="w-full h-full object-cover" />

                <span className="absolute top-1.5 left-1.5 bg-amber-950/90 text-amber-300 border border-amber-800/60 text-[9px] font-mono font-bold px-2 py-0.5 rounded-md shadow-md">
                  Pending Sync
                </span>

                <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleRemoveFileItem(index)}
                    title="Remove File"
                    className="p-1.5 bg-slate-900 text-slate-200 border border-slate-700 rounded-lg hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="border border-slate-900 rounded-xl p-4 text-center text-xs text-slate-500 font-mono">
            No media attached. Upload files or paste image URLs above.
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUploader;