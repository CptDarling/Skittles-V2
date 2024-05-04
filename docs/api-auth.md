[1]: https://medium.com/ms-club-of-sliit/jwt-bearer-token-authentication-for-express-js-5e95bf4dead0 ""
[2]: https://github.com/passport/express-4.x-http-bearer-example ""
[3]: https://developer.auth0.com/resources/guides/api/express/basic-authorization ""
[4]: https://auth0.com/blog/introducing-oauth2-express-sdk-protecting-api-with-jwt/ ""
[5]: https://stackoverflow.com/questions/46094417/authenticating-the-request-header-with-express ""

Certainly! **Bearer token authentication** is a common approach for securing APIs. Let's explore how you can implement it in an **Express.js** application.

1. **What is Bearer Token Authentication?**
   - Bearer token authentication involves including a token (usually a **JSON Web Token (JWT)**) in the `Authorization` header of an HTTP request.
   - The server validates the token to ensure the user's identity and permissions.

2. **Setting Up Bearer Token Authentication in Express.js:**
   - First, install the necessary dependencies:
     ```bash
     npm install express jsonwebtoken
     ```
   - Next, create an **authentication middleware** that verifies the token:
     ```javascript
     // authMiddleware.js
     const jwt = require('jsonwebtoken');

     function authenticateToken(req, res, next) {
       const token = req.headers.authorization?.split(' ')[1]; // Extract token from header

       if (!token) {
         return res.status(401).json({ message: 'Unauthorized' });
       }

       try {
         const decoded = jwt.verify(token, 'your-secret-key'); // Verify token
         req.user = decoded; // Attach user info to request object
         next();
       } catch (error) {
         return res.status(403).json({ message: 'Invalid token' });
       }
     }

     module.exports = authenticateToken;
     ```

3. **Using the Middleware in Your Routes:**
   - Apply the `authenticateToken` middleware to specific routes that require authentication:
     ```javascript
     // routes.js
     const express = require('express');
     const router = express.Router();
     const authenticateToken = require('./authMiddleware');

     // Protected route
     router.get('/profile', authenticateToken, (req, res) => {
       // Access user info from req.user
       res.json({ username: req.user.username });
     });

     // Other routes...
     ```

4. **Generating JWT Tokens:**
   - When a user logs in or registers, create a JWT token and send it to the client:
     ```javascript
     // login.js
     const jwt = require('jsonwebtoken');

     // Assuming user authentication is successful
     const user = { id: 123, username: 'exampleUser' };
     const token = jwt.sign(user, 'your-secret-key', { expiresIn: '1h' });

     // Send the token to the client
     res.json({ token });
     ```

5. **Client-Side Usage:**
   - Include the token in subsequent requests' `Authorization` header:
     ```
     GET /profile
     Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     ```

6. **Resources:**
   - You can find more examples and detailed documentation in the following resources:
     - [JWT Bearer token authentication for Express JS](https://medium.com/ms-club-of-sliit/jwt-bearer-token-authentication-for-express-js-5e95bf4dead0) ¹[1].
     - [GitHub Example: Express 4.x HTTP Bearer Authentication](https://github.com/passport/express-4.x-http-bearer-example) ²[2].
     - [Auth0 Developer Resources: Node.js API Authorization By Example](https://developer.auth0.com/resources/guides/api/express/basic-authorization) ³[3].
     - [Auth0 Blog: Introducing the OAuth 2.0 Express SDK for Protecting APIs with JWT](https://auth0.com/blog/introducing-oauth2-express-sdk-protecting-api-with-jwt/) ⁴[4].

Remember to replace `'your-secret-key'` with an actual secret key and adapt the code to your specific use case. Happy coding! 🚀

Source: Conversation with Bing, 29/04/2024
(1) JWT Bearer token authentication for Express JS - Medium. https://medium.com/ms-club-of-sliit/jwt-bearer-token-authentication-for-express-js-5e95bf4dead0.
(2) passport/express-4.x-http-bearer-example - GitHub. https://github.com/passport/express-4.x-http-bearer-example.
(3) Node.js API Authorization By Example - Auth0 Developer Resources. https://developer.auth0.com/resources/guides/api/express/basic-authorization.
(4) Introducing the OAuth 2.0 Express SDK for Protecting APIs with JWT .... https://auth0.com/blog/introducing-oauth2-express-sdk-protecting-api-with-jwt/.
(5) Authenticating the request header with Express - Stack Overflow. https://stackoverflow.com/questions/46094417/authenticating-the-request-header-with-express.