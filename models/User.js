import mongoose from 'mongoose';

// Define the User schema
const userSchema = new mongoose.Schema({
  username:{type: String, required: true},
  email:{type: String, required: true},
  uid:{type: String, required: true},
 
  // Add other fields as necessary
});

// Create the User model
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
