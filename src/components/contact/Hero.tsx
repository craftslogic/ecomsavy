import { FadeUp } from "../AnimatedSection";

export default function Hero() {
  return (
    <section className="relative z-10 bg-linear-to-br from-green-50 via-white to-green-50 py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center space-y-8">
          <div className="inline-block">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-semibold mb-6">
              📞 We're Here to Help
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
            Let's <span className="text-green-600">Work Together</span>
          </h1>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Whether you need a strategic partner to tackle growth challenges, guidance on organizational design, or tactical support to execute your plans—you're in the right place.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              <strong className="text-gray-900">Let's chat, no strings attached.</strong> Book a free discovery call today and discover what we can do for your bottom line.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started Today
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="tel:+923353866461"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 font-semibold rounded-full border-2 border-green-600 hover:bg-green-50 transition-all duration-200"
            >
              📞 Call Us Now
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
