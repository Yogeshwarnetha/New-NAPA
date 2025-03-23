
import AdminDashboardLayout from "..";
import AdvisoryBoardDashboard from "./advisoryBoard";
import BoardofDirectorsDashboard from "./BoardofDirectors";
import ExecutiveCommitteeDashboard from "./executiveCommitte";
import PastPresidentDashboard from "./pastpresidents";


const BoardMembersDashboard = () => {


  return (
    <AdminDashboardLayout>
      <AdvisoryBoardDashboard/>
      <ExecutiveCommitteeDashboard/>
      <PastPresidentDashboard/>
      <BoardofDirectorsDashboard/>
    </AdminDashboardLayout>
  );
};

export default BoardMembersDashboard;
