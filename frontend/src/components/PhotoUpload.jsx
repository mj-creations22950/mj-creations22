import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const PhotoUpload = ({ orderId, maxPhotos = 10 }) => {
  const [photos, setPhotos] = useState([]);
  const { toast } = useToast();

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    
    if (photos.length + files.length > maxPhotos) {
      toast({
        title: 'Limite atteinte',
        description: `Vous ne pouvez uploader que ${maxPhotos} photos maximum`,
        variant: 'destructive'
      });
      return;
    }

    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'Fichier trop volumineux',
          description: `${file.name} depasse 5MB`,
          variant: 'destructive'
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotos(prev => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            file: file,
            preview: event.target.result,
            name: file.name,
            size: file.size
          }
        ]);
      };
      reader.readAsDataURL(file);
    });

    toast({
      title: 'Photos ajoutees',
      description: `${files.length} photo(s) ajoutee(s)`
    });
  };

  const removePhoto = (photoId) => {
    setPhotos(prev => prev.filter(p => p.id !== photoId));
  };

  const uploadPhotos = async () => {
    // Mock upload
    toast({
      title: 'Upload en cours...',
      description: `Upload de ${photos.length} photo(s)`
    });

    setTimeout(() => {
      toast({
        title: 'Photos uploadees !',
        description: 'Vos photos ont ete sauvegardees'
      });
      setPhotos([]);
    }, 2000);
  };

  return (
    <Card className="border-none shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Photos du chantier
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-cyan-500 transition-colors">
          <input
            type="file"
            id="photo-upload"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <label htmlFor="photo-upload" className="cursor-pointer">
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-semibold text-gray-700 mb-2">
              Cliquez pour ajouter des photos
            </p>
            <p className="text-sm text-gray-500">
              ou glissez-deposez vos fichiers ici
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Max {maxPhotos} photos • 5MB max par photo • JPG, PNG
            </p>
          </label>
        </div>

        {/* Photos Grid */}
        {photos.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map(photo => (
                <div key={photo.id} className="relative group">
                  <img
                    src={photo.preview}
                    alt={photo.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removePhoto(photo.id)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <p className="text-xs text-gray-600 mt-1 truncate">{photo.name}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <p className="text-sm text-gray-600">
                {photos.length} photo(s) selectionnee(s)
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setPhotos([])}>
                  Tout effacer
                </Button>
                <Button
                  onClick={uploadPhotos}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                >
                  Envoyer les photos
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PhotoUpload;