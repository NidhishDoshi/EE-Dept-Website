import { lazy, Suspense } from "react";

const Carousel = lazy(() => import("../components/Carousel/Carousel"));
const Gallery = lazy(() => import("../components/Gallery/Gallery"));
const NewsSection = lazy(() => import("../components/Home/NewsSection"));
const TalksAndEventsSection = lazy(() =>
  import("../components/Home/TalksAndEventsSection")
);
const DepartmentStatisticsSection = lazy(() => import("../components/Home/DepartmentStatisticsSection"));
const PlacementStatisticsSection = lazy(() =>
  import("../components/Home/PlacementStatisticsSection")
);
const RecruitersCarousel = lazy(() =>
  import("../components/Home/RecruitersCarousel")
);

const fallback = (
  <div className="text-center py-8 text-gray-400">Loading...</div>
);

const Home = () => {
  return (
    <div className="bg-gray-50">
      {/* Carousel Section - Full width */}
      <div className="mb-8">
        <Suspense fallback={fallback}>
          <Carousel />
        </Suspense>
      </div>

      {/* News & Talks_events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Suspense fallback={fallback}>
            <NewsSection />
          </Suspense>
          <Suspense fallback={fallback}>
            <TalksAndEventsSection />
          </Suspense>
        </div>
      </div>

      {/* <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={fallback}>
            <DepartmentStatisticsSection />
          </Suspense>
        </div>
      </div>

      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={fallback}>
            <PlacementStatisticsSection />
          </Suspense>
        </div>
      </div> */}
      <section className="bg-white py-12 shadow-sm border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Department Stats */}
          <Suspense fallback={fallback}>
            <DepartmentStatisticsSection />
          </Suspense>

          {/* Visual Divider (Gray line) */}
          <div className="w-full h-px bg-gray-100" aria-hidden="true" />

          {/* Placement Stats */}
          <Suspense fallback={fallback}>
            <PlacementStatisticsSection />
          </Suspense>
        </div>
      </section>

      <div className="">
        <Suspense fallback={fallback}>
          <RecruitersCarousel />
        </Suspense>
      </div>

      <div className="w-full h-px bg-gray-200" aria-hidden="true" />

      {/* Gallery Section */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={fallback}>
            <Gallery />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Home;
