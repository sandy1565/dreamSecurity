const db = require('../config/db.config.js');
const config = require('../config/config.js');

const Location = db.location;

exports.create = (req,res) => {
    console.log("creating city");

    Location.create({
        locationName:req.body.locationName,
        countryId:req.body.countryId,
        stateId:req.body.stateId,
        cityId:req.body.cityId,
        userId:req.body.userId
    }).then(location =>{
        res.json({message:"Location added successfully!",location:location});
    }).catch(err => {
    res.status(500).send("Fail! Error -> " + err);
})
}

exports.get = (req, res) => {
    Location.findAll()
      .then(location => {
        res.json(location);
      });
    }

exports.getById = (req,res) => {
    Location.findOne({
       where: {cityId: req.params.id},
   }).then(location => {
    res.status(200).json({
        "description": "Location Content Page",
        "location": location
    });
}).catch(err => {
    res.status(500).json({
        "description": "Can not Location Page",
        "error": err
    });
})
}

exports.update = (req,res) => {
    const id = req.params.id;
    if(!id){
        res.json("Please enter id");
    }
    const updates = req.body;
    Location.find({
        where: { locationId: id }
      })
      .then(location => {
        return location.updateAttributes(updates)
      })
      .then(updatedLocation => {
        res.json({message:"Location updated successfully!",updatedLocation:updatedLocation});
      });
}

exports.delete = (req,res) => {
    const id = req.params.id;
    if(!id){
        res.json("Please enter id");
    }
    Location.destroy({
      where: { locationId: id }
    })
      .then(deletedLocation => {
        res.json({message:"Location deleted successfully!",deletedLocation:deletedLocation});
      });
}


