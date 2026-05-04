import React from "react";
import { useReactToPrint } from "react-to-print";
import TextIconButton from "../Button/TextIconButton";
import { PiDownloadSimpleBold } from "react-icons/pi";
const PDFPrint = ({
  targetRef,
  title = "Document",
  buttonText = "PDF",
  className = "",
}) => {
  const handlePrint = useReactToPrint({
    contentRef: targetRef,
    documentTitle: title,

    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }

      @media print {
        .no-print {
          display: none !important;
        }

        body {
          -webkit-print-color-adjust: exact;
        }
      }
    `,
  });

  return (
    <div className={`no-print ${className} `}>
      <TextIconButton
        text={buttonText}
        onClick={handlePrint}
        icon={<PiDownloadSimpleBold />}
        className="px-4 py-2 bg-[#6294ff] text-white rounded-full text-lg"
      />
    </div>
  );
};

export default PDFPrint;
