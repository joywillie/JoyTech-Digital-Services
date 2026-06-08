import {useState} from "react";
import API from "../api";
import {useNavigate} from "react-router-dom";


function Login(){


const navigate=useNavigate();


const [form,setForm]=useState({
email:"",
password:""
});


const submit=async(e)=>{

e.preventDefault();


try{

const res=await API.post(
"/auth/login",
form
);


localStorage.setItem(
"token",
res.data.token
);


localStorage.setItem(
"user",
JSON.stringify(res.data.user)
);



navigate("/dashboard");



}catch(err){

alert(err.response.data.message);

}

}



return(

<form onSubmit={submit}>


<h2>Login</h2>


<input
placeholder="Email"
onChange={
e=>setForm({...form,email:e.target.value})
}
/>


<input
type="password"
placeholder="Password"
onChange={
e=>setForm({...form,password:e.target.value})
}
/>


<button>
Login
</button>


</form>


)

}


export default Login;
