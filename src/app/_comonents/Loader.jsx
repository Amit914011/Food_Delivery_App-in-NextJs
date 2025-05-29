const Loader = ({title}) => {
  return (
   <div className="flex justify-center items-center">
    <div className="w-7 h-7 border-2 border-t-2 border-t-white border-white/50 rounded-full animate-spin"></div> <span> &nbsp; &nbsp; {title}</span>
   </div>
  );
};

export default Loader;
