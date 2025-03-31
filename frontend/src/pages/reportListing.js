import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Card, Nav } from "react-bootstrap";
import { auth } from "../Firebase/firebaseConfig";
import axios from "axios";
import NavBar from "../components/navBar";

function ReportListing() {
    const { listingId } = useParams();
    const navigate = useNavigate();
    const [reason, setReason] = useState("");
    const [wordCount, setWordCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isReported, setIsReported] = useState(false);
    const [error, setError] = useState("");
    const [listingData, setListingData] = useState(null);
    const maxWords = 500;

    useEffect(() => {
        // Fetch listing data to display context
        const fetchListing = async () => {
            try {
                // Use your API endpoint to get listing details
                const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/listings/${listingId}`);
                setListingData(response.data);
            } catch (err) {
                console.error("Error fetching listing:", err);
                setError("Error loading listing details");
            }
        };

        fetchListing();
    }, [listingId]);

    const countWords = (text) => {
        return text.trim().split(/\s+/).filter(Boolean).length;
    };

    const handleReasonChange = (e) => {
        const text = e.target.value;
        const words = countWords(text);

        if (words <= maxWords) {
            setReason(text);
            setWordCount(words);
        }
    };

    const handleReport = async () => {
        if (!auth.currentUser) {
            setError("You need to be logged in to report a listing.");
            return;
        }

        if (!reason.trim()) {
            setError("Please provide a reason for reporting this listing.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            // Get the current user's token for authentication
            const token = await auth.currentUser.getIdToken();

            // Use the same base URL as in the fetchListing function
            await axios.post(
                `${process.env.REACT_APP_BACKEND}/api/reportListing/${listingId}`,
                { reason: reason.trim() },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                }
            );

            setIsReported(true);
        } catch (err) {
            console.error("Error reporting listing:", err);

            // Handle specific error responses from your API
            if (err.response?.status === 400 && err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Error reporting listing. The API endpoint may not be set up correctly.");
            }

            setLoading(false);
        }
    };

    return (
        <>
            <NavBar />
            <Container className="py-5">
                <Button variant="link" onClick={() => navigate(-1)} className="mb-4 d-flex align-items-center">
                    &larr; Back
                </Button>

                <Card className="shadow-sm">
                    <Card.Header as="h4">Report Listing</Card.Header>
                    <Card.Body>
                        {listingData && (
                            <Card.Title className="mb-3">Reporting: {listingData.title || "Untitled Listing"}</Card.Title>
                        )}

                        {error && <Alert variant="danger">{error}</Alert>}

                        {isReported ? (
                            <Alert variant="success">
                                <Alert.Heading>Thank you for your report</Alert.Heading>
                                <p>Your report has been submitted successfully. We will review it as soon as possible.</p>
                                <hr />
                                <div className="d-flex justify-content-end">
                                    <Button onClick={() => navigate(-1)} variant="outline-success">
                                        Return
                                    </Button>
                                </div>
                            </Alert>
                        ) : (
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Please explain why you are reporting this listing (max {maxWords} words)</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={6}
                                        placeholder="Please provide details about why you're reporting this listing..."
                                        value={reason}
                                        onChange={handleReasonChange}
                                        disabled={loading}
                                    />
                                    <Form.Text className={`d-block text-end ${wordCount > maxWords * 0.8 ? "text-warning" : "text-muted"}`}>
                                        {wordCount}/{maxWords} words
                                    </Form.Text>
                                </Form.Group>

                                <div className="d-flex justify-content-end gap-2">
                                    <Button variant="secondary" onClick={() => navigate(-1)} disabled={loading}>
                                        Cancel
                                    </Button>
                                    <Button variant="danger" onClick={handleReport} disabled={loading || !reason.trim()}>
                                        {loading ? "Submitting Report..." : "Submit Report"}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </>);
}

export default ReportListing;