import { Link } from 'react-router-dom';

const OurGoal = () => {
  return (
    <section className="h-full my-24 mx-auto container">
      <h2 className="text-center text-5xl mb-5 font-light">The Goal</h2>
      <p className="font-thin text-center text-2xl w-full md:w-1/2 mx-auto mb-5">
        To build a free resource that connects families and teachers with those that can afford to help students in their community.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-around">
        <Link className='w-full md:w-1/3 p-5 group' to="/borrow">
        <div className="flex items-center justify-center flex-col">
          <div className="borrow-container bg-[url('/public/imgs/borrow.svg')] bg-contain bg-center bg-no-repeat h-[150px] w-[150px] my-3"></div>
          <p className="text-2xl group-hover:underline underline-offset-2">Borrow</p>
          <p className="font-thin text-center">Browse available supplies</p>
        </div>
        </Link>
        <Link className='w-full md:w-1/3 md:mx-5 p-5 group' to="/offer">
        <div className="flex items-center justify-center flex-col">
          <div className="bg-[url('/public/imgs/offer.svg')] bg-contain bg-center bg-no-repeat h-[150px] w-[150px] my-3"></div>
          <p className="text-2xl group-hover:underline underline-offset-2">Offer</p>
          <p className="font-thin text-center">Post supplies that you have to offer</p>
        </div>
        </Link>
        <Link className='w-full md:w-1/3 p-5 group' to="/ask-for">
        <div className="flex items-center justify-center flex-col">
          <div className="bg-[url('/public/imgs/asking.svg')] bg-contain bg-center bg-no-repeat h-[150px] w-[150px] my-3"></div>
          <p className="text-2xl group-hover:underline underline-offset-2">Ask</p>
          <p className="font-thin text-center">Post an ad looking for something specific</p>
        </div>
        </Link>
      </div>
    </section>
  );
};

export default OurGoal;
