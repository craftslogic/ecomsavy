import { ReactNode } from "react";

export default function LegalLayout({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt?: string;
  children: ReactNode;
}) {
  return (
    <main className="relative z-10 bg-linear-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-linear-to-br from-green-600 to-green-700 text-white pt-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            {title}
          </h1>
          {updatedAt && (
            <p className="mt-4 text-base md:text-lg text-green-100">
              Last updated: {updatedAt}
            </p>
          )}
        </div>
      </div>

      {/* Content Section */}
      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="prose prose-lg prose-gray max-w-none
          prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-200
          prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
          prose-ul:my-6 prose-ul:space-y-3
          prose-li:text-gray-700 prose-li:leading-relaxed
          prose-strong:text-gray-900 prose-strong:font-semibold
          prose-a:text-green-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline hover:prose-a:text-green-700">
          {children}
        </div>
      </article>

      {/* Footer CTA */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Have Questions?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              If you have any questions about our policies or services, please don't hesitate to reach out.
            </p>
            <a
              href="/contact-us"
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Contact Us
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
