import { useAuthContext } from '../../../hooks/useAuthContext';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import Spacer from '../../components/Spacer';
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



// top sold products
// recent sold products 
// graph sold counter per day

const Dashboard = () => {
  const { user } = useAuthContext().authData

  return (
    <div className="page-container">
      <div className="dashboard-container">
        <div style={{ display: 'flex' }}>
          <img />
          <p>Wellcome, {user.firstName} {user.lastName}</p>
        </div>

        <div className="counters">
          <DashboardCard text='Users' count='3,567' />
          <DashboardCard text='Sold Products' count='4,999' />
          <DashboardCard text='Products' count='400' />
          <DashboardCard text='Avg Purchases, Day' count='31.43' />
          <DashboardCard text='Purchases' count='560,564' />
        </div>

        {/* <Spacer space={20} /> */}

        <div className="stats">
          <div className="top-sold-products">
            <h3>Top Sold Products</h3>
            {
              topSoldProducts.map(p => (
                <div>
                  <p>{p.title} {p.amount}</p>
                </div>
              ))
            }
          </div>


          <div className="recent-sold-products">
            <h3>Recent Sold Products</h3>
            {
              recentSoldProducts.map(recent =>
                <div style={{ display: 'flex' }}>
                  <p>image here</p>
                  <Spacer space={20} />
                  <p>{recent.title} was bought x{recent.amount}</p>
                </div>
              )
            }
          </div>
        </div>


        <h3>Purchases Graph By Hour</h3>
      </div>
    </div>
  );
}

export default Dashboard;