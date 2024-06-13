import React from 'react';
import { WorkerCardProps } from '../utils/interfaces';
import { useDarkMode } from '../hooks/useDarkMode';

const WorkerCard: React.FC<WorkerCardProps> = ({ imageURL, name, username, position, experience, points, status }) => {
<<<<<<< quickfixCo
  const context = useContext(DarkModeContext);
  const { darkMode } =context!;

=======
  const { darkMode } = useDarkMode();
>>>>>>> main
  const statusClass = status === 'Active' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div>
      {/* Large Device Layout */}
      <div className="hidden h-[100%] max-w-sm p-4 overflow-hidden  shadow-lg rounded-xl md:block bg-tertiary dark:bg-gray-900 card">
        <div className="flex justify-center">
          <img className="w-[58%] h-[58%] rounded-full" src={imageURL} alt="User avatar" />
        </div>
        <div className="items-center px-6 py-4 text-center">
          <p className="pb-5 text-sm italic text-gray-600 dark:text-white" data-cy="user-login">{username}</p>
          <h2 className="pb-5 mb-2 dark:text-white">{name}</h2>
          <p className="pb-1 text-base text-gray-700 dark:text-white">{position}</p>
          <p className="pb-8 text-sm text-gray-600 dark:text-white">{experience} years</p>
          <div className="flex flex-col"> 
            <h3 className="text-gray-800 text-[25px] font-roboto mr-4 dark:text-white">Experience Points: </h3>
            <div className="flex items-center justify-center w-full pb-9">
              <div className="text-gray-800 text-[50px]  text-center font-roboto mr-4 dark:text-gray-400">{points}</div>
              <svg
                width="46"
                height="47"
                viewBox="0 0 46 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`w-10 h-10 rotate-360 ${darkMode ? 'stroke-white' : 'stroke-black'}`}
              >
                <path
                  d="M35.3826 5.43569C35.1142 5.70401 34.2246 6.61209 33.9897 6.88383L29.0244 12.1621C28.9997 12.1906 28.9664 12.2105 28.9283 12.2194C28.8901 12.2283 28.8485 12.226 28.8082 12.2126L4.07713 7.93388C3.91931 7.90012 3.76126 7.90032 3.61392 7.93447C3.46657 7.96863 3.33345 8.03592 3.22377 8.1317L1.10167 10.2538L21.6861 19.3163C21.7338 19.3365 21.7773 19.368 21.8122 19.4079C21.8472 19.4478 21.8725 19.4945 21.8856 19.5436C21.8987 19.5927 21.8992 19.6425 21.8871 19.688C21.8749 19.7334 21.8505 19.7731 21.8162 19.8031L12.3784 29.5723C12.282 29.6758 12.1588 29.751 12.0187 29.7919C11.8786 29.8328 11.7256 29.8382 11.5722 29.8077L4.50901 28.5845C3.91317 28.4621 3.27631 28.7123 2.8904 29.0982L1.40201 30.5866C1.30021 30.6884 1.42661 30.7848 1.56656 30.8695L9.70801 35.8795C10.1785 36.1133 10.5698 36.5047 10.8037 36.9752L15.7918 45.098C15.9248 45.3241 16.027 45.4152 16.2077 45.2345L17.6219 43.8203C18.2643 43.1779 18.2543 42.9927 18.1002 42.1819L16.8677 34.9991C16.8385 34.8458 16.8445 34.6932 16.8853 34.5533C16.9262 34.4134 17.0007 34.29 17.1031 34.1928L26.8755 24.9176C26.9111 24.8839 26.9559 24.8607 27.0059 24.8501C27.0559 24.8395 27.1096 24.8418 27.1624 24.8569C27.2153 24.8719 27.2656 24.8992 27.309 24.9364C27.3524 24.9735 27.3877 25.0195 27.4116 25.0702L36.457 45.6091L38.5594 43.5068C38.6549 43.3973 38.7221 43.2644 38.7563 43.1174C38.7905 42.9704 38.7908 42.8126 38.7573 42.6551L34.5082 17.911C34.4837 17.825 34.5832 17.6703 34.6376 17.6159L39.837 12.7296C40.1158 12.4875 41.016 11.6058 41.2851 11.3367C44.7788 7.84298 45.868 4.51278 44.033 2.6778C42.198 0.84282 38.8865 1.93175 35.3826 5.43569Z"
                  className="plane-path"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Small Device Layout */}
      <div className="pt-40 overflow-hidden bg-white border border-gray-300 rounded-lg 2sm:p-2 md:hidden">
        <div className="text-center">
          <p>{name}</p>
          <button className={`${statusClass} text-white font-bold py-1 px-2 rounded-lg w-full`}>
            {status}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkerCard;