import * as sales from "../services/sales_report.js";

export const getSalesReport = async (req, res) => {

    try {

        const { start, end } = req.query;

        if (!start || !end) {
            return res.status(400).json({
                message: "Start and end date required"
            });
        }

        const data = await sales.fetchSalesReport(start, end);

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

    const { start, end } = req.query;

    const data = await sales.fetchTotalSales(start, end);

    res.json(data);
};