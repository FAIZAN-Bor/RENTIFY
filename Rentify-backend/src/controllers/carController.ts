import { Request, Response } from 'express';
import { CarService } from '../services/carService';
import logger from '../config/logger';

const carService = new CarService();

export class CarController {
  async createCar(req: Request, res: Response): Promise<void> {
    try {
      const car = await carService.createCar(req.body);
      
      res.status(201).json({
        success: true,
        data: car,
        message: 'Car created successfully'
      });
    } catch (error: any) {
      logger.error('CarController.createCar error:', error);
      res.status(400).json({
        success: false,
        error: error.message || 'Failed to create car'
      });
    }
  }

  async getCars(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const sortBy = req.query.sortBy as string || 'car_id';
      const sortOrder = (req.query.sortOrder as 'asc' | 'desc') || 'asc';

      // Build filters from query parameters
      const filters: any = {};
      if (req.query.make) filters.make = req.query.make as string;
      if (req.query.brand) filters.brand = req.query.brand as string;
      if (req.query.model) filters.model = req.query.model as string;
      if (req.query.fuel_type) filters.fuel_type = req.query.fuel_type as string;
      if (req.query.transmission) filters.transmission = req.query.transmission as string;
      if (req.query.body_style) filters.body_style = req.query.body_style as string;
      if (req.query.min_price) filters.min_price = parseFloat(req.query.min_price as string);
      if (req.query.max_price) filters.max_price = parseFloat(req.query.max_price as string);
      if (req.query.year_range) filters.year_range = req.query.year_range as string;

      const result = await carService.getAllCars(page, limit, filters, sortBy, sortOrder);
      
      res.json({
        success: true,
        data: {
          cars: result.cars,
          pagination: {
            page,
            limit,
            total: result.total,
            totalPages: Math.ceil(result.total / limit)
          }
        }
      });
    } catch (error: any) {
      logger.error('CarController.getCars error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch cars'
      });
    }
  }

  async getCarById(req: Request, res: Response): Promise<void> {
    try {
      const carId = parseInt(req.params.id);
      const includeDetails = req.query.details === 'true';
      
      if (isNaN(carId)) {
        res.status(400).json({
          success: false,
          error: 'Invalid car ID'
        });
        return;
      }

      const car = await carService.getCarById(carId, includeDetails);
      
      if (!car) {
        res.status(404).json({
          success: false,
          error: 'Car not found'
        });
        return;
      }

      res.json({
        success: true,
        data: car
      });
    } catch (error: any) {
      logger.error('CarController.getCarById error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch car'
      });
    }
  }

  async updateCar(req: Request, res: Response): Promise<void> {
    try {
      const carId = parseInt(req.params.id);
      
      if (isNaN(carId)) {
        res.status(400).json({
          success: false,
          error: 'Invalid car ID'
        });
        return;
      }

      const updatedCar = await carService.updateCar(carId, req.body);
      
      res.json({
        success: true,
        data: updatedCar,
        message: 'Car updated successfully'
      });
    } catch (error: any) {
      logger.error('CarController.updateCar error:', error);
      res.status(400).json({
        success: false,
        error: error.message || 'Failed to update car'
      });
    }
  }

  async deleteCar(req: Request, res: Response): Promise<void> {
    try {
      const carId = parseInt(req.params.id);
      
      if (isNaN(carId)) {
        res.status(400).json({
          success: false,
          error: 'Invalid car ID'
        });
        return;
      }

      await carService.deleteCar(carId);
      
      res.json({
        success: true,
        message: 'Car deleted successfully'
      });
    } catch (error: any) {
      logger.error('CarController.deleteCar error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete car'
      });
    }
  }

  async searchCars(req: Request, res: Response): Promise<void> {
    try {
      const searchTerm = req.query.q as string;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      if (!searchTerm) {
        res.status(400).json({
          success: false,
          error: 'Search term is required'
        });
        return;
      }

      const result = await carService.searchCars(searchTerm, page, limit);
      
      res.json({
        success: true,
        data: {
          cars: result.cars,
          pagination: {
            page,
            limit,
            total: result.total,
            totalPages: Math.ceil(result.total / limit)
          }
        }
      });
    } catch (error: any) {
      logger.error('CarController.searchCars error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to search cars'
      });
    }
  }

  async getPopularCars(req: Request, res: Response): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const cars = await carService.getPopularCars(limit);
      
      res.json({
        success: true,
        data: cars
      });
    } catch (error: any) {
      logger.error('CarController.getPopularCars error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch popular cars'
      });
    }
  }

  // Car Features
  async addCarFeature(req: Request, res: Response): Promise<void> {
    try {
      const carId = parseInt(req.params.id);
      
      if (isNaN(carId)) {
        res.status(400).json({
          success: false,
          error: 'Invalid car ID'
        });
        return;
      }

      const feature = await carService.addCarFeature(carId, req.body);
      
      res.status(201).json({
        success: true,
        data: feature,
        message: 'Car feature added successfully'
      });
    } catch (error: any) {
      logger.error('CarController.addCarFeature error:', error);
      res.status(400).json({
        success: false,
        error: error.message || 'Failed to add car feature'
      });
    }
  }

  async removeCarFeature(req: Request, res: Response): Promise<void> {
    try {
      const featureId = parseInt(req.params.featureId);
      
      if (isNaN(featureId)) {
        res.status(400).json({
          success: false,
          error: 'Invalid feature ID'
        });
        return;
      }

      await carService.removeCarFeature(featureId);
      
      res.json({
        success: true,
        message: 'Car feature removed successfully'
      });
    } catch (error: any) {
      logger.error('CarController.removeCarFeature error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to remove car feature'
      });
    }
  }

  // Car Images
  async addCarImage(req: Request, res: Response): Promise<void> {
    try {
      const carId = parseInt(req.params.id);
      const { image_url } = req.body;
      
      if (isNaN(carId)) {
        res.status(400).json({
          success: false,
          error: 'Invalid car ID'
        });
        return;
      }

      if (!image_url) {
        res.status(400).json({
          success: false,
          error: 'Image URL is required'
        });
        return;
      }

      const image = await carService.addCarImage(carId, image_url);
      
      res.status(201).json({
        success: true,
        data: image,
        message: 'Car image added successfully'
      });
    } catch (error: any) {
      logger.error('CarController.addCarImage error:', error);
      res.status(400).json({
        success: false,
        error: error.message || 'Failed to add car image'
      });
    }
  }

  async removeCarImage(req: Request, res: Response): Promise<void> {
    try {
      const imageId = parseInt(req.params.imageId);
      
      if (isNaN(imageId)) {
        res.status(400).json({
          success: false,
          error: 'Invalid image ID'
        });
        return;
      }

      await carService.removeCarImage(imageId);
      
      res.json({
        success: true,
        message: 'Car image removed successfully'
      });
    } catch (error: any) {
      logger.error('CarController.removeCarImage error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to remove car image'
      });
    }
  }

  // Websites
  async addWebsite(req: Request, res: Response): Promise<void> {
    try {
      const carId = parseInt(req.params.id);
      
      if (isNaN(carId)) {
        res.status(400).json({
          success: false,
          error: 'Invalid car ID'
        });
        return;
      }

      const website = await carService.addWebsite(carId, req.body);
      
      res.status(201).json({
        success: true,
        data: website,
        message: 'Website added successfully'
      });
    } catch (error: any) {
      logger.error('CarController.addWebsite error:', error);
      res.status(400).json({
        success: false,
        error: error.message || 'Failed to add website'
      });
    }
  }

  async removeWebsite(req: Request, res: Response): Promise<void> {
    try {
      const websiteId = parseInt(req.params.websiteId);
      
      if (isNaN(websiteId)) {
        res.status(400).json({
          success: false,
          error: 'Invalid website ID'
        });
        return;
      }

      await carService.removeWebsite(websiteId);
      
      res.json({
        success: true,
        message: 'Website removed successfully'
      });
    } catch (error: any) {
      logger.error('CarController.removeWebsite error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to remove website'
      });
    }
  }

  // Pricing Options
  async addPricingOption(req: Request, res: Response): Promise<void> {
    try {
      const carId = parseInt(req.params.id);
      
      if (isNaN(carId)) {
        res.status(400).json({
          success: false,
          error: 'Invalid car ID'
        });
        return;
      }

      const pricing = await carService.addPricingOption(carId, req.body);
      
      res.status(201).json({
        success: true,
        data: pricing,
        message: 'Pricing option added successfully'
      });
    } catch (error: any) {
      logger.error('CarController.addPricingOption error:', error);
      res.status(400).json({
        success: false,
        error: error.message || 'Failed to add pricing option'
      });
    }
  }

  async removePricingOption(req: Request, res: Response): Promise<void> {
    try {
      const pricingId = parseInt(req.params.pricingId);
      
      if (isNaN(pricingId)) {
        res.status(400).json({
          success: false,
          error: 'Invalid pricing ID'
        });
        return;
      }

      await carService.removePricingOption(pricingId);
      
      res.json({
        success: true,
        message: 'Pricing option removed successfully'
      });
    } catch (error: any) {
      logger.error('CarController.removePricingOption error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to remove pricing option'
      });
    }
  }
}
