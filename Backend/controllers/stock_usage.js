import * as Stock from "../services/stock_usage.js";


export const createUsage = async (req, res) => {
  console.log("Received usage data:", req.body);
  try {
    const {
      stock_item_id,
      quantity_used,
      usage_type,
      note,
    } = req.body;

    const userId = req.user.id;

    const result = await Stock.createUsageService({
      stock_item_id,
      quantity_used,
      usage_type,
      note,
      created_by: userId,
    });
    
    res.status(200).json(result);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



export const getUsageHistory = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        message: "startDate and endDate are required",
      });
    }

    const data = await Stock.getUsageHistory({
      startDate,
      endDate,
    });

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};