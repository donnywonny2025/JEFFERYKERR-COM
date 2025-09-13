import React from 'react';
import LiquidEther from '../LiquidEther';
import { COLORS, LIQUID_ETHER_CONFIG } from '../../styles/theme';
import './Background.css';

const Background = ({
  colors = COLORS.LIQUID_COLORS,
  style = {},
  className = '',
  ...props
}) => {
  return (
    <div className={`background-container ${className}`} style={style}>
      <LiquidEther
        colors={colors}
        starLayers={LIQUID_ETHER_CONFIG.STAR_LAYERS}
        starDensity={LIQUID_ETHER_CONFIG.STAR_DENSITY}
        starDriftSpeed={LIQUID_ETHER_CONFIG.STAR_DRIFT_SPEED}
        starRotationSpeed={LIQUID_ETHER_CONFIG.STAR_ROTATION_SPEED}
        starBrightness={LIQUID_ETHER_CONFIG.STAR_BRIGHTNESS}
        starTwinkleSpeed={LIQUID_ETHER_CONFIG.STAR_TWINKLE_SPEED}
        enableStars={LIQUID_ETHER_CONFIG.ENABLE_STARS}
        {...props}
      />
    </div>
  );
};

export default Background;