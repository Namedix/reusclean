import React from 'react';
import AnimateOnAppear from './AnimateOnAppear';
import {
  BeakerIcon,
  BoltIcon,
  ClockIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  Square3Stack3DIcon,
} from '@heroicons/react/24/solid';

const TabletDetails = () => {
  return (
    <AnimateOnAppear>
      <div className="container hidden md:block">
        <div className="bg-white py-16">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-center font-bold text-2xl mb-16">
              POWERFUL SOCIAL ANXIETY REMEDY IN A FEW SIPS
            </h1>

            <div className="relative">
              {/* Benefits Container */}
              <div className="grid grid-cols-2 gap-x-[600px] gap-y-24">
                {/* Left Column Benefits */}
                <div className="space-y-24">
                  <div className="flex flex-col text-end items-end max-w-xs -mr-20">
                    <div className="w-16 h-16">
                      <BoltIcon className="w-12 h-12 text-[#94C59E]" />
                    </div>
                    <h3 className="font-bold text-color-text text-xl mb-2 text-end">
                      Natural Nootropic
                    </h3>
                    <p className="text-color-textLight text-end">
                      Enhance focus and mental clarity with natural compounds
                    </p>
                  </div>

                  <div className="flex flex-col items-end text-end max-w-xs">
                    <div className="w-16 h-16">
                      <BeakerIcon className="w-12 h-12 text-[#94C59E]" />
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-end">
                      Clinically Proven
                    </h3>
                    <p className="text-color-textLight text-end">
                      Scientifically backed ingredients for optimal results
                    </p>
                  </div>

                  <div className="flex flex-col items-end text-end max-w-xs -mr-20">
                    <div className="w-16 h-16">
                      <DocumentTextIcon className="w-12 h-12 text-[#94C59E]" />
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-end">
                      Easy To Use
                    </h3>
                    <p className="text-color-textLight text-end">
                      Single-serving packets for on-the-go convenience
                    </p>
                  </div>
                </div>

                {/* Right Column Benefits */}
                <div className="space-y-24">
                  <div className="flex flex-col items-start text-start max-w-xs -ml-20">
                    <div className="w-16 h-16">
                      <ShieldCheckIcon className="w-12 h-12 text-[#94C59E]" />
                    </div>
                    <h3 className="font-bold text-color-text text-xl mb-2">
                      No Side Effects
                    </h3>
                    <p className="text-color-textLight">
                      Natural formula without jitters or unwanted side effects
                    </p>
                  </div>

                  <div className="flex flex-col items-start text-start max-w-xs">
                    <div className="w-16 h-16">
                      <Square3Stack3DIcon className="w-12 h-12 text-[#94C59E]" />
                    </div>
                    <h3 className="font-bold text-color-text text-xl mb-2">
                      Feel The Difference
                    </h3>
                    <p className="text-color-textLight">
                      Experience noticeable benefits without feeling overwhelmed
                    </p>
                  </div>

                  <div className="flex flex-col items-start text-start max-w-xs -ml-20">
                    <div className="w-16 h-16">
                      <ClockIcon className="w-12 h-12 text-[#94C59E]" />
                    </div>
                    <h3 className="font-bold text-color-text text-xl mb-2">
                      Fast-Acting Formula
                    </h3>
                    <p className="text-color-textLight">
                      Effects begin in 20-30 minutes and last up to 5 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Center Product Image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px]">
                {/* Light Green Circle Background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#94C59E] bg-[url('/assets/greenBackground.png')] bg-cover bg-center -z-10"></div>
                <img
                  src="/assets/saschetUniversal.png"
                  alt="B4 Calm Focus Product"
                  className="w-full h-full object-contain -ml-[8px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimateOnAppear>
  );
};

export default TabletDetails;
