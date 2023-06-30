const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

//static signup method
userSchema.statics.register = async function(email, password) {
  if (!email || ! password) {
    throw Error('All fields must be filled');
  }
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough');
  }

  const exist = await this.findOne({ email });
  if (exist) {
    throw Error('Email already exists');
  };

  const salt = await bcrypt.genSalt(10);             //salt basically adds extra strings to the end of the password before hashing for more pass protection
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

//static login method
userSchema.statics.login = async function(email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled');
  }
  
  const user = await this.findOne({ email });

  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
}

userSchema.statics.update = async function(email, password, user_id) {
  if (!email || ! password) {
    throw Error('All fields must be filled');
  }

  if (!validator.isEmail(email)) {
    throw Error('Email is not valid');
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough');
  }

  const found = await this.find({ _id: user_id });
  let foundEmail = found[0].email;
  let foundPassword = found[0].password;
  
  const match = await bcrypt.compare(password, foundPassword);

  if (foundEmail === email && match) {
    throw Error ('No Updates Required; No changes found');
  }

  if (match) {
    throw Error ('Password cannot be the same as last password');
  };

  const salt = await bcrypt.genSalt(10);          
  const hash = await bcrypt.hash(password, salt);

  const user = { email, password: hash };

  return user; 
} 
 
module.exports = mongoose.model('User', userSchema);;