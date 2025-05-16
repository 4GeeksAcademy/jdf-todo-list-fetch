import React from "react";


import ToDoList from "./ToDoList.jsx"


//create your first component
const Home = () => {
	return (
		<div className="text-center">
            <div>
				<ToDoList/>
			</div>
		</div>
	);
};

export default Home;