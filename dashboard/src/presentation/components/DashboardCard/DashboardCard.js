import Spacer from '../Spacer';
import './DashboardCard.css'
const DashboardCard = ({ text, count, image }) => {
    return (
        <div className='dashboardcard-container'>
            <h4>{text}</h4>
            <div className="space"></div>
            <div>
                <p>{count}</p>
                <Spacer space={6} />
                <img src={image} alt="" />
            </div>
        </div>
    );
}

export default DashboardCard;