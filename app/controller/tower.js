const db = require('../config/db.config.js');
const config = require('../config/config.js');
const httpStatus = require('http-status');

const Tower = db.tower;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    console.log("creating tower");

    Tower.create({
        towerName: req.body.towerName,
        userId: req.userId
    }).then(tower => {
        res.json({ message: "Tower added successfully!", tower: tower });
    }).catch(err => {
        res.status(500).send("Fail! Error -> " + err);
    })
}

exports.get = (req, res) => {
    Tower.findAll({
        where: { isActive: true },
        order: [['createdAt', 'DESC']],
    })
        .then(tower => {
            res.json(tower);
        });
}

exports.getById = (req, res) => {
    Tower.findOne({
        where: { id: req.userId },
    }).then(tower => {
        res.status(200).json({
            "description": "Tower Content Page",
            "tower": tower
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Can not tower Page",
            "error": err
        });
    })
}

exports.update = (req, res) => {
    console.log("-----update---------");
    const id = req.params.id;
    if (!id) {
        res.json("Please enter id");
    }
    const updates = req.body;
    Tower.find({
        where: { towerId: id }
    })
        .then(tower => {
            return tower.updateAttributes(updates)
        })
        .then(updatedTower => {
            res.json({ message: "Tower updated successfully!", updatedTower: updatedTower });
        });
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
        const updatedTower = await Tower.find({ where: { towerId: id } }).then(tower => {
            return tower.updateAttributes(update)
        })
        if (updatedTower) {
            return res.status(httpStatus.OK).json({
                message: "Tower deleted successfully",
                tower: updatedTower
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
        const updatedTower = await Tower.update(update, { where: { towerId: { [Op.in]: deleteSelected } } })
        if (updatedTower) {
            return res.status(httpStatus.OK).json({
                message: "Towers deleted successfully",
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

