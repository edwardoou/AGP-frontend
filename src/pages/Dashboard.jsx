import React, { Component } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { Link } from "react-router-dom";
//Diseño Cards
import StatusCard from "../components/status-card/StatusCard";
//Badge
import Badge from "../components/badge/badge";

const chartOptions = {
  series: [
    {
      name: "Proyectos",
      data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
    },
    {
      name: "Procesos",
      data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10],
    },
  ],
  options: {
    color: ["#6ab04c", "#2980b9"],
    chart: {
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    legend: {
      position: "top",
    },
    grid: {
      show: true,
    },
  },
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { projects: [] };
  }

  componentDidMount() {
    //Projects
    axios.get(process.env.REACT_APP_URL + "/projects/count").then((res) => {
      this.setState({ projects: res.data.data });
    });
  }

  render() {
    return (
      <div>
        <h2 className="page-header">Dashboard</h2>
        <div className="row">
          <div className="col-6">
            <div className="row">
              <div className="col-6">
                <StatusCard
                  cuenta={this.state.projects.proyectos}
                  icono={"bx bx-briefcase"}
                  titulo={"Proyectos"}
                />
                <StatusCard
                  cuenta={this.state.projects.procesos}
                  icono={"bx bx-stats"}
                  titulo={"Procesos"}
                />
              </div>
              <div className="col-6">
                <StatusCard
                  cuenta={this.state.projects.innovaciones}
                  icono={"bx bx-network-chart"}
                  titulo={"Innovaciones"}
                />
                <StatusCard
                  cuenta={this.state.projects.total}
                  icono={"bx bx-happy-beaming"}
                  titulo={"Total"}
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card full-height">
              {/* Datos y diseño del chart */}
              <Chart
                options={chartOptions.options}
                series={chartOptions.series}
                type="line"
                height="130%"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
