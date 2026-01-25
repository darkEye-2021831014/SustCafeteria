const AttendanceTableHeader = ({ title, reportingTime }) => {
  return (
    <div className="flex justify-between mb-4">
      <h2 className="text-[32px] text-[#F54758]">
        {title}
      </h2>

      <p className="text-[#F54758] text-[32px]">
        Reporting Time: {reportingTime}
      </p>
    </div>
  );
};

export default AttendanceTableHeader;
