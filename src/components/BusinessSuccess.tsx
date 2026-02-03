import Image from "next/image";
import { FadeUp, SlideUp } from './AnimatedSection';

export default function BusinessSuccess() {
  return (
    <section className="flex justify-center items-center gap-8 flex-col py-16 md:py-24 px-4" id="success">
      <FadeUp>
        <h2 className="text-center font-semibold text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-black"
      >
        A proven path to{" "}
          <span className="font-bold text-green-600">business success</span>
          <br />
          in <span className="font-bold text-green-600">90 days</span> or less
        </h2>
      </FadeUp>

      <SlideUp delay={0.2}>
        <Image 
          src="/images/flow.png" 
          alt="Business success process flow diagram" 
          width={800} 
          height={800}
          className="max-w-full h-auto"
        />
      </SlideUp>
    </section>
  );
}
