const FirstContactResolution = () => {
    
    const ScaleIcon = '/scale.svg';

    // Example data
    const data = [
        { name: 'Ian', time: '89%' },
        { name: 'Melissa', time: '98%' },
        { name: 'Fernanda', time: '98%' },
        { name: 'Karla', time: '98%' },
        { name: 'Javier', time: '98%' },
        { name: 'Fausto', time: '98%' },
        { name: 'Luis', time: '98%' },
        { name: 'Alfredo', time: '98%' },
        { name: 'Fernanda', time: '98%' },
        { name: 'Mauricio', time: '98%' },
        { name: 'Joaquin', time: '98%' },
        { name: 'Alejandra', time: '98%' },
        { name: 'Pablo', time: '98%' },
        { name: 'Ruben', time: '98%' },
        { name: 'Andrea', time: '98%' },
        { name: 'Natalia', time: '98%' },
        { name: 'Valeria', time: '98%' }
    ];

    return (
        <div className="h-full w-full p-4 sm:p-6 lg:p-8 rounded-lg shadow-md border" style={{ backgroundColor: '#F8F9FA'}}>
          <div className="max-w-xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-6xl xl:text-6xl font-roboto mb-8">
                Calls with no answer
            </h1>
            <div className="rounded-lg p-2 overflow-y-auto mt-4" style={{ WebkitOverflowScrolling: "touch", msOverflowStyle: "none", scrollbarWidth: "none", maxHeight: '480px' }} >
              <div className="mb-4 flex items-center">
                <span className="text-red-500 text-2xl">Need your attention</span>
              </div>
              <div className="grid grid-cols-[auto_1fr] items-start gap-4">
                <img src={ScaleIcon} alt="Scale Icon" className="h-full w-auto" />
                <div>
                  {data.map((item, index) => (
                    <div key={index} className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <span className="text-lg font-bold mr-2">{index + 1}.</span>
                        <span className="text-lg">{item.name}</span>
                      </div>
                      <span className="text-lg">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-green-500 text-2xl">Is doing great</span>
              </div>
            </div>
          </div>
        </div>
      );
    };

export default FirstContactResolution;
