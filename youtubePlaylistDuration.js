/**
 * returns time duration of playlist in hours, minutes and seconds format
 * */

const getPlaylistDuration = () => {
  const time = {
    hour: 0,
    minute: 0,
    second: 0,
  };

  // singular as it covers both string cases: 0. hour 1. hours
  const HOUR = "hour";
  const MINUTE = "minute";
  const SECOND = "second";

  const videoComponentTag = "ytd-playlist-panel-video-renderer";
  const videoTimeLabelClass = ".ytd-thumbnail-overlay-time-status-renderer";

  document.querySelectorAll(videoComponentTag).forEach((video) => {
    const timeLabel = video.querySelectorAll(videoTimeLabelClass)[1].ariaLabel;

    timeLabel.split(",").forEach((metric) => {
      const [value, label] = metric.trim().split(" ");
      if (label.includes(HOUR)) time[HOUR] += parseInt(value);
      else if (label.includes(MINUTE)) time[MINUTE] += parseInt(value);
      else if (label.includes(SECOND)) time[SECOND] += parseInt(value);
    });
  });

  // TODO: Convert into standard time format
  // Eg: hours: 0, minutes: 75, seconds: 65 to hours: 1 , minutes: 16, seconds: 5
  console.log(time);
};

getPlaylistDuration();
