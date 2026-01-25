import { format } from "date-fns";

const AttendancePageHeader = ({ title }) => {
  return (
    <div className="flex justify-between mb-6">
      <h1 className="text-[36px] font-semibold text-[#F54758]">
        {title}
      </h1>

      <p className="text-[#F54758] font-semibold text-[36px]">
        Date: {format(new Date(), "dd MMMM yyyy, EEEE")}
      </p>
    </div>
  );
};

export default AttendancePageHeader;
