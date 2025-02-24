const Certifications = ({ onCertificationsChange }) => {
    const [certifications, setCertifications] = useState([]);
  
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        // Create a preview URL for the file
        const previewUrl = URL.createObjectURL(file);
        setCertifications([
          ...certifications,
          {
            name: file.name,
            file,
            previewUrl,
            uploadDate: new Date().toLocaleDateString()
          }
        ]);
      }
    };
  
    const removeCertification = (index) => {
      const newCertifications = certifications.filter((_, i) => i !== index);
      setCertifications(newCertifications);
      onCertificationsChange?.(newCertifications);
    };
  
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 dark:text-white">Certifications</h3>
        <div className="mb-4">
          <label
            className="block w-full px-4 py-2 text-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-white"
          >
            <input
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
            />
            Upload Certification
          </label>
        </div>
        <div className="space-y-3">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded">
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium dark:text-white">{cert.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Uploaded on {cert.uploadDate}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeCertification(index)}
                className="text-red-500 hover:text-red-600 dark:hover:text-red-400"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };