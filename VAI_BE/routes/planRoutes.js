const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const {
  createPlan,
  getPlans,
  getPlan,
  updatePlan,
  deletePlan,
  getPlanStats
} = require('../controllers/planController');

// Validation rules for retirement plan
const planValidation = [
  body('currentAge')
    .isInt({ min: 18, max: 100 })
    .withMessage('Current age must be between 18 and 100'),
  body('retirementAge')
    .isInt({ min: 50, max: 100 })
    .withMessage('Retirement age must be between 50 and 100'),
  body('desiredAnnualIncome')
    .isFloat({ min: 0 })
    .withMessage('Desired annual income must be a positive number'),
  body('currentSavings')
    .isFloat({ min: 0 })
    .withMessage('Current savings must be a positive number'),
  body('monthlyContribution')
    .isFloat({ min: 0 })
    .withMessage('Monthly contribution must be a positive number'),
  body('riskTolerance')
    .isIn(['conservative', 'moderate', 'aggressive'])
    .withMessage('Risk tolerance must be conservative, moderate, or aggressive')
];

// All routes require authentication
router.use(protect);

// Plan statistics (must come before /:id to avoid route conflict)
router.get('/stats', getPlanStats);

// CRUD operations
router.route('/')
  .get(getPlans)
  .post(planValidation, createPlan);

router.route('/:id')
  .get(getPlan)
  .put(updatePlan)
  .delete(deletePlan);

module.exports = router;
