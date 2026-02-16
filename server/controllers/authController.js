import { findUserByEmail, registerUser, verifyUserPassword } from '../services/userService.js';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        let user = await findUserByEmail(email);

        if (user) {
            // Existing user: Verify password
            const isValid = await verifyUserPassword(user, password);
            if (!isValid) {
                return res.status(401).json({ error: 'Invalid password' });
            }
        } else {
            // New user: Register (Create with password)
            user = await registerUser(email, password, name);
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                user_name: user.user_name
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error: ' + error.message });
    }
};
