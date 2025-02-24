import { useState, useEffect } from "react";
import { X, Plus, ExternalLink, FileText } from 'lucide-react';
import * as Dialog from "@radix-ui/react-dialog";

// Experience Level Component
const ExperienceLevel = ({ level, onLevelChange }) => {
  const levels = [
    { id: 'beginner', label: 'Beginner', color: 'bg-indigo-100 text-indigo-800' },
    { id: 'intermediate', label: 'Intermediate', color: 'bg-indigo-200 text-indigo-800' },
    { id: 'expert', label: 'Expert', color: 'bg-indigo-300 text-indigo-800' }
  ];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">Experience Level</h2>
      <div className="flex gap-3">
        {levels.map((item) => (
          <button
            key={item.id}
            onClick={() => onLevelChange(item.id)}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              level === item.id 
                ? `${item.color} dark:bg-blue-900 dark:text-white`
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
            } hover:bg-blue-900 hover:text-white`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// Portfolio Links Component
const PortfolioLinks = ({ links, onLinksChange }) => {
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [newLink, setNewLink] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleAddLink = () => {
    if (newLink.trim() && newTitle.trim()) {
      if (validateUrl(newLink)) {
        onLinksChange([...links, { url: newLink, title: newTitle }]);
        setNewLink('');
        setNewTitle('');
        setError('');
        setIsAddingLink(false);
      } else {
        setError('Please enter a valid URL (e.g., https://example.com).');
      }
    } else {
      setError('Please enter both a title and a valid URL.');
    }
  };

  const handleRemoveLink = (index) => {
    onLinksChange(links.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-indigo-800 dark:text-white">Portfolio Links</h2>
        {!isAddingLink && (
          <button
            onClick={() => setIsAddingLink(true)}
            className="flex items-center gap-2 bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300"
          >
            <Plus size={16} />
            Add Link
          </button>
        )}
      </div>

      {isAddingLink && (
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
            placeholder="Enter link title"
          />
          <div className="flex gap-2">
            <input
              type="text"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="Enter URL (e.g., https://example.com)"
              onKeyPress={(e) => e.key === 'Enter' && handleAddLink()}
            />
            <button
              onClick={handleAddLink}
              className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300"
            >
              Add
            </button>
            <button
              onClick={() => setIsAddingLink(false)}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg"
            >
              Cancel
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      )}

      <ul className="space-y-2">
        {links.map((link, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
          >
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-800 dark:text-indigo-300 hover:underline flex items-center gap-2"
            >
              <ExternalLink size={16} />
              {link.title}
            </a>
            <button
              onClick={() => handleRemoveLink(index)}
              className="text-gray-500 hover:text-red-500"
            >
              <X size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Certifications Component
const Certifications = ({ certifications, onCertificationsChange }) => {
  const [isAddingCert, setIsAddingCert] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.match(/^(image\/.*|application\/pdf)$/)) {
        alert('Unsupported file type. Please upload an image or PDF.');
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      onCertificationsChange([
        ...certifications,
        {
          name: file.name,
          file,
          previewUrl,
          uploadDate: new Date().toLocaleDateString()
        }
      ]);
      setIsAddingCert(false);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-indigo-800 dark:text-white">Certifications</h2>
        {!isAddingCert && (
          <button
            onClick={() => setIsAddingCert(true)}
            className="flex items-center gap-2 bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300"
          >
            <Plus size={16} />
            Add Certificate
          </button>
        )}
      </div>

      {isAddingCert && (
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
          <label className="block w-full px-4 py-2 text-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white transition-colors duration-300">
            <input
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
            />
            Click to Upload Certificate
          </label>
          <button
            onClick={() => setIsAddingCert(false)}
            className="mt-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="group relative bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
          >
            <div
              onClick={() => {
                setSelectedCert(cert);
                setDialogOpen(true);
              }}
              className="cursor-pointer"
            >
              {cert.file.type.includes('pdf') ? (
                <div className="h-32 bg-indigo-50 dark:bg-gray-600 flex items-center justify-center">
                  <FileText size={48} className="text-indigo-800 dark:text-indigo-300" />
                </div>
              ) : (
                <img
                  src={cert.previewUrl}
                  alt={cert.name}
                  className="h-32 w-full object-cover"
                />
              )}
              <div className="p-2 text-center">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                  {cert.name}
                </p>
              </div>
            </div>
            <button
              onClick={() => onCertificationsChange(certifications.filter((_, i) => i !== index))}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white dark:bg-gray-800 rounded-full p-1"
            >
              <X size={16} className="text-gray-500 hover:text-red-500" />
            </button>
          </div>
        ))}
      </div>

      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl w-full p-6">
          <Dialog.Title className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">
            {selectedCert?.name}
          </Dialog.Title>
          <div className="p-4">
            {selectedCert?.file.type.includes('pdf') ? (
              <embed
                src={selectedCert.previewUrl}
                type="application/pdf"
                width="100%"
                height="600px"
              />
            ) : (
              <img
                src={selectedCert?.previewUrl}
                alt={selectedCert?.name}
                className="max-w-full h-auto"
              />
            )}
          </div>
          <Dialog.Close className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-500">
            <X size={24} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

// Main UserProfile Component
export default function UserProfile(props) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [experienceLevel, setExperienceLevel] = useState('intermediate');
  const [portfolioLinks, setPortfolioLinks] = useState([]);
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full p-8 transition-all duration-300 animate-fade-in`}>
      <div className="flex justify-end">
        <button
          onClick={toggleDarkMode}
          className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300"
        >
          Toggle Dark Mode
        </button>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 text-center mb-8 md:mb-0">
          <img
            src={props.user?.profileImage}
            alt="Profile"
            className="rounded-full object-cover w-48 h-48 mx-auto mb-4 border-4 border-indigo-800 dark:border-blue-900 transition-transform duration-300 hover:scale-105"
          />
          <h1 className="text-2xl font-bold text-indigo-800 dark:text-white mb-2">
            {props.user.username}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Software Developer</p>
          <button
            className="mt-4 bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300"
            onClick={() => props.setTab("settings")}
          >
            Edit Profile
          </button>
        </div>
        <div className="md:w-2/3 md:pl-8">
          <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Passionate software developer with 5 years of experience in web
            technologies. I love creating user-friendly applications and solving
            complex problems.
          </p>

          <ExperienceLevel
            level={experienceLevel}
            onLevelChange={setExperienceLevel}
          />

          <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {["JavaScript", "React", "Node.js", "Python", "SQL"].map(
              (skill, index) => (
                <span
                  key={index}
                  className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm hover:bg-blue-900 hover:text-white transition-colors duration-300"
                >
                  {skill}
                </span>
              )
            )}
          </div>

          <PortfolioLinks
            links={portfolioLinks}
            onLinksChange={setPortfolioLinks}
          />

          <Certifications
            certifications={certifications}
            onCertificationsChange={setCertifications}
          />

          <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">
            Contact Information
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-center">{props.user.email || ""}</li>
            <li className="flex items-center">{props.user.phoneNumber || ""}</li>
            <li className="flex items-center opacity-50 cursor-not-allowed">
              address
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}