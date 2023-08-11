import Spacer from "../Spacer";
import "./DashboardCard.css";
import CountUp from "react-countup";
const DashboardCard = ({ text, count, image }) => {
  return (
    <div className="dashboardcard-container">
      <h4>{text}</h4>
      <div className="space"></div>
      <div>
        <p>
          {
            <CountUp
              start={0}
              end={count}
              duration={3}
              separator=","
              decimal="."
            />
          }
        </p>
        <Spacer space={6} />
        <img src={image} alt="" />
      </div>
    </div>
  );
};

export default DashboardCard;
