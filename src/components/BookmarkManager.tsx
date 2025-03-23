
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Bookmark } from '@/types';
import { BookmarkX, Hotel, Plane, Package, Search, Pencil, Save, X, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import bookmarkService from '@/services/bookmarkService';

export const BookmarkManager = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'hotel' | 'flight' | 'package'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedNotes, setEditedNotes] = useState('');
  const { toast } = useToast();
  
  useEffect(() => {
    loadBookmarks();
  }, []);
  
  const loadBookmarks = async () => {
    const allBookmarks = await bookmarkService.getAllBookmarks();
    setBookmarks(allBookmarks);
  };
  
  const filteredBookmarks = bookmarks.filter(bookmark => {
    // Filter by type
    if (activeTab !== 'all' && bookmark.type !== activeTab) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !bookmark.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !bookmark.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  const handleRemoveBookmark = async (id: string) => {
    const success = await bookmarkService.removeBookmark(id);
    if (success) {
      setBookmarks(bookmarks.filter(bookmark => bookmark.id !== id));
      toast({
        title: "Bookmark removed",
        description: "The bookmark has been removed successfully",
        duration: 3000,
      });
    } else {
      toast({
        title: "Error",
        description: "Could not remove the bookmark",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  const startEditing = (bookmark: Bookmark) => {
    setEditingId(bookmark.id);
    setEditedNotes(bookmark.notes || '');
  };
  
  const cancelEditing = () => {
    setEditingId(null);
    setEditedNotes('');
  };
  
  const saveNotes = async (bookmarkId: string) => {
    const success = await bookmarkService.updateBookmarkNotes(bookmarkId, editedNotes);
    if (success) {
      setBookmarks(bookmarks.map(bookmark => 
        bookmark.id === bookmarkId ? {...bookmark, notes: editedNotes} : bookmark
      ));
      toast({
        title: "Notes updated",
        description: "Your notes have been saved successfully",
        duration: 3000,
      });
      setEditingId(null);
    } else {
      toast({
        title: "Error",
        description: "Could not save your notes",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  const clearAllBookmarks = async () => {
    const success = await bookmarkService.clearAllBookmarks();
    if (success) {
      setBookmarks([]);
      toast({
        title: "All bookmarks cleared",
        description: "All your bookmarks have been removed",
        duration: 3000,
      });
    } else {
      toast({
        title: "Error",
        description: "Could not clear your bookmarks",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  const getBookmarkIcon = (type: string) => {
    switch (type) {
      case 'hotel': return <Hotel className="h-4 w-4" />;
      case 'flight': return <Plane className="h-4 w-4" />;
      case 'package': return <Package className="h-4 w-4" />;
      default: return null;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <Card className="glass-card p-5 animate-slide-in">
      <h3 className="text-xl font-medium mb-4">Bookmarks</h3>
      
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="hotel">Hotels</TabsTrigger>
            <TabsTrigger value="flight">Flights</TabsTrigger>
            <TabsTrigger value="package">Packages</TabsTrigger>
          </TabsList>
          
          {bookmarks.length > 0 && (
            <Button 
              variant="outline" 
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={clearAllBookmarks}
            >
              <BookmarkX className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookmarks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <TabsContent value="all" className="mt-0">
          {renderBookmarkList(filteredBookmarks)}
        </TabsContent>
        
        <TabsContent value="hotel" className="mt-0">
          {renderBookmarkList(filteredBookmarks)}
        </TabsContent>
        
        <TabsContent value="flight" className="mt-0">
          {renderBookmarkList(filteredBookmarks)}
        </TabsContent>
        
        <TabsContent value="package" className="mt-0">
          {renderBookmarkList(filteredBookmarks)}
        </TabsContent>
      </Tabs>
    </Card>
  );
  
  function renderBookmarkList(bookmarks: Bookmark[]) {
    if (bookmarks.length === 0) {
      return (
        <div className="text-center p-8">
          <div className="mb-2 flex justify-center">
            <AlertTriangle className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No Bookmarks Found</h3>
          <p className="text-muted-foreground">
            {searchQuery 
              ? "No bookmarks match your search query. Try a different search term."
              : "You haven't saved any bookmarks yet. Browse hotels, flights, or packages and save them for later."}
          </p>
        </div>
      );
    }
    
    return (
      <div className="space-y-3">
        {bookmarks.map(bookmark => (
          <div 
            key={bookmark.id} 
            className="p-3 border rounded-lg hover:shadow-sm transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  {getBookmarkIcon(bookmark.type)}
                </div>
                <div>
                  <h4 className="font-medium">{bookmark.name}</h4>
                  <p className="text-sm text-muted-foreground">{bookmark.description}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full hover:bg-destructive/20 hover:text-destructive"
                onClick={() => handleRemoveBookmark(bookmark.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mt-2 text-xs text-muted-foreground flex justify-between">
              <div>
                Type: <span className="capitalize">{bookmark.type}</span>
              </div>
              <div>
                Saved: {formatDate(bookmark.createdAt)}
              </div>
            </div>
            
            {/* Notes section */}
            {editingId === bookmark.id ? (
              <div className="mt-2">
                <Input
                  placeholder="Add notes here..."
                  value={editedNotes}
                  onChange={(e) => setEditedNotes(e.target.value)}
                  className="text-sm mb-2"
                />
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={cancelEditing}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => saveNotes(bookmark.id)}
                  >
                    <Save className="h-3.5 w-3.5 mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-2">
                {bookmark.notes ? (
                  <div className="text-sm bg-accent/20 p-2 rounded">
                    <div className="flex justify-between items-center">
                      <div className="font-medium text-xs mb-1">Notes:</div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full"
                        onClick={() => startEditing(bookmark)}
                      >
                        <Pencil className="h-3 w-3" />
                      </Button>
                    </div>
                    {bookmark.notes}
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs mt-1"
                    onClick={() => startEditing(bookmark)}
                  >
                    <Pencil className="h-3 w-3 mr-1" />
                    Add Notes
                  </Button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
};
