import { Link } from "react-router-dom";

const AccountDashboardSettingsBar = ({handleLogOutUser}) => {
    return (
        <div className="flex flex-row h-[100px] sm:h-[700px] sm:max-h-screen -mt-[20px] sm:mt-0 sm:flex-col items-center justify-around col-start-1 col-end-8 sm:col-end-2 row-start-1 row-end-2 sm:row-end-7">
        <div className="w-full mt-5 flex justify-center relative overflow-hidden group">
          <Link
            to="/account-settings"
            className=" w-full h-full flex justify-center items-center flex-col"
          >
            <img
              className="w-[25px] sm:w-[50px] mt-5 mb-7 group-hover:-rotate-180 group-hover:cursor-pointer transition-transform duration-1000"
              src="./imgs/settings.svg"
              alt="Settings Icon"
            />
            <p className="absolute top-0 sm:top-auto text-xs sm:text-base sm:bottom-0 sm:-left-[250px] sm:group-hover:left-[50%] sm:group-hover:-translate-x-[50%] sm:transition-all sm:duration-1000">
              Settings
            </p>
          </Link>
        </div>
        <div className="w-full mt-5 flex justify-center relative overflow-hidden group">
          <button
            onClick={() => console.log("ok")}
            className=" w-full h-full flex justify-center items-center flex-col"
          >
            <img
              className="w-[25px] sm:w-[50px] mt-5 mb-7 group-hover:scale-110 group-hover:cursor-pointer transition-transform duration-1000"
              src="./imgs/chat.svg"
              alt="Messages Icon"
            />
            <p className="absolute top-0 sm:top-auto text-xs sm:text-base sm:-bottom-[100px] sm:right-0 sm:group-hover:bottom-0 sm:transition-all sm:duration-500">
              Messages
            </p>
          </button>
        </div>
        <div className="w-full flex-col items-center mt-5 flex justify-center relative overflow-hidden group">
          <button
            onClick={() => handleLogOutUser()}
            className=" w-full h-full flex justify-center items-center flex-col"
          >
            <img
              className="w-[25px] sm:w-[50px] mt-5 mb-7 group-hover:scale-110 group-hover:cursor-pointer transition-transform duration-1000"
              src="./imgs/exit-door.svg"
              alt="Messages Icon"
            />
            <p className="absolute sm:opacity-0 top-0 sm:bottom-0 sm:top-auto text-xs sm:text-base sm:group-hover:opacity-100 sm:transition-opacity sm:duration-1000">
              Log Out
            </p>
          </button>
        </div>
      </div>

    )
}

export default AccountDashboardSettingsBar;