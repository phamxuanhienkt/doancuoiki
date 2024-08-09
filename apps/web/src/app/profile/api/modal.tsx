import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-8 rounded-2xl shadow-lg w-1/3 relative">
        <button className="absolute top-2 right-2 text-white text-2xl" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-2xl text-white mb-4">{title}</h2>
        {children}
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-full text-gray-700 hover:bg-gray-400">Cancel</button>
          <button onClick={onSave} className="px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700">Save</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
