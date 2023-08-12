import { useAuthContext } from "../../../hooks/useAuthContext";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import Spacer from "../../components/Spacer";
import { pieChartOptions, chartOptions } from "../../../data/data";
import "./Dashboard.css";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import ChartView from "../../components/ChartView/ChartView";
import ProductRow from "./components/ProductRow";
import DashboardViewModal from "./DashboardViewModal";
const recentSoldProducts = [
  {
    title: "Bsli Flafel",
    amount: 500,
    img: require("../../../assets/imgs/bsli2.jpg"),
  },
  {
    title: "Bsli Gril",
    amount: 499,
    img: require("../../../assets/imgs/bsli1.jpg"),
  },
  {
    title: "Green Doretos",
    amount: 300,
    img: require("../../../assets/imgs/dor1.jpg"),
  },
];

const data1 = [
  ["Day", "Amnount"],
  ["Pizza", 12],
  ["Coffe", 54],
  ["Black Coffe", 122],
  ["Bamba", 155],
  ["Doretos", 250],
];

const data2 = [
  ["Year", "Sales"],
  ["08:00", 1000],
  ["10:00", 1170],
  ["14:00", 660],
  ["16:00", 1030],
];

const data3 = [
  ["All", "All"],
  ["Snack", 11],
  ["Cold", 2],
  ["Hot", 3],
  ["Food", 4],
];

const Dashboard = () => {
  const { dashboardStats } = DashboardViewModal();
  const { user } = useAuthContext().authData;

  return (
    <div className="page-container">
      <div className="dashboard-container">
        <div className="inner-container">
          <DashboardHeader firstName={user?.firstName} />

          <div className="counters">
            <DashboardCard
              text="Users"
              count={dashboardStats?.usersCount}
              image={require("../../../assets/icons/user.png")}
            />
            <DashboardCard
              text="Sold Products"
              count={4999}
              image={require("../../../assets/icons/sold.png")}
            />
            <DashboardCard
              text="Products"
              count={dashboardStats?.productsCount}
              image={require("../../../assets/icons/groceries.png")}
            />
            <DashboardCard
              text="Avg Purchases, Day"
              count={31.43}
              image={require("../../../assets/imgs/percentage.png")}
            />
            <DashboardCard
              text="Purchases"
              count={560564}
              image={require("../../../assets/icons/purchase.png")}
            />
          </div>

          <div className="stats">
            <div className="charts-container">
              <div className="counters-charts">
                <ChartView
                  chartType="ColumnChart"
                  chartData={data1}
                  options={chartOptions}
                  title="Top Sold Products"
                  width="400px"
                  height={"260px"}
                />

                <ChartView
                  chartType="PieChart"
                  chartData={data3}
                  title="Product Category Distribution"
                  width="400px"
                  height={"260px"}
                  options={pieChartOptions}
                />
              </div>
              <ChartView
                chartType="LineChart"
                chartData={data2}
                title="Daily Purchase Trends"
                width="100%"
                height={"300px"}
                options={chartOptions}
              />
            </div>

            <div className="recent-added-products">
              <h3>Recently Added Products</h3>
              <div className="dashboard-recent-products">
                {recentSoldProducts.map((recent) => (
                  <ProductRow product={recent} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
