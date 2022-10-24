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

        const workspaceCheck = await this.findOne(workspace.id);

        if(workspaceCheck == undefined) {
            return undefined;
        }

        const workspaceBO = workspace.toPersistenceObject()
        const result = await Workspace.update(workspaceBO, {
            where: {
                id: workspace.id
            }
        });
        return this.findOne(workspace.id);
    }

    async delete(id) {
        const workspaceCheck = await this.findOne(id);

        if(workspaceCheck == undefined) {
            return undefined;
        }

        const result = await Workspace.destroy({
            where: {
                id: id
            }
        });

        return "Workspace successfully deleted";
    }

    async findOne(id) {
        
        const result = await Workspace.findOne({
            where: {
                id: id
            }
        });

        if(result == null) {
            return undefined;
        };

        return new WorkspaceBO(result.dataValues.id, result.dataValues.title, result.dataValues.description)
    }

    async findAll() {        
        const result = await Workspace.findAll();

        if(result == null || result.length == 0) {
            return undefined;
        };

        return result.map((element, index)=> {
            return new WorkspaceBO(element.dataValues.id, element.dataValues.title, element.dataValues.description)
        });
    }
}