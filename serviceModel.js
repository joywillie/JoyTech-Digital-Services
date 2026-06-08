const pool = require("../config/db");


const getServices = () => {

return pool.query(
"SELECT * FROM services ORDER BY id DESC"
);

};



const createRequest = (
user_id,
service_id,
details
)=>{

return pool.query(

`INSERT INTO service_requests
(user_id,service_id,details)
VALUES($1,$2,$3)
RETURNING *`,

[
user_id,
service_id,
details
]

);

};



const getUserRequests = (user_id)=>{


return pool.query(

`SELECT 
service_requests.*,
services.name

FROM service_requests

JOIN services
ON service_requests.service_id = services.id

WHERE user_id=$1`,

[user_id]

);


};



module.exports={
getServices,
createRequest,
getUserRequests
};
