import mongoose from 'mongoose';

const ROLES = ['User', 'Administrator', 'Moderator', 'Autor', 'Protected'];


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 15
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  },
  roles: {
    type: [
      {
        type: String,
        enum: ROLES
      }
    ],
    default: ['User']
  },
  isLocked: {
    type: Boolean,
    default: false
  },
  lastFailedLoginAttempt: {
    type: Date,
    default: null
  },
  failedLoginAttempts: {
    type: Number,
    default: 0
  }  
});

const User = mongoose.model('User', userSchema);

export default User

export {
  ROLES
}
