import WorkspaceRepository from "./src/data/repositories/Workspace.repository.js";
import Workspace from "./src/domain/Workspace.js";

const workspaceRepository = new WorkspaceRepository();



async function testingWorkspaces(){
    try{
        let result = await createWorkspace();
        await getWorkspace(result.id);
        await getAllWorkspaces();
        await updateWorkspace(result.id);
        await deleteWorkspace(result.id);
    }catch(err){
        console.warn(err)
    }

}

await testingWorkspaces()

async function createWorkspace(){
    let workspace = new Workspace(undefined, "Test Workspace", "Test Workspace Description");

    workspace = await workspaceRepository.create(workspace);

    return workspace;
}

async function getWorkspace(id){
    let workspace = await workspaceRepository.findOne(id);

    console.log(workspace);
}

async function getAllWorkspaces(){
    let workspaces = await workspaceRepository.findAll();

    console.log(workspaces);
}

async function updateWorkspace(id){
    let workspace = await workspaceRepository.findOne(id);

    workspace.name = "Updated Workspace";
    workspace.description = "Updated Workspace Description";

    workspace = await workspaceRepository.update(workspace);

    console.log(workspace);
}

async function deleteWorkspace(id){
    await workspaceRepository.delete(id);
}