import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validateSchema = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errorMessages = error.details.map(detail => detail.message);
      res.status(400).json({
        success: false,
        error: 'Validation error',
        details: errorMessages
      });
      return;
    }
    
    next();
  };
};

// User validation schemas
export const userRegistrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  first_name: Joi.string().max(50).optional(),
  last_name: Joi.string().max(50).optional(),
  phone: Joi.string().pattern(/^\+?[\d\s-()]+$/).optional(),
  address: Joi.string().max(255).optional(),
  customer_type: Joi.string().valid('individual', 'self_employed', 'company').optional()
});

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const userUpdateSchema = Joi.object({
  first_name: Joi.string().max(50).optional(),
  last_name: Joi.string().max(50).optional(),
  phone: Joi.string().pattern(/^\+?[\d\s-()]+$/).optional(),
  address: Joi.string().max(255).optional(),
  customer_type: Joi.string().valid('individual', 'self_employed', 'company').optional()
});

// Car validation schemas
export const carCreateSchema = Joi.object({
  make: Joi.string().max(50).optional(),
  brand: Joi.string().max(50).optional(),
  model: Joi.string().max(50).optional(),
  version: Joi.string().max(50).optional(),
  color: Joi.string().max(30).optional(),
  fuel_type: Joi.string().max(30).optional(),
  transmission: Joi.string().max(30).optional(),
  doors: Joi.string().max(10).optional(),
  body_style: Joi.string().max(50).optional(),
  tire_type: Joi.string().max(50).optional(),
  model_year_range: Joi.string().max(20).optional(),
  vehicle: Joi.string().max(50).optional(),
  type: Joi.string().max(50).optional(),
  monthly_fee_without_tax: Joi.number().min(0).optional(),
  maximum_horsepower: Joi.number().min(0).optional(),
  maximum_horsepower_unit: Joi.string().max(20).optional(),
  maximum_speed: Joi.number().min(0).optional(),
  maximum_speed_unit: Joi.string().max(20).optional(),
  fuel_capacity: Joi.number().min(0).optional(),
  fuel_capacity_unit: Joi.string().max(20).optional(),
  energy_label: Joi.string().max(10).optional(),
  energy_label_url: Joi.string().uri().optional(),
  eu_energy_label_class: Joi.string().max(5).optional()
});

export const carUpdateSchema = carCreateSchema;

// Car feature validation schema
export const carFeatureSchema = Joi.object({
  category: Joi.string().max(50).optional(),
  value: Joi.string().max(255).optional()
});

// Pricing option validation schema
export const pricingOptionSchema = Joi.object({
  website_id: Joi.number().integer().positive().required(),
  duration_months: Joi.number().integer().min(1).optional(),
  annual_kms: Joi.number().integer().min(0).optional(),
  monthly_fee: Joi.number().min(0).optional(),
  monthly_fee_without_tax: Joi.number().min(0).optional(),
  total_payable: Joi.string().max(50).optional(),
  excess_km_rate: Joi.string().max(50).optional(),
  underuse_km_refund: Joi.string().max(50).optional()
});

// Website validation schema
export const websiteSchema = Joi.object({
  name: Joi.string().max(100).optional(),
  url: Joi.string().uri().optional(),
  main_url: Joi.string().uri().optional(),
  logo_url: Joi.string().uri().optional()
});

// Query validation schemas
export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
  sortBy: Joi.string().optional(),
  sortOrder: Joi.string().valid('asc', 'desc').default('asc')
});

export const carSearchSchema = Joi.object({
  make: Joi.string().max(50).optional(),
  brand: Joi.string().max(50).optional(),
  model: Joi.string().max(50).optional(),
  fuel_type: Joi.string().max(30).optional(),
  transmission: Joi.string().max(30).optional(),
  body_style: Joi.string().max(50).optional(),
  min_price: Joi.number().min(0).optional(),
  max_price: Joi.number().min(0).optional(),
  year_range: Joi.string().max(20).optional()
});
