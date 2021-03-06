const Collection = require("../../models/collection.model");

const createCollection = (laneId, councilUid, amount, date = new Date()) => Collection.create({
    laneId, councilUid, date, amount
});

const getAllCollectionsByCouncil = councilUid => Collection.findAll({ where: { councilUid }});

module.exports = {
    createCollection,
    getAllCollectionsByCouncil
}