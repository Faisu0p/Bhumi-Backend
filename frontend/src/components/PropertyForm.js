import React, { useState } from "react";
import {
  Button,
  Col,
  Row,
  ListGroup,
  ProgressBar,
  Badge,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faEdit,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import BasicDetails from "./BasicDetails";
import LocationDetails from "./LocationDetails";
import Media from "./Media";
import PricingAndOthers from "./PricingAndOthers";
import PropertyProfile from "./PropertyProfile";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // Collectively store all form data
  const [formData, setFormData] = useState({
    transactionType: "",
    propertyType: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    photos: [],
    video: "",
    voiceOver: "",
    price: "",
    monthlyRent: "",
    bedrooms: "",
    bathrooms: "",
    balconies: "",
  });

  // Track completed steps
  const [completedSteps, setCompletedSteps] = useState([]);

  // Handle changes for text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle changes for file inputs
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: Array.from(files),
    }));
  };

  // Mark the current step as complete if all required fields are filled
  const markStepComplete = (stepIndex) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps((prev) => [...prev, stepIndex]);
    }
  };

  // Check if the current step has all required fields completed
  const isStepComplete = (stepIndex) => {
    // Example validation (customize for each step's fields)
    switch (stepIndex) {
      case 0: // Basic Details
        return formData.transactionType && formData.propertyType;
      case 1: // Location Details
        return (
          formData.address &&
          formData.city &&
          formData.state &&
          formData.pincode
        );
      case 2: // Media
        return (
          formData.photos.length > 0 || formData.video || formData.voiceOver
        );
      case 3: // Pricing and Others
        return formData.price || formData.monthlyRent;
      case 4: // Property Profile
        return formData.bedrooms && formData.bathrooms && formData.balconies;
      default:
        return false;
    }
  };

  // Form steps array
  const steps = [
    {
      title: "Basic Details",
      component: (
        <BasicDetails formData={formData} handleChange={handleChange} />
      ),
    },
    {
      title: "Location Details",
      component: (
        <LocationDetails formData={formData} handleChange={handleChange} />
      ),
    },
    {
      title: "Media",
      component: (
        <Media
          formData={formData}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
        />
      ),
    },
    {
      title: "Pricing and Others",
      component: (
        <PricingAndOthers formData={formData} handleChange={handleChange} />
      ),
    },
    {
      title: "Property Profile",
      component: (
        <PropertyProfile formData={formData} handleChange={handleChange} />
      ),
    },
  ];

  // Navigation functions
  const nextStep = () => {
    if (isStepComplete(currentStep)) {
      markStepComplete(currentStep);
      setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
    } else {
      setShowModal(true);
    }
  };

  const prevStep = () =>
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  const goToStep = (stepIndex) => {
    if (stepIndex <= currentStep || completedSteps.includes(stepIndex)) {
      setCurrentStep(stepIndex);
    } else {
      setShowModal(true);
    }
  };

  return (
    <Row className="mt-4">
      <Col md={3}>
        <h5>Progress</h5>
        <ProgressBar
          now={(completedSteps.length / steps.length) * 100}
          label={`${Math.round((completedSteps.length / steps.length) * 100)}%`}
        />
        <ListGroup className="mt-3">
          {steps.map((step, index) => (
            <ListGroup.Item
              key={index}
              active={index === currentStep}
              onClick={() => goToStep(index)}
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>
                {index === currentStep ? (
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-primary mr-2"
                  />
                ) : (
                  completedSteps.includes(index) && (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-success mr-2"
                    />
                  )
                )}
                {step.title}
              </span>
              {completedSteps.includes(index) && <Badge bg="success">✔</Badge>}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <Col md={9}>
        <div className="form-step">
          {steps[currentStep].component}
          <div className="mt-3">
            {currentStep > 0 && (
              <Button variant="secondary" onClick={prevStep}>
                Back
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button variant="primary" onClick={nextStep} className="ml-2">
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button
                variant="success"
                className="ml-2"
                onClick={() => {
                  if (isStepComplete(currentStep)) {
                    console.log("Form submitted:", formData);
                    alert("Form submitted successfully!");
                  } else {
                    setShowModal(true);
                  }
                }}
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      </Col>

      {/* Modal for Incomplete Step */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="text-warning mr-2"
            />
            Step Incomplete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please complete all the required fields in the current step before
          proceeding.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};

export default MultiStepForm;
