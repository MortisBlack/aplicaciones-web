import WorkspaceRepository from "./src/data/repositories/Workspace.repository.js";
import BoardRepository from "./src/data/repositories/Board.repository.js";
import Workspace from "./src/domain/Workspace.js";
import Board from "./src/domain/Board.js";

const workspaceRepository = new WorkspaceRepository();
const boardRepository = new BoardRepository();



async function test(){
    let workspace = await testingWorkspaces();
    
    // console.table(workspace);
    await testingBoards(workspace);
}

await test();

async function testingWorkspaces(){
    try{
        let result = await createWorkspace();
        await getWorkspace(result.id);
        await getAllWorkspaces();
        await updateWorkspace(result.id);
        // await deleteWorkspace(result.id);
        return result;
    }catch(err){
        console.warn(err)
    }

}


async function createWorkspace(){
    let workspace = new Workspace(undefined, "Test Workspace", "Test Workspace Description");

    workspace = await workspaceRepository.create(workspace);

    return workspace;
}

async function getWorkspace(id){
    let workspace = await workspaceRepository.findOne(id);

    // console.log(workspace);
}

async function getAllWorkspaces(){
    let workspaces = await workspaceRepository.findAll();

    // console.log(workspaces);
}

async function updateWorkspace(id){
    let workspace = await workspaceRepository.findOne(id);

    workspace.name = "Updated Workspace";
    workspace.description = "Updated Workspace Description";

    workspace = await workspaceRepository.update(workspace);

    // console.log(workspace);
}

async function deleteWorkspace(id){
    await workspaceRepository.delete(id);
}


/* Test for Boards */

async function testingBoards(workspace){
    try{
        let result = await createBoard(workspace);
        await getBoard(result.id);
        await getAllBoards();
        await updateBoard(result.id);
        await deleteBoard(result.id);
    }catch(err){
        console.warn(err)
    }

}


async function createBoard(workspace){
    let board = new Board(undefined, "Test Board", "Test Board Description", workspace);

    board = await boardRepository.create(board);

    return board;
}

async function getBoard(id){
    let board = await boardRepository.findOne(id);

    console.log(board);
}

async function getAllBoards(){
    let boards = await boardRepository.findAll();

    // console.log(boards);
}

async function updateBoard(id){
    let board = await boardRepository.findOne(id);

    board.name = "Updated Board";
    board.description = "Updated Board Description";

    board = await boardRepository.update(board);

    // console.log(board);
}

async function deleteBoard(id){
    await boardRepository.delete(id);
}
