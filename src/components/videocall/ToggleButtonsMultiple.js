import React, { useCallback } from 'react';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {
  CallEnd,
  MicOffRounded,
  MicRounded,
  Videocam,
  VideocamOff,
} from '@material-ui/icons';
import { Button, Typography } from '@material-ui/core';

// stop only camera
function stopVideoOnly(stream) {
  stream.getTracks().forEach(function (track) {
    if (track.readyState == 'live' && track.kind === 'video') {
      track.enabled = false;
    }
  });
}

function startVideoOnly(stream) {
  stream.getTracks().forEach(function (track) {
    if (track.readyState == 'live' && track.kind === 'video') {
      track.enabled = true;
    }
  });
}

function startAudioOnly(stream) {
  stream.getTracks().forEach(function (track) {
    if (track.readyState == 'live' && track.kind === 'audio') {
      track.enabled = true;
    }
  });
}

// stop only mic
function stopAudioOnly(stream) {
  stream.getTracks().forEach(function (track) {
    if (track.readyState == 'live' && track.kind === 'audio') {
      track.enabled = false;
    }
  });
}

export default function ToggleButtonsMultiple(props) {
  const localStream = props.localStream;
  const [formats, setFormats] = React.useState(['camera', 'microphone']);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const handleCamera = async () => {
    if (formats.indexOf('camera') !== -1) {
      stopVideoOnly(localStream);
    } else {
      startVideoOnly(localStream);
    }
  };

  const handleMic = async () => {
    if (formats.indexOf('microphone') !== -1) {
      stopAudioOnly(localStream);
    } else {
      startAudioOnly(localStream);
    }
  };

  return (
    <ToggleButtonGroup
      value={formats}
      onChange={handleFormat}
      aria-label="text formatting"
    >
      <Button
        variant="contained"
        color="primary"
        disableElevation
        disableRipple
        disableTouchRipple
        disableFocusRipple
      >
        <Typography variant="button">
          {props.hours < 10 ? `0${props.hours}` : props.hours}:
          {props.minutes < 10 ? `0${props.minutes}` : props.minutes}:
          {props.seconds < 10 ? `0${props.seconds}` : props.seconds}
        </Typography>
      </Button>
      <ToggleButton value="camera" aria-label="camera" onClick={handleCamera}>
        {formats.indexOf('camera') == -1 ? <VideocamOff /> : <Videocam />}
      </ToggleButton>
      <ToggleButton
        value="microphone"
        aria-label="microphone"
        onClick={handleMic}
      >
        {formats.indexOf('microphone') == -1 ? (
          <MicOffRounded />
        ) : (
          <MicRounded />
        )}
      </ToggleButton>
      <Button
        variant="contained"
        color="secondary"
        disableElevation
        onClick={() => props.callEnd()}
      >
        <CallEnd></CallEnd>
      </Button>
    </ToggleButtonGroup>
  );
}
