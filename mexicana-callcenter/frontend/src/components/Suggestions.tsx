const Suggestions = () => {
  return (
    <div className="pt-2 bg-gray-100 w-[90%] rounded-lg h-full sm:p-8 shadow-md" style={{ backgroundColor: "#F8F9FA" }}>
      <div>
        <h1 className="mb-8 text-5xl md:text-3xl lg:text-4xl font-roboto"> Hi, looking for help? </h1>
        <h2 className="mb-8 text-3xl md:text-2xl lg:text-3xl font-roboto"> Suggestions </h2>

        <div className="max-h-[400px] sm:max-h-[400px] overflow-y-auto">
          <ul className="divide-y divide-gray-200">
            <li>
              <a href="#" className="block p-5 hover:bg-gray-200">
                <h3 className="text-lg md:text-xl lg:text-xl xl:text-xl font-roboto">How do I help a customer book a flight?</h3>
              </a>
            </li>
            <li>
              <a href="#" className="block p-5 hover:bg-gray-200">
                <h3 className="text-lg md:text-xl lg:text-xl xl:text-xl font-roboto">Adding additional services to a reservation</h3>
              </a>
            </li>
            <li>
              <a href="#" className="block p-5 hover:bg-gray-200">
                <h3 className="text-lg md:text-xl lg:text-xl xl:text-xl font-roboto">How do I help a customer to cancel a flight?</h3>
              </a>
            </li>
            <li>
              <a href="#" className="block p-5 hover:bg-gray-200">
                <h3 className="text-lg md:text-xl lg:text-xl xl:text-xl font-roboto">Loyalty program information</h3>
              </a>
            </li>
            <li>
              <a href="#" className="block p-5 hover:bg-gray-200">
                <h3 className="text-lg md:text-xl lg:text-xl xl:text-xl font-roboto">How do I help a customer claim his lost luggage during a connecting flight?</h3>
              </a>
            </li>
            <li>
              <a href="#" className="block p-5 hover:bg-gray-200">
                <h3 className="text-lg md:text-xl lg:text-xl xl:text-xl font-roboto">How can I change the customer's name on a paid flight?</h3>
              </a>
            </li>
            <li>
              <a href="#" className="block p-5 hover:bg-gray-200">
                <h3 className="text-lg md:text-xl lg:text-xl xl:text-xl font-roboto">How can I change a customer's flight destination?</h3>
              </a>
            </li>
            <li>
              <a href="#" className="block p-5 hover:bg-gray-200">
                <h3 className="text-lg md:text-xl lg:text-xl xl:text-xl font-roboto">How to select a customer's seat?</h3>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
