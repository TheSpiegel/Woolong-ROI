const { calculateProfit } = require('./calculator.js');

console.log("--- Woolong ROI Engine Test ---");

// Test Case 1: Standard Item (e.g., a vintage t-shirt)
// Bought for $5, Sold for $30, Charged buyer $5 shipping, actual shipping cost $4.
const test1 = calculateProfit(30.00, 5.00, 5.00, 4.00, "standard");
console.log("Test 1 (Standard):", test1);

// Test Case 2: Sneakers over $150 (Lower 8% fee)
// Bought for $100, Sold for $200, Free shipping, actual shipping cost $10.
const test2 = calculateProfit(200.00, 0.00, 100.00, 10.00, "sneakers_over_150");
console.log("Test 2 (Sneakers >$150):", test2);

// Test Case 3: High-end watch testing the $7,500 max fee cap
// Bought for $50,000, Sold for $80,000, Free shipping, actual shipping cost $100.
const test3 = calculateProfit(80000.00, 0.00, 50000.00, 100.00, "standard");
console.log("Test 3 (Fee Cap Safety):", test3);