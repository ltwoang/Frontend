import React, { useState, useEffect } from "react";
import "./Filter.css";
import { IoIosArrowDown } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import Slider from "@mui/material/Slider";
import { categoryService } from "../../../Services/categoryService";
import toast from "react-hot-toast";

const Filter = ({ onFilterChange }) => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [value, setValue] = useState([0, 10000]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await categoryService.getAllCategories();
        setCategories(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onFilterChange({
      priceRange: { min: newValue[0], max: newValue[1] },
      categories: selectedCategories,
      colors: selectedColors,
      sizes: selectedSizes
    });
  };

  const handleColorChange = (color) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];
    setSelectedColors(newColors);
    onFilterChange({
      priceRange: { min: value[0], max: value[1] },
      categories: selectedCategories,
      colors: newColors,
      sizes: selectedSizes
    });
  };

  const handleSizeChange = (size) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    setSelectedSizes(newSizes);
    onFilterChange({
      priceRange: { min: value[0], max: value[1] },
      categories: selectedCategories,
      colors: selectedColors,
      sizes: newSizes
    });
  };

  const handleCategoryChange = (categoryId) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((c) => c !== categoryId)
      : [...selectedCategories, categoryId];
    setSelectedCategories(newCategories);
    onFilterChange({
      priceRange: { min: value[0], max: value[1] },
      categories: newCategories,
      colors: selectedColors,
      sizes: selectedSizes
    });
  };

  const filterColors = [
    "Gold",
    "Silver",
    "Rose Gold",
    "White Gold",
    "Platinum",
    "Black"
  ];

  const filterSizes = [
    "Small",
    "Medium",
    "Large",
    "Extra Large"
  ];

  const filterBrands = [
    { name: "Tiffany & Co.", count: 12 },
    { name: "Cartier", count: 8 },
    { name: "Bvlgari", count: 15 },
    { name: "Van Cleef & Arpels", count: 10 },
    { name: "Harry Winston", count: 6 },
    { name: "Graff", count: 9 }
  ];

  const filteredBrands = filterBrands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="filterSection">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="filterSection">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="filterSection">
        <div className="filterCategories">
          <Accordion defaultExpanded disableGutters elevation={0}>
            <AccordionSummary
              expandIcon={<IoIosArrowDown size={20} />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ padding: 0, marginBottom: 2 }}
            >
              <h5 className="filterHeading">Product Categories</h5>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              {categories.map((category) => (
                <div key={category.id} className="category-item">
                  <input
                    type="checkbox"
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                  />
                  <label htmlFor={`category-${category.id}`}>
                    {category.name}
                  </label>
                </div>
              ))}
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="filterColors">
          <Accordion defaultExpanded disableGutters elevation={0}>
            <AccordionSummary
              expandIcon={<IoIosArrowDown size={20} />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ padding: 0, marginBottom: 2 }}
            >
              <h5 className="filterHeading">Metal Type</h5>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              {
                <div className="filterColorBtn">
                  {filterColors.map((color, index) => (
                    <button
                      key={index}
                      className={`colorButton ${
                        selectedColors.includes(color) ? "selected" : ""
                      }`}
                      style={{
                        backgroundColor: color.toLowerCase(),
                      }}
                      onClick={() => handleColorChange(color)}
                    />
                  ))}
                </div>
              }
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="filterSizes">
          <Accordion defaultExpanded disableGutters elevation={0}>
            <AccordionSummary
              expandIcon={<IoIosArrowDown size={20} />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ padding: 0, marginBottom: 2 }}
            >
              <h5 className="filterHeading">Size</h5>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              <div className="sizeButtons">
                {filterSizes.map((size, index) => (
                  <button
                    key={index}
                    className={`sizeButton ${
                      selectedSizes.includes(size) ? "selected" : ""
                    }`}
                    onClick={() => handleSizeChange(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="filterBrands">
          <Accordion defaultExpanded disableGutters elevation={0}>
            <AccordionSummary
              expandIcon={<IoIosArrowDown size={20} />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ padding: 0, marginBottom: 2 }}
            >
              <h5 className="filterHeading">Brands</h5>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              <div className="searchBar">
                <BiSearch className="searchIcon" size={20} color={"#767676"} />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="brandList">
                {filteredBrands.length > 0 ? (
                  filteredBrands.map((brand, index) => (
                    <div className="brandItem" key={index}>
                      <input
                        type="checkbox"
                        name="brand"
                        id={`brand-${index}`}
                        className="brandRadio"
                      />
                      <label htmlFor={`brand-${index}`} className="brandLabel">
                        {brand.name}
                      </label>
                      <span className="brandCount">{brand.count}</span>
                    </div>
                  ))
                ) : (
                  <div className="notFoundMessage">Not found</div>
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="filterPrice">
          <Accordion defaultExpanded disableGutters elevation={0}>
            <AccordionSummary
              expandIcon={<IoIosArrowDown size={20} />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ padding: 0, marginBottom: 2 }}
            >
              <h5 className="filterHeading">Price Range</h5>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              <Slider
                getAriaLabel={() => "Price range"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `$${value}`}
                min={0}
                max={10000}
                step={100}
                sx={{
                  color: "black",
                  "& .MuiSlider-thumb": {
                    backgroundColor: "white",
                    border: "2px solid black",
                    width: 18,
                    height: 18,
                  },
                }}
              />
              <div className="filterSliderPrice">
                <div className="priceRange">
                  <p>
                    Min Price: <span>${value[0]}</span>
                  </p>
                  <p>
                    Max Price: <span>${value[1]}</span>
                  </p>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Filter;
