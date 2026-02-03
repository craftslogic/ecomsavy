import Image from "next/image";
import { FadeUp, SlideUp } from './AnimatedSection';

export default function Mission (){
  return (
      <section className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8" id="about">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12 sm:py-16 lg:py-20">
          {/* Left Section */}
          <FadeUp className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <p className="text-xs sm:text-sm font-semibold text-gray-700 tracking-widest uppercase">
                What Makes Us Different
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight">
                We're a Growth Partner Not a Regular/Service Agency
              </h2>
            </div>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed space-y-4">
              <span className="block">
                It's our ongoing mission is to help aspiring business owners to achieve success that flows freely in abundance. That's what defines Ecomsavy.
              </span>
              <span className="block">
                Ecomsavy offers a proven system that has already helped its clients with no previous experience, generate millions in revenue – creating countless successful Ecommerce Stores.
              </span>
              <span className="block">
                It's so much more than just a service, it's a done-with-you profitable Ecommerce store.
              </span>
            </p>
          </FadeUp>

          {/* Right Section */}
          <SlideUp delay={0.2} className="flex flex-col items-center lg:items-end gap-6 sm:gap-8">
            {/* Quote */}
            <div className="text-center lg:text-right">
              <p className="text-2xl sm:text-3xl lg:text-3xl font-bold text-emerald-600 leading-relaxed max-w-md">
                "My mission is to be the mentor I needed when I first started"
              </p>
            </div>

            {/* Profile Section */}
            <div className="flex flex-col items-center lg:items-end gap-4 sm:gap-6">
              {/* Profile Image */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden shadow-lg border-4 border-emerald-600">
                <Image
                  src="/images/profile.png"
                  alt="Syed Maaz Ali, CEO of Ecomsavy"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Profile Info */}
              <div className="text-center lg:text-right">
                <h3 className="text-xl sm:text-2xl font-bold text-black">Syed Maaz Ali</h3>
                <p className="text-sm sm:text-base text-gray-600 font-medium">CEO of Ecomsavy</p>
              </div>
            </div>
          </SlideUp>
        </div>
      </section>
  );
};
