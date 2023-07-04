const Router =require("express");
const UserController=require("../controller/UserController");
const UserRouter=Router();
const auth_user=require("../middleware/auth_user");
const upload=require("../functions/multer_upload");

UserRouter.post("/adduser",upload.single("file"),UserController.addUser);
UserRouter.post("/login",UserController.login);
UserRouter.post("/viewUser",auth_user,UserController.getuser);
UserRouter.post("/editUser",auth_user,upload.single("file"),UserController.editUser);


module.exports=UserRouter;