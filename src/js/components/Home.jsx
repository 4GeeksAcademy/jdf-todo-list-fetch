import React from "react";


import ToDoList from "./src/js/components/ToDoList.jsx"


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