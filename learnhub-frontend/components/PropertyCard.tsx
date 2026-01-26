import Link from 'next/link';
import { Home, MapPin, Tag } from 'lucide-react';

interface Property {
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
    imageUrl?: string;
    listingType: string;
}

const PropertyCard = ({ property }: { property: Property }) => {
    return (
        <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 bg-gray-200 w-full relative">
                {property.imageUrl ? (
                    <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        <Home className="h-12 w-12" />
                    </div>
                )}
                <span className="absolute top-2 right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full uppercase font-bold">
                    {property.listingType}
                </span>
            </div>
            <div className="px-4 py-4">
                <h3 className="text-lg font-medium text-gray-900 truncate">{property.title}</h3>
                <p className="mt-1 text-sm text-gray-500 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                </p>
                <div className="mt-2 flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">${Number(property.price).toLocaleString()}</span>
                    <Link href={`/properties/${property.id}`} className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
