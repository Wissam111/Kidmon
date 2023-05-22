import './DashboardCard.css'

const DashboardCard = ({ text, count }) => {
    return (
        <div className='dashboardcard-container'>
            <h4>{text}</h4>
            <p>{count}</p>
        </div>
    );
}

export default DashboardCard;