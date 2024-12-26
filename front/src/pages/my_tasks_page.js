import React from "react";
import TasksBoard from "../components/tasks/tasks_board";

class MyTasksPage extends React.Component{
    itemClicked = (itemNum) => {
        console.log(`Item ${itemNum} clicked`);
    };
    render(){
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