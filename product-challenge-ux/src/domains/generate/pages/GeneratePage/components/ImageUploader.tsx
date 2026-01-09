import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Upload, X, ImageIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

interface ImageUploaderProps {
  value: string | null;
  onChange: (base64: string | null) => void;
}

export function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const { t } = useTranslation("generate");
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      onChange(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  if (value) {
    return (
      <div className="relative rounded-xl overflow-hidden border-2 border-dashed border-border">
        <img 
          src={value} 
          alt="Reference" 
          className="w-full h-48 object-cover"
        />
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-2 right-2"
          onClick={() => onChange(null)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <label
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={cn(
        "flex flex-col items-center justify-center h-48 rounded-xl border-2 border-dashed cursor-pointer transition-colors",
        isDragging
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50"
      )}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        {isDragging ? (
          <ImageIcon className="w-8 h-8 text-primary" />
        ) : (
          <Upload className="w-8 h-8" />
        )}
        <p className="text-sm font-medium">
          {isDragging ? t("dropHere") : t("uploadCompetitor")}
        </p>
        <p className="text-xs">
          {t("dragDrop")}
        </p>
      </div>
    </label>
  );
}
