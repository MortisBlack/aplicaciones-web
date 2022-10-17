import {UserWorkspaces} from '../../models/UserWorkspaces.js';

export default class UserWorkspacesRepository {


    async create(userWorkspace) {
        
        const result = await UserWorkspaces.create(userWorkspace);
        await result.reload();
        return result;
    }

    async update(userWorkspace) {

        if(userWorkspace.id === undefined){
            throw new Error('id is undefined');
        }

        
        const result = await UserWorkspaces.update(userWorkspace, {
            where: {
                id: userWorkspace.id
            }
        });
        return result;
    }

    async delete(id) {
        
        const result = await UserWorkspaces.destroy({
            where: {
                id: id
            }
        });
        return result;
    }

    async findOne(id) {
        
        const result = await UserWorkspaces.findOne({
            where: {
                id: id
            }
        });
        return result;
    }

    async findAll() {
        
        const result = await UserWorkspaces.findAll();
        return result;
    }
}

