import { Link } from "react-router-dom";

const EmptyFilteredSuppliesPlaceHolder = ({ errorPlaceholder }) => {
  return (
    <div className="mt-10 flex flex-col items-center">
      {errorPlaceholder !== "" ? (
        <div className="relative w-full h-fit rounded-md overflow-hidden py-2">
          <img
            className="w-[150px] mx-auto my-10"
            src="/imgs/error.svg"
            alt="Post Edit Saved Successfully Icon"
          />
          <p className="text-3xl mb-3 text-center">
            Sorry, I seem to have broken myself.
            <br></br>
            <br></br>
            <span className="text-red-500">{errorPlaceholder}</span>
          </p>
        </div>
      ) : (
        <>
          <img
            src="./imgs/empty-box.svg"
            className="my-5 h=[200px] w-[200px]"
            alt="Empty Supplies Icon"
          />

          <h2 className="text-2xl text-center">
            Oops! There seems to be no available supplies in your area or
            supplies that match your search criteria
          </h2>
          <p className="font-thin text-2xl my-5">
            Expand your filters and try again
          </p>
          <p className="text-2xl font-thin mb-5 text-center">
            If you're having no luck, try posting on the{" "}
            <Link
              to="/ask-for"
              className="underline underline-offset-4 hover:underline-offset-1"
            >
              Ask page
            </Link>{" "}
            to meet your needs
          </p>
        </>
      )}
    </div>
  );
};

export default EmptyFilteredSuppliesPlaceHolder;
