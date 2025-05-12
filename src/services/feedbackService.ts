import axios from 'axios';
import { Feedback } from '../types';
import { Server } from '../SERVER/server';

const API_BASE_URL = 'http://localhost:8000'; 



export const getUserFeedback = async (userId: string): Promise<Feedback[]> => {
  try {
    const response = await axios.get(Server+`Feedback/fbget/${userId}`);
    console.log("api are right or ",Server+`Feedback/fbget/${userId}`)
    console.log("Feedback response:", response.data); // ✅ Check full response
     return response.data.feedbacks; 
  } catch (error: any) {
    console.error('Error fetching feedback:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch feedback');
  }
};

// Submit new feedback
export const submitFeedback = async (
  eventId: string,
  rating: number,
  comment: string
): Promise<Feedback> => {
  try {
    const token = localStorage.getItem('token');
    console.log("event id",eventId)
    console.log("rating id",rating)
    console.log("comment id",comment)
    const response = await axios.post(
        Server + "Feedback/fbcreate/",
      { eventId, rating, comment },
      
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

// Update existing feedback
export const updateFeedback = async (
  feedbackId: string,
  rating: number,
  comment: string
): Promise<Feedback> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      `${API_BASE_URL}/${feedbackId}`,
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

// Delete feedback
export const deleteFeedback = async (feedbackId: string): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_BASE_URL}/${feedbackId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error: any) {
    console.error('Error deleting feedback:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete feedback');
  }
};
