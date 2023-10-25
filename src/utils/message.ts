export async function createMessageHandler(username: string, message: string) {
    const data = {
        username: username,
        content:  message
    };
    try {
        const response = await fetch("http://localhost:5000/chat/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.log('Error occured when creating user');
        throw error;
    }
}

export async function getMessageHandler(){
    try {
        const response = await fetch("http://localhost:5000/chat/messages", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    } catch (error) {
        console.log('Error occured when getting messages');
        throw error;
    }
}

export async function getAllVotes(username: string){
    try {
        const response = await fetch(`http://localhost:5000/chat/votes/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    } catch (error) {
        console.log('Error occured when getting messages');
        throw error;
    }
}


export async function getVoteHandler(username: string, messageId: string, action: string){
    try {
        const response = await fetch("http://localhost:5000/chat/vote", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, messageId, action })
        });
        return await response.json();
    } catch (error) {
        console.log('Error occured when getting messages');
        throw error;
    }
}
