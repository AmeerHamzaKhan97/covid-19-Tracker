// // import { registerables } from 'chart.js';
// import React,{useState,useEffect}from 'react';
// import { Line} from 'react-chartjs-2';
// import numeral from "numeral";


// const options={
//     legend:{
//         display:false,
//     },
//     elements:{
//         point:{
//             radius:0,
//         },
//     },
//     maintainAspectRatio:true,
//     tooltips:{
//         mode:'index',
//         intersect:false,
//         callbacks:{
//             label:function(tooltipItem, data){
//                 return numeral(tooltipItem.vlaue).format("+0,0")
//             },
//         },
//     },
//     scales:{
//         xAxes:[
//             {
//                 type:'time',
//                 time:{
//                     format:"MM/DD/YY",
//                     tooltipFormat:'ll'
//                 },
//             },
//         ],
//         yAxes:[
//             {
//                 gridLines:{
//                     display:false,

//                 },
//                 ticks:{
//                     callbacks:function(value,index,values){
//                         return numeral(value).format("0a");
//                     },
//                 },
//             },
//         ],
//     },
// }

// const buildChartData = (data, casesType = "cases") => {
//   let chartData = [];
//   let lastDataPoint;
//   for (let date in data.cases) {
//     if (lastDataPoint) {
//       let newDataPoint = {
//         x: date,
//         y: data[casesType][date] - lastDataPoint,
//       };
//       chartData.push(newDataPoint);
//     }
//     lastDataPoint = data[casesType][date];
//   }
//   return chartData;
// };


// function LineGraph({}) {
//   const [data, setData] = useState({});


  
//   useEffect(() => {
//     const fetchData = async () => {
//       await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=30")
//         .then((res) => res.json())
//         .then((data) => {
//           let chartData = buildChartData(data, "cases");
//           console.log(data);
//         //   const chartData = buildChartData(data);
//           setData(chartData);
//           console.log(chartData);
//         });
//     };
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Im a Graph</h1>
//       {/* {data?.length > 0 && ( */}
//       <Line
//         options={options}
//         data={{
//           datasets: [
//             {
//               backgroundColor: "rgba(204,16,52.0.5)",
//               borderColor: "#CC1034",
//               data: data,
//             },
//           ],
//         }}
//       />
//       {/* )} */}
//     </div>
//   );
// }

// export default LineGraph
import React, { Component } from "react";
import { Line } from "react-chartjs-2";


const buildChartData = (data, casesType = "cases") => {
  let chartX = [];
  let chartY = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      chartX.push(date);
      chartY.push(data[casesType][date] - lastDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return {
    labels: chartX,
    datasets: [
      {
        label: "Cases",
        fill: false,
        // lineTension: 0.1,
        // backgroundColor: "rgba(75,192,192,0.4)",
        // borderColor: "rgba(75,192,192,1)",
        // borderCapStyle: "butt",
        // borderDash: [],
        // borderDashOffset: 0.0,
        // borderJoinStyle: "miter",
        // pointBorderColor: "rgba(75,192,192,1)",
        // pointBackgroundColor: "#fff",
        // pointBorderWidth: 1,
        // pointHoverRadius: 5,
        // pointHoverBackgroundColor: "rgba(75,192,192,1)",
        // pointHoverBorderColor: "rgba(220,220,220,1)",
        // pointHoverBorderWidth: 2,
        // pointRadius: 1,
        // pointHitRadius: 10,
        backgroundColor: "rgba(204,16,52.0.5)",
                      borderColor: "#CC1034",
        data: chartY,
      },
    ],
  };
};

export default class LineGraph extends Component {
  constructor() {
    super();
    this.state = { data: [] };
    // this.refs= React.createRef();
  }

  componentDidMount() {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=30")
        .then((res) => res.json())
        .then((data) => {
          let chartData = buildChartData(data, "cases");
          // console.log(data);
          this.setState({ data: chartData });
          // console.log(chartData[1]);
        });
    };
    fetchData();
    
  }
  render() {
    return (
      <div>
        <Line data={this.state.data} />
      </div>
    );
  }
}
