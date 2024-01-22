import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component



let status= {
	label:"",
	done:false
}

const Home = () => {
	let urlBase="https://playground.4geeks.com/apis/fake/todos/user/bforti"
	const[aggTarea,setAggTarea]=useState(status);
	const[guardarTarea,setGuardarTarea]=useState([]);
	const[error,setError]=useState(error);
	const write=(event)=>{
		setAggTarea(
			{label:event.target.value,
			done:false})
			
	}

	const traerTarea = async ()=>{
		try{
			let response= await fetch(urlBase)
			let data=await response.json()

			console.log(response)
			console.log(data)

			if(response.ok){
				setGuardarTarea(data)
			}
			if(response.status==404){
				createUser()
			}

		}	
		catch{
			console.log(error)
		}

	}
	const createUser= async ()=>{
		try {
			let response = await fetch(urlBase,{
				method:"POST",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify([])
			})
			console.log(response)
			if(response.ok){
				traerTarea()
			}
			
		} catch (error) {
			console.log()
			
		}
	}
	const save= async (event)=>{
		if(event.key=="Enter"){
			if(aggTarea.trim !==""){
			// setGuardarTarea([...guardarTarea,aggTarea])
			// setAggTarea(status)

			try {
				let response = await fetch(urlBase,{
					method:"PUT",
					headers:{
						"Content-Type":"application/json"
					},
					body:JSON.stringify([
						...guardarTarea,aggTarea
					])

				})
				console.log(response)
				if(response.ok){
					traerTarea()
				}
				

				
			} catch (error) {
				console.log(error)
				
			}
			}
		else{
			console.log(error)
		}
		}


	}
	const deleteTarea= async (event)=>{
		let newArr= guardarTarea.filter((item,index)=>
		 index!==event)
   try {
		let response = await fetch(urlBase,{
			method:"PUT",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(newArr)
			
			})
			if(response.ok){
				traerTarea()
	
		} 
			
		}
		catch (error) {
		console.log(error)
		
	}
	
		
   

	}
	const deleteAll = async (event)=>{
		try {
			let response= await fetch(urlBase,{
				method:"DELETE",
				headers:{
					"Content-Type":"application/json"
	
				},
				
			})
			if(response.ok){
				traerTarea()
			}

			
		} catch (error) {
			console.log(error)
			
		}
		

	}

    useEffect(()=>{
		traerTarea()

	},[])
	
	
	


	return (
		<>
		<div className="border border-3 rounded m-3 bg-light">
			<div className="d-flex justify-content-center">
			<h1>TODOS</h1>
			</div>
			<div className="m-3 p-0"> 
			<input
			className="form-control "
			type="text"
			aria-label="Agrega una tarea"
			placeholder="Agrega una tarea"
			name="label"
			value={aggTarea.label}
			onChange={write}
			onKeyDown={save}		
			/>
			</div>
			
			<ul className="list-inline m-2">
				{guardarTarea.map((item,index)=>{
					return(
					<li key={index}
					    className="list-inline-item d-flex justify-content-between p-3"
					>
						<div>
						<i className="fa-solid fa-check me-1"></i>
						{item.label}
						</div>
						<button
					    type="button" 
						className="btn-close btn-outline-danger"
						aria-label="Close"
						onClick={()=>deleteTarea(index)}
						></button>
					</li>
					)
				})}



			</ul>
			<button
			type="button" 
			className="btn btn-danger m-2"
			onClick={deleteAll}>Delete all</button>
		</div>

		</>
	);
};

export default Home;