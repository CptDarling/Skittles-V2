// login.js
const jwt = require('jsonwebtoken');

// Assuming user authentication is successful
const user = { id: 123, username: 'exampleUser' };
const token = jwt.sign(user, 'your-secret-key', { expiresIn: '1h' });

// Send the token to the client
// res.json({ token });
console.log({ token });
