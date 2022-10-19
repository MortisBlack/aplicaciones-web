import WorkspaceRepository from "./src/data/repositories/Workspace.repository.js";
import BoardRepository from "./src/data/repositories/Board.repository.js";
import ColumnRepository from "./src/data/repositories/Column.repository.js";
import CardRepository from "./src/data/repositories/Card.repository.js";

import Workspace from "./src/domain/Workspace.js";
import Board from "./src/domain/Board.js";
import Column from "./src/domain/Column.js";
import Card from "./src/domain/Card.js";


const workspaceRepository = new WorkspaceRepository();
const boardRepository = new BoardRepository();
const columnRepository = new ColumnRepository();
const cardRepository = new CardRepository();



async function test(){
    let workspace = await testingWorkspaces();
    let board = await testingBoards(workspace);
    let column = await testingColumns(board);
    let card = await testingCards(column);
}

await test();


// Start test for workspaces
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
// End test for boards

// Start test for board

async function testingBoards(workspace){
    try{
        let result = await createBoard(workspace);
        await getBoard(result.id);
        await getAllBoards();
        await updateBoard(result.id);
        // await deleteBoard(result.id);
        return result;
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

    // console.log(board);
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

// End test for Boards

// Start test for columns
async function testingColumns(board){
    try{
        let result = await createColumn(board);
        await getColumn(result.id);
        await getAllColumns();
        await updateColumn(result.id);
        // await deleteColumn(result.id);
        return result;
    }catch(err){
        console.warn(err)
    }

}

async function createColumn(board){
    let column = new Column(undefined, "Test Column", board);

    column = await columnRepository.create(column);

    return column;
}

async function getColumn(id){
    let column = await columnRepository.findOne(id);

    // console.log(column);
}

async function getAllColumns(){
    let columns = await columnRepository.findAll();

    // console.log(columns);
}

async function updateColumn(id){
    let column = await columnRepository.findOne(id);

    column.name = "Updated Column";

    column = await columnRepository.update(column);

    // console.log(column);
}

async function deleteColumn(id){
    await columnRepository.delete(id);
}

// End test for columns

// Start test for cards

async function testingCards(column){
    try{
        let result = await createCard(column);
        await getCard(result.id);
        await getAllCards();
        await updateCard(result.id);
        await deleteCard(result.id);
        return result;
    }
    catch(err){
        console.warn(err)
    }
}

async function createCard(column){
    let card = new Card(undefined, "Test Card", "Test Card Description", new Date(), column);
    
    card = await cardRepository.create(card);

    return card;
}

async function getCard(id){
    let card = await cardRepository.findOne(id);

    console.log(card);
}

async function getAllCards(){
    let cards = await cardRepository.findAll();
    
    // console.log(cards);
}

async function updateCard(id){
    let card = await cardRepository.findOne(id);

    card.name = "Updated Card";
    card.description = "Updated Card Description";

    card.deadlineDate = new Date();

    card = await cardRepository.update(card);

    console.log(card);
}

async function deleteCard(id){
    await cardRepository.delete(id);
}

// End test for cards