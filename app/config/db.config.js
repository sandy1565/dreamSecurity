const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
  logging:false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.user = require('../model/user.model.js')(sequelize, Sequelize);
db.role = require('../model/role.model.js')(sequelize, Sequelize);
db.society = require('../model/society.model.js')(sequelize, Sequelize);
db.city = require('../model/city.model.js')(sequelize, Sequelize);
db.country = require('../model/country.model.js')(sequelize, Sequelize);
db.location = require('../model/location.model.js')(sequelize, Sequelize);
db.state = require('../model/state.model.js')(sequelize, Sequelize);
db.tower = require('../model/tower.model.js')(sequelize, Sequelize);
db.flat = require('../model/flat.model.js')(sequelize, Sequelize);
db.service = require('../model/service.model.js')(sequelize, Sequelize);
db.size = require('../model/size.model.js')(sequelize, Sequelize);
db.event = require('../model/event.model.js')(sequelize, Sequelize);
db.serviceDetail = require('../model/serviceDetail.model.js')(sequelize, Sequelize);
db.parking = require('../model/parking.model.js')(sequelize, Sequelize);
db.slot = require('../model/slot.model.js')(sequelize, Sequelize);
db.vendor = require('../model/vendor.model')(sequelize,Sequelize);
db.assets = require('../model/asset.model')(sequelize,Sequelize);
db.assetsType = require('../model/assetType.model')(sequelize,Sequelize);
db.test = require('../model/test.model')(sequelize,Sequelize);
db.flatDetail = require('../model/flatDetail.model')(sequelize,Sequelize);

 
db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'});
db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId'});
db.society.belongsTo(db.city,{foreignKey: 'cityId'});
db.society.belongsTo(db.country,{foreignKey: 'countryId'});
db.society.belongsTo(db.location,{foreignKey: 'locationId'});
db.society.belongsTo(db.state,{foreignKey: 'stateId'});
db.society.belongsTo(db.user,{foreignKey: 'userId'});
db.country.belongsTo(db.user,{foreignKey: 'userId'});
db.state.belongsTo(db.country,{foreignKey: 'countryId'});
db.state.belongsTo(db.user,{foreignKey: 'userId'});
db.city.belongsTo(db.user,{foreignKey: 'userId'});
db.city.belongsTo(db.state,{foreignKey: 'stateId'});
db.city.belongsTo(db.country,{foreignKey:'countryId'})
db.location.belongsTo(db.country,{foreignKey: 'countryId'});
db.location.belongsTo(db.state,{foreignKey: 'stateId'});
db.location.belongsTo(db.city,{foreignKey: 'cityId'});
db.location.belongsTo(db.user,{foreignKey: 'userId'});
db.flat.belongsTo(db.size,{foreignKey:'sizeId'});
db.flat.belongsTo(db.society,{foreignKey:'societyId'});
db.event.belongsTo(db.user,{foreignKey:'eventOrganiser',as:'organiser'});
db.event.belongsTo(db.user,{foreignKey:'userId',as:'loggedIn'});
db.service.belongsTo(db.serviceDetail,{foreignKey:'serviceDetailId'});
db.slot.belongsTo(db.parking,{foreignKey:'parkingId'});
db.vendor.belongsTo(db.user,{foreignKey:'userId'});
db.vendor.belongsTo(db.service,{foreignKey:'serviceId'});
db.assets.belongsTo(db.user,{foreignKey:'userId'});
db.assetsType.belongsTo(db.user,{foreignKey:'userId'});
db.assetsType.belongsTo(db.assets,{foreignKey:'assetId'});
db.flatDetail.belongsTo(db.tower,{foreignKey:'towerId'});
db.flatDetail.belongsTo(db.flat,{foreignKey:'flatId'});
db.flatDetail.belongsTo(db.user,{foreignKey:'userId'});
db.user.belongsTo(db.tower,{foreignKey:'towerId'});
db.user.belongsTo(db.flatDetail,{foreignKey:'flatDetailId',constraints: false});

module.exports = db;