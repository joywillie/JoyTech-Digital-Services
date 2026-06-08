const express=require("express");

const router=express.Router();


const verifyToken =
require("../middleware/authMiddleware");


const {

services,
requestService,
myRequests

}=require("../controllers/serviceController");



router.get(
"/",
services
);



router.post(
"/request",
verifyToken,
requestService
);



router.get(
"/my",
verifyToken,
myRequests
);



module.exports=router;
