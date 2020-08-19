const User = require('../../models/user.model');

(() => {

    'use strict';

    const Location = require('../../models/location.model');

    const createLocation = async (name, description, type, tax_id, building_number, line_1, line_2, city, uid, councilUid) => {
        return Location.create({
            name, description, type, tax_id,
            building_number, line_1, line_2, city,
            userUid: uid, councilUid
        });
    };

    const getLocationsByUserId = async uid => Location.findAll({ where: { userUid: uid } });

    const getLocations = () => Location.findAll({ include: [{ model: User, as: 'user'}]});

    const getLocationsByCouncil = id =>  Location.findAll({ where: { councilUid: id }});

    const verifyLocation = async id => Location.update({ verified: true }, { where: { id } });

    const updateLocation = async (id, name, description, type, tax_id,
        building_number, line_1, line_2, city,
        uid, councilUid) =>
        Location.update({
            name, description, type, tax_id,
            building_number, line_1, line_2, city,
            uid, councilUid
        }, { where: { id }});

    const deleteLocation = id => Location.destroy({where: {id}});

    const getLocationsCount = () => Location.count();

    const getLocationCountByCouncil = councilUid => Location.count({ where: {councilUid}});

    const getPVLocationsCount = () => Location.count({ where: {verified: false}});

    const getPVLocationsByCouncilCount = (councilUid) => Location.count({where: {verified: false, councilUid}});

    const getLocationCountByUser = uid => Location.count({ where: { userUid: uid }});

    module.exports = {
        createLocation,
        getLocationsByUserId,
        verifyLocation,
        updateLocation,
        getLocationsByCouncil,
        getLocations,
        deleteLocation,
        getLocationsCount,
        getLocationCountByCouncil,
        getPVLocationsByCouncilCount,
        getPVLocationsCount,
        getLocationCountByUser,
    };

})();