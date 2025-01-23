import React from "react";
import BarChart from "./barchart";
import { getProjectStatisticsById } from "../../../services/api/project_service";
import DoughnutChart from "./doughnut_chart";
import { getTeamStatisticsById } from "../../../services/api/team_service";

class StatisticsBlock extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            statistics: null,
            team_names: null,
        }
    }
    async componentDidMount () {
        const statistics = await this.fetchStatistics();
        if(this.props.isProject && statistics){
            const team_names = [];
            statistics.teams.teams.forEach(team => {
                team_names.push(team.name);                
            });
            this.setState({team_names});
        }
    }
    fetchStatistics = async () => {
        let statistics;
        if(this.props.isProject){
            statistics = await getProjectStatisticsById(this.props.project.project_id);
            this.setState({ statistics });
            return statistics;
        }
        else if(this.props.isTeam){
            statistics = await getTeamStatisticsById(this.props.team.team_id);
            this.setState({ statistics });
            return statistics;
        }
    }
    render(){
        const { isProject, isTeam } = this.props;
        const { statistics } = this.state;

        if(!statistics){
            return null;
        }

        const { statuses, statuses_counts } = statistics.statuses;
        const {priorities, priorities_counts} = statistics.priorities;

        let team_names, teams_counts;

        if(isProject){
            team_names = this.state.team_names;
            teams_counts = statistics.teams.teams_counts;
        }

        return(
            <div className="statistics-blocks-container">
                {isProject &&
                <div className="statistics-blocks">
                    <div className="statistics-block">
                        <BarChart 
                            labels={statuses}
                            data={statuses_counts}
                            title={"Tasks Statuses"} 
                            label={""}
                        />
                    </div>
                    <div className="statistics-block">
                        <DoughnutChart 
                            labels={priorities} 
                            data={priorities_counts} 
                            title={"Tasks Priorities"} 
                            label={""} 
                        />
                    </div>
                    <div className="statistics-block">
                        <BarChart 
                            labels={team_names}
                            data={teams_counts}
                            title={"Tasks by teams"} 
                            label={""}
                        />
                    </div>
                </div>
                }
                {isTeam &&
                <div className="statistics-blocks">
                    <div className="statistics-block">
                        <BarChart 
                            labels={statuses}
                            data={statuses_counts}
                            title={"Tasks Statuses"} 
                            label={""}
                        />
                    </div>
                    <div className="statistics-block">
                        <DoughnutChart 
                            labels={priorities} 
                            data={priorities_counts} 
                            title={"Tasks Priorities"} 
                            label={""} 
                        />
                    </div>
                </div>
                }
            </div>
        );
    }
}
export default StatisticsBlock;