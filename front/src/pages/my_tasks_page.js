import React from "react";
import TasksBoard from "../components/main/tasks/tasks_board";
import { fetchUserTasks } from "../services/api/task_service";
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
                <TasksBoard fetchTasks={async () => {return await fetchUserTasks();}}/>
            </main>
        );
    }
}

export default MyTasksPage