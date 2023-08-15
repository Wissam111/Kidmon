import { useAuthContext } from "../../../hooks/useAuthContext";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import Spacer from "../../components/Spacer";
import { pieChartOptions, chartOptions } from "../../../data/data";
import "./Dashboard.css";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import ChartView from "../../components/ChartView/ChartView";
import ProductRow from "./components/ProductRow";
import DashboardViewModal from "./DashboardViewModal";
import { useMemo } from "react";
import moment from "moment";

const Dashboard = () => {
  const { dashboardStats } = DashboardViewModal();
  const { user } = useAuthContext().authData;

  const TopSholdProducts = useMemo(() => {
    const _data = dashboardStats?.topSoldProducts?.map((item) => [
      item.key,
      parseInt(item.value),
    ]);
    return [["Day", "amount"]].concat(_data);
  }, [dashboardStats]);

  const CategoryDistribution = useMemo(() => {
    if (!dashboardStats?.categoriesCounters) return;
    return [
      ["All", "All"],
      ...Object.entries(dashboardStats?.categoriesCounters).map(
        ([category, value]) => [category, parseInt(value)]
      ),
    ];
  }, [dashboardStats]);

  const purchasesByHourData = useMemo(() => {
    const formattedData = [["Year", "Sales"]];

    dashboardStats?.purchasesByHour?.forEach((item) => {
      const momentDate = moment(new Date(item.key + ":00+0000"));
      const date = momentDate.format("HH:mm");

      const sales = parseInt(item.value, 10);

      formattedData.push([date, sales]);
    });

    return formattedData;
  }, [dashboardStats]);

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
              count={dashboardStats?.soldProductsCount}
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
              count={dashboardStats?.purchasesCount}
              image={require("../../../assets/icons/purchase.png")}
            />
          </div>

          <div className="stats">
            <div className="charts-container">
              <div className="counters-charts">
                <ChartView
                  chartType="ColumnChart"
                  chartData={TopSholdProducts}
                  options={chartOptions}
                  title="Top Sold Products"
                  width="400px"
                  height={"260px"}
                />

                <ChartView
                  chartType="PieChart"
                  chartData={CategoryDistribution}
                  title="Product Category Distribution"
                  width="400px"
                  height={"260px"}
                  options={pieChartOptions}
                />
              </div>
              <ChartView
                chartType="LineChart"
                chartData={purchasesByHourData}
                title="Daily Purchase Trends"
                width="100%"
                height={"300px"}
                options={chartOptions}
              />
            </div>

            <div className="recent-added-products">
              <h3>Recently Sold Proudcts</h3>
              <div className="dashboard-recent-products">
                {[...new Set(dashboardStats?.recentSoldProducts)]?.map(
                  (recent) => (
                    <ProductRow
                      product={JSON.parse(recent)}
                      key={JSON.parse(recent)._id}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
