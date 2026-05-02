import { getSalesReport, getTotalSales } from "../models/sales_report.js";

export const fetchSalesReport = async (start, end) => {

    return await getSalesReport(start, end);

};


export const fetchTotalSales = async (start, end) => {
    return await getTotalSales(start, end);
};