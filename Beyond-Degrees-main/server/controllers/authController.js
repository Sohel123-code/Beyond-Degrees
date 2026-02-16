import { findUserByEmail, registerUser, verifyUserPassword } from '../services/userService.js';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase.js';
import { createClient } from '@supabase/supabase-js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isValid = await verifyUserPassword(user, password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
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
                user_name: user.user_name,
                image: user.image || ''
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error: ' + error.message });
    }
};

export const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const user = await registerUser(email, password, name);

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.status(201).json({
            message: 'Registration successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                user_name: user.user_name,
                image: ''
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error: ' + error.message });
    }
};

export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const { data, error } = await supabase
            .from('USERS')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching profile:', error);
            return res.status(500).json({ error: 'Failed to fetch profile' });
        }

        res.json(data);
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        let { name, education, interests, social_links, image } = req.body;

        // Handle Image Upload to Supabase Storage
        if (image && image.startsWith('data:image')) {
            try {
                // Create service client for storage operations (Bypasses RLS)
                const serviceSupabase = createClient(
                    process.env.SUPABASE_URL,
                    process.env.SUPABASE_SERVICE_ROLE_KEY
                );

                // Extract file extension and base64 data
                const matches = image.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);

                if (matches && matches.length === 3) {
                    const fileExt = matches[1];
                    const base64Data = matches[2];
                    const buffer = Buffer.from(base64Data, 'base64');

                    const filePath = `profiles/${userId}/${Date.now()}.${fileExt}`;

                    // Upload to Supabase Storage using Service Role key
                    const { data: uploadData, error: uploadError } = await serviceSupabase
                        .storage
                        .from('profile-images') // Bucket name provided by user
                        .upload(filePath, buffer, {
                            contentType: `image/${fileExt}`,
                            upsert: true
                        });

                    if (uploadError) {
                        console.error('Supabase Storage Upload Error:', uploadError);
                        return res.status(500).json({ error: 'Failed to upload image to storage: ' + uploadError.message });
                    }

                    // Get Public URL
                    const { data: urlData } = supabase
                        .storage
                        .from('profile-images')
                        .getPublicUrl(filePath);

                    image = urlData.publicUrl; // Update image variable with the new URL
                }
            } catch (imageError) {
                console.error('Image processing error:', imageError);
                return res.status(500).json({ error: 'Failed to process image' });
            }
        }

        const { data, error } = await supabase
            .from('USERS')
            .update({
                user_name: name, // Map name to user_name
                education,
                interests,
                'Social Links': social_links, // Map social_links to 'Social Links' column
                image
            })
            .eq('id', userId)
            .select()
            .single();

        if (error) {
            console.error('Error updating profile:', error);
            return res.status(500).json({ error: 'Failed to update profile' });
        }

        res.json({ message: 'Profile updated', user: data });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
