// components/Sort-dropdown/SortDropdown.tsx
import React, { useState, useRef, useEffect } from "react";
import "./SortDropdown.scss";

// Make sure this export is exactly like this:
export type SortOption = "most-popular"|"less-popular"|"newest" | "oldest" | "price-low-high" | "price-high-low" | "name-a-z" | "name-z-a";

// Your component props type
type SortDropdownProps = {
  onSortChange: (sortOption: SortOption) => void;
  currentSort: SortOption;
};

const SortDropdown: React.FC<SortDropdownProps> = ({ onSortChange, currentSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "most-popular", label: "Most Popular" },
    { value: "less-popular", label: "Less Popular" },
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "price-high-low", label: "Price: High to Low" },
    { value: "name-a-z", label: "Name: A to Z" },
    { value: "name-z-a", label: "Name: Z to A" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getCurrentSortLabel = () => {
    return sortOptions.find(option => option.value === currentSort)?.label || "Sort By";
  };

  const handleSortChange = (option: SortOption) => {
    onSortChange(option);
    setIsOpen(false);
  };

  return (
    <div className="sort-dropdown" ref={dropdownRef}>
      <button 
        className={`sort-dropdown-toggle ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sort-label">{getCurrentSortLabel()}</span>
        <span className={`arrow ${isOpen ? "up" : "down"}`}>▼</span>
      </button>
      
      {isOpen && (
        <div className="sort-dropdown-menu">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              className={`sort-dropdown-item ${currentSort === option.value ? "active" : ""}`}
              onClick={() => handleSortChange(option.value)}
            >
              {option.label}
              {currentSort === option.value && <span className="checkmark">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;