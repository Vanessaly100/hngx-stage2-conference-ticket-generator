import { Link } from "react-router-dom";
import ErrorImg from '../assets/ErrorImg.svg'

const ErrorPage = () => {
  return (
  
    <div>
      <div className="h-screen">
        <p className="text-5xl pt-5 pl-8">
        Go to the <Link to="/" className="border border-green-500 rounded-lg bg-green-600 text-white p-4">HomePage</Link>
      </p>
      <img src={ErrorImg} alt="" className="h-screen w-full"/>
      </div>
    </div>
  );
}

export default ErrorPage