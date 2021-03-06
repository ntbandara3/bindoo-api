(() => {

    'use strict';

    const RequestLogWrapper =require('../util/loghandler');
    const LocationController = require('../controllers/location.controller');
    // const { userSignUpValidator } = require('../util/validators/user.validator');

    const init = app => {

        app.get('/locations/count', RequestLogWrapper(LocationController.getLocationCount));
        app.get('/councils/:id/locations/count', RequestLogWrapper(LocationController.getLocationCountByCouncil));
        app.get('/users/:uid/locations/count', RequestLogWrapper(LocationController.getLocationCountByUser));

        app.get('/locations/status/count', RequestLogWrapper(LocationController.getPVLocationCount));
        app.get('/councils/:id/locations/status/count', RequestLogWrapper(LocationController.getPVLocationCountByCouncil));

        app.get('/users/:uid/locations/verified/:verified', RequestLogWrapper(LocationController.getLocationsByUserAndStatus));
        app.get('/councils/:councilUid/locations/verified/:verified', RequestLogWrapper(LocationController.getLocationsByCouncilAndStatus));
        app.put('/locations/:id/status', RequestLogWrapper(LocationController.updateStatus));

        app.post('/users/:uid/locations', RequestLogWrapper(LocationController.createLocationForUser));
        app.get('/users/:uid/locations', RequestLogWrapper(LocationController.getLocationsByUser));
        app.get('/locations', RequestLogWrapper(LocationController.getAllLocations));
        app.get('/councils/:id/locations', RequestLogWrapper(LocationController.getLocationsByCouncil));
        app.put('/locations/:id/verified', RequestLogWrapper(LocationController.verifyLocation));
        app.put('/locations/:id', RequestLogWrapper(LocationController.updateLocation));
        app.delete('/locations/:id', RequestLogWrapper(LocationController.deleteLocation));
    
    };

    module.exports = { init };

})();