import * as sales from "../services/sales_report.js";

export const getSalesReport = async (req, res) => {

    try {

        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({
                message: "Start and end date required"
            });
        }

        const data = await sales.fetchSalesReport(startDate, endDate);

        res.json({
            success: true,
            data
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }

};


export const getTotalSales = async (req, res) => {

    const { startDate, endDate } = req.query;

    const data = await sales.fetchTotalSales(startDate, endDate);

    res.json(data);
};