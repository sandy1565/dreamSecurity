module.exports = (sequelize, Sequelize) => {
	const Employee = sequelize.define('employee_master', {
		employeeId: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		firstName: {
            type: Sequelize.STRING
        },
		middleName: {
			type: Sequelize.STRING,
		},
		lastName: {
            type: Sequelize.STRING,
        },
        CTC:{
            type: Sequelize.STRING,
        },
        startDate:{
            type: Sequelize.STRING,
        },
        endDate:{
            type: Sequelize.STRING, 
        },
        picture:{
            type: Sequelize.STRING,
        },
        documentOne:{
            type: Sequelize.STRING,
        },
        documentTwo:{
            type: Sequelize.STRING,   
        },
        isActive: {
			type: Sequelize.BOOLEAN,
			defaultValue: true
		},
	}, {
		freezeTableName: true
	});

	return Employee;
}


