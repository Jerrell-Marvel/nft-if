// src/BidModal.tsx
import React, { useState } from "react";
import "./BidModal.scss";

type BidModalProps = {
  show: boolean;
  onClose: () => void;
  currentBid: number;
  onBidSubmit: (newBidAmount: number) => void;
};

const BidModal: React.FC<BidModalProps> = ({
  show,
  onClose,
  currentBid,
  onBidSubmit,
}) => {
  const [yourBid, setYourBid] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  if (!show) {
    return null;
  }

  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYourBid(e.target.value);
    // Clear error message when user starts typing
    if (errorMsg) {
      setErrorMsg("");
    }
  };

  const handleSubmit = () => {
    const newBid = parseFloat(yourBid);

    // Validation
    if (isNaN(newBid) || newBid <= currentBid) {
      setErrorMsg(`Your bid must be higher than ${currentBid} ETH.`);
      return;
    }

    // If valid, call the success function from the parent
    onBidSubmit(newBid);
  };

  // Prevents closing the modal when clicking inside it
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        <div className="modal-header">
          <h2>Place your Bid</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="bid-info">
            <span>Current Bid</span>
            <strong>{currentBid} ETH</strong>
          </div>
          <div className="bid-input-group">
            <label htmlFor="bidAmount">Your Bid</label>
            <div className="input-with-currency">
              <input
                type="number"
                id="bidAmount"
                placeholder="Enter your bid amount"
                value={yourBid}
                onChange={handleBidChange}
                min={currentBid + 0.01} // HTML5 validation hint
                step="0.01"
              />
              <span>ETH</span>
            </div>
            {errorMsg && <span className="error-text">{errorMsg}</span>}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="btn submit-button" onClick={handleSubmit}>
            Submit Bid
          </button>
        </div>
      </div>
    </div>
  );
};

export default BidModal;
