const PortfolioLinks = ({ onLinksChange }) => {
    const [links, setLinks] = useState([{ url: '', title: '' }]);
  
    const addLink = () => {
      setLinks([...links, { url: '', title: '' }]);
    };
  
    const updateLink = (index, field, value) => {
      const newLinks = [...links];
      newLinks[index][field] = value;
      setLinks(newLinks);
      onLinksChange?.(newLinks);
    };
  
    const removeLink = (index) => {
      setLinks(links.filter((_, i) => i !== index));
    };
  
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 dark:text-white">Portfolio Links</h3>
        {links.map((link, index) => (
          <div key={index} className="flex gap-4 mb-3">
            <input
              type="text"
              placeholder="Title"
              value={link.title}
              onChange={(e) => updateLink(index, 'title', e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <input
              type="url"
              placeholder="URL"
              value={link.url}
              onChange={(e) => updateLink(index, 'url', e.target.value)}
              className="flex-2 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              onClick={() => removeLink(index)}
              className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg dark:hover:bg-red-900/20"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={addLink}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Link
        </button>
      </div>
    );
  };