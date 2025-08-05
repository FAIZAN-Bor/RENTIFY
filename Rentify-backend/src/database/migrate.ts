import { DatabaseService } from '../services/databaseService';
import logger from '../config/logger';

async function runMigrations() {
  try {
    logger.info('Starting database migrations...');
    
    const dbService = new DatabaseService();
    
    // Initialize database connection
    await dbService.initializeDatabase();
    
    // Run any custom migrations
    await dbService.runMigrations();
    
    // Create initial admin user
    await dbService.createInitialAdminUser();
    
    logger.info('✅ Database migrations completed successfully!');
    process.exit(0);
  } catch (error) {
    logger.error('❌ Database migration failed:', error);
    process.exit(1);
  }
}

runMigrations();
