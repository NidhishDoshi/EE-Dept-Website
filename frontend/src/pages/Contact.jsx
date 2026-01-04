import { lazy, Suspense } from "react";

const ContactPoints = lazy(() =>
  import("../components/ContactUs/ContactPoints")
);
const ContactUsFaq = lazy(() => import("../components/ContactUs/ContactUsFaq"));
const ContactUsForm = lazy(() =>
  import("../components/ContactUs/ContactUsForm")
);
const ContactUsSocialMediaSection = lazy(() =>
  import("../components/ContactUs/ContactUsSocialMediaSection")
);
const DepartmentAddress = lazy(() =>
  import("../components/ContactUs/DepartmentAddress")
);
const LocationAndDirections = lazy(() =>
  import("../components/ContactUs/LocationAndDirections")
);

const fallback = (
  <div className="text-center py-8 text-gray-400">Loading...</div>
);

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-500">Contact Us</h1>
        <p className="text-gray-600 mt-3 text-lg">
          Get in touch with the Department of Electrical, Electronics and Communication Engineering
          at IIT DHARWAD
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Address and General Contact */}
        <Suspense fallback={fallback}>
          <DepartmentAddress />
        </Suspense>

        {/* Middle Column - Specific Contact Points */}
        <Suspense fallback={fallback}>
          <ContactPoints />
        </Suspense>

        {/* Right Column - Map and Directions */}
        <Suspense fallback={fallback}>
          <LocationAndDirections />
        </Suspense>
      </div>

      {/* FAQ Section */}
      <Suspense fallback={fallback}>
        <ContactUsFaq />
      </Suspense>

      {/* Contact Form Section
      <Suspense fallback={fallback}>
        <ContactUsForm />
      </Suspense> */}

      {/* Social Media Section 
      <Suspense fallback={fallback}>
        <ContactUsSocialMediaSection />
      </Suspense>*/}
    </div>
  );
};

export default Contact;
