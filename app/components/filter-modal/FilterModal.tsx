import React, { useState } from "react";
import "./FilterModal.scss";
import { useNavigate } from "react-router";

type FilterModalProps = {
  show: boolean;
  onClose: () => void;
};

const FilterModal: React.FC<FilterModalProps> = ({ show, onClose }) => {
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const [status, setStatus] = useState({
    buyNow: false,
    onAuction: false,
  });

  const [chains, setChains] = useState({
    ethereum: false,
    solana: false,
    polygon: false,
    tezos: false,
  });
  const navigate = useNavigate();

  if (!show) {
    return null;
  }

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[0-9]*\.?[0-9]*$/.test(value)) {
      setMinPrice(value);
      // If min price becomes greater than max, sync them
      if (maxPrice && parseFloat(value) > parseFloat(maxPrice)) {
        setMaxPrice(value);
      }
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[0-9]*\.?[0-9]*$/.test(value)) {
      setMaxPrice(value);
      if (minPrice && parseFloat(value) < parseFloat(minPrice)) {
        setMinPrice(value);
      }
    }
  };

  const handleCheckboxChange = <T,>(
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<T>>
  ) => {
    const { name, checked } = e.target;
    console.log(name, checked);
    setState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleClearAll = () => {
    setSearchQuery("");
    setMinPrice("");
    setMaxPrice("");
    setStatus({ buyNow: false, onAuction: false });
    setChains({ ethereum: false, solana: false, polygon: false, tezos: false });
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    const selectedStatuses = Object.keys(status).filter(
      (key) => status[key as keyof typeof status]
    );
    if (selectedStatuses.length > 0)
      params.set("status", selectedStatuses.join(","));

    const selectedChains = Object.keys(chains).filter(
      (key) => chains[key as keyof typeof chains]
    );
    if (selectedChains.length > 0)
      params.set("chains", selectedChains.join(","));

    navigate(`/?${params.toString()}`);
    onClose();
  };

  <button className="btn apply-button" onClick={handleApplyFilters}>
    Apply Filters
  </button>;

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
          {/* Collections Filter */}
          <div className="filter-section">
            <h3>Search</h3>
            <input
              type="search"
              placeholder="Search NFT"
              className="search-input"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
          </div>

          {/* Status Filter */}
          <div className="filter-section">
            <h3>Status</h3>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="buyNow"
                  checked={status.buyNow}
                  onChange={(e) => handleCheckboxChange(e, setStatus)}
                />
                Buy Now
              </label>
              <label>
                <input
                  type="checkbox"
                  name="onAuction"
                  checked={status.onAuction}
                  onChange={(e) => handleCheckboxChange(e, setStatus)}
                />
                On Auction
              </label>
              {/* <label>
                <input type="checkbox" /> New
              </label>
              <label>
                <input type="checkbox" /> Has Offers
              </label> */}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={handleMinPriceChange}
                min={0}
                step="0.01"
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                min={0}
                step="0.01"
              />

              <span>ETH</span>
              {/* <select>
                <option>ETH</option>
                <option>WETH</option>
                <option>SOL</option>
              </select> */}
            </div>
          </div>

          {/* Chains Filter */}
          <div className="filter-section">
            <h3>Chains</h3>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="ethereum"
                  checked={chains.ethereum}
                  onChange={(e) => handleCheckboxChange(e, setChains)}
                />
                Ethereum
              </label>
              <label>
                <input
                  type="checkbox"
                  name="solana"
                  checked={chains.solana}
                  onChange={(e) => handleCheckboxChange(e, setChains)}
                />
                Solana
              </label>
              <label>
                <input
                  type="checkbox"
                  name="polygon"
                  checked={chains.polygon}
                  onChange={(e) => handleCheckboxChange(e, setChains)}
                />
                Polygon
              </label>
              <label>
                <input
                  type="checkbox"
                  name="tezos"
                  checked={chains.tezos}
                  onChange={(e) => handleCheckboxChange(e, setChains)}
                />
                Tezos
              </label>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn clear-button" onClick={handleClearAll}>
            Clear All
          </button>
          <button
            className="btn apply-button"
            onClick={() => {
              handleApplyFilters();
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
