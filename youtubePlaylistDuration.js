/**
 * returns time duration of playlist in days, hours, minutes and seconds format
 * */

const getPlaylistDuration = () => {
  const time = {
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  };

  // setting raw time duration by scrapping the playlist
  setRawDuration(time);

  // translate the raw time duration into a readable format
  translateDuration(time);

  // display playlist time duration
  displayDuration(time);
};

const setRawDuration = (time) => {
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
}

const translateDuration = (time) => {
  // seconds to minutes
  time.minute += Math.floor(time.second / 60);
  time.second = (time.second % 60);

  // minutes to hours
  time.hour += Math.floor(time.minute / 60);
  time.minute = (time.minute % 60);

  // hours to days
  time.day += Math.floor(time.hour / 24);
  time.hour = (time.hour % 24);
}

const displayDuration = (time) => {
  Object.keys(time).forEach(metric => {
    time[metric] = `${time[metric]} ${time[metric] > 1 ? `${metric}s` : metric}`
  })

  alert(`Playlist: Total time duration: ${Object.keys(time).map((metric) => time[metric]).join(', ')}`);
}

getPlaylistDuration();
