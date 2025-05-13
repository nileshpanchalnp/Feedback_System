import axios from 'axios';
import { Feedback } from '../types';
import { Server } from '../SERVER/server';

// GET FEEDBACK API 
export const getUserFeedback = async (userId: string): Promise<Feedback[]> => {
  try {
    const response = await axios.get(Server+`Feedback/fbget/${userId}`);
     return response.data.feedbacks; 
  } catch (error: any) {
    console.error('Error fetching feedback:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch feedback');
  }
};

// CREATE FEEDBACK API 
export const submitFeedback = async (
  eventId: string,
  rating: number,
  comment?: string 
): Promise<Feedback> => {
  try {
    const token = localStorage.getItem('token');

    // Build payload dynamically
    const payload: any = { eventId, rating };
    if (comment && comment.trim() !== '') {
      payload.comment = comment;
    }

    const response = await axios.post(
      Server + "Feedback/fbcreate/",
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.feedback;
  } catch (error: any) {
    console.error('Error submitting feedback:', error);
    throw new Error(error.response?.data?.message || 'Failed to submit feedback');
  }
};

// UPDATE FEEDBACK API 
export const updateFeedback = async (
  feedbackId: string,
  rating: number,
  comment: string
): Promise<Feedback> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      Server+`Feedback/fbupdate/${feedbackId}`, // e.g., Feedback/123
      { rating, comment },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.feedback;
  } catch (error: any) {
    console.error('Error updating feedback:', error);
    throw new Error(error.response?.data?.message || 'Failed to update feedback');
  }
};

// DELETE FEEDBACK API
export const deleteFeedback = async (feedbackId: string): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(Server+`Feedback/fbdelete/${feedbackId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error: any) {
    console.error('Error deleting feedback:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete feedback');
  }
};