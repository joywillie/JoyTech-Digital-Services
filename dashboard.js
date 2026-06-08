import {useNavigate} from "react-router-dom";


function Dashboard(){

const user =
JSON.parse(localStorage.getItem("user"));

const navigate=useNavigate();


return(

<div>

<h1>
Welcome {user?.name}
</h1>


<h2>
JoyTech Digital Services
</h2>


<button
onClick={()=>navigate("/services")}
>

View Services

</button>


</div>

)

}

export default Dashboard;
