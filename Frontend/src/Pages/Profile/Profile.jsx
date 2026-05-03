import Sidebar from "./Sidebar";
import Body from "./Body";
import { useProfile, useUpdateProfile, useLogout } from "../../hooks/useUser";
import { ENV } from "../../config/env";
import { useState } from "react";
import ChangePassword from "./ChangePassword";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { uploadImage } from "../../services/uploadImage";

const Profile = () => {
  const { data: user, isLoading, isError } = useProfile();
  const updateUser = useUpdateProfile();
  const logout = useLogout();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [activeItem, setActiveItem] = useState("profile");

  // ✅ image state
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  if (isLoading)
    return <div className="p-10 text-xl text-center">Loading Profile...</div>;

  if (isError || !user)
    return (
      <div className="p-10 text-xl text-center">Error Loading Profile</div>
    );

  // ✅ use preview if exists, otherwise backend image
  const avatarUrl = previewUrl || user.image;

  const userInfo = {
    name: user?.name,
    role: user?.role,
    avatarUrl,
    email: user?.email,
    mobile: user?.contact,
    joinDate: new Date(user.join_date).toDateString(),
    location: user?.address,
  };

  // ✅ handle save (profile + image together)
  const handleSave = async (form) => {
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

    // ✅ upload image if changed
    if (imageFile) {
      try {
        const uploadedUrl = await uploadImage(imageFile, "StaffImage");
        payload.image = uploadedUrl;
      } catch (err) {
        alert("Image upload failed");
        return;
      }
    }

    if (Object.keys(payload).length === 0) return;

    updateUser.mutate(payload, {
      onSuccess: () => {
        setImageFile(null);
        setPreviewUrl(null);
      },
      onError: () => {
        alert("Failed to update profile");
      },
    });
  };

  // ✅ only store file + preview (no API call here)
  const handleImageChange = (file) => {
    if (!file) return;

    setImageFile(file);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleChangePassword = ({ oldPassword, newPassword }) => {
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

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      queryClient.clear();
      navigate("/login");
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
