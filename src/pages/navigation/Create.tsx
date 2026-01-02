import { useState } from 'react';
import { Package, FileText, MessageSquare, X } from 'lucide-react';
import GeneralForm from '../../features/requests/components/GeneralForm';
import MaterialForm from '../../features/materials/components/MaterialForm';
import MarketplaceForm from '../../features/marketplace/components/MarketplaceForm';

type PostType = 'marketplace' | 'material' | 'general' | null;

const Create = () => {
  const [selectedType, setSelectedType] = useState<PostType>(null);

  const renderForm = () => {
    switch (selectedType) {
      case 'marketplace': return <MarketplaceForm />;
      case 'material': return <MaterialForm />;
      case 'general': return <GeneralForm />;
      default: return null;
    }
  };

  return (
    <div className="relative pt-14 h-dvh overflow-hidden  ">
      {/* Background/Base layer */}
      <div className="px-4">
        <h1 className="text-2xl font-bold text-gray-800">New Post</h1>
        <p className="text-gray-500">Share something with the community.</p>
      </div>

      {/* Action Sheet Overlay */}
      <div className={`fixed inset-0 bg-black/20 transition-opacity ${selectedType ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} />

      {/* The Sheet */}
      <div className={`absolute bottom-10 w-full bg-white shadow-2xl transition-transform duration-300 ease-out p-4 pb-12 ${selectedType ? 'h-[90dvh] overflow-y-auto' : 'h-auto'}`}>
      

        {!selectedType ? (
          <div className="space-y-4 pt-1.5">
            <h2 className="text-lg font-semibold mb-4">Select Post Type</h2>
            <TypeOption 
              icon={<MessageSquare className="text-blue-500" />}
              title="General Post"
              desc="Just text and a description"
              onClick={() => setSelectedType('general')}
            />
            <TypeOption 
              icon={<Package className="text-orange-500" />}
              title="Marketplace"
              desc="Sell or trade items"
              onClick={() => setSelectedType('marketplace')}
            />
            <TypeOption 
              icon={<FileText className="text-green-500" />}
              title="Material"
              desc="Upload PDF, Excel, or Docs"
              onClick={() => setSelectedType('material')}
            />
          </div>
        ) : (
          <div className="animate-in slide-in-from-bottom-10 duration-75 ">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold capitalize">{selectedType} Post</h2>
              <button onClick={() => setSelectedType(null)} className="">
                <X size={20} />
              </button>
            </div>
            {renderForm()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Create

interface TypeOptionProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick: () => void;
}

const TypeOption = ({ icon, title, desc, onClick }: TypeOptionProps) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center p-4 rounded border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md transition-all text-left group"
  >
    <div className="p-3 bg-white rounded shadow-sm group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div className="ml-4">
      <p className="font-bold text-gray-800">{title}</p>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  </button>
);