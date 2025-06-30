
import AdminDashboardLayout from "..";
import AboutIntroductionDashboard from "./aboutIntroduction";
import AboutMissionVisionDashboard from "./aboutmissionvision";



const AboutPageDashboard = () => {


    return (
        <>
            <AdminDashboardLayout>

                <AboutIntroductionDashboard />
                <AboutMissionVisionDashboard />
            </AdminDashboardLayout>
        </>

    );
};

export default AboutPageDashboard;
