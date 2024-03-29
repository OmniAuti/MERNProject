import OurGoal from "../components/OurGoal";

const AboutPage = () => {
  return (
    <>
      <article id="about-home" className=" mx-auto pt-5">
        <h1 className="text-5xl font-light text-center">What Are We About?</h1>
        <div className=" min-h-fit -ml-5 w-screen sm:w-full sm:ml-0 md:w-3/4 mt-10 bg-sky-900 bg-no-repeat bg-center bg-contain bg-[url('/public/imgs/schoolsupplies.svg')]  md:mx-auto sm:rounded-md grid grid-cols-2 grid-rows-2 mb-4 relative">
          <div className="school-supplies-background absolute top-1/3 h-2/3 sm:top-1/2"></div>

          <div
            className="col-span-2 xl:col-span-1 xl:row-span-2 flex flex-col
        justify-center items-start px-5 pt-5 z-40"
          >
            <h2 className="text-3xl mb-5 font-light w-full text-center">
              Borrow for good
            </h2>
            <p className="font-thin text-lg">
              A simple request from a student can often seem like nothing, but
              for some, it may represent an underlying problem that faces
              families around the country. Getting supplies for the classroom
              can be an expensive and simply unatainable as the school year
              carries on. We're here to connect those that can afford to give a
              little to help those that need a little.
            </p>
            <br></br>
            <p className="font-thin text-lg">
              In the United States there are an estimated 11.6 million children
              living below the poverty line. For these families, purchasing
              school supplies is not something that fits in their budget.
            </p>
          </div>

          <div className="col-span-2 xl:col-span-1 xl:row-span-2 flex items-center justify-center px-10 xl:px-0">
            <div className="border-solid border-2 border-sky-500 w-full xl:w-3/4 bg-sky-900 h-72 sm:h-3/4 md:max-h-[200px] relative">
              <div className="border-solid border-2 border-sky-500 h-full w-full bg-sky-900 absolute right-5 top-5">
                <div className="w-full h-full text-center py-3 px-2">
                  <h3 className="mb-3">
                    Cost of School Supplies<br></br>
                    <i>On Average</i>
                  </h3>
                  <div className="flex items-center flex-col sm:flex-row">
                    <div className="sm:w-1/5 w-full mx-1">
                      <p className="font-thin sm:text-left mb-1 text-center">
                        Elementary
                      </p>
                      <div className="bg-red-500 py-1 min-w-fit mx-auto sm:mx-0 px-4 sm:px-0 w-1/5 sm:w-full">
                        $1,017.37
                      </div>
                    </div>
                    <div className="sm:w-2/5 w-full mx-1">
                      <p className="font-thin sm:text-left text-center mb-1 xl:whitespace-nowrap">
                        Middle School
                      </p>
                      <div className="bg-blue-500 py-1 mx-auto sm:mx-0 min-w-fit px-8 sm:px-0 w-2/5 sm:w-full">
                        $1,277.35
                      </div>
                    </div>
                    <div className="sm:w-3/5 w-full mx-1">
                      <p className="font-thin sm:text-left text-center mb-1">
                        High School
                      </p>
                      <div className="bg-green-500 py-1 mx-auto sm:mx-0 min-w-fit px-10 sm:px-0 w-3/5 sm:w-full">
                        $1,667.90
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full col-span-2 pb-5 px-5 row-span-1 z-40">
            <br></br>
            <p className="font-thin text-lg">
              According to a
              <a
                target="_blank"
                href="https://www.lendingtree.com/credit-cards/study/back-to-school-spending-leads-many-into-debt/#:~:text=1%20in%203%20parents%20of,school%20supplies%20as%20expenses%20increase."
              >
                <i> 2021 study by Lending Tree</i>
              </a>
              , 1 in 3 parents of school-age children expect to go into debt
              when shopping for back-to-school supplies. For parents with
              children attending schools that require hybrid learning due to the
              pandemic, 42% believe they'll go in debt while paying for school
              supplies.
            </p>
          </div>
        </div>

        <div className="flex h-fit mx-auto flex-col md:flex-row">
          <div className="bg-sky-900 bg-no-repeat bg-center bg-contain bg-[url('/public/imgs/cap.svg')] mb-5 md:mb-0 md:w-1/2 sm:w-full w-screen -ml-5 sm:-ml-0 h-[100% !important] sm:rounded-md md:mr-2 relative overflow-hidden">
      
            <div className="sm:rounded-md p-5 z-40 w-full h-full absolute">
              <h2 className="text-2xl font-light mb-2 mt-0 text-center">
                What if a student is not prepared?
              </h2>
              <p className="font-thin ">
                Students must be prepared to learn when they enter the classroom
                each and every day. Those that come to class without the
                adequate supplies tend to be less focused on the lessons their
                teacher has planned for them. If a student doesn't have the
                supplies they need to complete their daily work, it can snowball
                into more than just below average grades.
              </p>
              <br></br>

              <div className="flex flex-col lg:flex-row justify-between">
                <ul className="float-left text-center">
                  <li className="underline underline-offset-1">Prepared: </li>
                  <li className="my-1 font-thin">Higher Grade Average</li>
                  <li className="my-1 font-thin">
                    Greater Attitude Towards Learning
                  </li>
                  <li className="my-1 font-thin">
                    Better Peer Relationships And Self-Image
                  </li>
                </ul>

                <ul className="float-right text-center mt-5 lg:mt-0">
                  <li className="underline underline-offset-1">Unprepared:</li>
                  <li className="my-1 font-thin">
                    Less Inclined To Focus In Class
                  </li>
                  <li className="my-1 font-thin">
                    Susceptible To Ridicule From Classmates
                  </li>
                  <li className="my-1 font-thin whitespace-pre-wrap">
                    More Likely To Cause Classroom Disruptions
                  </li>
                </ul>
              </div>
            </div>

            <div className="sm:rounded-md p-5 z-40 w-full h-full">
              <h2 className="text-2xl font-light mb-2 mt-0 text-center opacity-0">
                What if a student is not prepared?
              </h2>
              <p className="font-thin opacity-0">
                Students must be prepared to learn when they enter the classroom
                each and every day. Those that come to class without the
                adequate supplies tend to be less focused on the lessons their
                teacher has planned for them. If a student doesn't have the
                supplies they need to complete their daily work, it can snowball
                into more than just below average grades.
              </p>
              <br></br>

              <div className="flex flex-col lg:flex-row justify-between opacity-0">
                <ul className="float-left text-center">
                  <li className="underline underline-offset-1">Prepared: </li>
                  <li className="my-1 font-thin">Higher Grade Average</li>
                  <li className="my-1 font-thin">
                    Greater Attitude Towards Learning
                  </li>
                  <li className="my-1 font-thin">
                    Better Peer Relationships And Self-Image
                  </li>
                </ul>

                <ul className="float-right text-center mt-5 lg:mt-0 opacity-0">
                  <li className="underline underline-offset-1">Unprepared:</li>
                  <li className="my-1 font-thin">
                    Less Inclined To Focus In Class
                  </li>
                  <li className="my-1 font-thin">
                    Susceptible To Ridicule From Classmates
                  </li>
                  <li className="my-1 font-thin whitespace-pre-wrap">
                    More Likely To Cause Classroom Disruptions
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-sky-900 bg-no-repeat bg-center bg-contain bg-[url('/public/imgs/education.svg')] md:w-1/2 sm:w-full w-screen -ml-5 sm:-ml-0 h-[100% !important] sm:rounded-md md:mr-2 relative overflow-hidden">
            <div className="sm:rounded-md p-5 w-full h-full">
              <h3 className="text-2xl font-light  mb-2 mt-0 text-center z-40">
                What about the teachers?
              </h3>
              <p className="font-thin">
                The national average that teachers spend on classroom supplies
                is around $750 of their own money every year. 30% of teachers
                spend $1000 or more on supplies for their classrooms.
              </p>
              <br></br>
              <p>
                <i>Can't teachers just write off the expenses?</i>
              </p>
              <br></br>
              <p className="font-thin">
                Sadly, teachers can only deduct a maximum of $250 dollars with
                the
                <a href="https://www.irs.gov/taxtopics/tc458" target="_blank">
                  {" "}
                  <span className="underline underline-offset-1">
                    Educator Expense Deduction
                  </span>
                </a>{" "}
                each year. It's unacceptable that we ask teachers to spend their
                own money to provide a quality learning enviroment. Teachers
                should be focused on helping students reach their full
                potential, not worrying if they have the supplies to
                complete each lesson.
                <br></br>
              </p>
            </div>
          </div>
        </div>
      </article>

      <OurGoal />
    </>
  );
};

export default AboutPage;
