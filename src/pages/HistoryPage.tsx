import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Feedback } from '../types';
import {
  getUserFeedback,
  updateFeedback,
  deleteFeedback
} from '../services/feedbackService';
import FeedbackItem from '../components/FeedbackItem';
import Navbar from '../components/Navbar';


const HistoryPage: React.FC = () => {

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]); // Ensure feedbacks is always an array
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  const userId = localStorage.getItem("id");

  useEffect(() => {
    if (!userId) {
      setError('User not logged in');
      setLoading(false);
      return;
    }

    const fetchFeedback = async () => {
      setLoading(true);
      try {
        const data = await getUserFeedback(userId);
        setFeedbacks(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error('Error fetching feedback:', err);
        setError('Failed to load your feedback history. Please try again later.');
        toast.error('Failed to load feedback history');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [userId]);

  const handleEditFeedback = async (id: string, rating: number, comment: string) => {
    try {
      const updated = await updateFeedback(id, rating, comment); // API call

      setFeedbacks(prev =>
        prev.map(f =>
          f.id === id
            ? {
              ...f,
              rating: updated.rating,
              comment: updated.comment,
              updatedAt: updated.updatedAt || new Date().toISOString(),
            }
            : f
        )
      );

      toast.success('Feedback updated successfully!');
    } catch (err: any) {
      console.error('Error updating feedback:', err);
      toast.error(err.message || 'Failed to update feedback. Please try again.');
    }
  };

  const handleDeleteFeedback = async (id: string) => {
    try {
      await deleteFeedback(id);
      setFeedbacks(prev => prev.filter(f => f._id !== id));
      toast.success('Feedback deleted successfully!');
    } catch (err: any) {
      console.error('Error deleting feedback:', err);
      toast.error(err?.message || 'Failed to delete feedback. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Feedback History</h1>
          <p className="mt-2 text-lg text-gray-600">
            View, edit, or delete your previous feedback
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-pulse-slow flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-primary-200 mb-4"></div>
              <div className="h-4 w-32 bg-primary-100 rounded"></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-error-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Try Again
            </button>
          </div>
        ) : feedbacks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm p-8">
            <p className="text-gray-600 mb-4">You haven't submitted any feedback yet.</p>
            <a
              href="/feedback"
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 inline-block"
            >
              Submit Feedback
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {feedbacks.map((feedback) => (
              <FeedbackItem
                key={feedback.id}
                feedback={feedback}
                onEdit={handleEditFeedback}
                onDelete={handleDeleteFeedback}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HistoryPage;
