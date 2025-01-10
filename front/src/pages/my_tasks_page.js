import React from "react";
import TasksBoard from "../components/tasks/tasks_board";
import { Navigate } from "react-router-dom"
class MyTasksPage extends React.Component{
    itemClicked = (itemNum) => {
        console.log(`Item ${itemNum} clicked`);
    };
    render(){
        if (!localStorage.getItem("token")) {
            return <Navigate to="/auth/sign_in" />;
        }
        return(
            <main>
                <div className="main-title">
                    <h2>
                        My tasks
                    </h2>
                </div>
                <TasksBoard />
            </main>
        );
    }
}

export default MyTasksPage