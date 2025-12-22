export default function LocationAndDirections() {
  return (
    <div className="md:col-span-1">
      <div className="bg-white rounded-lg shadow-sm p-6 h-full">
        <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Location & Directions
        </h2>
        <div className="space-y-4">
          <div
            className="bg-gray-100 rounded-md h-56"
            style={{ overflow: "hidden" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3845.890632363024!2d74.9350277!3d15.4876111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbd2a4c1b9b9c03%3A0xf6d9a2a7a4f1d4b6!2sIndian%20Institute%20of%20Technology%20DHARWAD!5e0!3m2!1sen!2sin!4v1678888888888!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, pointerEvents: "auto" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="IIT DHARWAD Location Map"
              className="rounded-md"
            ></iframe>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">How to Reach</h3>
            <div className="space-y-2">
              <div>
                <p className="font-medium text-gray-700">By Air</p>
                <p className="text-sm text-gray-600">
                  The nearest airport is Hubli Airport (HBX), approximately 30
                  km from campus. Taxis are available from the airport.
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-700">By Train</p>
                <p className="text-sm text-gray-600">
                  DHARWAD Railway Station is well-connected to major cities. The
                  campus is about 5 km from the station.
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-700">By Road</p>
                <p className="text-sm text-gray-600">
                  IIT DHARWAD is located on the Pune-Bangalore Highway (NH 48),
                  easily accessible by bus or car.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
