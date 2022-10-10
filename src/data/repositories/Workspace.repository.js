import Workspace from '../../models/Workspace.js';
import WorkspaceBO from '../../domain/Workspace.js';

export default class WorkspaceRepository {


    async create(workspace) {
        const workspaceBO = workspace.toPersistenceObject()
        const result = await Workspace.create(workspaceBO);

        return new WorkspaceBO(result.id, result.title, result.description);
    }

    async update(workspace) {

        if(workspace.id === undefined){
            throw new Error('id is undefined');
        }

        const workspaceBO = workspace.toPersistenceObject()
        const result = await Workspace.update(workspaceBO, {
            where: {
                id: workspace.id
            }
        });
        return new WorkspaceBO(result.id, result.title, result.description);
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

        return new WorkspaceBO(result.id, result.title, result.description);
    }

    async findAll() {        
        const result = await Workspace.findAll();
        return result.map((element, index)=> {
            return new WorkspaceBO(element.dataValues.id, element.dataValues.title, element.dataValues.description)
        });
    }
}