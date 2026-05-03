import { Link } from "react-router";
import profilePicture from "../../assets/profilePicture.png";
import { useProfile } from "../../hooks/useUser";
import { ENV } from "../../config/env";

const AuthPill = ({ signedIn = false, isActive = false }) => {
  const { data: user, isLoading } = useProfile();

  const bg = isActive ? "bg-white" : "bg-none hover:bg-white/50";

  const imageSrc = user?.image ? user.image : profilePicture;

  if (!signedIn) {
    return (
      <div className={`px-3.75 ${bg} rounded-lg py-2 cursor-pointer`}>
        <img
          src={profilePicture}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    );
  }

  return (
    <Link to="/profile">
      <div className={`px-3.75 ${bg} rounded-lg py-2 cursor-pointer`}>
        <img
          src={imageSrc}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.src = profilePicture; // fallback if broken URL
          }}
        />
      </div>
    </Link>
  );
};

export default AuthPill;
