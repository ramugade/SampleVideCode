const mongoose = require('mongoose');

const retirementPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    // User Information
    currentAge: {
      type: Number,
      required: [true, 'Current age is required'],
      min: [18, 'Age must be at least 18'],
      max: [100, 'Age must be less than 100']
    },
    retirementAge: {
      type: Number,
      required: [true, 'Retirement age is required'],
      min: [50, 'Retirement age must be at least 50'],
      max: [100, 'Retirement age must be less than 100']
    },
    desiredAnnualIncome: {
      type: Number,
      required: [true, 'Desired annual income is required'],
      min: [0, 'Income must be positive']
    },
    currentSavings: {
      type: Number,
      required: [true, 'Current savings is required'],
      min: [0, 'Savings cannot be negative'],
      default: 0
    },
    monthlyContribution: {
      type: Number,
      required: [true, 'Monthly contribution is required'],
      min: [0, 'Contribution cannot be negative']
    },
    riskTolerance: {
      type: String,
      required: [true, 'Risk tolerance is required'],
      enum: ['conservative', 'moderate', 'aggressive']
    },
    // Calculated Results
    projectedRetirementFund: {
      type: Number
    },
    sustainableAnnualIncome: {
      type: Number
    },
    goalMet: {
      type: Boolean
    },
    shortfall: {
      type: Number,
      default: 0
    },
    recommendedMonthlyIncrease: {
      type: Number,
      default: 0
    },
    // Additional Information
    notes: {
      type: String,
      maxlength: [1000, 'Notes cannot exceed 1000 characters']
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'archived'],
      default: 'active'
    },
    lastReviewed: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for years to retirement
retirementPlanSchema.virtual('yearsToRetirement').get(function () {
  return this.retirementAge - this.currentAge;
});

// Virtual for expected return rate
retirementPlanSchema.virtual('expectedReturnRate').get(function () {
  const returnRates = {
    conservative: 0.05,
    moderate: 0.07,
    aggressive: 0.09
  };
  return returnRates[this.riskTolerance] || 0.07;
});

// Calculate retirement projections before saving
retirementPlanSchema.pre('save', function (next) {
  const yearsToRetirement = this.retirementAge - this.currentAge;
  const monthsToRetirement = yearsToRetirement * 12;

  const returnRates = {
    conservative: 0.05,
    moderate: 0.07,
    aggressive: 0.09
  };

  const annualReturn = returnRates[this.riskTolerance];
  const monthlyReturn = annualReturn / 12;

  // Calculate future value using compound interest formula
  const fvPresent = this.currentSavings * Math.pow(1 + monthlyReturn, monthsToRetirement);
  const fvPayments =
    this.monthlyContribution * ((Math.pow(1 + monthlyReturn, monthsToRetirement) - 1) / monthlyReturn);

  this.projectedRetirementFund = fvPresent + fvPayments;

  // Calculate sustainable income using 4% rule
  this.sustainableAnnualIncome = this.projectedRetirementFund * 0.04;

  // Check if goal is met
  this.goalMet = this.sustainableAnnualIncome >= this.desiredAnnualIncome;

  if (!this.goalMet) {
    this.shortfall = this.desiredAnnualIncome - this.sustainableAnnualIncome;

    // Calculate required contribution
    const targetFund = this.desiredAnnualIncome / 0.04;
    const fvPresent = this.currentSavings * Math.pow(1 + monthlyReturn, monthsToRetirement);
    const remainingAmount = targetFund - fvPresent;

    if (remainingAmount > 0) {
      const requiredContribution =
        remainingAmount / ((Math.pow(1 + monthlyReturn, monthsToRetirement) - 1) / monthlyReturn);
      this.recommendedMonthlyIncrease = Math.max(0, requiredContribution - this.monthlyContribution);
    }
  } else {
    this.shortfall = 0;
    this.recommendedMonthlyIncrease = 0;
  }

  next();
});

// Index for faster queries
retirementPlanSchema.index({ user: 1, status: 1 });
retirementPlanSchema.index({ createdAt: -1 });

module.exports = mongoose.model('RetirementPlan', retirementPlanSchema);
