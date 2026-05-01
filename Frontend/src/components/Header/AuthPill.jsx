import { Link } from "react-router";
import profilePicture from "../../assets/profilePicture.png";
import HeaderPill from "./HeaderPill";

const AuthPill = ({ signedIn = true, isActive = false }) => {
  const bg = isActive ? "bg-white" : "bg-none hover:bg-white/50";

  return signedIn ? (
    <Link to="/profile">
      <div
        className={`w-auto h-auto px-3.75 ${bg} rounded-lg py-2 h-fit cursor-pointer`}
      >
        <img
          src={profilePicture}
          alt="Profile Image"
          className="w-10 h-10 rounded-full object-cover "
        />
      </div>
    </Link>
  ) : (
    <HeaderPill name="Sign In" isActive={true} />
  );
};

export default AuthPill;
