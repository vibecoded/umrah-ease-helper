
// Storage service to interact with Firefox's browser.storage API

export type StorageArea = 'local' | 'sync';

class StorageService {
  private storage: any;
  
  constructor() {
    // Initialize with Firefox storage or fallback to localStorage for development
    if (typeof browser !== 'undefined' && browser.storage) {
      this.storage = browser.storage;
    } else if (typeof chrome !== 'undefined' && chrome.storage) {
      this.storage = chrome.storage;
    } else {
      // Fallback for development in non-extension environment
      console.warn('Browser extension storage API not available, using localStorage fallback');
      this.storage = this.createLocalStorageFallback();
    }
  }
  
  private createLocalStorageFallback() {
    return {
      local: {
        get: async (keys: string | string[] | null) => {
          const result: Record<string, any> = {};
          
          if (keys === null) {
            // Get all items
            for (let i = 0; i < localStorage.length; i++) {
              const key = localStorage.key(i);
              if (key) {
                try {
                  result[key] = JSON.parse(localStorage.getItem(key) || 'null');
                } catch (e) {
                  result[key] = localStorage.getItem(key);
                }
              }
            }
          } else if (typeof keys === 'string') {
            // Get a single item
            try {
              result[keys] = JSON.parse(localStorage.getItem(keys) || 'null');
            } catch (e) {
              result[keys] = localStorage.getItem(keys);
            }
          } else {
            // Get multiple items
            for (const key of keys) {
              try {
                result[key] = JSON.parse(localStorage.getItem(key) || 'null');
              } catch (e) {
                result[key] = localStorage.getItem(key);
              }
            }
          }
          
          return result;
        },
        set: async (items: Record<string, any>) => {
          for (const [key, value] of Object.entries(items)) {
            localStorage.setItem(key, JSON.stringify(value));
          }
        },
        remove: async (keys: string | string[]) => {
          if (typeof keys === 'string') {
            localStorage.removeItem(keys);
          } else {
            for (const key of keys) {
              localStorage.removeItem(key);
            }
          }
        },
        clear: async () => {
          localStorage.clear();
        }
      },
      sync: {
        // Sync storage fallback (same as local in this fallback)
        get: async (keys: string | string[] | null) => {
          // Forward to local storage
          return this.storage.local.get(keys);
        },
        set: async (items: Record<string, any>) => {
          // Forward to local storage
          return this.storage.local.set(items);
        },
        remove: async (keys: string | string[]) => {
          // Forward to local storage
          return this.storage.local.remove(keys);
        },
        clear: async () => {
          // Forward to local storage
          return this.storage.local.clear();
        }
      }
    };
  }
  
  // Save item to storage
  async set(key: string, value: any, area: StorageArea = 'local'): Promise<void> {
    try {
      await this.storage[area].set({ [key]: value });
    } catch (error) {
      console.error(`Error saving to ${area} storage:`, error);
      throw error;
    }
  }
  
  // Get item from storage
  async get<T>(key: string, area: StorageArea = 'local'): Promise<T | null> {
    try {
      const result = await this.storage[area].get(key);
      return result[key] || null;
    } catch (error) {
      console.error(`Error retrieving from ${area} storage:`, error);
      throw error;
    }
  }
  
  // Get multiple items from storage
  async getMultiple<T>(keys: string[], area: StorageArea = 'local'): Promise<Record<string, T>> {
    try {
      return await this.storage[area].get(keys);
    } catch (error) {
      console.error(`Error retrieving multiple items from ${area} storage:`, error);
      throw error;
    }
  }
  
  // Remove item from storage
  async remove(key: string, area: StorageArea = 'local'): Promise<void> {
    try {
      await this.storage[area].remove(key);
    } catch (error) {
      console.error(`Error removing from ${area} storage:`, error);
      throw error;
    }
  }
  
  // Clear all items in storage area
  async clear(area: StorageArea = 'local'): Promise<void> {
    try {
      await this.storage[area].clear();
    } catch (error) {
      console.error(`Error clearing ${area} storage:`, error);
      throw error;
    }
  }
  
  // Check if a key exists in storage
  async has(key: string, area: StorageArea = 'local'): Promise<boolean> {
    try {
      const result = await this.storage[area].get(key);
      return !!result[key];
    } catch (error) {
      console.error(`Error checking existence in ${area} storage:`, error);
      throw error;
    }
  }
}

// Create a singleton instance
const storageService = new StorageService();
export default storageService;
