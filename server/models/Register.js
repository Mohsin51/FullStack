module.exports = (sequelize,DataTypes)=>{
    const Register = sequelize.define("Register",{
        fname:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lname:{
            type: DataTypes.STRING,
            allowNull: false
        },
        gender:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        address:{
            type: DataTypes.STRING(1024),
            allowNull: false
        },       
    });
    Register.associate = (models)=>{
        Register.hasMany(models.Likes,{
            onDelete : "cascade",
        });
        // Register.hasMany(models.CreatePost,{
        //     onDelete : "cascade",
        // });
        
    }
    return Register;
} 