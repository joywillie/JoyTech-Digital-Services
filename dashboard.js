function Dashboard(){


const user =
JSON.parse(localStorage.getItem("user"));


return(

<div>


<h1>
Welcome {user?.name}
</h1>


<h2>
Available Services
</h2>


<div>

<h3>KRA Services</h3>
<p>
PIN, Returns assistance
</p>


<h3>IT Services</h3>
<p>
Website, software, networking
</p>


<h3>Documents</h3>
<p>
CV writing and typing
</p>


</div>


</div>


)

}


export default Dashboard;
