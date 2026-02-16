import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from api directory or current directory
dotenv.config({ path: path.resolve(__dirname, 'api', '.env') });
// Fallback if that didn't work (depending on where script is run)
if (!process.env.SUPABASE_URL) {
    dotenv.config();
}

console.log('Connecting to:', process.env.SUPABASE_URL);

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const inspect = async () => {
    console.log('Fetching one user...');
    const { data, error } = await supabase
        .from('USERS')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error:', error);
        return;
    }

    if (data && data.length > 0) {
        console.log('User found. Column keys:', Object.keys(data[0]));
        console.log('Sample data:', data[0]);
    } else {
        console.log('No users found. Creating a dummy user to check schema if possible, or just listing empty result.');
        // If no users, we might need to try to insert with a known column to see what happens, or just ask user.
        // But usually there are users from previous tests.
    }
};

inspect();
