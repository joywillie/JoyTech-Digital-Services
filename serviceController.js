const {
getServices,
createRequest,
getUserRequests

}=require("../models/serviceModel");


// GET SERVICES

const services = async(req,res)=>{

try{

const result = await getServices();

res.json(result.rows);


}catch(error){

res.status(500).json({
error:error.message
});

}

};



// REQUEST SERVICE

const requestService = async(req,res)=>{


try{


const {
service_id,
details

}=req.body;


const user_id=req.user.id;



const result =
await createRequest(
user_id,
service_id,
details
);



res.json({

message:"Service requested successfully",

request:result.rows[0]

});



}catch(error){

res.status(500).json({
error:error.message
});

}


};



// USER REQUESTS

const myRequests=async(req,res)=>{


try{


const result =
await getUserRequests(
req.user.id
);


res.json(result.rows);


}catch(error){

res.status(500).json({
error:error.message
});

}


};



module.exports={
services,
requestService,
myRequests
};
