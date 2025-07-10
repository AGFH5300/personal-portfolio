import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Download, ExternalLink } from "lucide-react";
import { useEffect } from "react";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  name: string;
}

export function CertificateModal({ isOpen, onClose, image, name }: CertificateModalProps) {
  useEffect(() => {
    const handleCloseModal = () => {
      if (isOpen) {
        onClose();
      }
    };

    window.addEventListener('closeModal', handleCloseModal);
    return () => window.removeEventListener('closeModal', handleCloseModal);
  }, [isOpen, onClose]);
}