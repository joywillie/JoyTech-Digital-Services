import {useState} from "react";
import API from "../api";
import {useNavigate} from "react-router-dom";


function Register(){

const navigate = useNavigate();

const [form,setForm]=useState({
name:"",
email:"",
password:""
});


const submit=async(e)=>{

e.preventDefault();


try{

await API.post("/auth/register",form);


alert("Account created");


navigate("/login");


}catch(err){

alert(err.response.data.message);

}

}



return(

<form onSubmit={submit}>


<h2>Create Account</h2>


<input
placeholder="Name"
onChange={e=>setForm({...form,name:e.target.value})}
/>


<input
placeholder="Email"
onChange={e=>setForm({...form,email:e.target.value})}
/>


<input
type="password"
placeholder="Password"
onChange={e=>setForm({...form,password:e.target.value})}
/>


<button>
Register
</button>


</form>

)

}


export default Register;
