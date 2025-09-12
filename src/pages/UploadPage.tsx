import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileText, Video, File, X, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import PDFHeader from "@/components/PDFHeader";

const UploadPage = () => {
  const [activeTab, setActiveTab] = useState("document");
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'application/vnd.ms-powerpoint'];
      const maxSize = 50 * 1024 * 1024; // 50MB
      return validTypes.includes(file.type) && file.size <= maxSize;
    });

    setUploadedFiles(prev => [...prev, ...validFiles]);
    
    // Simulate upload progress
    if (validFiles.length > 0) {
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setUploadProgress(0);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-background">
      <PDFHeader />
      
      <div className="container mx-auto px-4 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-primary h-2 rounded-full transition-all duration-500"
              style={{ width: '33.33%' }}
            ></div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Upload Learning Material
            </h1>
            <p className="text-xl text-muted-foreground">
              Upload a document or process a YouTube video
            </p>
          </div>

          {/* Tab Selection */}
          <div className="flex justify-center mb-8">
            <div className="bg-muted rounded-lg p-1 inline-flex">
              <button
                onClick={() => setActiveTab("document")}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  activeTab === "document"
                    ? "bg-gradient-to-r from-orange-500 to-primary text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FileText className="inline-block w-4 h-4 mr-2" />
                Document Upload
              </button>
              <button
                onClick={() => setActiveTab("youtube")}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  activeTab === "youtube"
                    ? "bg-gradient-to-r from-orange-500 to-primary text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Video className="inline-block w-4 h-4 mr-2" />
                YouTube Video
              </button>
            </div>
          </div>

          {/* Upload Area */}
          {activeTab === "document" ? (
            <Card className="p-8">
              <div
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {/* File Type Icons */}
                <div className="flex justify-center items-center gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-500/10 rounded-lg flex items-center justify-center mb-2">
                      <File className="w-8 h-8 text-red-500" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">PDF</span>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-500/10 rounded-lg flex items-center justify-center mb-2">
                      <File className="w-8 h-8 text-orange-500" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">PPTX</span>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-lg flex items-center justify-center mb-2">
                      <File className="w-8 h-8 text-blue-500" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">DOCX</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Upload your study material</h3>
                  <p className="text-muted-foreground">
                    Drop your document here or use the button below • Max 50MB per file
                  </p>
                </div>

                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="bg-background hover:bg-muted"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  BROWSE FILE
                </Button>

                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".pdf,.pptx,.docx,.doc,.ppt"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="font-medium text-foreground">Uploaded Files</h4>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {uploadProgress === 100 ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <div className="text-sm text-muted-foreground">{uploadProgress}%</div>
                        )}
                        <button
                          onClick={() => removeFile(index)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ) : (
            <Card className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Video className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Process YouTube Video</h3>
                <p className="text-muted-foreground mb-6">
                  Enter a YouTube URL to extract learning material
                </p>
                <div className="max-w-md mx-auto">
                  <input
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <Button className="w-full mt-4" variant="gradient">
                    Process Video
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between mt-8">
            <Link to="/">
              <Button variant="outline" size="lg">
                Back
              </Button>
            </Link>
            
            <Link to="/generate">
              <Button 
                variant="gradient" 
                size="lg"
                disabled={uploadedFiles.length === 0 && activeTab === "document"}
                className="min-w-[120px]"
              >
                Continue
              </Button>
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Supported formats: PDF, DOCX, PPTX • Maximum file size: 50MB</p>
            <p className="mt-1">
              Need help? <Link to="/support" className="text-primary hover:underline">Contact Support</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
