// Import the fee variables we just isolated
const feeConfig = require('./fee_config.json');

function calculateProfit(salePrice, shippingCharged, itemCost, actualShippingCost, categoryKey) {
    // 1. Find the correct category rates
    const category = feeConfig.categories[categoryKey];
    if (!category) {
        throw new Error("Invalid category selected");
    }

    // 2. Calculate Total Revenue (eBay charges fees on the total amount the buyer pays)
    const totalRevenue = salePrice + shippingCharged;

    // 3. Calculate Final Value Fee
    let finalValueFee = totalRevenue * category.rate;

    // 4. Apply the $7,500 Fee Cap (Safety check)
    if (finalValueFee > feeConfig.max_fee_cap) {
        finalValueFee = feeConfig.max_fee_cap;
    }

    // 5. Add the fixed $0.30 order fee
    const totalFees = finalValueFee + feeConfig.fixed_order_fee;

    // 6. Calculate final Net Profit
    const netProfit = totalRevenue - totalFees - itemCost - actualShippingCost;

    // 7. Return the neatly formatted numbers
    return {
        totalRevenue: parseFloat(totalRevenue.toFixed(2)),
        totalFees: parseFloat(totalFees.toFixed(2)),
        netProfit: parseFloat(netProfit.toFixed(2))
    };
}

// Export the function so the rest of your app can use it
export { calculateProfit };
