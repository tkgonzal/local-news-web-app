import { Staff } from "../types/interfaces/Staff"
import StaffData from "../assets/StaffData"
import StaffCard from "../components/StaffDisplay/StaffCard"

import "./StaffPage.css";


// Page component for the staff page of the app which displays staff members
const StaffPage: React.FC = () => {

    const staffCards: JSX.Element[] = StaffData.map(
        (staff: Staff) => 
            <StaffCard 
                staff= {staff}
            />
    );
    return (
        <main className="staff-page">

            <h1 className = "staff--header">Staff</h1>
            <div className="staff--section">
                {staffCards}
            </div>


        </main>
    )
}

export default StaffPage