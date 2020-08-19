const Location = require('../../models/location.model');

(() => {

    'use strict';

    const Bin = require('../../models/bin.model');
    const sequelize = require('../../middleware/database').getConnection();

    const createNewBinForLocation = (name, description, type, capacity, locationId) => {
        return Bin.create({
            name, description, type, capacity, locationId 
        });
    };

    const updateBin = (id, name, description, type, capacity) => {
        return Bin.update(
            { name, description, type, capacity },
            { where: { id }}
        );
    };

    const getBinsByLocation = id => Bin.findAll({ where: { locationId: id } });

    const getBinById = id => Bin.findOne({ where: { id } });

    const getBinsByStatus = status => Bin.findAll({ where: { readyForCollection: status }, include: [ { model: Location, as: 'location' } ] });

    const deleteBin = id =>  Bin.destroy({ where: { id } });

    const updateReadyForCollectionStatus = (id, status) => {
        return Bin.update({ readyForCollection: status }, { where: { id } });
    };

    const getBinCountByUser = uid => sequelize.
        query(`SELECT COUNT(b.id) AS count FROM bins AS b, locations as l WHERE b.locationId = l.id AND l.userUid = '${uid}'`);
    
    const getBinsByUser = uid => sequelize.query(
        `SELECT ` + 
        `b.id as bin_id, b.name as bin_name, ` + 
        `b.description as bin_description, ` +
        `b.type, b.capacity, b.readyForCollection, b.createdAt, ` +
        `b.updatedAt, l.id as location_id, l.name as location_name, ` +
        `l.description as location_description ` + 
        `FROM bins AS b, locations AS l WHERE b.locationId = l.id AND l.userUid = '${uid}'`
    );

    module.exports = {
        createNewBinForLocation,
        updateBin,
        getBinsByLocation,
        getBinById,
        getBinsByStatus,
        deleteBin,
        updateReadyForCollectionStatus,
        getBinCountByUser,
        getBinsByUser
    };

})();