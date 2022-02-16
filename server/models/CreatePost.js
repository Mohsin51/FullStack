module.exports = (sequelize,DataTypes)=>{
    const CreatePost = sequelize.define("CreatePost",{
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        body:{
            type: DataTypes.STRING,
            allowNull: false
        },
        user:{
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    CreatePost.associate = (models)=>{
        CreatePost.hasMany(models.Comments,{
            onDelete : "cascade",
        });
        CreatePost.hasMany(models.Likes,{
            onDelete : "cascade",
        });
    }
    return CreatePost;
} 