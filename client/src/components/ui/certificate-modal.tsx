
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl?: string;
  image?: string;
  title?: string;
  name?: string;
  downloadUrl?: string;
  images?: Array<{
    url: string;
    downloadUrl?: string;
    caption?: string;
  }>;
  currentImageIndex?: number;
  onImageChange?: (index: number) => void;
}

export function CertificateModal({ isOpen, onClose, imageUrl, image, title, name, downloadUrl, images, currentImageIndex = 0, onImageChange }: CertificateModalProps) {
  const displayImage = imageUrl || image;
  const displayTitle = title || name;
  const [isZoomed, setIsZoomed] = useState(false);
  
  // Use images array if available, otherwise fall back to single image
  const hasMultipleImages = images && images.length > 1;
  const currentImage = images && images[currentImageIndex];
  const finalImage = currentImage?.url || displayImage;
  const finalDownloadUrl = currentImage?.downloadUrl || downloadUrl;
  const finalTitle = currentImage?.caption ? `${displayTitle} - ${currentImage.caption}` : displayTitle;

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleCloseModal = () => {
      if (isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      window.addEventListener('closeModal', handleCloseModal);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      window.removeEventListener('closeModal', handleCloseModal);
    };
  }, [isOpen, onClose]);

  const handleDownload = () => {
    const downloadLink = finalDownloadUrl || finalImage;
    if (downloadLink) {
      const link = document.createElement('a');
      link.href = downloadLink;
      link.download = `${finalTitle || 'certificate'}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handlePrevImage = () => {
    if (hasMultipleImages && onImageChange) {
      const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
      onImageChange(newIndex);
    }
  };

  const handleNextImage = () => {
    if (hasMultipleImages && onImageChange) {
      const newIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
      onImageChange(newIndex);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden [&>button]:hidden">
        <div className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-semibold">
                {finalTitle || "Certificate"}
              </h2>
              {hasMultipleImages && (
                <p className="text-sm text-gray-500 mt-1">
                  {currentImageIndex + 1} of {images.length}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="flex items-center gap-2 focus:outline-none focus:ring-0"
                tabIndex={-1}
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoom}
                className="flex items-center gap-2 focus:outline-none focus:ring-0"
                tabIndex={-1}
              >
                <ZoomIn className="h-4 w-4" />
                {isZoomed ? 'Zoom Out' : 'Zoom In'}
              </Button>
              {hasMultipleImages && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevImage}
                    className="flex items-center gap-2 focus:outline-none focus:ring-0"
                    tabIndex={-1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextImage}
                    className="flex items-center gap-2 focus:outline-none focus:ring-0"
                    tabIndex={-1}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="flex items-center gap-2 focus:outline-none focus:ring-0"
                tabIndex={-1}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="px-6 pb-6">
          {finalImage && (
            <div className="relative bg-gray-50 rounded-lg overflow-hidden">
              <img
                src={finalImage}
                alt={finalTitle || "Certificate"}
                className={`w-full h-auto max-h-[70vh] object-contain transition-transform duration-300 cursor-pointer ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
                onContextMenu={(e) => e.preventDefault()}
                onClick={handleZoom}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
