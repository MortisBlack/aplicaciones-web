import { Column } from '../models/Column.js';

class ColumnRepository {


    async create(column) {
        
        const result = await column.create(column);
        await result.reload();
        return result;
        
    }

    async update(column) {

        if(column.id === undefined){
            throw new Error('id is undefined');
        }

        
        const result = await Column.update(column, {
            where: {
                id: column.id
            }
        });
        return result;
        
    }

    async delete(id) {
        
        const result = await Column.destroy({
            where: {
                id: id
            }
        });
        return result;
        
    }

    async findOne(id) {
        
        const result = await Column.findOne({
            where: {
                id: id
            }
        });
        return result;
        
    }

    async findAll() {
        
        const result = await Column.findAll();
        return result;
        
    }
}

export { ColumnRepository };