import backgroundImg from "../assets/background.png";

const PageTitle = ({ title, subtitle }) => {

  return (
    <section className="w-full relative">
      <img
        className="w-full md:min-h-[25rem] sm:max-h-[18rem]"
        src={backgroundImg}
        alt=""
      />
      <div className="absolute left-0 top-0 h-full w-full flex justify-center ">
        <div className="max-w-screen-2xl flex flex-col justify-center items-center text-center h-full sm:pt-20 md:pt-10 pt-6">
            <h1 className="text-white md:text-6xl sm:text-4xl text-2xl font-bold sm:mb-10 mb-6">{title}</h1>
            <h2 className="text-white opacity-70 md:text-3xl sm:text-2xl text-xl font-normal sm:-mb-8 -mb-4">{subtitle}</h2>
        </div>
      </div>
    </section>
  );
};

export default PageTitle;
