module.exports = (sequelize,DataTypes)=>{
    const Comments = sequelize.define("Comments",{
        commentBody:{
            type: DataTypes.STRING(1024),
            allowNull: false
        },
        username:{
            type: DataTypes.STRING(1024),
            allowNull: false
        },
    });
    return Comments;
} 