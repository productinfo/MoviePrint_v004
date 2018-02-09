// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Thumb from './Thumb';
import ThumbGridHeader from './ThumbGridHeader';
import styles from './ThumbGrid.css';
import empty from './../img/Thumb_EMPTY.png';

const SortableThumb = SortableElement(Thumb);

const ThumbGrid = ({
  thumbs,
  thumbImages,
  file,
  columnWidth,
  controlersAreVisible,
  onToggleClick, onRemoveClick, onInPointClick, onOutPointClick,
  onBackClick, onForwardClick, onScrubClick,
  onMouseOverResult, onMouseOutResult, settings, showEditGrid, showPlaceholder,
  columnCount, rowCount, width, height, contentHeight, contentWidth
}) => {
  const thumbsAmount = columnCount * rowCount;
  const headerHeight = settings.defaultHeaderHeight;
  const thumbWidth = settings.defaultThumbnailWidth;
  const thumbMargin = settings.defaultMargin;
  const generalScale = 0.9;
  const marginWidth = 14;
  const marginHeight = 14;
  const scaleValueHeight = (((contentHeight * 1.0 * generalScale) -
    (marginHeight * 4) - headerHeight) / rowCount) /
    ((thumbWidth * (height / width)) + thumbMargin);
  const scaleValueWidth = (((contentWidth * 0.75 * generalScale) -
    (marginWidth * 4) - headerHeight) / columnCount) /
    (thumbWidth + thumbMargin); // 12 of 16 columns
  const scaleValue = Math.min(scaleValueHeight, scaleValueWidth);
  const newthumbWidth = thumbWidth * scaleValue;
  const newThumbHeight = thumbWidth * (height / width) * scaleValue;
  console.log(contentHeight);
  console.log(contentWidth);
  console.log(rowCount);
  console.log(height);
  console.log(columnWidth);
  console.log(columnCount);
  console.log(width);
  console.log(scaleValue);

  let thumbGridHeaderComponent = null;
  let thumbGridComponent = null;

  if (showEditGrid === true) {
    thumbGridHeaderComponent = (
      <div
        className={styles.gridHeader}
        style={{
          height: headerHeight * scaleValue,
          backgroundColor: 'black',
          margin: (thumbMargin / 2) * scaleValue,
        }}
      />
    );
  } else {
    thumbGridHeaderComponent = (
      <ThumbGridHeader
        file={file}
        headerHeight={settings.defaultHeaderHeight}
      />
    );
  }

  if (showEditGrid === true) {
    thumbGridComponent = (
      Array.apply(null, Array(thumbsAmount)).map((val, i) => (
        <div >
          <div
            className={styles.gridItem}
            style={{
              // width: newthumbWidth,
              // height: newThumbHeight,
              // backgroundColor: 'black',
              margin: (thumbMargin / 2) * scaleValue,
            }}
          />
          <img
            src={empty}
            className={styles.image}
            alt=""
            width={newthumbWidth}
            height={newThumbHeight}
          />
        </div>
      ))
    );
  } else {
    thumbGridComponent = (
      thumbs.map(thumb => (
        <SortableThumb
          key={thumb.id}
          indexValue={thumb.index}
          thumbImageObjectUrl={thumbImages !== undefined ? thumbImages[thumb.id] !== undefined ? thumbImages[thumb.id].objectUrl : undefined : undefined}
          width={file.width || 1920}
          height={file.height || 1080}
          thumbWidth={thumbWidth}
          controlersAreVisible={(thumb.id === controlersAreVisible)}
          {...thumb}
          onToggle={() => onToggleClick(file.id, thumb.id)}
          onRemove={() => onRemoveClick(file.id, thumb.id)}
          onInPoint={() => onInPointClick(file, thumbs, thumb.id, thumb.frameNumber)}
          onOutPoint={() => onOutPointClick(file, thumbs, thumb.id, thumb.frameNumber)}
          onBack={() => onBackClick(file, thumb.id, thumb.frameNumber)}
          onForward={() => onForwardClick(file, thumb.id, thumb.frameNumber)}
          onScrub={() => onScrubClick(file, thumb.id, thumb.frameNumber)}
          onOver={() => onMouseOverResult(thumb.id)}
          onOut={() => onMouseOutResult()}
        />))
    );
  }

  return (
    <div
      className={styles.grid}
      style={{
        width: showEditGrid ? columnWidth * scaleValue : columnWidth,
      }}
      id="ThumbGrid"
    >
      {thumbGridHeaderComponent}
      {thumbGridComponent}
    </div>
  )
};

ThumbGrid.defaultProps = {
  controlersAreVisible: 'false'
};

ThumbGrid.propTypes = {
  thumbs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    hidden: PropTypes.bool.isRequired,
    frameNumber: PropTypes.number.isRequired
  }).isRequired).isRequired,
  thumbImages: PropTypes.object,
  // thumbImages: PropTypes.objectOf(PropTypes.objectOf(PropTypes.shape({
  //   objectUrl: PropTypes.string.isRequired
  // }).isRequired).isRequired).isRequired,
  file: PropTypes.shape({
    id: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  columnWidth: PropTypes.number.isRequired,
  controlersAreVisible: PropTypes.string.isRequired,
  onToggleClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onInPointClick: PropTypes.func.isRequired,
  onOutPointClick: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onForwardClick: PropTypes.func.isRequired,
  onScrubClick: PropTypes.func.isRequired,
  onMouseOverResult: PropTypes.func.isRequired,
  onMouseOutResult: PropTypes.func.isRequired,
};

const SortableThumbGrid = SortableContainer(ThumbGrid);

// export default ThumbGrid;
export default SortableThumbGrid;