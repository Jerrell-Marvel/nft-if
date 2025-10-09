import React from "react";
import "./FilterModal.scss";
import { useNavigate } from "react-router";

type FilterModalProps = {
  show: boolean;
  onClose: () => void;
};

const FilterModal: React.FC<FilterModalProps> = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  let navigate = useNavigate();
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        <div className="modal-header">
          <h2>Filters</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          {/* Status Filter */}
          <div className="filter-section">
            <h3>Status</h3>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" /> Buy Now
              </label>
              <label>
                <input type="checkbox" /> On Auction
              </label>
              <label>
                <input type="checkbox" /> New
              </label>
              <label>
                <input type="checkbox" /> Has Offers
              </label>
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-inputs">
              <input type="number" placeholder="Min" />
              <span>to</span>
              <input type="number" placeholder="Max" />
              <select>
                <option>ETH</option>
                <option>WETH</option>
                <option>SOL</option>
              </select>
            </div>
          </div>

          {/* Collections Filter */}
          <div className="filter-section">
            <h3>Collections</h3>
            <input
              type="search"
              placeholder="Search collections..."
              className="search-input"
            />
          </div>

          {/* Chains Filter */}
          <div className="filter-section">
            <h3>Chains</h3>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" /> Ethereum
              </label>
              <label>
                <input type="checkbox" /> Solana
              </label>
              <label>
                <input type="checkbox" /> Polygon
              </label>
              <label>
                <input type="checkbox" /> Tezos
              </label>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn clear-button">Clear All</button>
          <button
            className="btn apply-button"
            onClick={() => {
              navigate("/");
              onClose();
            }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
