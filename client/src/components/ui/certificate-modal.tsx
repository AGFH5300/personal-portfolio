
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Download, ZoomIn } from "lucide-react";
import { useEffect } from "react";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl?: string;
  image?: string;
  title?: string;
  name?: string;
  downloadUrl?: string;
}

export function CertificateModal({ isOpen, onClose, imageUrl, image, title, name, downloadUrl }: CertificateModalProps) {
  const displayImage = imageUrl || image;
  const displayTitle = title || name;
  const [isZoomed, setIsZoomed] = useState(false);

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
    const downloadLink = downloadUrl || displayImage;
    if (downloadLink) {
      const link = document.createElement('a');
      link.href = downloadLink;
      link.download = `${displayTitle || 'certificate'}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              {displayTitle || "Certificate"}
            </DialogTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoom}
                className="flex items-center gap-2"
              >
                <ZoomIn className="h-4 w-4" />
                {isZoomed ? 'Zoom Out' : 'Zoom In'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        <div className="px-6 pb-6">
          {displayImage && (
            <div className="relative bg-gray-50 rounded-lg overflow-hidden">
              <img
                src={displayImage}
                alt={displayTitle || "Certificate"}
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
