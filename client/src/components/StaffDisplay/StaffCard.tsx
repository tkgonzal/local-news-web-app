import { Staff } from "../../types/interfaces/Staff"

import "./StaffCard.css"

interface Props {
    staff: Staff
}

// Component to display on News Pages, which shows thumbnails of articles to 
// display in each's carousel. Mean to be used for three article carousels
const ArticleThumbnail: React.FC<Props> = ({ staff }) => {

    return (
        <div 
            className="staff-card"
        >
            <img
                className="staff-card--img"
                src={staff.imgSrc}
                alt={staff.staffName} 
            />
            <h2 className="staff-card--name">{staff.staffName}</h2>
            <h3 className="staff-card--position">{staff.position}</h3>
        </div>
    )
}

export default ArticleThumbnail