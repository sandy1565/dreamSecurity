const db = require('../config/db.config.js');
const httpStatus = require('http-status')

const FlatDetail = db.flatDetail;
const Flat = db.flat;
const Tower = db.tower;
const Op = db.Sequelize.Op;

exports.create = async (req, res, next) => {
    try {
        let body = req.body;
        body.userId = req.userId;
        const flatNo = await FlatDetail.findOne({
            where: {
                [Op.and]: [
                    { flatNo: body.flatNo },
                    { isActive: true }
                ]
            }
        })
        if (flatNo) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
                message: "Flat number already exists",
            });
        }
        const towerId = await FlatDetail.findOne({
            where: {
                [Op.and]: [
                    { towerId: body.towerId },
                    { isActive: true }
                ]
            }
        })
        if (towerId) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
                message: "Tower already exists",
            });
        }
        const flatDetail = await FlatDetail.create(body);
        return res.status(httpStatus.CREATED).json({
            message: "FlatDetail successfully created",
            flatDetail
        });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.get = async (req, res, next) => {
    try {
        const flatDetail = await FlatDetail.findAll({
            where: { isActive: true }, order: [['createdAt', 'DESC']], include: [{
                model: Flat,
                attributes: ['flatId', 'flatType'],
            }, {
                model: Tower,
                attributes: ['towerId', 'towerName'],
            }]
        });
        if (flatDetail) {
            return res.status(httpStatus.CREATED).json({
                message: "FlatDetail Content Page",
                flatDetail: flatDetail
            });
        }
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log("id==>", id)
        if (!id) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "Id is missing" });
        }
        const update = req.body;
        console.log("update==>", update)
        if (!update) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "Please try again " });
        }
        const updatedFlatDetail = await FlatDetail.find({ where: { flatDetailId: id } }).then(flatDetail => {
            return flatDetail.updateAttributes(update)
        })
        if (updatedFlatDetail) {
            return res.status(httpStatus.OK).json({
                message: "FlatDetail Updated Page",
                flatDetail: updatedFlatDetail
            });
        }
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "Id is missing" });
        }
        const update = req.body;
        if (!update) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "Please try again " });
        }
        const updatedFlatDetail = await FlatDetail.find({ where: { flatDetailId: id } }).then(flatDetail => {
            return flatDetail.updateAttributes(update)
        })
        if (updatedFlatDetail) {
            return res.status(httpStatus.OK).json({
                message: "FlatDetail deleted successfully",
                flatDetail: updatedFlatDetail
            });
        }
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.deleteSelected = async (req, res, next) => {
    try {
        const deleteSelected = req.body.ids;
        console.log("delete selected==>", deleteSelected);
        const update = { isActive: false };
        if (!deleteSelected) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "No id Found" });
        }
        const updatedFlatDetail = await FlatDetail.update(update, { where: { flatDetailId: { [Op.in]: deleteSelected } } })
        if (updatedFlatDetail) {
            return res.status(httpStatus.OK).json({
                message: "Flat Details deleted successfully",
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}