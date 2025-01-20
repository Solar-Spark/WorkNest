import React from "react";
import TasksBoard from "../components/main/tasks/tasks_board"
import { fetchTeamTasks } from "../services/api/task_service";
import { getTeamById, getTeamsByProjectId } from "../services/api/team_service";
import { getProjectById } from "../services/api/project_service";

class TeamPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            manageTeamActive: false,
            team: null,
            project: null,
        }
        this.teamsListRef = React.createRef();
    }
    async componentDidMount() {
        const team = await getTeamById(Number(sessionStorage.getItem("team_id")));
        const project = await getProjectById(team.project_id);
        this.setState({ team , project})
        await this.updateTasks(team);
    }
    updateTasks = async (team) => {
        const tasks = await fetchTeamTasks(team.team_id)
        this.setState({tasksBoardActive: true});
        return tasks;
    }

    render() {
        const { team, project, tasksBoardActive } = this.state;
        if (!team || !project) {
            return (<main><div>Loading...</div></main>);
        }
        return (
            <main>
            <div className="main-title">
                <h2>
                    {team.name}
                </h2>
            </div>
                <div className="tasks-board-create">
                    {tasksBoardActive &&
                        <TasksBoard
                        team={team}
                        project={project}
                        fetchTasks={async () => await this.updateTasks(team)}
                        addTaskEnabled={true}
                        />
                    }
                </div>
        </main>
        );
    }
}

export default TeamPage;