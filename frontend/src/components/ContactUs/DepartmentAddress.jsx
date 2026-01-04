export default function DepartmentAddress() {
  return (
    <div className="md:col-span-1">
      <div className="bg-white rounded-lg shadow-sm p-6 h-full">
        <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Department Address
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Department of Electrical, Electronics and Communication Engineering
            </h3>
            <p className="text-gray-700">
              Indian Institute of Technology DHARWAD
              <br />
              Permanent Campus, Chikkamalligawad
              <br />
              DHARWAD - 580 011, Karnataka, India
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Department Head
            </h3>
            <p className="text-gray-700">
              A1 - 501, Head of Electrical, Electronics and Communication Engineering
              <br />
              Prof. Naveen Kadayinti	
         {/*     <br />
              Phone: +91 8362309624*/}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
