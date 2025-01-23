import React from "react";
import TasksBoard from "../components/main/tasks/tasks_board"
import { fetchTeamTasks } from "../services/api/task_service";
import { getTeamById, getTeamsByProjectId } from "../services/api/team_service";
import { getProjectById } from "../services/api/project_service";
import TeamNavbar from "../components/main/block_navbar/team_navbar";
import StatisticsBlock from "../components/main/graphs/statistics_block";

class TeamPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            manageTeamActive: false,
            team: null,
            project: null,
            stage: "tasks",
        }
        this.teamsListRef = React.createRef();
    }
    async componentDidMount() {
        const team = await getTeamById(Number(sessionStorage.getItem("team_id")));
        const project = await getProjectById(team.project_id);
        this.setState({ team , project})
        await this.updateTasks(team);
    }
    setStage = (stage) => {
        this.setState({ stage });
    }
    updateTasks = async (team) => {
        const tasks = await fetchTeamTasks(team.team_id)
        this.setState({tasksBoardActive: true});
        return tasks;
    }

    render() {
        const { team, project, stage, tasksBoardActive } = this.state;
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
            <TeamNavbar setStage={this.setStage}/>
            {stage === "tasks"&&
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
            }
            {stage === "info"&&
                <StatisticsBlock isTeam={true} team={team}/>
            }
        </main>
        );
    }
}

export default TeamPage;