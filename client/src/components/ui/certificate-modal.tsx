
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Download, ExternalLink } from "lucide-react";
import { useEffect } from "react";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl?: string;
  image?: string;
  title?: string;
  name?: string;
}

export function CertificateModal({ isOpen, onClose, imageUrl, image, title, name }: CertificateModalProps) {
  const displayImage = imageUrl || image;
  const displayTitle = title || name;

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
    if (displayImage) {
      const link = document.createElement('a');
      link.href = displayImage;
      link.download = `${displayTitle || 'certificate'}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleOpenInNewTab = () => {
    if (displayImage) {
      window.open(displayImage, '_blank');
    }
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
                onClick={handleOpenInNewTab}
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Open
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
                className="w-full h-auto max-h-[70vh] object-contain"
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
