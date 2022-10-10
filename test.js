import WorkspaceRepository from "./src/data/repositories/Workspace.repository.js";
import Workspace from "./src/domain/Workspace.js";

const workspaceRepository = new WorkspaceRepository();



async function testing(){
    try{
        await createWorkspace();
        console.log('Workspace created')
    }catch(err){
        console.warn(err)
    }

}

await testing()

async function createWorkspace(){
    let workspace = new Workspace(undefined, "Test Workspace", "Test Workspace Description");

    workspace = await workspaceRepository.create(workspace);

    console.log(workspace);
}