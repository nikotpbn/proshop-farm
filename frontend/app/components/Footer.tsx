const Footer = () => {

    const currentYear = new Date().getFullYear();

  return (
    <footer className="flex justify-center">
        <div className="flex text-center">
            <p className="w-full">ProShop &copy; {currentYear}</p>
        </div>
    </footer>
  )
}

export default Footer