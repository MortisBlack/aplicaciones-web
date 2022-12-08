import UsersWorkspaces from '../../models/UsersWorkspaces.js';
import UserWorkspaceBO from '../../domain/UsersWorkspaces.js';
export default class UserWorkspacesRepository {


    async create(userWorkspace) {
        const workspaceBO = userWorkspace.toPersistenceObject();
        const result = await UsersWorkspaces.create(workspaceBO);
        
        return new UserWorkspaceBO(result.id, result.userId, result.role, result.workspaceId);
    }

    async update(userWorkspace) {

        if(userWorkspace.id === undefined){
            throw new Error('id is undefined');
        }

        const userWorkspaceCheck = await this.findOne(userWorkspace.id);

        if(userWorkspaceCheck == undefined) {
            return undefined;
        }

        const userWorkspaceBO = userWorkspace.toPersistenceObject()
        const result = await userWorkspace.update(userWorkspaceBO, {
            where: {
                id: userWorkspace.id
            }
        });
        return this.findOne(userWorkspace.id);
    }

    async delete(id) {
        
        const userWorkspaceCheck = await this.findOne(id);

        if(userWorkspaceCheck == undefined) {
            return undefined;
        }

        const result = await UsersWorkspaces.destroy({
            where: {
                id: id
            }
        });

        return "User workspace successfully deleted";
    }

    async findOne(id) {
        
        const result = await UsersWorkspaces.findOne({
            where: {
                id: id
            }
        });

        if(result == null) {
            return undefined;
        };

        return new UserWorkspaceBO(result.dataValues.id, result.dataValues.userId, result.dataValues.role, result.dataValues.workspaceId);
    }

    async findAll() {
        const result = await UsersWorkspaces.findAll();

        if(result == null || result.length == 0) {
            return undefined;
        };

        return result.map((element, index)=> {
            return new UserWorkspaceBO(element.dataValues.id, element.dataValues.title, element.dataValues.description);
        });
    }
}

