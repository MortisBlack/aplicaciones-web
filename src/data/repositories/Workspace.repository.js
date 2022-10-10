import Workspace from '../../models/Workspace.js';
import WorkspaceBO from '../../domain/Workspace.js';

export default class WorkspaceRepository {


    async create(workspace) {
        
        const result = await Workspace.create({
            title: workspace.title,
            description: workspace.description
        });

        return new WorkspaceBO(result.id, result.title, result.description, result.workspace);
    }

    async update(workspace) {

        if(board.id === undefined){
            throw new Error('id is undefined');
        }

        
        const result = await Workspace.update(board, {
            where: {
                id: board.id
            }
        });
        return new WorkspaceBO(result.id, result.title, result.description, result.workspace);
    }

    async delete(id) {
        
        const result = await Workspace.destroy({
            where: {
                id: id
            }
        });
        return result;
    }

    async findOne(id) {
        
        const result = await Workspace.findOne({
            where: {
                id: id
            }
        });

        return new WorkspaceBO(result.id, result.title, result.description, result.workspace);
    }

    async findAll() {        
        const result = await Workspace.findAll();
        return result.map((element, index)=> {
            new WorkspaceBO(element.id, element.title, element.description, element.workspace)
        });
    }
}