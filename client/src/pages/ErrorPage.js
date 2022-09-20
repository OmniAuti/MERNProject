const ErrorPage = () => {
return (
    <section className="flex items-center h-screen flex-col mb-[100px]">
        <img className="h-1/3 mt-[100px]" src="./imgs/empty-box.svg"/>
        <p className="text-red-500 text-8xl mt-[25px] text-center">404 Error</p>
        <p className="text-2xl mt-12 text-center">This page doesn't exist! Check the URL and try again</p>
    </section>
)
}

export default ErrorPage;