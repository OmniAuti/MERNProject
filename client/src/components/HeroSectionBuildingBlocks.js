const HeroSectionBuildingBlocks = () => {
  return (
    <div className="w-1/3 hidden lg:block h-screen relative">
        <div  className="lg:bg-green-500 h-full w-[200px] absolute -bottom-10 right-0 bg-[url('/public/imgs/heroPillar.png')]"></div>
      <div className="w-[550px] h-[550px] rounded-full bg-blue-500 absolute bg-[url('/public/imgs/heroCircle.png')] -right-[275px] bottom-0 z-20"></div>
        <div className="bg-red-500 w-[600px] h-[600px] absolute bg-[url('/public/imgs/heroTriangle.png')] -bottom-[300px] -right-[0] rotate-[40deg]"></div>
    </div>
  );
};

export default HeroSectionBuildingBlocks;
