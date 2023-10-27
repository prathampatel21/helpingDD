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

async function createRequest(id, start=null, end=null, order_info=null, status="active", dorm, requester, deliverer=null) {

    try {
        const { data, error } = await supabase
        .from('Requests')
        .insert([{id: id, start: start, end: end, order_info: order_info, status: status, dorm: dorm, requester: requester, deliverer: deliverer}])      
        if (error) {
            console.error('Error fetching data:', error);
        } else {
            console.log('Request inserted successfully:', data);
        }
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

async function acceptRequest(id, deliverer) {

    try {
        const { data, error } = await supabase
        .from('Requests')
        .update({status: "accepted", deliverer: deliverer})  
        .eq('id', id);    
        if (error) {
            console.error('Error accepting request:', error);
        } else {
            console.log('Request accepted successfully:', data);
        }
    } catch (error) {
        console.error('Error accepting request:', error);
    }
}

async function finishRequest(id) {

    try {
        const { data, error } = await supabase
        .from('Requests')
        .update({status: "completed"})  
        .eq('id', id);    
        if (error) {
            console.error('Error finishing request:', error);
        } else {
            console.log('Request finished:', data);
        }
    } catch (error) {
        console.error('Error finishing request:', error);
    }
}

async function addPoints(x_id, x) {

    try {
        const { data, error } = await supabase
        .rpc('increments', {i: x_id, pts: x}) 
        if (error) {
            console.error('Error adding points:', error);
        } else {
            console.log('Points added:', data);
        }
    } catch (error) {
        console.error('Error adding points:', error);
    }
}

async function fetchRequests() {

    try {
        const { data, error } = await supabase
        .from('Requests')
        .select('*')      
        if (error) {
            console.error('Error fetching data:', error);
        } else {
            console.log('Data fetched successfully:', data);
            data.forEach(request => {
                console.log('Request ID:', request.id);
                console.log('Request Info:', request.order_info)
                console.log('Request Status:', request.status);})
        }
    } catch (error) {
        console.error('Error fetching requests:', error);
    }
}

async function getNameById(id) {
    try {
        const { data, error } = await supabase
            .from('Users')
            .select('name')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching user name:', error);
            return null;
        } else {
            return data.name;
        }
    } catch (error) {
        console.error('Error fetching user name:', error);
        return null;
    }
}

async function getRequests(delivererName) {
    try {
        const { data, error } = await supabase
            .from('Requests')
            .select('*')
            .eq('deliverer', delivererName);

        if (error) {
            console.error('Error fetching requests:', error);
            return null;
        } else {
            return data;
        }
    } catch (error) {
        console.error('Error fetching requests:', error);
        return null;
    }
}

async function getRequestsByRequester(requesterName) {
    try {
        const { data, error } = await supabase
            .from('Requests')
            .select('*')
            .eq('requester', requesterName);

        if (error) {
            console.error('Error fetching requests:', error);
            return null;
        } else {
            return data;
        }
    } catch (error) {
        console.error('Error fetching requests:', error);
        return null;
    }
}

//insertUser(5, "tryingparamSub")
//fetchUsers();
//createRequest(1, "chase", "hojo", null, "active", "hojo", "auggie")
