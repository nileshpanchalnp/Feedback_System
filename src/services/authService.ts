// import { User } from '../types';

// // Mock authentication service
// // In a real app, this would make HTTP requests to a backend
// export const mockLogin = async (email: string, password: string): Promise<{ token: string; user: User }> => {
//   // Simulate API call delay
//   await new Promise(resolve => setTimeout(resolve, 800));
  
//   // Simple validation
//   if (!email || !password) {
//     throw new Error('Email and password are required');
//   }
  
//   // Check for valid credentials (in a real app, this would be done on the server)
//   if (password.length < 6) {
//     throw new Error('Invalid credentials');
//   }
  
//   // Mock user and token
//   const user: User = {
//     id: '1',
//     email,
//     name: email.split('@')[0], // Extract name from email
//   };
  
//   // Generate a mock token (in a real app, this would come from the server)
//   const token = `mock-jwt-token-${Math.random().toString(36).substr(2, 9)}`;
  
//   return { token, user };
// };