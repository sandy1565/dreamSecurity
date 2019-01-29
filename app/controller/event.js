const db = require('../config/db.config.js');
const config = require('../config/config.js');
const httpStatus = require('http-status')

const Event = db.event;
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

exports.create = async (req, res, next) => {
    try {
        console.log("creating event");
        let body = req.body;
        body.userId = req.userId;
        console.log("body===>",body)
        const event = await Event.create(body);
        return res.status(httpStatus.CREATED).json({
            message: "Event successfully created",
            event
        });
    } catch (error) {
        console.log("error==>",error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.get = async(req,res,next) => {
    try{
        const event = await Event.findAll({where:{isActive:true},include: [{
           model:User,
           as:'organiser',
           attributes:['userId','userName'],
        }]});
        if(event){
            return res.status(httpStatus.CREATED).json({
                message: "Event Content Page",
                event:event
            });
        }
    }catch(error){
        console.log("error==>",error)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.update = async(req,res,next) => {
    try{
        const id = req.params.id;
        console.log("id==>",id)
        if(!id){
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({message:"Id is missing"});
        }
        const update = req.body;
         console.log("update==>",update)
        if(!update){
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({message:"Please try again "});
        }
        const updatedEvent = await Event.find({where:{eventId:id}}).then(event => {
            return event.updateAttributes(update)
          })
        if(updatedEvent){
            return res.status(httpStatus.OK).json({
                message: "Event Updated Page",
                event:updatedEvent
            });
        }
    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.delete = async(req,res,next) => {
    try{
        const id = req.params.id;
    
        if(!id){
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({message:"Id is missing"});
        }
        const update = req.body;
        if(!update){
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({message:"Please try again "});
        }
        const updatedEvent = await Event.find({where:{eventId:id}}).then(event => {
            return event.updateAttributes(update)
          })
        if(updatedEvent){
            return res.status(httpStatus.OK).json({
                message: "Event deleted successfully",
                event:updatedEvent
            });
        }
    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.getEventOrganiser = async(req,res,next) => {
    try{
        const user= await User.findAll({attributes: ['userId', 'userName'],	include: [{
            model: Role,
            where:{roleName:'ADMIN'},
			attributes: ['id', 'roleName'],
			},
		]});
        // console.log("user==>",user)
        return res.status(httpStatus.OK).json({
            message: "Event Organiser Detail",
            event:user
        });

    }catch(error){
        console.log("error===>",error)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}