export const getStaffFields = (selectedStaff, activeTab) => {
  console.log("selected Staff", selectedStaff);
  const isRemove = activeTab === "Release Staff";
  return [
    {
      label: "Name",
      name: "name",
      placeholder: "Robin Uddin",
      defaultValue: selectedStaff?.name,
      disabled: isRemove,
    },

    {
      label: "Role",
      name: "role",
      placeholder: "Manager",
      defaultValue: selectedStaff?.role,
      disabled: isRemove,
    },
    {
      label: "Salary(In Taka)",
      name: "salary",
      type: "number",
      placeholder: "14000",
      defaultValue: selectedStaff?.salary,
      disabled: isRemove,
    },

    {
      label: "Contuct Number",
      name: "contact",
      placeholder: "01776830203",
      defaultValue: selectedStaff?.contact,
      disabled: isRemove,
    },
    {
      label: "Email",
      name: "email",
      placeholder: "robin@gmail.com",
      defaultValue: selectedStaff?.email,
      disabled: isRemove,
    },
    {
      label: "Location",
      name: "location",
      placeholder: "01776830203",
      defaultValue: selectedStaff?.location,
      disabled: isRemove,
    },
  ];
};

export const getTitle=(activeTab)=>{
  if(activeTab==="Register Staff") return "Register New Staff";
  if(activeTab==="Release Staff") return "Do You Want To Release This Staff?";
  return "";
}
export const getImageUpload=(activeTab)=>{
  return activeTab==="Register Staff";
}