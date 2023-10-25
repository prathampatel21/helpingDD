import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://yxxeykqqytazrtqgekup.supabase.co', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4eGV5a3FxeXRhenJ0cWdla3VwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODE2NDg3MiwiZXhwIjoyMDEzNzQwODcyfQ.d6NTLLcurXktkX1Su_uXU24nW-AwwZ2lmrqC2-ccvXQ");

async function insertUser(id, name, points = 0, contact = null, helper = null, completed_orders = null, in_progress = null) {
    if (id === undefined || name === undefined) {
        console.error('Error: id and name are required parameters.');
        return;
    }
    
    try {
        const { data, error } = await supabase
            .from('Users')
            .insert([
                { id: id, name: name, points: points, contact: contact, helper: helper, completed_orders: completed_orders, in_progress: in_progress }
            ]);

        if (error) {
            console.error('Error inserting data:', error);
        } else {
            console.log('Data inserted successfully:', data);
        }
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

async function fetchUsers() {

    try {
        const { data, error } = await supabase
        .from('Users')
        .select('*')      
        if (error) {
            console.error('Error fetching data:', error);
        } else {
            console.log('Data fetched successfully:', data);
            data.forEach(user => {
                console.log('User ID:', user.id);
                console.log('User name:', user.name);})
        }
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

insertUser(5, "tryingparamSub")
fetchUsers();
