import TuneIcon from '@mui/icons-material/Tune';
import { Typography, Collapse, Checkbox, Button, Badge } from "antd";
import React, { useState } from 'react';
import './FiltersNav.css';
const { Panel } = Collapse;

// Replace 'categories' and 'items' with your actual data
const categories = [
  { id: 1, name: 'Nature of Injury - Level 1 (All Selected)' },
  { id: 2, name: 'Nature of Injury - Level 2 (All Selected)' },
  { id: 3, name: 'Nature of Injury - Level 3 (All Selected)' },
  { id: 4, name: 'Assessment Date' },
];

const items = [
  { id: 1, categoryId: 1, name: 'Back, Thoracic and Lumbar Spine', number: 1 },
  { id: 2, categoryId: 1, name: 'Head', number: 2 },
  { id: 3, categoryId: 1, name: 'Lower Limb', number: 6 },
  { id: 4, categoryId: 1, name: 'Miscellaneous', number: 3 },
  { id: 5, categoryId: 1, name: 'Torso and Internal Organs', number: 1 },

  { id: 6, categoryId: 2, name: 'Ankle', number: 6 },
  { id: 7, categoryId: 2, name: 'Back and Spine', number: 1 },
  { id: 8, categoryId: 2, name: 'Chest, Heart and Lung', number: 1 },
  { id: 9, categoryId: 2, name: 'Hand, Wrist and Fingers', number: 2 },
  { id: 10, categoryId: 2, name: 'Head - Contusion, Abrasion', number: 2 },

  { id: 11, categoryId: 3, name: 'Ankle - Sprain', number: 1 },
  { id: 12, categoryId: 3, name: 'Contusion to the Chest', number: 5 },
  { id: 13, categoryId: 3, name: 'Fracture of Ethmoid Bone', number: 3 },
  { id: 14, categoryId: 3, name: 'Hand, Wrist and Fingers', number: 1 },
  { id: 15, categoryId: 3, name: 'Miscellaneous', number: 3 },
  { id: 16, categoryId: 3, name: 'Lower Limb', number: 1 },

  { id: 17, categoryId: 4, name: 'Hand, Wrist and Fingers', number: 3 },
  { id: 18, categoryId: 4, name: 'Back and Spine', number: 1 },
  { id: 19, categoryId: 4, name: 'Ankle', number: 2 },
  { id: 20, categoryId: 4, name: 'Torso and Internal Organs', number: 8 },
];

const FiltersNav = () => {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [showMoreItems, setShowMoreItems] = useState([]);

  const [expandAll, setExpandAll] = useState(false);

  const handleToggleExpandCollapse = () => {
    if (expandAll) {
      setExpandedKeys([]);
    } else {
      setExpandedKeys(categories.map((category) => category.id.toString()));
    }
    setExpandAll(!expandAll);
  };

  const handleClearAll = () => {
    setCheckedKeys([]);
  };

  const handleCategoryChange = (categoryId) => {
    const categoryKey = categoryId.toString();
    const expanded = expandedKeys.includes(categoryKey);

    if (expanded) {
      setExpandedKeys(expandedKeys.filter((key) => key !== categoryKey));
    } else {
      setExpandedKeys([...expandedKeys, categoryKey]);
    }
  };

  // const handleItemChange = (itemId) => {
  //   const itemKey = itemId.toString();
  //   const checked = checkedKeys.includes(itemKey);

  //   if (checked) {
  //     setCheckedKeys(checkedKeys.filter((key) => key !== itemKey));
  //   } else {
  //     setCheckedKeys([...checkedKeys, itemKey]);
  //   }
  // };

  const handleToggleShowMore = (e, categoryId) => {
    e.stopPropagation();
    const categoryKey = categoryId.toString();
    if (showMoreItems.includes(categoryKey)) {
      setShowMoreItems(showMoreItems.filter((key) => key !== categoryKey));
    } else {
      setShowMoreItems([...showMoreItems, categoryKey]);
    }
  };

  return (
    <div
      className='filers-nav-container'
    >
      <div className="filers-nav-header">
        <TuneIcon className="filers-icons" />
        <Typography className="filers-label">
          Filters
        </Typography>
      </div>
      <div className="filers-nav-body">
        <div
          className="filter-nav-control"
        >
          <Button onClick={handleToggleExpandCollapse}
            className="filter-nav-control-btn"
          >
            {expandAll ? 'Collapse All' : 'Expand All'}
          </Button>
          <Button onClick={handleClearAll}
            className="filter-nav-control-btn"
          >Clear All</Button>
        </div>
        {/* <Collapse activeKey={expandedKeys} accordion={false}
          className='filters-panel-box'
        >
          {categories.map((category) => (
            <Panel
              key={category.id}
              header={category.name}
              onClick={() => handleCategoryChange(category.id)}
              className='filters-panel-category'
            >
              {items
                .filter((item) => item.categoryId === category.id)
                .map((item) => (
                  <Checkbox
                    style={{ display: 'flex' }}
                    key={item.id}
                    checked={checkedKeys.includes(item.id.toString())}
                    onChange={() => setCheckedKeys(prevKeys => {
                      if (prevKeys.includes(item.id.toString())) {
                        return prevKeys.filter(key => key !== item.id.toString());
                      }
                      return [...prevKeys, item.id.toString()];
                    })}
                  >
                    <div
                      className='filters-checkbox-items'
                    >
                      <Typography
                        className='filters-checkbox-items-name'
                      >
                        {item.name}
                      </Typography>
                      <Badge
                        className="site-badge-count-109"
                        count={item.number}
                      />
                    </div>
                  </Checkbox>
                ))}
            </Panel>
          ))}
        </Collapse> */}
        <Collapse activeKey={expandedKeys} accordion={false}
          className='filters-panel-box'>
          {categories.map((category) => {
            const categoryKey = category.id.toString();
            const categoryItems = items.filter(
              (item) => item.categoryId === category.id
            );
            const showMore = showMoreItems.includes(categoryKey);

            return (
              <Panel
                key={category.id}
                header={category.name}
                onClick={() => handleCategoryChange(category.id)}
                className='filters-panel-category'
              >
                <div onClick={(e) => e.stopPropagation()}>
                  {categoryItems.slice(0, 3).map((item) => (
                    <Checkbox
                      style={{ display: 'flex' }}
                      key={item.id}
                      checked={checkedKeys.includes(item.id.toString())}
                      onChange={() => setCheckedKeys((prevKeys) => {
                        if (prevKeys.includes(item.id.toString())) {
                          return prevKeys.filter(key => key !== item.id.toString());
                        }
                        return [...prevKeys, item.id.toString()];
                      })}
                    >
                      <div
                        className='filters-checkbox-items'
                      >
                        <Typography
                          className='filters-checkbox-items-name'
                        >
                          {item.name}
                        </Typography>
                        <Badge
                          className="site-badge-count-109"
                          count={item.number}
                        />
                      </div>
                    </Checkbox>
                  ))}

                  {showMore &&
                    categoryItems.slice(3).map((item) => (
                      <Checkbox
                        style={{ display: 'flex' }}
                        key={item.id}
                        checked={checkedKeys.includes(item.id.toString())}
                        onChange={() => setCheckedKeys(prevKeys => {
                          if (prevKeys.includes(item.id.toString())) {
                            return prevKeys.filter(key => key !== item.id.toString());
                          }
                          return [...prevKeys, item.id.toString()];
                        })}
                      >
                        <div
                          className='filters-checkbox-items'
                        >
                          <Typography
                            className='filters-checkbox-items-name'
                          >
                            {item.name}
                          </Typography>
                          <Badge
                            className="site-badge-count-109"
                            count={item.number}
                          />
                        </div>
                      </Checkbox>
                    ))}

                  {categoryItems.length > 3 && (
                    <Button onClick={(e) => handleToggleShowMore(e, category.id)}
                      className='filter-nav-control-btn'
                    >
                      {
                        showMore ? "Show Less Options" : "Show More Options"
                      }
                    </Button>
                  )}
                </div>
              </Panel>
            );
          })}
        </Collapse>
      </div>
    </div>
  )
}

export default FiltersNav