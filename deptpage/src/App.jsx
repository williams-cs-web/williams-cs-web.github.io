import './App.css'
import { useState, useEffect } from 'react'
import FrontPage from './components/FrontPage'
import AboutUs from './components/AboutUs'
import PlanYourMajor from './components/PlanYourMajor'
import CourseOfferings from './components/CourseOfferings'
import Colloquium from './components/Colloquium'
import StudentLife from './components/StudentLife'
import ResearchOpportunities from './components/ResearchOpportunities'
import NonMajors from './components/NonMajors'
import News from './components/News'
import { createBrowserRouter, RouterProvider } from "react-router-dom";


function App() {

  const handleHubClick = (who) => {
    // respond to any hub events here
  }

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const getLayout = () => {
    if (windowSize.width >= 910) {
      return "wide"
    } else if (windowSize.width >= 600) {
      return "standard"
    } else {
      return "narrow"
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const showSidebar = (getLayout() === "wide")
  const contentStyle = {
    width: windowSize.width
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <FrontPage
        onClick={handleHubClick}
        style={contentStyle}
      />
    },
    {
      path: "home/",
      element: <FrontPage
        onClick={handleHubClick}
        style={contentStyle}
      />
    },
    {
      path: "about-us/",
      element: <AboutUs
        showSidebar={showSidebar}
        onClick={handleHubClick}
        style={contentStyle}
      />,
    },
    {
      path: "plan-your-major/",
      element: <PlanYourMajor
        layout={getLayout()}
        onClick={handleHubClick}
        style={contentStyle}
      />
    },
    {
      path: "courses/",
      element: <CourseOfferings
        showSidebar={showSidebar}
        onClick={handleHubClick}
        style={contentStyle}
      />
    },
    {
      path: "colloquium/",
      element: <Colloquium
        layout={getLayout()}
        onClick={handleHubClick}
        style={contentStyle}
      />
    },
    {
      path: "student-life/",
      element: <StudentLife
        onClick={handleHubClick}
        showSidebar={showSidebar}
        style={contentStyle}
      />
    },
    {
      path: "research/",
      element: <ResearchOpportunities
        onClick={handleHubClick}
        layout={getLayout()}
        style={contentStyle}
      />
    },
    {
      path: "non-majors/",
      element: <NonMajors
        onClick={handleHubClick}
        layout={getLayout()}
        style={contentStyle}
      />
    },
    {
      path: "news/",
      element: <News
        onClick={handleHubClick}
        layout={getLayout()}
        howMany={3}
        date={Date.now()}
        style={contentStyle}
      />
    },
    {
      path: "danyluk-in-memorium/",
      element: <News
        onClick={handleHubClick}
        layout={getLayout()}
        howMany={1}
        date={Date.parse("April 13, 2022")}
        style={contentStyle}
      />
    },
  ]);

  return <RouterProvider router={router} />

}

export default App
