import PropTypes from "prop-types";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export const BarraChart = ({ datos }) => {
  console.log("datos de compoennte de vbarras: ", datos);
  const data = [
    {
      name: datos[0].name,
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Autocontrol",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Automotivacion",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Empatia",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Habilidades sociales",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
  ];

  const hola = (label) => {
    if (label === "Page A") {
      return "Page A is about men's clothing";
    }
    if (label === "Page B") {
      return "Page B is about women's dress";
    }
    if (label === "Page C") {
      return "Page C is about women's bag";
    }
    if (label === "Page D") {
      return "Page D is about household goods";
    }
    if (label === "Page E") {
      return "Page E is about food";
    }
    if (label === "Page F") {
      return "Page F is about baby food";
    }
    return "";
  };
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
          <p className="intro">{hola(label)}</p>
          <p className="desc">Anything you want can be displayed here.</p>
        </div>
      );
    }

    return null;
  };
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Bar dataKey="pv" barSize={20} fill="#8884d8" />
    </BarChart>
  );
};

BarraChart.propTypes = {
  datos: PropTypes.object,
  active: PropTypes.string,
  payload: PropTypes.array,
  label: PropTypes.string,
};
