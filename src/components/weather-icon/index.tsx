import {
  WiDaySunny,
  WiDayCloudy,
  WiRainMix,
  WiDaySunnyOvercast,
  WiRain,
  WiThunderstorm,
} from "weather-icons-react";
import ErrorIcon from "@material-ui/icons/Error";

const WeatherIcon = (props: { size: number; id: number }) => {
  switch (props.id) {
    case 3:
      return <WiDaySunny {...props} color="#FFB719" />;
    case 13:
      return <WiDayCloudy {...props} color="#F2F2F1" />;
    case 19:
      return <WiDaySunnyOvercast {...props} color="#FFB719" />;
    case 37:
      return <WiDayCloudy {...props} color="#F2F2F1" />;
    case 43:
      return <WiRainMix {...props} color="#F2F2F1" />;
    case 71:
      return <WiRainMix {...props} color="#F2F2F1" />;
    case 72:
      return <WiRainMix {...props} color="#F2F2F1" />;
    case 73:
      return <WiRain {...props} color="#F2F2F1" />;
    case 74:
      return <WiRain {...props} color="#F2F2F1" />;
    case 76:
      return <WiThunderstorm {...props} color="#F2F2F1" />;
    default:
      return <ErrorIcon style={{ height: props.size, width: props.size }} />;
  }
};

export default WeatherIcon;
