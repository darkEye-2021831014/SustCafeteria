import AttendanceTableRow from "./AttendanceTableRow";
import { AttendanceContext }  from "./../Context/AttendanceContext/AttendanceContext";
import { useContext } from "react";
const AttendanceTable = () => {
    const { filteredStaff } = useContext(AttendanceContext);

  return (
    <table className="w-full border border-gray-300  table-fixed">
      <thead className="bg-[#E8B5BA]/35">
        <tr>
          <th className="border border-gray-300 px-4 py-3">নাম</th>
          <th className="border border-gray-300 px-4 py-3">পদবি</th>
          <th className="border border-gray-300 px-4 py-3">স্ট্যাটাস</th>
          <th className="border border-gray-300 px-4 py-3">সময়</th>
        </tr>
      </thead>
      <tbody>
        {filteredStaff.map((staff, index) => (
          <AttendanceTableRow key={index} staff={staff} />
        ))}
      </tbody>
    </table>
  );
};

export default AttendanceTable;
