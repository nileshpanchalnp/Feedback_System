import React, { useState } from 'react';
import { Pencil, Trash2, X, Check, Calendar } from 'lucide-react';
import { Feedback } from '../types';
import StarRating from './StarRating';

interface FeedbackItemProps {
  feedback: Feedback;
  onEdit: (id: string, rating: number, comment: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({ feedback, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(feedback.rating);
  const [comment, setComment] = useState(feedback.comment);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setRating(feedback.rating);
    setComment(feedback.comment);
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    setIsSubmitting(true);
    try {
      await onEdit(feedback.id, rating, comment);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(feedback.id);
    } catch (error) {
      console.error('Error deleting feedback:', error);
      setShowDeleteConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-4 sm:p-5 border-b border-gray-200 bg-primary-50">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-primary-900">{feedback.eventName}</h3>
          
          {!isEditing && !showDeleteConfirm && (
            <div className="flex space-x-2">
              <button
                onClick={handleEditClick}
                className="p-1 rounded text-gray-500 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                aria-label="Edit feedback"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={handleDeleteClick}
                className="p-1 rounded text-gray-500 hover:text-error-600 hover:bg-error-50 transition-colors"
                aria-label="Delete feedback"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>
        
        <div className="flex items-center mt-1 text-sm text-gray-500">
          <Calendar size={14} className="mr-1" />
          <span>{formatDate(feedback.createdAt)}</span>
        </div>
      </div>
      
      <div className="p-4 sm:p-5">
        {showDeleteConfirm ? (
          <div className="space-y-4">
            <p className="text-gray-700">Are you sure you want to delete this feedback?</p>
            <div className="flex space-x-3">
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-error-600 text-white rounded-md hover:bg-error-700 focus:outline-none focus:ring-2 focus:ring-error-500 focus:ring-opacity-50 transition-colors"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
              <button
                onClick={handleCancelDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Rating
              </label>
              <StarRating onChange={setRating} initialRating={rating} />
            </div>
            
            <div>
              <label htmlFor={`edit-comment-${feedback.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Comments
              </label>
              <textarea
                id={`edit-comment-${feedback.id}`}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50 bg-gray-50 p-2 border"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleSaveEdit}
                disabled={isSubmitting}
                className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-colors"
              >
                <Check size={16} className="mr-1" />
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={handleCancelEdit}
                disabled={isSubmitting}
                className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition-colors"
              >
                <X size={16} className="mr-1" />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-3">
              <StarRating initialRating={feedback.rating} onChange={() => {}} readonly size={20} />
            </div>
            {feedback.comment ? (
              <p className="text-gray-700">{feedback.comment}</p>
            ) : (
              <p className="text-gray-500 italic">No comments provided.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackItem;