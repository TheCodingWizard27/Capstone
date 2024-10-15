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
    <>
    <h1 className="container-fluid d-flex justify-content-center mt-4">
      <a id="why"> Why should you use ShopSimplify?</a>
    </h1>
    <br></br>
    <div className="container my-5">
      <div className="row g-4">
        {/* Left Column */}
        <div className="col-md-6 p-4" style={{ backgroundColor: '#f9ecec', borderRadius: '10px' }}>
          <h6 style={{ color: 'red' }}>Without ShopSimplify,</h6>
          <ul className="list-unstyled">
            <li style={{ color: 'red', marginBottom: '10px' }}>✖ Limited options to sell or buy locally</li>
            <li style={{ color: 'red', marginBottom: '10px' }}>✖ No easy way to manage transactions</li>
            <li style={{ color: 'red', marginBottom: '10px' }}>✖ Communication with buyers/sellers is cumbersome</li>
            <li style={{ color: 'red', marginBottom: '10px' }}>✖ Lack of a unified platform for secure payments</li>
            <li style={{ color: 'red', marginBottom: '10px' }}>✖ No real-time tracking for transactions or orders</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="col-md-6 p-4" style={{ backgroundColor: '#e6f9ec', borderRadius: '10px' }}>
          <h6 style={{ color: 'green' }}>With ShopSimplify,</h6>
          <ul className="list-unstyled">
            <li style={{ color: 'green', marginBottom: '10px' }}>✔ Sell and buy items locally in one easy platform</li>
            <li style={{ color: 'green', marginBottom: '10px' }}>✔ Seamless transaction management</li>
            <li style={{ color: 'green', marginBottom: '10px' }}>✔ Direct and secure communication between buyers and sellers</li>
            <li style={{ color: 'green', marginBottom: '10px' }}>✔ Integrated secure payments within the app</li>
            <li style={{ color: 'green', marginBottom: '10px' }}>✔ Real-time tracking of sales, orders, and transactions</li>
          </ul>
        </div>
      </div>
    </div>
    </>
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
