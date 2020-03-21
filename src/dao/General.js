import { ObjectId } from "mongodb";

class General {
    constructor(collection) {
        console.log(collection);
        this.collection = collection;
    }

    // Search ==================================================================
    async findOne(data) {
        return await global.database.collection(this.collection).findOne(data);
    }

    async findBy(data = {}) {
        return await global.database.collection(this.collection).find(data).toArray();
    }

    async findByID(id) {
        return await this.findBy({ "_id": ObjectId(id) });
    }

    // Update ==================================================================
    async updateByID(id, data) {
        return await this.updateOne({ "_id": ObjectId(id) }, data);
    }

    async updateOne(query, data) {
        return await global.database.collection(this.collection).updateOne(query, {
            $set: data
        });
    }

    async update(query, data) {
        return await global.database.collection(this.collection).updateMany(query, {
            $set: data
        });
    }

    // Insert ==================================================================
    async insert(data) {
        return await global.database.collection(this.collection).insertOne(data);
    }

    async insertMany(data) {
        return await global.database.collection(this.collection).insertMany(data);
    }

    // Delete ==================================================================
    async deleteByID(id) {
        return await this.deleteOne({ "_id": ObjectId(id) });
    }

    async deleteOne(query) {
        return await global.database.collection(this.collection).deleteOne(query);
    }

    async deleteMany(query) {
        return await global.database.collection(this.collection).deleteMany(query);
    }
}

export default General;
