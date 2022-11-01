const BASE_URL = 'http://localhost:3000';


window.onload = async () {
    // get pending tasks
    const pendingTasks = await getPendingTasks();
}

async function getPendingTasks(){
    const response = await fetch();
    const pendingTasks = await response.json();
    return pendingTasks;
}