import { supabase } from '../config/supabase.js';
import bcrypt from 'bcrypt';

export const findUserByEmail = async (email) => {
    const { data, error } = await supabase
        .from('USERS')
        .select('*')
        .eq('email', email)
        .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is for no rows returned
        console.error('Error finding user:', error);
        throw error;
    }
    return data;
};

export const registerUser = async (email, password, name) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const { data, error } = await supabase
        .from('USERS')
        .insert([{
            email,
            user_name: name || '',
            password: hashedPassword
        }])
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const verifyUserPassword = async (user, password) => {
    if (!user || !user.password) return false;
    return await bcrypt.compare(password, user.password);
};
