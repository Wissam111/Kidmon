import { useAuthContext } from '../../../hooks/useAuthContext';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import Spacer from '../../components/Spacer';
import { Chart } from "react-google-charts";
import './Dashboard.css'



const topSoldProducts = [
  { title: 'Pizza', amount: 500 },
  { title: 'Coffe', amount: 499 },
  { title: 'Green Doretos', amount: 300 },
  { title: 'Black Coffe', amount: 263 },
  { title: 'Ice Tee', amount: 242 },
]


const recentSoldProducts = [
  { title: 'Pizza', amount: 500 },
  { title: 'Coffe', amount: 499 },
  { title: 'Green Doretos', amount: 300 },
  { title: 'Black Coffe', amount: 263 },
  { title: 'Ice Tee', amount: 242 },
]

const options = {
  // hAxis: { title: "Day", viewWindow: { min: 0, max: 15 } },
  // vAxis: { title: "Amount", viewWindow: { min: 0, max: 15 } },
  legend: "none",
  colors: ['#000']
};


const data1 = [
  ["Day", "Amnount"],
  ['Pizza', 12],
  ['Coffe', 54],
  ['Black Coffe', 122],
  ['Bamba', 155],
  ['Doretos', 250],
];


const data2 = [
  ["Year", "Sales"],
  ["2004", 1000],
  ["2005", 1170],
  ["2006", 660],
  ["2007", 1030],
];

const data3 = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

// top sold products
// recent sold products 
// graph sold counter per day

const Dashboard = () => {
  const { user } = useAuthContext().authData

  return (
    <div className="page-container">
      <div className="dashboard-container">
        <div className='inner-container'>

          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className='user-container'>
              <img />
              <p>Wellcome, {user.firstName} {user.lastName}</p>
            </div>

            <div className="space"></div>

            <div className="time-container">
              <p>{(new Date()).toISOString()}</p>
            </div>

            <div className="space"></div>

          </header>

          <div className="counters">
            <DashboardCard text='Users' count='3,567' image={require('../../../assets/imgs/man.png')} />
            <DashboardCard text='Sold Products' count='4,999' image={require("../../../assets/imgs/sign.png")} />
            <DashboardCard text='Products' count='400' image={require("../../../assets/imgs/products.png")} />
            <DashboardCard text='Avg Purchases, Day' count='31.43' image={require("../../../assets/imgs/man.png")} />
            <DashboardCard text='Purchases' count='560,564' image={require("../../../assets/imgs/shopping-bag.png")} />
          </div>

          {/* <Spacer space={20} /> */}

          <div className="stats">

            <div className='charts-container'>
              <div className='counters-charts'>
                <div className="top-sold-products">
                  {/* <h3>Top Sold Products</h3> */}
                  <Chart
                    chartType="ColumnChart"
                    data={data1}
                    options={options}
                    width="400px"
                    height={"260px"}
                    legendToggle
                  />
                </div>


                <div className="recent-sold-products">
                  {/* <h3>Recent Sold Products</h3> */}
                  <Chart
                    chartType="PieChart"
                    data={data3}
                    width={"400px"}
                    height={"260px"}
                  />
                </div>
              </div>

              <div className="recent-sold-products">
                <Chart
                  chartType="LineChart"
                  width="100%"
                  height="300px"
                  data={data2}
                />
              </div>

            </div>


            <div className="recent-sold-products">
              <h3>Recent Sold Products</h3>
              {
                recentSoldProducts.map(recent =>
                  <div style={{ display: 'flex' }}>
                    <img style={{ width: '40px', height: '40px' }} src={require("../../../assets/imgs/shopping-bag.png")} alt="" />
                    <Spacer space={20} />
                    <p>{recent.title} was bought x{recent.amount}</p>
                  </div>
                )
              }
            </div>
          </div>



        </div>
      </div>
    </div>
  );
}

export default Dashboard;