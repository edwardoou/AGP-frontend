import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
//Data Cards del Dashboard
import statusCards from "../assets/JsonData/status-card-data.json";
//Diseño Cards
import StatusCard from "../components/status-card/StatusCard";
//Diseño Tabla
import Table from "../components/table/Table";
//Badge
import Badge from "../components/badge/badge";
import TableProjects from "./Projects";

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

const topCustomers = {
  head: ["user", "total orders", "total spending"],
  body: [
    {
      username: "john doe",
      order: "490",
      price: "$15,870",
    },
    {
      username: "frank iva",
      order: "250",
      price: "$12,251",
    },
    {
      username: "anthony baker",
      order: "120",
      price: "$10,840",
    },
    {
      username: "frank iva",
      order: "110",
      price: "$9,251",
    },
    {
      username: "anthony baker",
      order: "80",
      price: "$8,840",
    },
  ],
};

const renderProjectHead = (item, index) => <th key={index}>{item}</th>;

const renderProjectBody = (item, index) => (
  <tr key={index}>
    <td>{item.username}</td>
    <td>{item.order}</td>
    <td>{item.price}</td>
  </tr>
);

const latestOrders = {
  header: ["order id", "user", "total price", "date", "status"],
  body: [
    {
      id: "#OD1711",
      user: "john doe",
      date: "17 Jun 2021",
      price: "$900",
      status: "shipping",
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "paid",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "pending",
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "paid",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "refund",
    },
  ],
};

const orderStatus = {
  shipping: "primary",
  pending: "warning",
  paid: "success",
  refund: "danger",
};

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.user}</td>
    <td>{item.price}</td>
    <td>{item.date}</td>
    <td>
      <Badge type={orderStatus[item.status]} content={item.status} />
    </td>
  </tr>
);

const Dashboard = () => {
  //[estado inicial, metodo para modificar]
  const [projects, setProjects] = useState([]);

  //Que sucedera cuando la aplicacion se cargue
  useEffect(() => {
    //Consulta a la db de la data y mostrarla
    const getProjects = () => {
      fetch("http://localhost:4000/projects")
        .then((res) => res.json())
        .then((res) => setProjects(res));
    };
    return getProjects;
  }, []);

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
        <div className="col-5">
          <div className="card">
            {/* Tabla con link a la principal*/}
            <div className="card__header">
              <h3>Tabla test</h3>
            </div>
            <div className="card__body">
              <TableProjects projects={projects} />
              {/* <Table
                cabezeraData={topCustomers.head}
                cabezera={(item, index) => renderProjectHead(item, index)}
                cuerpoData={projects.nombre}
                cuerpo={(item, index) => renderProjectBody(item, index)}
              /> */}
            </div>
            <div className="card__footer">
              <Link to="/projects">Ver todos</Link>
            </div>
          </div>
        </div>
        <div className="col-7">
          <div className="card">
            {/* Segunda tabla*/}
            <div className="card__header">
              <h3>Tabla de Actividades</h3>
            </div>
            <div className="card__body">
              {/* <Table
                cabezeraData={latestOrders.header}
                cabezera={(item, index) => renderOrderHead(item, index)}
                cuerpoData={latestOrders.body}
                cuerpo={(item, index) => renderOrderBody(item, index)}
              /> */}
            </div>
            <div className="card__footer">
              <Link to="/actividades">Ver todo</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
