import { Link } from "react-router";
import profilePicture from "../../assets/profilePicture.png";

const AuthPill = ({ signedIn = false, isActive = false, onProfileClick }) => {
  const bg = isActive ? "bg-white" : "bg-none hover:bg-white/50";

  if (!signedIn) {
    return (
      <button
        type="button"
        className={`cursor-pointer border-0 bg-transparent p-0 ${bg} rounded-lg px-3.75 py-1.5`}
        onClick={onProfileClick}
      >
        <span className="flex font-semibold text-[20px] text-white items-center justify-center">
          Sign In
        </span>
      </button>
    );
  }

  return (
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
  );
};

export default AuthPill;