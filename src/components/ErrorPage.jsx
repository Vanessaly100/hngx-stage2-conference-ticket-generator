import { Link } from "react-router-dom";
import ErrorImg from '../assets/ErrorImg.svg'

const ErrorPage = () => {
  return (
    <div>
      <img src={ErrorImg} alt="" />
      <p className="text-5xl">
        Go to the <Link to="/">HomePage</Link>
      </p>
    </div>
  );
}

export default ErrorPage