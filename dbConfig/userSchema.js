import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
    required: true,
    validate: {
      validator: (value) =>
        /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,18}$/.test(value),
      message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.'
    },
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

userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

export default User

export {
  ROLES
}
