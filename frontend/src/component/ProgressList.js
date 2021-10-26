/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

function ProgressList() {
  const [chartData, setChartData] = useState({});
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/progress/get/")
      .then((res) => setProjects(res.data))
      .catch((err) => {
        console.log("error" + err);
      });
  }, []);

  useEffect(() => {
    let proje = [];
    let user = [];

    const groupingArr = projects.reduce(
      (projectsSoFar, { userName, projectName }) => {
        if (!projectsSoFar[userName]) projectsSoFar[userName] = [];
        projectsSoFar[userName].push(projectName);
        return projectsSoFar;
      },
      {} //initial valuesss
    );
    {
      Object.keys(groupingArr).map((item) => {
        user.push(item);
        return item;
      });
    }
    {
      Object.values(groupingArr).map((item) => {
        proje.push(item.length);
        return item;
      });
    }

    setChartData({
      labels: user,
      datasets: [
        {
          label: "how many projects per users have",
          data: proje,
          backgroundColor: ["rgba(75, 192, 192, 0.6)"],
          borderWidth: 5,
        },
      ],
    });
  }, [projects]);
  return (
    <div name="progList" style={{ margin: "30px" }}>
      <h1>Projects</h1>
      <div>
        <Line
          data={chartData}
          options={{
            responsive: true,
            title: { text: "THICCNESS SCALE", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
}

export default ProgressList;
