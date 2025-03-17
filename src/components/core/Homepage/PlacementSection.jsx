import React from "react";

const companies = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name: "Facebook", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK6q7flGGFlkS3AnMlZz3eTtRLJjk9I9uxqA&s" },
  { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
];

const PlacementSection = () => {
  return (
    <div className="bg-gradient-to-r from-[#f8f9fa67] to-[#e3e6eb48] py-16 text-center">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8">Our Students Got Placed In</h2>
      <div className="mt-8 flex flex-wrap justify-center gap-8">
        {companies.map((company, index) => (
          <div key={index} className="flex items-center justify-center w-36 h-24 bg-white p-4 rounded-2xl shadow-lg transition-transform transform hover:scale-105">
            <img src={company.logo} alt={company.name} className="h-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacementSection;
