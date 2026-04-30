import Sidebar from "./Sidebar";
import Body from "./Body";

const Profile = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Body className="flex-4" />
    </div>
  );
};

export default Profile;
