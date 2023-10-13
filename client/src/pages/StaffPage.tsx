import { useNavigate } from "react-router-dom";
import { useUserContext } from '../contexts/UserContext';

import { Staff } from "../types/interfaces/Staff"
import StaffData from "../test/StaffData"
import StaffCard from "../components/StaffDisplay/StaffCard"

import "./StaffPage.css";


// Page component for the home page of the app which displays breaking news
const StaffPage: React.FC = () => {

    const { user } = useUserContext();

    const navigate = useNavigate();

    const staffCards: JSX.Element[] = StaffData.map(
        (staff: Staff) => 
            <StaffCard 
                staff= {staff}
            />
    );
    return (
        <main className="home">


            <div className="staff--section">
                {staffCards}
            </div>


        </main>
    )
}

export default StaffPage