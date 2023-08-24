require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/book');
const app = express();

const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI); // Corrected the environment variable name
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  }
};

app.get('/', (req, res) => {
  res.send({ title: 'Books' });
});

app.get('/add-note', async (req, res) => {
  try {
    await Book.insertMany([
      {
        title: "The Hunger Games",
        body: "Body text goes here"
      },
      {
        title: 'games of thrones',
        body: 'body text goes here',
      }
    ]);
    res.send("Notes added successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
