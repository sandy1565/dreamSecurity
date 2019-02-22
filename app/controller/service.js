const db = require('../config/db.config.js');
const config = require('../config/config.js');
const httpStatus = require('http-status')

const Service = db.service;
const ServiceDetail = db.serviceDetail;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  let body = req.body;
  body.userId = req.userId;
  console.log("req.body===>", req.body)
  console.log("creating service");
  if (!body.serviceName && !body.serviceDetailId) {
    return res.status(422).json({ message: "Parameters Missing" })
  }
  Service.create({
    serviceName: req.body.serviceName,
    serviceDetailId: req.body.serviceDetailId,
  }).then(service => {
    // console.log("service==>",service)
    res.json({ message: "Service added successfully!", service: service });
  }).catch(err => {
    console.log("service error==>", err)
    res.status(500).send("Fail! Error -> " + err);
  })
}

exports.get = (req, res) => {
  Service.findAll({
    where: {
      isActive: true
    },
    order: [['createdAt', 'DESC']],
    include: [{
      model: ServiceDetail,
      attributes: ['serviceDetailId', 'service_detail'],
    }]
  })
    .then(service => {
      res.json(service);
    });
}

exports.getById = (req, res) => {
  Service.findOne({
    where: { id: req.userId },
  }).then(service => {
    res.status(200).json({
      "description": "Service Content Page",
      "service": service
    });
  }).catch(err => {
    res.status(500).json({
      "description": "Can not service Page",
      "error": err
    });
  })
}

exports.update = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.json("Please enter id");
  }
  const updates = req.body;
  Service.find({
    where: { serviceId: id }
  })
    .then(service => {
      return service.updateAttributes(updates)
    })
    .then(updatedService => {
      res.json({ message: "Service updated successfully!", updatedService: updatedService });
    });
}

exports.delete = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.json("Please enter id");
  }
  Service.destroy({
    where: { serviceId: id }
  })
    .then(deletedService => {
      res.json({ message: "Service deleted successfully!", deletedService: deletedService });
    });
}

exports.deleteSelected = async (req, res, next) => {
  try {
    console.log("in service--->")
    const deleteSelected = req.body.ids;
    console.log("delete selected==>", deleteSelected);
    const update = { isActive: false };
    if (!deleteSelected) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "No id Found" });
    }
    const updatedService = await Service.update(update, { where: { serviceId: { [Op.in]: deleteSelected } } })
    if (updatedService) {
      return res.status(httpStatus.OK).json({
        message: "Services deleted successfully",
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}