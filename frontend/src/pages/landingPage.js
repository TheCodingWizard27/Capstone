import NavigationBar from '../components/landingNavBar';
import Image from 'react-bootstrap/Image';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const LandingPage = () => {
  return (
    <>
      <NavigationBar /> {/* Navigation Bar */}
      <div className="landing-content">
        <ImageSection />
        <Tagline />
        <WhyShop />
        <ExploreFeature />
        <AboutUS />
      </div>
    </>
  );
};

const ImageSection = () => {
  return (
    <div className="container-fluid d-flex flex-column align-items-center mt-4">
      <Image
        src={`${process.env.PUBLIC_URL}/images/landingPage.jpg`}
        alt="Aloo"
        height={800}
        width={800}
        fluid
      />
    </div>
  );
};

const Tagline = () => {
  return (
    <div className=" container-fluid paragraph-section">
    <h2 className="d-flex justify-content-center mt-4">
      Simplify your Shopping, Amplify your Life.
    </h2>
    <h2 className="d-flex justify-content-center mt-4">
      Start shopping Smart! Get Started Today!
    </h2>
    {/* Buttons placed after the image */}
    <div className="d-flex justify-content-center mt-4">
        <GetStarted />
      </div>
    <br></br>
  </div>
  );
}

const WhyShop = () => {
  return (
    <div className=" container-fluid paragraph-section">
      <h1 className="d-flex justify-content-center mt-4">
        <a id="why">Why Shop Simplify?</a>
      </h1>
      <p className="text-center" justify-content-center>
        We provide the best services. Learn more on our WhyShop.
      </p>
    </div>
  );
};

const ExploreFeature = () => { //! Under Construction
  return (
    <div className=" container-fluid paragraph-section">
      <h1 className="container-fluid d-flex justify-content-center mt-4">
        <a id="features">Explore Features</a>
      </h1>
      <p className="text-center" justify-content-center>
        Currently the worksite is underconstruction we will be back shortly with
        features incorporating all the actions and functions to make your
        shopping smarter.
      </p>
    </div>
  );
};

const AboutUS = () => {
  return (
    <div className="container-fluid paragraph-section">
      <h1 className="container-fluid d-flex justify-content-center mt-4">
        <a id="updates">About Us</a>
      </h1>
      <p className="text-center" justify-content-center>
        Team of four.
        <ul className="list-unstyled">
          <li> Aavash Neupane</li>
          <li> Raunak Upreti</li>
          <li> Siddhartha Pudasini</li>
          <li> Kushal Panthi</li>
        </ul>
      </p>
    </div>
  );
};

const GetStarted = () => { // Button for Get Started
  return (
    <>
    <Link to="/register">
      <Button
          style={{ color: 'white' }}
          className="mx-2  btn btn-primary custom-btn"
          variant="outline-dark"
        >
          Get Started
        </Button>
    </Link>
    </>
  );
}

const Buttonlike = () => { // Button for Login and Register
  return (
    <>
      <Link to="/signIn">
        <Button
          style={{ color: 'white' }}
          className="mx-2 btn btn-primary custom-btn"
          variant="outline-dark"
        >
          Login
        </Button>
      </Link>
      <Link to="/register">
        <Button
          style={{ color: 'white' }}
          className="mx-2  btn btn-primary custom-btn"
          variant="outline-dark"
        >
          Register
        </Button>
      </Link>
    </>
  );
};

export default LandingPage;
