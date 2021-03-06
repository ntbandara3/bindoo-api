const { DataTypes, Model } = require("sequelize");
const PickupList = require('./pickup-list.model');
const { PICKUP_LIST_ITEM_STATUS } = require("../services/constants.service");
const Lane = require("./lane.model");
const Vehicle = require("./vehicle.model");
const Allocation = require("./allocation.model");
const sequelize = require('../middleware/database').getConnection();

(() => {

    'use strict';

    class PickupListItem extends Model {}

    PickupListItem.init({
        status: { type: DataTypes.STRING, defaultValue:  PICKUP_LIST_ITEM_STATUS.UNALLOCATED },
        amount: { type: DataTypes.FLOAT },
    }, { sequelize, modelName: 'pickup_list_item' });

    PickupListItem.belongsTo(PickupList);
    PickupList.hasMany(PickupListItem, { onDelete: 'CASCADE' });
    
    PickupListItem.belongsTo(Vehicle);
    Vehicle.hasMany(PickupListItem);

    PickupListItem.belongsTo(Allocation, { onDelete: 'CASCADE' });
    Allocation.hasOne(PickupListItem);

    PickupListItem.belongsTo(Lane);
    Lane.hasMany(PickupListItem, { onDelete: 'CASCADE' });

    module.exports = PickupListItem;

})();