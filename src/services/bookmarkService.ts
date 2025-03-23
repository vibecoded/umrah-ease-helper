
import { Bookmark, Hotel, Flight, UmrahPackage } from '@/types';
import storageService from './storageService';

const BOOKMARK_KEY = 'umrah_bookmarks';

class BookmarkService {
  // Get all bookmarks
  async getAllBookmarks(): Promise<Bookmark[]> {
    try {
      const bookmarks = await storageService.get<Bookmark[]>(BOOKMARK_KEY);
      return bookmarks || [];
    } catch (error) {
      console.error('Error getting bookmarks:', error);
      return [];
    }
  }
  
  // Get bookmarks by type
  async getBookmarksByType(type: 'hotel' | 'flight' | 'package'): Promise<Bookmark[]> {
    const allBookmarks = await this.getAllBookmarks();
    return allBookmarks.filter(bookmark => bookmark.type === type);
  }
  
  // Add a hotel bookmark
  async addHotelBookmark(hotel: Hotel, notes?: string): Promise<boolean> {
    try {
      const bookmarks = await this.getAllBookmarks();
      
      // Check if already bookmarked
      const isAlreadyBookmarked = bookmarks.some(
        bookmark => bookmark.type === 'hotel' && bookmark.referenceId === hotel.id
      );
      
      if (isAlreadyBookmarked) {
        return false;
      }
      
      const newBookmark: Bookmark = {
        id: `bookmark-${Date.now()}`,
        type: 'hotel',
        referenceId: hotel.id,
        name: hotel.name,
        description: `${hotel.city} - ${hotel.priceRange.min}-${hotel.priceRange.max} ${hotel.priceRange.currency}`,
        createdAt: new Date().toISOString(),
        notes
      };
      
      bookmarks.push(newBookmark);
      await storageService.set(BOOKMARK_KEY, bookmarks);
      return true;
    } catch (error) {
      console.error('Error adding hotel bookmark:', error);
      return false;
    }
  }
  
  // Add a flight bookmark
  async addFlightBookmark(flight: Flight, notes?: string): Promise<boolean> {
    try {
      const bookmarks = await this.getAllBookmarks();
      
      // Check if already bookmarked
      const isAlreadyBookmarked = bookmarks.some(
        bookmark => bookmark.type === 'flight' && bookmark.referenceId === flight.id
      );
      
      if (isAlreadyBookmarked) {
        return false;
      }
      
      const newBookmark: Bookmark = {
        id: `bookmark-${Date.now()}`,
        type: 'flight',
        referenceId: flight.id,
        name: `${flight.airline} - ${flight.flightNumber}`,
        description: `${flight.departureCity} to ${flight.arrivalCity} - ${flight.price} ${flight.currency}`,
        createdAt: new Date().toISOString(),
        notes
      };
      
      bookmarks.push(newBookmark);
      await storageService.set(BOOKMARK_KEY, bookmarks);
      return true;
    } catch (error) {
      console.error('Error adding flight bookmark:', error);
      return false;
    }
  }
  
  // Add a package bookmark
  async addPackageBookmark(packageData: UmrahPackage, notes?: string): Promise<boolean> {
    try {
      const bookmarks = await this.getAllBookmarks();
      
      // Check if already bookmarked
      const isAlreadyBookmarked = bookmarks.some(
        bookmark => bookmark.type === 'package' && bookmark.referenceId === packageData.id
      );
      
      if (isAlreadyBookmarked) {
        return false;
      }
      
      const newBookmark: Bookmark = {
        id: `bookmark-${Date.now()}`,
        type: 'package',
        referenceId: packageData.id,
        name: packageData.name,
        description: `${packageData.duration} days - ${packageData.price} ${packageData.currency}`,
        createdAt: new Date().toISOString(),
        notes
      };
      
      bookmarks.push(newBookmark);
      await storageService.set(BOOKMARK_KEY, bookmarks);
      return true;
    } catch (error) {
      console.error('Error adding package bookmark:', error);
      return false;
    }
  }
  
  // Remove a bookmark
  async removeBookmark(bookmarkId: string): Promise<boolean> {
    try {
      const bookmarks = await this.getAllBookmarks();
      const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== bookmarkId);
      
      if (updatedBookmarks.length === bookmarks.length) {
        return false; // No bookmark was removed
      }
      
      await storageService.set(BOOKMARK_KEY, updatedBookmarks);
      return true;
    } catch (error) {
      console.error('Error removing bookmark:', error);
      return false;
    }
  }
  
  // Update bookmark notes
  async updateBookmarkNotes(bookmarkId: string, notes: string): Promise<boolean> {
    try {
      const bookmarks = await this.getAllBookmarks();
      const bookmarkIndex = bookmarks.findIndex(bookmark => bookmark.id === bookmarkId);
      
      if (bookmarkIndex === -1) {
        return false;
      }
      
      bookmarks[bookmarkIndex] = {
        ...bookmarks[bookmarkIndex],
        notes
      };
      
      await storageService.set(BOOKMARK_KEY, bookmarks);
      return true;
    } catch (error) {
      console.error('Error updating bookmark notes:', error);
      return false;
    }
  }
  
  // Clear all bookmarks
  async clearAllBookmarks(): Promise<boolean> {
    try {
      await storageService.set(BOOKMARK_KEY, []);
      return true;
    } catch (error) {
      console.error('Error clearing bookmarks:', error);
      return false;
    }
  }
}

const bookmarkService = new BookmarkService();
export default bookmarkService;
