import Image from "next/image";
import Link from "next/link";
import { FaStar, FaShoppingCart, FaInfoCircle } from "react-icons/fa";

const CareCard = ({ service }) => {
  console.log("Service Data:", service);
  const { title, category, image, price_per_hour, discount, reviews, ratings } =
    service;

  const discountedPrice = price_per_hour - (price_per_hour * discount) / 100;

  return (
    <div className="p-6 mb-20 transition-shadow border border-gray-100 shadow-md card bg-base-100 hover:shadow-lg">
      {/* Image Section */}
      <figure className="relative h-48">
        <Image
          width={200}
          height={180}
          src={image}
          alt={title}
          className="object-cover w-full h-full rounded-md shadow-md"
        />
        {discount > 0 && (
          <div className="absolute p-2 font-bold shadow-md top-2 left-2 badge badge-secondary">
            {discount}% OFF
          </div>
        )}
      </figure>

      {/* Body Section */}
      <div className="mt-4 card-body">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider uppercase text-primary">
            {category}
          </span>
          <div className="flex items-center gap-1 text-sm font-bold text-orange-400">
            <FaStar /> {ratings}
          </div>
        </div>

        <h2 className="card-title text-lg text-gray-600 font-bold leading-tight min-h-[30px] custom-text-shadow">
          {title}
        </h2>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-xl font-bold text-primary custom-text-shadow">
            ৳{discountedPrice}
          </span>
          {discount > 0 && (
            <span className="text-sm text-gray-400 line-through custom-text-shadow">
              ৳{price_per_hour}
            </span>
          )}
          <span className="text-xs text-gray-500 custom-text-shadow">/hr</span>
        </div>

        <p className="mt-1 text-sm text-gray-600 custom-text-shadow">
          {reviews} People reviewed this
        </p>

        {/* Action Buttons */}
        <div className="flex justify-between w-full gap-2 mt-4 card-actions">
          {/* View Details Button */}
          <Link href={`/service/${service._id}`} className="flex-1">
            <button className="w-full btn btn-primary btn-sm text-[#538301] font-semibold border rounded-md hover:bg-green-300 hover:text-white custom-text-shadow flex items-center justify-center gap-1">
              <FaInfoCircle />
              <span className="whitespace-nowrap">View Details</span>
            </button>
          </Link>

          {/* Add to Cart Button */}
          <button className="flex items-center justify-center flex-1 w-full gap-1 font-semibold border rounded-md btn btn-primary btn-sm text-secondary hover:bg-red-300 hover:text-white custom-text-shadow">
            <FaShoppingCart />
            <span className="whitespace-nowrap">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareCard;
