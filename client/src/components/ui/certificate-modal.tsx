import * as React from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
}

export function CertificateModal({ isOpen, onClose, imageUrl, title }: CertificateModalProps) {
  const [isZoomed, setIsZoomed] = React.useState(false);

  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 cursor-pointer" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative max-w-6xl max-h-full w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-t-lg">
          <h2 className="text-white text-lg font-semibold truncate">{title}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
              title={isZoomed ? "Zoom Out" : "Zoom In"}
            >
              {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
              title="Close (ESC)"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        {/* Image Container */}
        <div 
          className={cn(
            "flex-1 overflow-auto bg-white rounded-b-lg flex items-center justify-center",
            isZoomed && "cursor-zoom-out"
          )}
          onClick={() => isZoomed && setIsZoomed(false)}
        >
          <img
            src={imageUrl}
            alt={title}
            className={cn(
              "max-w-full max-h-full object-contain transition-transform duration-300",
              isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
            )}
            onClick={(e) => {
              e.stopPropagation();
              if (!isZoomed) setIsZoomed(true);
            }}
          />
        </div>
      </div>
    </div>
  );
}