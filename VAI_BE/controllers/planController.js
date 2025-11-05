const RetirementPlan = require('../models/RetirementPlan');
const { validationResult } = require('express-validator');

// @desc    Create new retirement plan
// @route   POST /api/plans
// @access  Private
exports.createPlan = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const {
      currentAge,
      retirementAge,
      desiredAnnualIncome,
      currentSavings,
      monthlyContribution,
      riskTolerance,
      notes
    } = req.body;

    // Validate retirement age is greater than current age
    if (retirementAge <= currentAge) {
      return res.status(400).json({
        success: false,
        message: 'Retirement age must be greater than current age'
      });
    }

    const plan = await RetirementPlan.create({
      user: req.user.id,
      currentAge,
      retirementAge,
      desiredAnnualIncome,
      currentSavings,
      monthlyContribution,
      riskTolerance,
      notes
    });

    res.status(201).json({
      success: true,
      plan
    });
  } catch (error) {
    console.error('Create plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating retirement plan',
      error: error.message
    });
  }
};

// @desc    Get all retirement plans for logged in user
// @route   GET /api/plans
// @access  Private
exports.getPlans = async (req, res) => {
  try {
    const { status } = req.query;

    const query = { user: req.user.id };

    if (status) {
      query.status = status;
    }

    const plans = await RetirementPlan.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: plans.length,
      plans
    });
  } catch (error) {
    console.error('Get plans error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching retirement plans',
      error: error.message
    });
  }
};

// @desc    Get single retirement plan
// @route   GET /api/plans/:id
// @access  Private
exports.getPlan = async (req, res) => {
  try {
    const plan = await RetirementPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Retirement plan not found'
      });
    }

    // Make sure user owns the plan
    if (plan.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this plan'
      });
    }

    res.status(200).json({
      success: true,
      plan
    });
  } catch (error) {
    console.error('Get plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching retirement plan',
      error: error.message
    });
  }
};

// @desc    Update retirement plan
// @route   PUT /api/plans/:id
// @access  Private
exports.updatePlan = async (req, res) => {
  try {
    let plan = await RetirementPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Retirement plan not found'
      });
    }

    // Make sure user owns the plan
    if (plan.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this plan'
      });
    }

    const {
      currentAge,
      retirementAge,
      desiredAnnualIncome,
      currentSavings,
      monthlyContribution,
      riskTolerance,
      notes,
      status
    } = req.body;

    // Validate retirement age if updating
    if (retirementAge && currentAge && retirementAge <= currentAge) {
      return res.status(400).json({
        success: false,
        message: 'Retirement age must be greater than current age'
      });
    }

    plan = await RetirementPlan.findByIdAndUpdate(
      req.params.id,
      {
        currentAge,
        retirementAge,
        desiredAnnualIncome,
        currentSavings,
        monthlyContribution,
        riskTolerance,
        notes,
        status,
        lastReviewed: Date.now()
      },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      plan
    });
  } catch (error) {
    console.error('Update plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating retirement plan',
      error: error.message
    });
  }
};

// @desc    Delete retirement plan
// @route   DELETE /api/plans/:id
// @access  Private
exports.deletePlan = async (req, res) => {
  try {
    const plan = await RetirementPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Retirement plan not found'
      });
    }

    // Make sure user owns the plan
    if (plan.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this plan'
      });
    }

    await plan.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Retirement plan deleted successfully'
    });
  } catch (error) {
    console.error('Delete plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting retirement plan',
      error: error.message
    });
  }
};

// @desc    Get plan statistics
// @route   GET /api/plans/stats
// @access  Private
exports.getPlanStats = async (req, res) => {
  try {
    const plans = await RetirementPlan.find({ user: req.user.id });

    const stats = {
      totalPlans: plans.length,
      activePlans: plans.filter(p => p.status === 'active').length,
      goalsMetCount: plans.filter(p => p.goalMet).length,
      averageShortfall: 0,
      totalProjectedFund: 0
    };

    if (plans.length > 0) {
      const activePlans = plans.filter(p => p.status === 'active');

      stats.totalProjectedFund = activePlans.reduce(
        (sum, p) => sum + p.projectedRetirementFund,
        0
      );

      const plansWithShortfall = activePlans.filter(p => !p.goalMet);
      if (plansWithShortfall.length > 0) {
        stats.averageShortfall =
          plansWithShortfall.reduce((sum, p) => sum + p.shortfall, 0) /
          plansWithShortfall.length;
      }
    }

    res.status(200).json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching plan statistics',
      error: error.message
    });
  }
};
