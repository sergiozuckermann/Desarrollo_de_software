const AverageInteractionTime = () => {
    
    const ScaleIcon = '/scale.svg';

    // Example data
    const data = [
      { name: 'Ian', time: '00:00:00' },
      { name: 'Melissa', time: '00:00:00' },
      { name: 'Fernanda', time: '00:00:00' },
      { name: 'Karla', time: '00:00:00' },
      { name: 'Javier', time: '00:00:00' },
      { name: 'Fausto', time: '00:00:00'},
      { name: 'Luis', time: '00:00:00'},
      { name: 'Alfredo', time: '00:00:00'},
      { name: 'Fernanda',  time: '00:00:00'},
      { name: 'Mauricio', time: '00:00:00'},
      { name: 'Joaquin', time: '00:00:00'},
      { name: 'Alejandra', time: '00:00:00'},
      { name: 'Pablo', time: '00:00:00'},
      { name: 'Ruben', time: '00:00:00'},
      { name: 'Andrea', time: '00:00:00'},
      { name: 'Natalia', time: '00:00:00'},
      { name: 'Valeria', time: '00:00:00'}
    ];
    return (
      <div className="w-full p-4 sm:p-6 lg:p-8 card overflow-hidden bg-[#F8F9FA] dark:bg-primary">
        <div className="max-w-xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-6xl xl:text-6xl font-roboto mb-8 dark:text-white">
              Average Interaction Time
          </h1>
          <div className="rounded-lg p-2 overflow-y-auto mt-4 pb-16" 
          style={{WebkitOverflowScrolling: "touch", msOverflowStyle: "none", scrollbarWidth: "none", maxHeight: '480px' }} >
            <div className="mb-4 flex items-center"> 
              <span className="text-red-500 text-2xl"> Needs your attention </span>
            </div>
            <div className="grid grid-cols-[auto_1fr] items-start gap-4">
              <img src={ScaleIcon} alt="Scale Icon" className="h-full w-auto" />
              <div>
                {data.map((item, index) => (
                  <div key={index} className="flex justify-between items-center mb-2 dark:text-white">
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
              <span className="text-green-500 text-2xl"> Is doing great </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default AverageInteractionTime;
