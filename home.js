import { useNavigate } from "react-router-dom";


function Home(){

const navigate = useNavigate();


return(

<div>

<h1>
JoyTech Digital Services 🚀
</h1>

<p>
KRA | eCitizen | IT Services | Online Support
</p>


<button onClick={()=>navigate("/register")}>
Get Started
</button>


<h2>Our Services</h2>

<ul>

<li>KRA Assistance</li>

<li>KRA Returns Support</li>

<li>eCitizen Services</li>

<li>CV Writing</li>

<li>Website Development</li>

<li>Computer Repair</li>

</ul>


</div>

)

}


export default Home;
