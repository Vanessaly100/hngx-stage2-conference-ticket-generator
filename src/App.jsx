import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Rootlayou from './components/layout/Rootlayou';
import ErrorPage from './components/ErrorPage';
import SectionOne from './components/form0ne/SectionOne';
import AtendeeDetails from './components/formTwo/AtendeeDetails';
import DownloadTicket from './components/formThree/DownloadTicket';
import MyTickets from './components/MyTickets';


const router = createBrowserRouter([
  // creating root in createBrowserRouter using object

  {
    path: "/", // Root path of the application
    element: <Rootlayou />, // Wraps all child routes
    errorElement: <ErrorPage />, // Handles errors for child routes
    children: [
      {
        index: "true",
        element: <SectionOne />,
      },
      {
        path: "/attendeedetails",
        element: <AtendeeDetails />,
      },
      {
        path: "/downloadticket",
        element: <DownloadTicket />,
      },
      {
        path: "/mytickets",
        element: <MyTickets />,
      },
      
    ],
  },
]);



function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App
