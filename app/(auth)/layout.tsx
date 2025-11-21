interface Props{
    children:React.ReactNode;
}

const Layout=({children}:Props)=>{
  return(
    <div className=" flex min-h-screen flex-col items-center justify-center p-6 md:p-10 dark:bg-neutral-950 bg-neutral-50">
    <div className="w-full max-w-sm md:max-w-3xl">
      {children}
    </div>
    </div>
  )
}
export default Layout; 