const express = require('express');
const cors = require('cors');
require('dotenv').config();

const todosRoutes = require('./routes/todos');
const summarizeRoutes = require('./routes/summarize');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/todos', todosRoutes);
app.use('/', summarizeRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
