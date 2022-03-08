import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
//Data Cards del Dashboard
import statusCards from "../assets/JsonData/status-card-data.json";
//Diseño Cards
import StatusCard from "../components/status-card/StatusCard";
//Badge
import Badge from "../components/badge/badge";

const chartOptions = {
  series: [
    {
      name: "Test 1",
      data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
    },
    {
      name: "Test 2",
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
  render() {
    return (
      <div>
        <h2 className="page-header">Dashboard</h2>
        <div className="row">
          <div className="col-6">
            <div className="row">
              {
                //Iteracion de las Cards
                statusCards.map((item, index) => (
                  <div className="col-6" key={index}>
                    <StatusCard
                      cuenta={item.count}
                      icono={item.icon}
                      titulo={item.title}
                    />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="col-6">
            <div className="card full-height">
              {/* Datos y diseño del chart */}
              <Chart
                options={chartOptions.options}
                series={chartOptions.series}
                type="line"
                height="100%"
              />
            </div>
          </div>
          <div className="col-7">
            <div className="card">
              {/* Segunda tabla*/}
              <div className="card__header">
                <h3>Tabla de Actividades</h3>
              </div>
              <div className="card__body"></div>
              <div className="card__footer">
                <Link to="/actividades">Ver todo</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
