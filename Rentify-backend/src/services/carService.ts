import { supabaseAdmin } from '../config/supabase';
import { 
  Car, 
  CarWithDetails, 
  CreateCarDTO, 
  CarFeature, 
  CarImage, 
  Website, 
  PricingOption,
  CarSearchFilters 
} from '../types';
import logger from '../config/logger';

export class CarService {
  async createCar(carData: CreateCarDTO): Promise<Car> {
    try {
      const { data, error } = await supabaseAdmin
        .from('cars')
        .insert([carData])
        .select()
        .single();

      if (error) {
        logger.error('Error creating car:', error);
        throw new Error('Failed to create car');
      }

      return data as Car;
    } catch (error) {
      logger.error('CarService.createCar error:', error);
      throw error;
    }
  }

  async getCarById(carId: number, includeDetails: boolean = false): Promise<CarWithDetails | null> {
    try {
      const { data: car, error } = await supabaseAdmin
        .from('cars')
        .select('*')
        .eq('car_id', carId)
        .single();

      if (error || !car) {
        return null;
      }

      if (!includeDetails) {
        return car as CarWithDetails;
      }

      // Fetch related data in parallel
      const [featuresResult, imagesResult, websitesResult, pricingResult] = await Promise.all([
        supabaseAdmin.from('car_features').select('*').eq('car_id', carId),
        supabaseAdmin.from('car_images').select('*').eq('car_id', carId),
        supabaseAdmin.from('websites').select('*').eq('car_id', carId),
        supabaseAdmin.from('pricing_options').select('*').eq('car_id', carId)
      ]);

      return {
        ...car,
        features: featuresResult.data || [],
        images: imagesResult.data || [],
        websites: websitesResult.data || [],
        pricing_options: pricingResult.data || []
      } as CarWithDetails;
    } catch (error) {
      logger.error('CarService.getCarById error:', error);
      return null;
    }
  }

  async getAllCars(
    page: number = 1, 
    limit: number = 20, 
    filters?: CarSearchFilters,
    sortBy: string = 'car_id',
    sortOrder: 'asc' | 'desc' = 'asc'
  ): Promise<{ cars: (Car & { images: { image_url: string }[] })[]; total: number }> {
    try {
      const offset = (page - 1) * limit;
      let query = supabaseAdmin.from('cars').select('*', { count: 'exact' });

      // Apply filters
      if (filters) {
        if (filters.make) query = query.ilike('make', `%${filters.make}%`);
        if (filters.brand) query = query.ilike('brand', `%${filters.brand}%`);
        if (filters.model) query = query.ilike('model', `%${filters.model}%`);
        if (filters.fuel_type) query = query.eq('fuel_type', filters.fuel_type);
        if (filters.transmission) query = query.eq('transmission', filters.transmission);
        if (filters.body_style) query = query.eq('body_style', filters.body_style);
        if (filters.min_price) query = query.gte('monthly_fee_without_tax', filters.min_price);
        if (filters.max_price) query = query.lte('monthly_fee_without_tax', filters.max_price);
        if (filters.year_range) query = query.eq('model_year_range', filters.year_range);
      }

      const { data, error, count } = await query
        .order(sortBy, { ascending: sortOrder === 'asc' })
        .range(offset, offset + limit - 1);

      if (error) {
        throw new Error('Failed to fetch cars');
      }

      // Fetch all images for the returned cars
      const carIds = (data as Car[]).map(car => car.car_id);
      let imagesByCarId: Record<number, { image_url: string }[]> = {};
      if (carIds.length > 0) {
        const { data: imagesData, error: imagesError } = await supabaseAdmin
          .from('car_images')
          .select('car_id, image_url')
          .in('car_id', carIds);
        if (!imagesError && imagesData) {
          imagesByCarId = imagesData.reduce((acc, img) => {
            if (!acc[img.car_id]) acc[img.car_id] = [];
            acc[img.car_id].push({ image_url: img.image_url });
            return acc;
          }, {} as Record<number, { image_url: string }[]>);
        }
      }

      // Attach images to each car
      const carsWithImages = (data as Car[]).map(car => ({
        ...car,
        images: imagesByCarId[car.car_id] || []
      }));

      return {
        cars: carsWithImages,
        total: count || 0
      };
    } catch (error) {
      logger.error('CarService.getAllCars error:', error);
      throw error;
    }
  }

  async updateCar(carId: number, carData: Partial<CreateCarDTO>): Promise<Car> {
    try {
      const { data, error } = await supabaseAdmin
        .from('cars')
        .update(carData)
        .eq('car_id', carId)
        .select()
        .single();

      if (error || !data) {
        throw new Error('Failed to update car');
      }

      return data as Car;
    } catch (error) {
      logger.error('CarService.updateCar error:', error);
      throw error;
    }
  }

  async deleteCar(carId: number): Promise<boolean> {
    try {
      const { error } = await supabaseAdmin
        .from('cars')
        .delete()
        .eq('car_id', carId);

      if (error) {
        throw new Error('Failed to delete car');
      }

      return true;
    } catch (error) {
      logger.error('CarService.deleteCar error:', error);
      throw error;
    }
  }

  // Car Features
  async addCarFeature(carId: number, feature: Omit<CarFeature, 'feature_id' | 'car_id'>): Promise<CarFeature> {
    try {
      const { data, error } = await supabaseAdmin
        .from('car_features')
        .insert([{ car_id: carId, ...feature }])
        .select()
        .single();

      if (error) {
        throw new Error('Failed to add car feature');
      }

      return data as CarFeature;
    } catch (error) {
      logger.error('CarService.addCarFeature error:', error);
      throw error;
    }
  }

  async removeCarFeature(featureId: number): Promise<boolean> {
    try {
      const { error } = await supabaseAdmin
        .from('car_features')
        .delete()
        .eq('feature_id', featureId);

      if (error) {
        throw new Error('Failed to remove car feature');
      }

      return true;
    } catch (error) {
      logger.error('CarService.removeCarFeature error:', error);
      throw error;
    }
  }

  // Car Images
  async addCarImage(carId: number, imageUrl: string): Promise<CarImage> {
    try {
      const { data, error } = await supabaseAdmin
        .from('car_images')
        .insert([{ car_id: carId, image_url: imageUrl }])
        .select()
        .single();

      if (error) {
        throw new Error('Failed to add car image');
      }

      return data as CarImage;
    } catch (error) {
      logger.error('CarService.addCarImage error:', error);
      throw error;
    }
  }

  async removeCarImage(imageId: number): Promise<boolean> {
    try {
      const { error } = await supabaseAdmin
        .from('car_images')
        .delete()
        .eq('image_id', imageId);

      if (error) {
        throw new Error('Failed to remove car image');
      }

      return true;
    } catch (error) {
      logger.error('CarService.removeCarImage error:', error);
      throw error;
    }
  }

  // Websites
  async addWebsite(carId: number, website: Omit<Website, 'website_id' | 'car_id'>): Promise<Website> {
    try {
      const { data, error } = await supabaseAdmin
        .from('websites')
        .insert([{ car_id: carId, ...website }])
        .select()
        .single();

      if (error) {
        throw new Error('Failed to add website');
      }

      return data as Website;
    } catch (error) {
      logger.error('CarService.addWebsite error:', error);
      throw error;
    }
  }

  async removeWebsite(websiteId: number): Promise<boolean> {
    try {
      const { error } = await supabaseAdmin
        .from('websites')
        .delete()
        .eq('website_id', websiteId);

      if (error) {
        throw new Error('Failed to remove website');
      }

      return true;
    } catch (error) {
      logger.error('CarService.removeWebsite error:', error);
      throw error;
    }
  }

  // Pricing Options
  async addPricingOption(carId: number, pricing: Omit<PricingOption, 'pricing_id' | 'car_id'>): Promise<PricingOption> {
    try {
      const { data, error } = await supabaseAdmin
        .from('pricing_options')
        .insert([{ car_id: carId, ...pricing }])
        .select()
        .single();

      if (error) {
        throw new Error('Failed to add pricing option');
      }

      return data as PricingOption;
    } catch (error) {
      logger.error('CarService.addPricingOption error:', error);
      throw error;
    }
  }

  async removePricingOption(pricingId: number): Promise<boolean> {
    try {
      const { error } = await supabaseAdmin
        .from('pricing_options')
        .delete()
        .eq('pricing_id', pricingId);

      if (error) {
        throw new Error('Failed to remove pricing option');
      }

      return true;
    } catch (error) {
      logger.error('CarService.removePricingOption error:', error);
      throw error;
    }
  }

  async searchCars(searchTerm: string, page: number = 1, limit: number = 20): Promise<{ cars: Car[]; total: number }> {
    try {
      const offset = (page - 1) * limit;
      
      const { data, error, count } = await supabaseAdmin
        .from('cars')
        .select('*', { count: 'exact' })
        .or(`make.ilike.%${searchTerm}%,brand.ilike.%${searchTerm}%,model.ilike.%${searchTerm}%,vehicle.ilike.%${searchTerm}%,type.ilike.%${searchTerm}%`)
        .order('car_id', { ascending: true })
        .range(offset, offset + limit - 1);

      if (error) {
        throw new Error('Failed to search cars');
      }

      return {
        cars: data as Car[],
        total: count || 0
      };
    } catch (error) {
      logger.error('CarService.searchCars error:', error);
      throw error;
    }
  }

  async getPopularCars(limit: number = 10): Promise<any[]> {
    try {
      // For now, return cars ordered by car_id (you can implement proper popularity logic later)
      const { data: cars, error } = await supabaseAdmin
        .from('cars')
        .select('*')
        .order('car_id', { ascending: false })
        .limit(limit);

      if (error) {
        throw new Error('Failed to fetch popular cars');
      }

      // Fetch images for all cars in parallel
      const carIds = (cars || []).map((car: any) => car.car_id);
      const { data: imagesData } = await supabaseAdmin
        .from('car_images')
        .select('car_id, image_url')
        .in('car_id', carIds);

      // Group images by car_id
      const imagesByCarId: Record<number, { image_url: string }[]> = {};
      (imagesData || []).forEach((img: any) => {
        if (!imagesByCarId[img.car_id]) imagesByCarId[img.car_id] = [];
        imagesByCarId[img.car_id].push({ image_url: img.image_url });
      });

      // Attach images to each car
      const carsWithImages = (cars || []).map((car: any) => ({
        ...car,
        images: imagesByCarId[car.car_id] || []
      }));

      return carsWithImages;
    } catch (error) {
      logger.error('CarService.getPopularCars error:', error);
      throw error;
    }
  }
}
