import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const ROLES = ['User', 'Administrator', 'Moderator', 'Autor'];


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
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,18}/.test(value),
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
