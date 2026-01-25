const AttendanceTableRow = ({ staff }) => {
  const statusStyle = {
    Present: "text-green-600 bg-green-100",
    Late: "text-orange-600 bg-orange-100",
    Absent: "text-red-600 bg-red-100",
  };

  return (
    <tr className="border-b text-center hover:bg-[#F54758]/5">
      <td className="border border-gray-300 px-4 py-3">{staff.name}</td>
      <td className="border border-gray-300 px-4 py-3">{staff.role}</td>
      <td className="border border-gray-300 px-4 py-3">
        <span className={`px-3 py-1 rounded-full ${statusStyle[staff.status]}`}>
          {staff.status}
        </span>
      </td>
      <td className="border border-gray-300 px-4 py-3">{staff.time || "-"}</td>
    </tr>
  );
};
export default AttendanceTableRow;
