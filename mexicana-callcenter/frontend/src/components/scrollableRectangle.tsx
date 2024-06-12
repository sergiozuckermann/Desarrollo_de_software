import "../bargeIn.css";    

const ScrollableRectangle = ({ children }) => {
  return (
    <div className={' container rectangle overflow-auto bg-blue-200 border-2 p-2 border-blue-500 text-black'}>
      {children}
    </div>
  );
};

export default ScrollableRectangle;
