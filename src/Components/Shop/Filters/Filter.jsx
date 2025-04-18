import React, { useState } from "react";
import "./Filter.css";
import { IoIosArrowDown } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import Slider from "@mui/material/Slider";

const Filter = () => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [value, setValue] = useState([0, 10000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleColorChange = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((c) => c !== color)
        : [...prev, color]
    );
  };

  const handleSizeChange = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  const filterCategories = [
    "Necklaces",
    "Rings",
    "Earrings",
    "Bracelets",
    "Watches",
    "Men's Jewelry",
    "Wedding & Engagement",
    "Gifts"
  ];

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
              {filterCategories.map((category, index) => (
                <p key={index}>{category}</p>
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
