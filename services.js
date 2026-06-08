import {useEffect,useState} from "react";
import API from "../api";


function Services(){

const [services,setServices]=useState([]);


useEffect(()=>{

loadServices();

},[]);



const loadServices=async()=>{

try{

const res =
await API.get("/services");

setServices(res.data);


}catch(error){

console.log(error);

}

};



const requestService=async(id)=>{


const details =
prompt("Enter service details");


try{


await API.post(
"/services/request",
{
service_id:id,
details
}
);


alert("Service request submitted");


}catch(error){

alert("Login required");

}


};



return(

<div>


<h1>
Our Services 🚀
</h1>


{

services.map(service=>(


<div key={service.service_id}>


<h2>
{service.service_name}
</h2>


<p>
{service.description}
</p>


<h3>
Ksh {service.price}
</h3>


<button
onClick={()=>requestService(service.service_id)}
>
Request Service
</button>


<hr/>


</div>


))

}



</div>

)

}


export default Services;
