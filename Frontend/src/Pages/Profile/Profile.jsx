import Sidebar from "./Sidebar";
import Body from "./Body";
import {
  useProfile,
  useUpdateProfile,
  useUpdateImage,
  useLogout,
} from "../../hooks/useUser";
import { ENV } from "../../config/env";
import { useState } from "react";
import ChangePassword from "./ChangePassWord";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const Profile = () => {
  const { data: user, isLoading, isError } = useProfile();
  const updateUser = useUpdateProfile();
  const updateImage = useUpdateImage();
  const logout = useLogout();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("profile");

  if (isLoading)
    return <div className="p-10 text-xl text-center">Loading Profile...</div>;
  if (isError || !user)
    return (
      <div className="p-10 text-xl text-center">Error Loading Profile</div>
    );

  const avatarUrl = `${ENV.BASE_URL}/${user.image}`;

  const userInfo = {
    name: user?.name,
    role: user?.role,
    avatarUrl,
    email: user?.email,
    mobile: user?.contact,
    joinDate: new Date(user.join_date).toDateString(),
    location: user?.address,
  };

  const handleSave = (form) => {
    const payload = {};

    if (form.name !== user.name) {
      payload.name = form.name;
    }

    if (form.mobile !== user.contact) {
      payload.contact = form.mobile;
    }

    if (form.location !== user.address) {
      payload.address = form.location;
    }

    if (Object.keys(payload).length === 0) return;
    updateUser.mutate(payload);
  };

  const handleChangePassword = ({ oldPassword, newPassword }) => {
    console.log("Changing password with:", { oldPassword, newPassword });
    updateUser.mutate(
      { oldPassword, newPassword },
      {
        onSuccess: () => setActiveItem("profile"),
        onError: (err) => {
          alert(
            err?.response?.data?.msg ||
              "Failed to change password. Please try again.",
          );
        },
      },
    );
  };

  const handleImageChange = (file) => {
    const formData = new FormData();
    formData.append("image", file);

    updateImage.mutate(formData, {
      onError: (err) => {
        alert(
          err?.response?.data?.msg ||
            "Failed to update profile image. Please try again.",
        );
      },
    });
  };

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();

      queryClient.clear();
      navigate("/");
    } catch (err) {
      setActiveItem("profile");
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="flex">
      <Sidebar
        name={user?.name}
        role={user?.role}
        avatarUrl={avatarUrl}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        onLogOut={handleLogout}
      />
      {activeItem === "profile" && (
        <Body
          className="flex-4"
          user={userInfo}
          onSave={handleSave}
          onAvatarChange={handleImageChange}
        />
      )}
      {activeItem === "password" && (
        <ChangePassword
          className="flex-4"
          onChangePassword={handleChangePassword}
        />
      )}
    </div>
  );
};

export default Profile;
